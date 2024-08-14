// type
import {
	ElementDetails,
	PandaComboBoxChangeEvent,
	PandaComboBoxItem,
	PostMessageAction,
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
import {
	findItemByLabel,
	getItemByValue,
	getItemLabel,
	getItemValue,
	getLabelFromItems,
	isValueSet,
	minValue,
} from "./utils/utils";

@customElement("panda-combo-box")
export class PandaComboBox extends LitElement {
	// css style
	static get styles() {
		return [
			styles
		];
	}

	@property({ type: String, reflect: true })
	label!: string;

	@property({ type: String })
	value: string | number | null = null;

	@property({ type: Array })
	items: PandaComboBoxItem[] | any[] | null = [];

	@property({ type: String, attribute: "item-label-path", reflect: true })
	itemLabelPath: string | null = null;

	@property({ type: String, attribute: "item-value-path", reflect: true })
	itemValuePath: string | null = null;

	@property({ type: Boolean, attribute: "allow-custom-value", reflect: true })
	allowCustomValue: boolean = false;

	@property({ type: Boolean, attribute: "disable-auto-open", reflect: true })
	disableAutoOpen: boolean = false;

	@property({ type: Boolean, reflect: true })
	autoselect: boolean = false;

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	working: boolean = false;

	@property({ type: String, reflect: true })
	placeholder: string | null = null;

	@property({ type: String, attribute: "spinner-type", reflect: true })
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
	@property({ type: String, reflect: true })
	pattern: string | null = null;

	/**
	 * A regular expression that the key strokes are checked against.
	 * If the key pressed by user do not match the pattern
	 * combo box input will not be updated
	 * 
	 * [DEFAULT] null
	 */
	@property({ type: String, attribute: "allowed-char-pattern", reflect: true })
	allowedCharPattern: string | null = null;

	@property({ type: Boolean, reflect: true })
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

	// events
	private _postMessageEvent: (e: any) => void = this._onPostMessage.bind(this);

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
			// validate input
			this._validateInput(this.value);
		}
		// close overlay on disabled/working
		if (
			changedProps.has("disabled") && this.disabled ||
			changedProps.has("working") && this.working
		) {
			this._onClose();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// close overlay and remove all events
		this._onClose();
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

	/** Open overlay and attach it to document body. */
	private _openOverlay() {
		if (!this._overlayEl && !this.disabled) {
			console.log("%c ⚡ [COMBO-BOX] _openOverlay", "font-size: 24px; color: orange;");

			// create overlay element
			this._overlayEl = document.createElement("panda-combo-box-overlay");
			// add event listeners
			this._overlayEl.addEventListener("post-message", this._postMessageEvent);
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

	private _updateValue(): void {
		const _inputValue = this._inputFieldEl.value;
		// check if value has changed
		if (_inputValue === this._value) {
			console.log("%c ⚡ [COMBO-BOX] (_updateValue) value didn't change [EXIT]", "font-size: 24px; color: red;");
			return;
		}
		// check if input value is empty
		if (_inputValue === "") {
			this.value = null;
			this._inputFieldEl.value = "";
			this._triggerChangeEvent();
		} else if (this.allowCustomValue) {
			console.log("%c ⚡ [COMBO-BOX] (_updateValue) -> allowCustomValue", "font-size: 24px; color: red;", _inputValue);
			console.log("%c ⚡ [COMBO-BOX] (_updateValue) -> allowCustomValue: value", "font-size: 24px; color: red;", this.value);

			// check if entered value is part of dropdown items
			const _selectedItem = getItemByValue(
				this.items,
				_inputValue,
				this.itemLabelPath ?? "label"
			);

			if (_selectedItem !== undefined) {
				this.value = getItemValue(_selectedItem, this.itemValuePath);
			} else {
				this.value = _inputValue;
			}
			this._triggerChangeEvent();

			// find selected item and update selection
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

	private _validateInput(inputValue: string | number | null) {
		// check if pattern is defined
		if (this.pattern && inputValue !== null && inputValue !== undefined) {
			const regExp = new RegExp(this.pattern);
			const value = inputValue as string;
			// validate user input
			if (!regExp.test(value)) {
				this._invalid = true;
			} else {
				this._invalid = false;
			}
		}
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
		this._onClose();
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
			case "Escape":
				// TODO: for manual entries with disableAutoOpen feature ESC may cancel change
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

	private _onToggleDropdown() {
		if (!this.disabled) {
			this._inputFieldEl.focus();
			this._openOverlay();
		}
	}

	private _onChange(value: any, searchText: string) {
		console.log("%c ⚡ [COMBO-BOX] (_onChange) value:", "font-size: 24px; color: lime;", value);
		console.log("%c ⚡ [COMBO-BOX] (_onChange) local value:", "font-size: 24px; color: lime;", this.value);
		console.log("%c ⚡ [COMBO-BOX] (_onChange) local searchText/ remote searchText:", "font-size: 24px; color: lime;", this._searchText, searchText);

		// check if user backspaced entire value and hit [ENTER]
		if (searchText === "") {
			console.log("%c ⚡ [COMBO-BOX] (_onChange) -> User backspaced value:", "font-size: 24px; color: orange;", searchText === "");
			const _isValueSet = isValueSet(this.value);
			this.value = null;
			this._inputFieldEl.value = "";
			// check if value was already null to prevent from dispatching change event when value did not change
			if (_isValueSet) {
				this._triggerChangeEvent();
			}

			// check if allow-custom-value is enabled
		} else if (this.allowCustomValue) {
			console.log("%c ⚡ [COMBO-BOX] (_onChange) -> allowCustomValue: value", "font-size: 24px; color: orange;", value, value === null);
			console.log("%c ⚡ [COMBO-BOX] (_onChange) -> allowCustomValue: searchText", "font-size: 24px; color: orange;", searchText, searchText === null);

			// check if item was selected from the existing options w.o. searching
			if (
				value !== null &&
				value !== "" &&
				searchText === null
			) {
				// find selected item by value
				const _selectedItem = getItemByValue(
					this.items,
					value,
					this.itemValuePath ?? "value",
				);
				console.log("%c ⚡ 1. [COMBO-BOX] (_onChange) -> allowCustomValue: findItem", "font-size: 24px; color: orange;", _selectedItem);
				console.log("%c ⚡ 1. [COMBO-BOX] (_onChange) -> allowCustomValue: value", "font-size: 24px; color: orange;", value);
				console.log("%c ⚡ 1. [COMBO-BOX] (_onChange) -> allowCustomValue: searchText", "font-size: 24px; color: orange;", searchText, searchText === null);

				// check if selection changed
				if (this.value !== value && _selectedItem !== null) {
					this.value = getItemValue(_selectedItem, this.itemValuePath);
					this._inputFieldEl.value = getItemLabel(_selectedItem, this.itemLabelPath);
					this._searchText = null;

					this._triggerChangeEvent();
				}

				// check if item was search for and selected
			} else if (
				searchText !== null &&
				searchText !== ""
			) {
				// find selected item by label
				const _selectedItem = getItemByValue(
					this.items,
					searchText,
					this.itemLabelPath ?? "label",
				);
				console.log("%c ⚡ 2. [COMBO-BOX] (_onChange) -> allowCustomValue: findItem", "font-size: 24px; color: orange;", _selectedItem);
				console.log("%c ⚡ 2. [COMBO-BOX] (_onChange) -> allowCustomValue: value", "font-size: 24px; color: orange;", value);
				console.log("%c ⚡ 2. [COMBO-BOX] (_onChange) -> allowCustomValue: searchText", "font-size: 24px; color: orange;", searchText);

				// check if selection changed
				if (this.value !== searchText && _selectedItem !== undefined) {
					this.value = getItemValue(_selectedItem, this.itemValuePath);
					this._inputFieldEl.value = getItemLabel(_selectedItem, this.itemLabelPath);
					this._searchText = null;

					this._triggerChangeEvent();
				}

				// if user entered something that is not part of dropdown, add it as custom value
				if (_selectedItem === undefined && this.value !== searchText) {
					console.log("%c ⚡ 3. [COMBO-BOX] (_onChange) -> allowCustomValue: searchText", "font-size: 24px; color: orange;", searchText);
					// check if selection changed
					this.value = searchText;
					this._inputFieldEl.value = searchText;
					this._searchText = null;

					this._triggerChangeEvent();
				}
			}

			// check if user was searching for dropdown items	
		} else if (searchText !== null && searchText !== "") {
			console.log("%c ⚡ [COMBO-BOX] (_onChange) -> _updateValue -> searchText:", "font-size: 24px; color: orange;", searchText);
			this._updateValue();
		} else {
			// check if user selected the same value
			if (value !== this.value) {
				// update value
				this.value = value;
				this._inputFieldEl.value = getLabelFromItems(
					this.items,
					this.value,
					this.itemValuePath,
					this.itemLabelPath
				);
				this._triggerChangeEvent();
			}
		}
		// close overlay
		this._onClose();
	}

	private _onUpdateInputField(value: any): void {
		this._inputFieldEl.focus();
		this._inputFieldEl.value = value;
		this._inputFieldEl.select();
		console.log("%c ⚡ [COMBO-BOX] (_onUpdateInputField) -> value/_updateAfterClose", "font-size: 24px; color: orange;", value);
	}

	private _onClose(updateAfterClose: boolean = false): void {
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("post-message", this._postMessageEvent);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;

			console.log("%c (_closeOverlay) searchText: ", "font-size: 24px; color: green;", this._searchText);
			console.log("%c (_closeOverlay) _value", "font-size: 24px; color: green;", this._value);
			console.log("%c (_closeOverlay) updateAfterClose", "font-size: 24px; color: green;", updateAfterClose);

			// check if user was using up/down arrow keys to select item and close drop-down
			if (updateAfterClose) {
				this._updateValue();
			} else {
				// check if user closed dropdown after searching but did not select anything
				this._inputFieldEl.value = this._value;
				this._searchText = null;
				console.log("%c (_closeOverlay) Clean up search text", "font-size: 24px; color: green;");
			}
		}
	}

	private _onPostMessage(event: any): void {
		const { action, value, searchText } = event.detail;
		console.log("%c ⚡ [COMBO-BOX] (_onPostMessage)", "font-size: 24px; color: red;", event.detail, action, value, searchText, searchText === null);

		switch (action) {
			case PostMessageAction.CHANGE:
				this._onChange(value, searchText);
				break;
			case PostMessageAction.UPDATE_INPUT:
				this._onUpdateInputField(value);
				break;
			case PostMessageAction.CLOSE_AND_CANCEL:
				this._onClose();
				break;
			case PostMessageAction.CLOSE_AND_UPDATE:
				this._onClose(true);
				break;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-combo-box": PandaComboBox;
	}
}
