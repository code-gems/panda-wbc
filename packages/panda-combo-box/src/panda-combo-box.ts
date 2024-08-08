// type
import {
	ElementDetails,
	PandaComboBoxChangeEvent,
	PandaComboBoxItem,
	PandaComboBoxOverlayChangeEvent,
	PandaComboBoxOverlayUpdateInputFieldEvent,
} from "../index";
import { PandaComboBoxOverlay } from "./panda-combo-box-overlay";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "./panda-combo-box-overlay";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { findItemByLabel, getLabelFromItems, getItemValue, minValue } from "./utils/utils";

@customElement("panda-combo-box")
export class PandaComboBox extends LitElement {
	// css style
	static get styles() {
		return [
			styles
		];
	}

	@property({ type: String })
	label!: string;

	@property({ type: String })
	value: string | number | null = null;
	
	@property({ type: Array })
	items: PandaComboBoxItem[] | any[] | null | undefined = [];

	@property({ type: String, attribute: "item-label-path" })
	itemLabelPath: string | null = null;

	@property({ type: String, attribute: "item-value-path" })
	itemValuePath: string | null = null;

	@property({ type: Boolean, attribute: "allow-custom-value" })
	allowCustomValue: boolean = false;

	@property({ type: Boolean, attribute: "disable-auto-open" })
	disableAutoOpen: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	autoselect: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	working: boolean = false;

	@property({ type: String, attribute: true })
	placeholder: string | null = null;

	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "dots";

	/**
	 * Custom filtering method. When provided, drop down items will be filtered against
	 * using user provided search text
	 * 
	 * [DEFAULT] default filter will list all items that include search text in the item label
	 */
	filter!: (searchText: string | number, items: PandaComboBoxItem[] | any[]) => PandaComboBoxItem[] | any[];

	/**
	 * A regular expression that the value is checked against.
	 * The pattern must match the entire value.
	 * If value entered by user do not match the pattern
	 * component will be marked as invalid
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String, attribute: true })
	pattern: string | null = null;

	/**
	 * A regular expression that the key strokes are checked against.
	 * If the key pressed by user do not match the pattern
	 * combo box input will not be updated
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String, attribute: "allowed-char-pattern" })
	allowedCharPattern: string | null = null;

	@property({ type: Boolean, attribute: true })
	mandatory: boolean = false;

	// state props
	/**
	 * Status property, indicating if the overlay is shown.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, reflect: true })
	private opened: boolean = false;

	@state()
	private _mandatory: boolean = false;

	@state()
	private _value: string = "";

	private _searchText: string | null = null;

	@state()
	private _invalid: boolean = false;

	// elements
	@query("#combo-box")
	private _comboBoxEl!: HTMLDivElement;

	@query("#input-field")
	private _inputFieldEl!: HTMLInputElement;
	
	private _overlayEl!: PandaComboBoxOverlay | null;

	/**
	 * This prop is used to determine if user was navigating through drop-down list
	 * and if drop-down was closed without selection. Expectation is to select item
	 * user selected with up/down arrow keys anyway on close or outside click
	*/
	private _updateAfterClose: boolean = false;

	// overlay events
	private _changeEvent: (e: any) => void = this._onChange.bind(this);
	private _updateInputFieldEvent: (e: any) => void = this._onUpdateInputField.bind(this);
	private _closeOverlayEvent: (e: any) => void = this._closeOverlay.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// update mandatory flag
		this._evaluateMandatoryFlag();
	}

	protected updated(changedProps: PropertyValues): void {
		if (changedProps.has("value") && this.value !== undefined) {
			this._value = getLabelFromItems(
				this.items,
				this.value,
				this.itemValuePath,
				this.itemLabelPath,
				this.allowCustomValue
			);
			// update mandatory flag
			this._evaluateMandatoryFlag();
		}
		// close overlay on disabled/working
		if (
			changedProps.has("disabled") && this.disabled ||
			changedProps.has("working") && this.working
		) {
			this._closeOverlay();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// close overlay and remove all events
		this._closeOverlay();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;

		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		// check if component is in working state
		if (this.working) {
			spinnerHtml = html`
				<div class="spinner-cont" part="spinner-cont">
					<panda-spinner spinner="${this.spinnerType}"></panda-spinner>
				</div>
			`;
		}

		// modifier class aggregation
		const modCss: string[] = [];
		if (this._invalid) {
			modCss.push("invalid");
		}
		if (this._mandatory) {
			modCss.push("mandatory");
		}
		if (this.disabled) {
			modCss.push("disabled");
		}

		return html`
			${labelHtml}
			<div
				id="combo-box"
				class="combo-box ${modCss.join(" ")}"
				part="combo-box"
			>
				<slot name="prefix"></slot>
				<input
					id="input-field"
					class="input-field"
					part="input-field"
					type="text"
					autocomplete="off"
					.placeholder="${this.placeholder ?? ""}"
					.value="${this._value}"
					.disabled="${this.disabled}"
					@keydown="${this._onKeyDown}"
					@keypress="${this._onKeyPress}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					@input="${(e: InputEvent) => this._onInput((e.target as HTMLInputElement).value)}"
					@click="${this._onClick}"
				/>
				<div
					class="icon ${this.opened ? "rotate" : ""}"
					part="icon"
					@click="${this._onToggleDropdown}"
				>
					<panda-icon icon="chevron-down"></panda-icon>
				</div>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getElementDetails(): ElementDetails {
		const rect = this._comboBoxEl.getBoundingClientRect();
		const top = minValue(rect.top + window.scrollY, 0);
		const left = minValue(rect.left + window.scrollX, 0);
		const bottom = minValue(rect.bottom + window.scrollY, 0);
		const right = minValue(rect.right + window.scrollX, 0);

		return {
			width: rect.width,
			height: rect.height,
			top,
			left,
			bottom,
			right,
		};
	}

	/**
	 * Open overlay and attach it to document body.
	 */
	private _openOverlay() {
		if (!this._overlayEl && !this.disabled) {
			console.log("%c ⚡ [COMBO-BOX] _openOverlay", "font-size: 24px; color: orange;");

			// create overlay element
			this._overlayEl = document.createElement("panda-combo-box-overlay");
			// add event listeners
			this._overlayEl.addEventListener("change", this._changeEvent);
			this._overlayEl.addEventListener("update-input-field", this._updateInputFieldEvent);
			this._overlayEl.addEventListener("close", this._closeOverlayEvent);
			// overlay props
			this._overlayEl.items = this.items;
			this._overlayEl.value = this.value;
			this._overlayEl.searchText = this._searchText;
			this._overlayEl.itemLabelPath = this.itemLabelPath;
			this._overlayEl.itemValuePath = this.itemValuePath;
			this._overlayEl.parentDetails = this._getElementDetails();
			this._overlayEl.filter = this.filter;
			// append element to document body
			document.body.appendChild(this._overlayEl);
			this.opened = true;
		}
	}

	private _closeOverlay() {
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("change", this._changeEvent);
			this._overlayEl.removeEventListener("update-input-field", this._updateInputFieldEvent);
			this._overlayEl.removeEventListener("close", this._closeOverlayEvent);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;

			console.log("%c (_closeOverlay) searchText: ", "font-size: 24px; color: green;", this._searchText);
			console.log("%c (_closeOverlay) _value", "font-size: 24px; color: green;", this._value);
			console.log("%c (_closeOverlay) _updateAfterClose", "font-size: 24px; color: green;", this._updateAfterClose);
			
			// check if user closed dropdown after searching but did not select anything
			if (
				this._searchText !== null &&
				this._searchText !== this._value &&
				!this._updateAfterClose
			) {
				this._inputFieldEl.value = this._value;
				this._searchText = null;
				console.log("%c (_closeOverlay) Clean up search text", "font-size: 24px; color: green;");
			}
			// check if user was using arrow keys to select item and close drop-down
			if (this._updateAfterClose) {
				this._updateValue();
			}
		}
	}

	private _updateValue(): void {
		const _inputValue = this._inputFieldEl.value;
		// check if value has changed
		if (_inputValue === this._value) {
			return;
		}
		// check if input value is empty
		if (_inputValue === "") {
			this.value = null;
			this._inputFieldEl.value = "";
			this._triggerChangeEvent();
		} else if (this.items) {
			let _items: PandaComboBoxItem[] | any[] = [];
			// check if custom filter is defined
			if (
				this._searchText !== null &&
				this._searchText !== undefined &&
				this.filter &&
				typeof this.filter === "function"
			) {
				_items = this.filter(this._searchText, this.items);
			} else {
				_items = this.items;
			}
			// search for entered value among all items and return first match
			const _match: PandaComboBoxItem | null = _items.find((item) => findItemByLabel(item, this.itemLabelPath, _inputValue));
			// check if there is a match
			if (_match) {
				this.value = getItemValue(_match, this.itemValuePath);
				this._inputFieldEl.value = getLabelFromItems(
					_items,
					this.value,
					this.itemValuePath,
					this.itemLabelPath,
					this.allowCustomValue	
				);
			} else {
				this.value = null;
				this._inputFieldEl.value = "";
				this._searchText = null;
			}
			// trigger change event only if value changed
			if (this._inputFieldEl.value !== this._value) {
				this._triggerChangeEvent();
			}
		}
	}

	private _triggerChangeEvent() {
		console.log("%c ⚡ [COMBO-BOX] _triggerChangeEvent", "font-size: 24px; color: orange;", this.value);
		const event: PandaComboBoxChangeEvent = new CustomEvent("change", {
			detail: {
				value: this.value
			}
		});
		this.dispatchEvent(event);
		// clear search text
		this._searchText = null;
	}

	private _evaluateMandatoryFlag() {
		// update mandatory flag
		if (this.mandatory) {
			if (this.value !== "" && this.value !== null && this.value !== undefined) {
				this._mandatory = false;
			} else {
				this._mandatory = true;
			}
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================
	
	public close() {
		this._closeOverlay();
	}

	public clear() {
		this.value = null;
		this._inputFieldEl.value = "";
		this._triggerChangeEvent();
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClick() {
		if (!this.disableAutoOpen) {
			// open overlay
			this._openOverlay();
			if (this.autoselect) {
				this._inputFieldEl.select();
			}
		}
	}

	private _onFocus() {
		console.log("%c ⚡ [COMBO-BOX] _onFocus", "font-size: 24px; color: orange;");
		this.focused = true;
		// check for autoselect flag
		if (this.autoselect) {
			this._inputFieldEl.select();
		}
	}

	private _onBlur() {
		console.log("%c ⚡ [COMBO-BOX] (_onBlur)", "font-size: 24px; color: orange;");
		this.focused = false;
		if (!this.opened) {
			console.log("%c ⚡ [COMBO-BOX] (_onBlur) - > _updateValue()", "font-size: 24px; color: red;");
			this._updateValue();
		}
	}

	private _onInput(value: string) {
		this._searchText = value;
		// update search text for overlay
		if (this._overlayEl) {
			this._overlayEl.searchText = value;
		}
		// open dropdown if closed and if disable-auto-open is not enabled
		if (!this._overlayEl && !this.disableAutoOpen) {
			this._openOverlay();
		}
		// check if pattern is defined
		if (this.pattern && value) {
			const regExp = new RegExp(this.pattern);
			// validate user input
			if (regExp.test(value)) {
				this._invalid = true;
			} else {
				this._invalid = false;
			}
		}
	}

	private _onKeyDown(event: KeyboardEvent) {
		console.log("%c ⚡ [COMBO-BOX] _onKeyDown", "font-size: 24px; color: orange;", event?.key, this.opened);
		switch (event.key) {
			case "Enter":
			case "Tab":
				// validate input only if drop-down is closed
				if (!this.opened) {
					console.log("%c ⚡ [COMBO-BOX] (_onKeyDown) ENTER/TAB value:", "font-size: 24px; color: red;", this.value, this._searchText);
					this._updateValue();
				}
				break;
			case "ArrowUp":
			case "ArrowDown":
				event.preventDefault();
				this._openOverlay();
				break;
		}
	}

	private _onKeyPress(event: KeyboardEvent) {
		// check if allowed characters pattern is defined
		if (this.allowedCharPattern) {
			const regExp = new RegExp(this.allowedCharPattern);
			// stop input if key does not match the pattern
			if (!regExp.test(event.key)) {
				event.preventDefault();
				return false;
			}
		}
	}

	private _onChange(event: PandaComboBoxOverlayChangeEvent) {
		const { value, searchText } = event.detail;
		console.log("%c ⚡ [COMBO-BOX] (_onChange) value:", "font-size: 24px; color: orange;", value);

		// cancel update on close
		this._updateAfterClose = false;
		
		// check if user backspaced entire value and hit [ENTER]
		if (searchText === "") {
			console.log("%c ⚡ [COMBO-BOX] (_onChange) -> User backspaced value:", "font-size: 24px; color: orange;", searchText === "");
			this.value = null;
			this._inputFieldEl.value = "";
			this._triggerChangeEvent();
			this._closeOverlay();
		
			// check if user was searching for dropdown items	
		} else if (searchText !== null && searchText !== "") {
			console.log("%c ⚡ [COMBO-BOX] (_onChange) -> _updateValue -> searchText:", "font-size: 24px; color: orange;", searchText);
			this._updateValue();
			this._closeOverlay();
		} else {
			// update value
			this.value = value;
			this._inputFieldEl.value = getLabelFromItems(
				this.items,
				this.value,
				this.itemValuePath,
				this.itemLabelPath
			);
			this._closeOverlay();
			this._triggerChangeEvent();
		}
	}

	private _onUpdateInputField(event: PandaComboBoxOverlayUpdateInputFieldEvent): void {
		const { value } = event.detail;
		this._inputFieldEl.value = value;
		this._inputFieldEl.select();
		this._updateAfterClose = true;
	}

	private _onToggleDropdown() {
		if (!this.disabled) {
			this._inputFieldEl.focus();
			this._openOverlay();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-combo-box": PandaComboBox;
	}
}
