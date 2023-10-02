// types
import { ElementDetails, PandaSelectChangeEventDetail, PandaSelectChangeEvent, PandaSelectItem } from "../index";
import { PandaSelectOverlay } from "./panda-select-overlay";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "./panda-select-overlay";

// utils
import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { minValue, getItemLabel } from "./utils/utils";

@customElement("panda-select")
export class PandaSelect extends LitElement {
	// css styles
	static get styles() {
		return [
			styles
		];
	}

	@property({ type: String })
	label!: string;

	@property({ type: String })
	value: string | number | null = null;

	@property({ type: Object })
	items: PandaSelectItem[] | any[] | null | undefined = [];

	@property({ type: String, attribute: "item-label-path" })
	itemLabelPath: string | null = null;

	@property({ type: String, attribute: "item-value-path" })
	itemValuePath: string | null = null;

	@property({ type: Boolean, attribute: "disable-auto-open" })
	disableAutoOpen: boolean = false;

	@property({ type: Boolean, attribute: true, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, attribute: true })
	disabled!: boolean;

	@property({ type: Boolean, attribute: true })
	working: boolean = false;

	@property({ type: String, attribute: true })
	placeholder: string | null = null;

	@property({ type: String, attribute: "spinner-type" })
	spinnerType: string = "dots";

	/**
	 * Status property, indicating if the overlay is shown.
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, reflect: true })
	opened: boolean = false;
		
	/**
	 * Show/hide clear button on date input field
	 * 
	 * [DEFAULT] false
	 */
	@property({ type: Boolean, attribute: "hide-clear-button" })
	hideClearButton: boolean = false;

	// view props
	@property({ type: String })
	private _label: string = "";

	// elements
	@query("#select")
	private _selectEl!: HTMLDivElement;

	@query("#input-field")
	private _inputFieldEl!: HTMLInputElement;

	private _overlayEl!: PandaSelectOverlay | null;

	// overlay events
	private _selectEvent: (e: any) => void = this._onSelect.bind(this);
	private _changeEvent: (e: any) => void = this._onChange.bind(this);
	private _closeOverlayEvent: (e: any) => void = this._closeOverlay.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(changedProps: PropertyValues): void {
		if (changedProps.has("value") && this.value !== undefined) {
			this._label = getItemLabel(
				this.items,
				this.value,
				this.itemValuePath,
				this.itemLabelPath
			);
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
		let suffixIconHtml: TemplateResult = html``;

		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		// check if component is in working state
		if (this.working) {
			spinnerHtml = html`
				<div class="spinner-cont" part="spinner-cont">
					<dragon-spinner spinner="${this.spinnerType}"></dragon-spinner>
				</div>
			`;
		}

		if (this.value && !this.hideClearButton && !this.disabled) {
			suffixIconHtml = html`
				<div
					class="icon"
					part="icon"
					@click="${this.clear}"
				>
					<panda-icon icon="close"></panda-icon>
				</div>
			`;
		}

		if (!this.value || this.value && this.hideClearButton) {
			suffixIconHtml = html`
				<div
					class="icon"
					part="icon"
					@click="${this._onToggleDropdown}"
				>
					<panda-icon icon="chevron-down"></panda-icon>
				</div>
			`;
		}

		return html`
			${labelHtml}
			<div
				id="select"
				class="select"
				part="select"
			>
				<input
					id="input-field"
					class="input-field ${this.disabled ? "disabled" : ""}"
					part="input-field"
					type="text"
					.value="${this._label}"
					.placeholder="${this.placeholder ?? ""}"
					@keydown="${this._onKeyDown}"
					@keypress="${this._onKeyPress}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					@click="${this._onClick}"
					readonly
				/>
				${suffixIconHtml}
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getElementDetails(): ElementDetails {
		const rect = this._selectEl.getBoundingClientRect();
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
		if (!this._overlayEl) {
			// create overlay element
			this._overlayEl = document.createElement("panda-select-overlay");
			// add event listeners
			this._overlayEl.addEventListener("select", this._selectEvent);
			this._overlayEl.addEventListener("change", this._changeEvent);
			this._overlayEl.addEventListener("close", this._closeOverlayEvent);
			// overlay props
			this._overlayEl.items = this.items;
			this._overlayEl.value = this.value;
			this._overlayEl.itemLabelPath = this.itemLabelPath;
			this._overlayEl.itemValuePath = this.itemValuePath;
			this._overlayEl.parentDetails = this._getElementDetails();
			// append element to document body
			document.body.appendChild(this._overlayEl);
			this.opened = true;
		}
	}

	private _closeOverlay() {
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("select", this._selectEvent);
			this._overlayEl.removeEventListener("change", this._changeEvent);
			this._overlayEl.removeEventListener("close", this._closeOverlayEvent);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;
		}
	}

	private _triggerChangeEvent() {
		const event: CustomEvent<PandaSelectChangeEventDetail> = new CustomEvent("change", {
			detail: {
				value: this.value
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

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
		}
	}

	private _onFocus() {
		this.focused = true;
	}

	private _onBlur() {
		this.focused = false;
	}

	private _onSelect(e: PandaSelectChangeEvent) {
		// update value
		this.value = e.detail.value;
		this._label = getItemLabel(
			this.items,
			this.value,
			this.itemValuePath,
			this.itemLabelPath
		);
		// trigger change event
		this._triggerChangeEvent();
	}

	private _onChange(e: PandaSelectChangeEvent) {
		// update value
		this.value = e.detail.value;
		this._label = getItemLabel(
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
	
	private _onKeyDown(e: KeyboardEvent) {
		switch (e.key) {
			case "Enter":
			case "Tab":
				this._closeOverlay();
				break;
			case "ArrowUp":
			case "ArrowDown":
			default:
				this._openOverlay();
				e.preventDefault();
				return false;
		}
	}

	private _onKeyPress(e: KeyboardEvent) {
		e.preventDefault();
		return false;
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
		"panda-select": PandaSelect;
	}
}