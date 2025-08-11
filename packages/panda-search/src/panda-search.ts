// type
import {
	PandaSearchI18NConfig,
	PandaSearchIconPosition,
	PandaSearchItem,
	PandaSearchOnInputEvent,
	PandaSearchOnSelectEvent,
	PandaSearchRendererParams,
} from "../index";
import { ElementDetails, PostMessageEvent, PostMessageType } from "panda-search-types";
import { PandaSearchOverlay } from "./panda-search-overlay";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-sliding-placeholder";
import "./panda-search-overlay";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { debounce } from "@panda-wbc/panda-utils";
import { isEmpty, minValue } from "@panda-wbc/panda-utils";

@customElement("panda-search")
export class PandaSearch extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: String, reflect: true })
	label!: string;

	@property({ type: String })
	value!: string;

	@property({ type: String, reflect: true })
	placeholder!: string[] | string | undefined;
	
	@property({ type: Number, reflect: true })
	placeholderSlideInterval: number | null = null;

	@property({ type: Boolean, reflect: true })
	focused: boolean = false;

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	@property({ type: Boolean, reflect: true })
	spellcheck: boolean = false;

	@property({ type: String, reflect: true })
	icon!: string;

	@property({ type: String, attribute: "icon-position", reflect: true })
	iconPosition!: PandaSearchIconPosition;

	@property({ type: Boolean, attribute: "hide-icon", reflect: true })
	hideIcon: boolean = false;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType!: string;

	@property({ type: Number, attribute: "delay-interval", reflect: true })
	delayInterval!: number;

	@property({ type: Boolean, reflect: true })
	autoselect: boolean = false;

	@property({ type: String })
	customStyle!: string;

	@property({ type: Object })
	i18n!: PandaSearchI18NConfig;

	@property({ type: Boolean, reflect: true })
	opened: boolean = false;

	// callbacks
	search!: (searchText: string) => Promise<PandaSearchItem[]>;

	renderer!: (params: PandaSearchRendererParams) => TemplateResult | string | number;

	headerRenderer!: (searchText: string, searchResults: PandaSearchItem[] | null | undefined) => TemplateResult;
	
	footerRenderer!: (searchText: string, searchResults: PandaSearchItem[] | null | undefined) => TemplateResult;
	
	noResultsRenderer!: (searchText: string) => TemplateResult;

	// state props
	@state()
	private _searching: boolean = false;

	@state()
	private _searchResults!: PandaSearchItem[] | null;

	@state()
	private _selectedItem: any = null;

	// elements
	private _overlayEl!: PandaSearchOverlay | null;

	@query("#input-cont")
	private readonly _inputContEl!: HTMLInputElement;

	@query("#input-field")
	private readonly _inputFieldEl!: HTMLInputElement;

	// overlay events
	private readonly _postMessageEvent: any = this._onPostMessage.bind(this);

	// debouncer
	private readonly _onSearchDebounce = debounce(this._search.bind(this), this.delayInterval ?? 1000);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// cancel debouncer
		if (this._onSearchDebounce) {
			this._onSearchDebounce.cancel();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const iconPosition = this.iconPosition ?? PandaSearchIconPosition.RIGHT;
		let labelHtml: TemplateResult = html``;
		let iconLeftHtml: TemplateResult = html``;
		let iconRightHtml: TemplateResult = html``;
		let slidingPlaceholderHtml: TemplateResult = html``;

		// modifier class aggregation
		const modCss: string[] = [];
		if (this.disabled) {
			modCss.push("disabled");
		}

		if (this.label) {
			labelHtml = html`
				<div
					class="label"
					part="label ${modCss.join(" ")}"
				>
					${this.label}
				</div>
			`;
		}

		if (!this.hideIcon) {
			const icon = isEmpty(this.value)
				? this.icon ?? "search"
				: "close";

			if (iconPosition === PandaSearchIconPosition.LEFT) {
				iconLeftHtml = html`
					<div
						class="icon"
						part="icon ${modCss.join(" ")}"
						@click="${this._onClearSearch}"
						@keydown="${this._onClearSearch}"
						tabindex="${this.disabled ? "-1" : "0"}"
					>
						<panda-icon .icon="${icon}"></panda-icon>
					</div>
				`;
			} else {
				iconRightHtml = html`
					<div
						class="icon"
						part="icon ${modCss.join(" ")}"
						@click="${this._onClearSearch}"
						@keydown="${this._onClearSearch}"
						tabindex="${this.disabled ? "-1" : "0"}"
					>
						<panda-icon .icon="${icon}"></panda-icon>
					</div>
				`;
			}
		}

		if (this._searching && !this.hideIcon) {
			const spinnerType = this.spinnerType ?? "google";

			if (iconPosition === PandaSearchIconPosition.LEFT) {
				iconLeftHtml = html`
					<div class="icon" part="icon ${modCss.join(" ")}">
						<panda-spinner .spinner="${spinnerType}"></panda-spinner>
					</div>
				`;
			} else {
				iconRightHtml = html`
					<div class="icon" part="icon ${modCss.join(" ")}">
						<panda-spinner .spinner="${spinnerType}"></panda-spinner>
					</div>
				`;
			}
		}

		if (this.placeholder) {
			const placeholders = Array.isArray(this.placeholder)
				? this.placeholder
				: [this.placeholder];
			slidingPlaceholderHtml = html`
				<panda-sliding-placeholder
					class="placeholder ${modCss.join(" ")}"
					part="placeholder ${modCss.join(" ")}"
					.hide="${this.value}"
					.placeholders="${placeholders}"
					.slideInterval="${this.placeholderSlideInterval}"
				>
				</panda-sliding-placeholder>
			`;
		}

		const position = iconPosition === PandaSearchIconPosition.LEFT && !this.hideIcon
			? "no-padding-left"
			: "";

		return html`
			${labelHtml}
			<div
				id="input-cont"
				class="input-cont ${modCss.join(" ")}"
				part="input-cont ${modCss.join(" ")}"
			>
				<slot name="prefix"></slot>
				${iconLeftHtml}
				<div class="input-wrap">
					${slidingPlaceholderHtml}
					<input
						id="input-field"
						class="input-field ${position}"
						part="input-field ${modCss.join(" ")}"
						type="text"
						autocomplete="off"
						.spellcheck="${this.spellcheck}"
						.value="${this.value ?? ""}"
						.disabled="${this.disabled}"
						@keydown="${this._onKeyDown}"
						@focus="${this._onFocus}"
						@blur="${this._onBlur}"
						@input="${this._onInput}"
						@click="${this._onClick}"
						tabindex="${this.disabled ? "-1" : "0"}"
					/>
				</div>
				${iconRightHtml}
				<slot name="suffix"></slot>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getElementDetails(): ElementDetails {
		const rect = this._inputContEl.getBoundingClientRect();
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
			// create overlay element
			this._overlayEl = document.createElement("panda-search-overlay");
			// add event listeners
			this._overlayEl.addEventListener("post-message", this._postMessageEvent);
			// overlay props
			this._overlayEl.searchText = this.value;
			this._overlayEl.searchResults = this._searchResults;
			this._overlayEl.customStyle = this.customStyle;
			this._overlayEl.i18n = this.i18n;
			this._overlayEl.parentDetails = this._getElementDetails();
			this._overlayEl.renderer = this.renderer;
			this._overlayEl.headerRenderer = this.headerRenderer;
			this._overlayEl.footerRenderer = this.footerRenderer;
			this._overlayEl.noResultsRenderer = this.noResultsRenderer;
			// append element to document body
			document.body.appendChild(this._overlayEl);
			this.opened = true;
		} else if (this._overlayEl && !this.disabled) {
			// if search results dropdown is opened, update search results
			this._overlayEl.searchResults = this._searchResults;
		}
	}

	private _triggerOnInputEvent() {
		const event: PandaSearchOnInputEvent = new CustomEvent("on-input", {
			detail: {
				value: this.value,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerOnInputDebouncedEvent(): void {
		const event: PandaSearchOnInputEvent = new CustomEvent("on-input-debounced", {
			detail: {
				value: this.value,
			}
		});
		this.dispatchEvent(event);
	}

	private _triggerOnSelectEvent(): void {
		const event: PandaSearchOnSelectEvent = new CustomEvent("on-select", {
			detail: {
				selectedItem: this._selectedItem,
			}
		});
		this.dispatchEvent(event);
	}

	private async _search(): Promise<void> {
		// dispatch inout debounce event
		this._triggerOnInputDebouncedEvent();

		// check if search callback is defined
		if (this.search && typeof this.search === "function") {
			// indicate searching start
			this._searching = true;
			// call search callback and get search results items
			this._searchResults = await this.search(this.value);
			// indicate searching end
			this._searching = false;
			// open search overlay
			this._openOverlay();
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public close() {
		this._onClose();
	}

	public clear() {
		this.value = "";
		this._inputFieldEl.value = "";
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClick() {
		// open overlay if there are search results from previous search
		if (this._searchResults) {
			this._openOverlay();
		}
		if (this.autoselect) {
			this._inputContEl.select();
		}
	}

	private _onFocus() {
		this.focused = true;
		// check for autoselect flag
		if (this.autoselect) {
			this._inputContEl.select();
		}
	}

	private _onBlur() {
		this.focused = false;
	}

	private _onInput(event: any) {
		this.value = event.target.value;
		this._triggerOnInputEvent();
		this._onSearchDebounce();
	}

	private _onClearSearch() {
		this.value = "";
		this._triggerOnInputEvent();
		// clean search results
		this._searchResults = null;
	}

	private _onKeyDown(event: KeyboardEvent): void {
		switch (event.key) {
			case "ArrowUp":
			case "ArrowDown":
				if (this._searchResults) {
					this._openOverlay();
				}
				break;
			case "Escape":
				this._onClose();
				break;
		}
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

	private _onPostMessage(event: PostMessageEvent): void {
		const { action, selectedItem } = event.detail;

		switch (action) {
			case PostMessageType.SELECT:
				this._onSelect(selectedItem);
				break;
			case PostMessageType.CLOSE:
				this._onClose();
				break;
		}
	}

	private _onSelect(selectedItem: PandaSearchItem): void {
		this._selectedItem = selectedItem;
		this._inputFieldEl.value = selectedItem?.label;
		this._triggerOnSelectEvent();
		// close overlay
		this._onClose();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-search": PandaSearch;
	}
}
