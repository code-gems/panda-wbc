// type
import { DragonComboBoxChange, DragonComboBoxChangeEvent, ElementDetails, PandaComboBoxItem } from "../index";
import { PandaComboBoxOverlay } from "./panda-combo-box-overlay";

// style
import { styles, modifiers } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "./panda-combo-box-overlay";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { findItemByLabel, getItemLabel, getItemValue, minValue } from "./utils/utils";

@customElement("panda-combo-box")
export class PandaComboBox extends LitElement {
	// css style
	static get styles() {
		return [
			styles,
			modifiers
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

	@property({ type: Boolean, attribute: true, reflect: true })
	autoselect: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	/**
	 * Status property, indicating if the overlay is shown.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, reflect: true })
	opened: boolean = false;

	// view props
	@property({ type: String })
	private _value: string = "";

	private _searchText: string | null = null;

	// elements
	@query("#combo-box")
	private _comboBoxEl!: HTMLDivElement;

	@query("#input-field")
	private _inputFieldEl!: HTMLInputElement;
	
	private _overlayEl!: PandaComboBoxOverlay | null;

	// overlay events
	private _selectEvent: (e: any) => void = this._onSelect.bind(this);
	private _changeEvent: (e: any) => void = this._onChange.bind(this);
	private _closeOverlayEvent: (e: any) => void = this._closeOverlay.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(changedProps: PropertyValues): void {
		if (changedProps.has("value") && this.value !== undefined) {
			this._value = getItemLabel(
				this.items,
				this.value,
				this.itemValuePath,
				this.itemLabelPath
			);
			console.log("%c updated value label", "font-size: 24px; color: green;", this._value);
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

		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		return html`
			${labelHtml}
			<div
				id="combo-box"
				class="combo-box"
				part="combo-box"
			>
				<input
					id="input-field"
					class="input-field"
					part="input-field"
					type="text"
					.value="${this._value}"
					@keydown="${this._onKeyDown}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					@input="${(e: InputEvent) => this._onInput((e.target as HTMLInputElement).value)}"
					@click="${this._onClick}"
				/>
				<div
					class="icon"
					part="icon"
					@click="${this._openOverlay}"
				>
					<panda-icon icon="chevron-down"></panda-icon>
				</div>
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
		console.log("%c [combo box] _openOverlay", "font-size: 24px; color: red;", this._overlayEl);
		if (!this._overlayEl) {
			// create overlay element
			this._overlayEl = document.createElement("panda-combo-box-overlay");
			// add event listeners
			this._overlayEl.addEventListener("select", this._selectEvent);
			this._overlayEl.addEventListener("change", this._changeEvent);
			this._overlayEl.addEventListener("close", this._closeOverlayEvent);
			// overlay props
			this._overlayEl.items = this.items;
			this._overlayEl.value = this.value;
			this._overlayEl.searchText = this._searchText;
			this._overlayEl.itemLabelPath = this.itemLabelPath;
			this._overlayEl.itemValuePath = this.itemValuePath;
			this._overlayEl.parentDetails = this._getElementDetails();
			// append element to document body
			document.body.appendChild(this._overlayEl);
			this.opened = true;
		}
	}

	private _closeOverlay() {
		console.log("%c [combo box] _closeOverlay", "font-size: 24px; color: red;", this._overlayEl);
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("select", this._selectEvent);
			this._overlayEl.removeEventListener("change", this._changeEvent);
			this._overlayEl.removeEventListener("close", this._closeOverlayEvent);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;
			// this._inputFieldEl.focus();
		}
	}

	private _validateInput() {
		const _inputValue = this._inputFieldEl.value;
		let _match: PandaComboBoxItem | null = null;

		// check if value has changed
		if (_inputValue === this._value) {
			return;
		}
		console.log("%c [combo box] _validateInput::_inputValue", "font-size: 24px; color: green;", _inputValue, this._value);
		
		// check if input value is empty
		if (_inputValue === "") {
			this.value = null;
			this._inputFieldEl.value = "";
		} else {
			if (this.items) {
				// search for entered value among all items
				_match = this.items.find((item) => findItemByLabel(item, this.itemLabelPath, _inputValue));
				console.log("%c [combo box] _validateInput::match", "font-size: 24px; color: orange;", _match);
				if (_match) {
					this.value = getItemValue(_match, this.itemValuePath);
					this._triggerChangeEvent();
				} else {
					this.value = null;
					this._inputFieldEl.value = "";
				}
			}
		}		
	}

	private _triggerChangeEvent() {
		const event: CustomEvent<DragonComboBoxChange> = new CustomEvent("change", {
			detail: {
				value: this.value
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClick() {
		console.log("%c [combo box] _onClick", "font-size: 24px; color: red;");
		// open overlay
		this._openOverlay();
		if (this.autoselect) {
			this._inputFieldEl.select();
		}
	}

	private _onFocus() {
		console.log("%c [combo box] _onFocus", "font-size: 24px; color: red;");
		this.focused = true;
		// check for autoselect flag
		if (this.autoselect) {
			this._inputFieldEl.select();
		}
	}

	private _onBlur() {
		console.log("%c [combo box] _onBlur", "font-size: 24px; color: red;", this._overlayEl);
		this.focused = false;
		this._validateInput();
	}

	private _onInput(value: string) {
		console.log("%c [combo box] _onInput", "font-size: 24px; color: red;", value, this._overlayEl);
		// update search text for overlay
		if (this._overlayEl) {
			// this._openOverlay();
			this._overlayEl.searchText = value;
		}

		if (!this._overlayEl) {
			console.log("%c [combo box] _openOverlay", "font-size: 24px; color: green;");
			this._openOverlay();
		}
	}

	private _onKeyDown(e: KeyboardEvent) {
		console.log("%c [combo box] _onKeyDown", "font-size: 24px; color: orange;", e);
		switch (e.key) {
			case "Enter":
			case "Tab":
				this._validateInput();
				this._closeOverlay();
				break;
			case "ArrowUp":
			case "ArrowDown":
				this._openOverlay();
				break;
		}
	}

	private _onSelect(e: DragonComboBoxChangeEvent) {
		console.log("%c [combo box] _onSelect", "font-size: 24px; color: orange;", e.detail.value);
		// update value
		this.value = e.detail.value;
		this._inputFieldEl.value = getItemLabel(
			this.items,
			this.value,
			this.itemValuePath,
			this.itemLabelPath
		);
		// trigger change event
		this._triggerChangeEvent();
	}

	private _onChange(e: DragonComboBoxChangeEvent) {
		console.log("%c [combo box] _onChange", "font-size: 24px; color: orange;", e.detail.value);
		// update value
		this.value = e.detail.value;
		this._inputFieldEl.value = getItemLabel(
			this.items,
			this.value,
			this.itemValuePath,
			this.itemLabelPath
		);
		// close overlay
		this._closeOverlay();
		// trigger change event
		this._triggerChangeEvent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-combo-box": PandaComboBox;
	}
}
