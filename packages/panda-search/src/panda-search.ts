// type
// import { PandaComboBoxChange, PandaComboBoxChangeEvent, ElementDetails, PandaComboBoxItem } from "../index";
import { PandaSearchIconPosition, PandaSearchItem, PandaSearchOnInputEvent, PandaSearchOnInputEventDetails } from "../index";
import { PandaSearchOverlay } from "./panda-search-overlay";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "./panda-search-overlay";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { debounce } from "@panda-wbc/panda-utils";
import { isEmpty } from "./utils/utils";

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

	// private props

	// elements
	@query("#input-field")
	private _inputFieldEl!: HTMLInputElement;

	private _overlayEl!: PandaSearchOverlay | null;

	// overlay events
	private _postMessageEvent: (e: any) => void = this._onPostMessage.bind(this);

	// debouncer
	private _onInputDebouncer: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback() {
		super.connectedCallback();
		// initialize debouncer
		this._onInputDebouncer = debounce(this._triggerInputDebouncedEvent.bind(this), this.delayInterval);
	}

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

	private _onPostMessage(event: any): void {
		console.log("%c ⚡ [PANDA_SEARCH] (_onPostMessage)", "font-size: 24px; color: red;", event.detail);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-search": PandaSearch;
	}
}
