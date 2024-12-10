// type
import {
	ElementDetails,
	PandaSearchIconPosition,
	PandaSearchItem,
	PandaSearchOnInputEvent,
	PandaSearchOnInputEventDetails,
	PostMessageAction,
} from "../index";
import { PandaSearchOverlay } from "./panda-search-overlay";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "./panda-search-overlay";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { debounce } from "@panda-wbc/panda-utils";
import { isEmpty, minValue } from "./utils/utils";

@customElement("panda-search")
export class PandaSearch extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	
	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String })
	label!: string;

	@property({ type: String })
	value!: string;
	
	@property({ type: Array })
	items: PandaSearchItem[] | null | undefined = [];

	@property({ type: String, attribute: "item-label-path", reflect: true })
	itemLabelPath: string | null = null;

	@property({ type: String, attribute: "item-value-path", reflect: true })
	itemValuePath: string | null = null;

	@property({ type: String, reflect: true })
	placeholder: string | null = null;

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	searching: boolean = false;
	
	@property({ type: Boolean, reflect: true })
	spellcheck: boolean = false;

	@property({ type: String, reflect: true })
	icon: string = "search";

	@property({ type: String, attribute: "icon-position", reflect: true })
	iconPosition: PandaSearchIconPosition = PandaSearchIconPosition.RIGHT;

	@property({ type: Boolean, attribute: "hide-icon", reflect: true })
	hideIcon: boolean = false;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType: string = "google";

	@property({ type: Number, attribute: "delay-interval", reflect: true })
	delayInterval: number = 1000;

	@property({ type: Boolean, reflect: true })
	autoselect: boolean = false;

	// state props
	@property({ type: Boolean, reflect: true })
	private opened: boolean = false;

	@state()
	private _selectedItem: any = null;

	// elements
	@query("#input-field")
	private _inputFieldEl!: HTMLInputElement;

	private _overlayEl!: PandaSearchOverlay | null;

	// overlay events
	private readonly _postMessageEvent: any = this._onPostMessage.bind(this);

	// debouncer
	private readonly _onInputDebouncer = debounce(this._triggerInputDebouncedEvent.bind(this), this.delayInterval);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("items") && this.items !== undefined) {
			console.log("%c [PANDA SEARCH] items", "font-size: 24px; color: green;", this.items);
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// cancel debouncer
		if (this._onInputDebouncer) {
			this._onInputDebouncer.cancel();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		let _labelHtml: TemplateResult = html``;
		let _iconLeftHtml: TemplateResult = html``;
		let _iconRightHtml: TemplateResult = html``;

		if (this.label) {
			_labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		if (!this.hideIcon) {
			const _icon = isEmpty(this.value)
				? this.icon ?? "search"
				: "close";

			if (this.iconPosition === PandaSearchIconPosition.LEFT) {
				_iconLeftHtml = html`
					<div
						class="icon"
						part="icon"
						@click="${this._onClearSearch}"
					>
						<panda-icon .icon="${_icon}"></panda-icon>
					</div>
				`;
			} else {
				_iconRightHtml = html`
					<div
						class="icon"
						part="icon"
						@click="${this._onClearSearch}"
					>
						<panda-icon .icon="${_icon}"></panda-icon>
					</div>
				`;
			}
		}

		if (this.searching && !this.hideIcon) {
			if (this.iconPosition === PandaSearchIconPosition.LEFT) {
				_iconLeftHtml = html`
					<div class="icon" part="icon">
						<panda-spinner .spinner="${this.spinnerType}"></panda-spinner>
					</div>
				`;
			} else {
				_iconRightHtml = html`
					<div class="icon" part="icon">
						<panda-spinner .spinner="${this.spinnerType}"></panda-spinner>
					</div>
				`;
			}
		}

		const _position = this.iconPosition === PandaSearchIconPosition.LEFT && !this.hideIcon
			? "no-padding-left"
			: "";

		return html`
			${_labelHtml}
			<div
				id="input-cont"
				class="input-cont"
				part="input-cont"
			>
				<slot name="prefix"></slot>
				${_iconLeftHtml}
				<input
					id="input-field"
					class="input-field ${_position}"
					part="input-field"
					type="text"
					autocomplete="off"
					.spellcheck="${this.spellcheck}"
					.placeholder="${this.placeholder ?? ""}"
					.value="${this.value}"
					.disabled="${this.disabled}"
					@focus="${this._onFocus}"
					@blur="${this._onBlur}"
					@input="${this._onInput}"
					tabindex="0"
				/>
				${_iconRightHtml}
				<slot name="suffix"></slot>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	private _getElementDetails(): ElementDetails {
		const rect = this._inputFieldEl.getBoundingClientRect();
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
			console.log("%c ⚡ [PANDA SEARCH] _openOverlay", "font-size: 24px; color: orange;");

			// create overlay element
			this._overlayEl = document.createElement("panda-search-overlay");
			// add event listeners
			this._overlayEl.addEventListener("post-message", this._postMessageEvent);
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

	private _triggerInputEvent() {
		const event: PandaSearchOnInputEvent = new CustomEvent("on-input", {
			detail: {
				value: this.value,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerInputDebouncedEvent() {
		const event = new CustomEvent<PandaSearchOnInputEventDetails>("on-input-debounced", {
			detail: {
				value: this.value,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerChangeEvent() {
		const event = new CustomEvent<PandaSearchOnInputEventDetails>("change", {
			detail: {
				value: this._selectedItem,
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFocus() {
		this.focused = true;
		// check for autoselect flag
		if (this.autoselect) {
			this._inputFieldEl.select();
		}
	}

	private _onBlur() {
		this.focused = false;
	}

	private _onInput(event: any) {
		this.value = event.target.value;
		this._triggerInputEvent();
		this._onInputDebouncer();
	}

	private _onClearSearch() {
		this.value = "";
		this._triggerInputEvent();
		this._onInputDebouncer();
	}

	private _onClose(): void {
		if (this._overlayEl) {
			// remove event listeners
			this._overlayEl.removeEventListener("post-message", this._postMessageEvent);
			// clean up
			document.body.removeChild(this._overlayEl);
			this._overlayEl = null;
			this.opened = false;
		}
	}

	private _onPostMessage(event: any): void {
		const { action, value } = event.detail;
		console.log("%c ⚡ [PANDA_SEARCH] (_onPostMessage)", "font-size: 24px; color: red;", event.detail);

		switch (action) {
			case PostMessageAction.CHANGE:
				this._onChange(value);
				break;
			case PostMessageAction.CLOSE:
				this._onClose();
				break;
		}
	}
	
	private _onChange(value: any): void {
		this._selectedItem = value;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-search": PandaSearch;
	}
}
