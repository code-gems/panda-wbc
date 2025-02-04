// types
import { PostMessageEvent, PostMessageType, SearchItem } from "panda-search-types";
import { PandaSearchItem, PandaSearchRendererParams } from "../index";

// style
import { styles } from "./styles/overlay-styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// utils
import { LitElement, html, PropertyValues, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { minValue } from "./utils/utils";

@customElement("panda-search-overlay")
export class PandaSearchOverlay extends LitElement {
	// css style
	static get styles() {
		return [styles, scrollbar];
	}

	@property({ type: Array })
	searchResults: PandaSearchItem[] | null | undefined = [];

	@property({ type: String })
	customStyle!: string;

	parentDetails!: any;

	// callbacks
	renderer!: (params: PandaSearchRendererParams) => TemplateResult | string | number;

	// state props
	private _initialized: boolean = false;

	@state()
	private _selectedItem: PandaSearchItem | null = null;

	@state()
	private _parsedSearchResults: SearchItem[] = [];
	
	@state()
	private _selectedItemIndex!: number | null;

	// elements
	@query("#overlay")
	private readonly _overlayEl!: HTMLDivElement;

	@query("#overlay-cont")
	private readonly _overlayContEl!: HTMLDivElement;

	@query("#dropdown-cont")
	private readonly _dropdownContEl!: HTMLDivElement;

	// events
	private readonly _windowResizeEvent: any = this._onClose.bind(this); // close overlay when window resizes;
	private readonly _keyDownEvent: any = this._onKeyDown.bind(this);
	private readonly _scrollEvent: any = this._onOverlayScroll.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	protected firstUpdated(_changedProperties: PropertyValues): void {
		// expand overlay container to include scrollable area
		this._overlayContEl.style.width = `${document.body.scrollWidth}px`;
		this._overlayContEl.style.height = `${document.body.scrollHeight}px`;
		this._showOverlayContent();
	}

	public connectedCallback(): void {
		super.connectedCallback();
		// add events
		window.addEventListener("resize", this._windowResizeEvent);
		window.addEventListener("keydown", this._keyDownEvent);
		window.addEventListener("scroll", this._scrollEvent);
	}

	public disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove events
		if (this._windowResizeEvent) {
			window.removeEventListener("resize", this._windowResizeEvent);
		}
		if (this._keyDownEvent) {
			window.removeEventListener("keydown", this._keyDownEvent);
		}
		if (this._scrollEvent) {
			window.removeEventListener("scroll", this._scrollEvent);
		}
	}

	protected updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has("searchResults") && this.searchResults) {
			this._parseSearchResults();
			this._getSelectedItemIndex();
			this._showOverlayContent();
		}
		// check if custom style is defined
		if (_changedProperties.has("customStyle") && this.customStyle !== undefined) {
			this._applyCustomStyle();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult  {
		return html`
			<div
				id="overlay-cont"
				class="overlay-cont"
				part="overlay-cont"
				@click="${this._onClose}"
			>
				<div
					id="overlay"
					class="overlay"
					part="overlay"
					@click="${this._preventMouseEvent}"	
				>
					<div
						id="dropdown-cont"
						class="dropdown-cont"
						part="dropdown-cont"
					>
						${this._renderDropdown()}
					</div>
				</div>
		`;
	}

	private _renderDropdown(): TemplateResult {
		const itemsHtml: TemplateResult[] = [];

		this._parsedSearchResults.forEach((item) => {
			const { label, value, active, payload } = item;
			const activeCss = active ? "active" : "";

			// check if custom item renderer was provided
			const contentHtml = this.renderer && typeof this.renderer === "function"
				? this.renderer({ label, value, active, payload })
				: label;
			// convert item
			const searchItem: PandaSearchItem = {
				label: item.label,
				value: item.value,
				payload: { ...item.payload },
			};

			itemsHtml.push(html`
				<div
					class="item ${activeCss}"
					part="item ${activeCss}"
					@click="${() => this._onSelect(searchItem)}"
				>
					${contentHtml}
				</div>
			`);
		});

		// check if there is any dropdown item to display
		if (this._parsedSearchResults.length) {
			return html`
				<div class="dropdown" part="dropdown">
					<div class="dropdown-wrap scrollbar" part="dropdown-wrap">
						${itemsHtml}
					</div>
				</div>
			`;
		} else {
			return html`
				NO RESULTS
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showOverlayContent(): void {
		setTimeout(() => {
			// reset dropdown height
			this._dropdownContEl.style.height = `auto`;

			// get overlay size details
			const overlayRect = this._overlayEl.getBoundingClientRect();
			let overlayTop = this.parentDetails.bottom;
			let overlayLeft = this.parentDetails.left;
			let dropdownHight = overlayRect.height;

			// set default scroll to view behavior
			let _scrollIntoViewBlock: ScrollLogicalPosition = "start";
	
			// check if we have enough space at the bottom of the combo-box to display dropdown
			if (overlayTop - window.scrollY + overlayRect.height > window.innerHeight) {
				// correct dropdown height if it protrude out the visible space
				const _hightOffset = this.parentDetails.top - overlayRect.height;
				overlayTop = minValue(this.parentDetails.top - overlayRect.height, 10);
				if (_hightOffset < 0) {
					dropdownHight = dropdownHight - 10 + _hightOffset;
				}
				// change scroll to view behavior
				_scrollIntoViewBlock = "end";
			}

			// check if we have enough space on the right side of the combo-box to display dropdown 
			if (overlayLeft - window.scrollX + overlayRect.width > window.innerWidth) {
				overlayLeft = this.parentDetails.right - overlayRect.width;
			}

			// set drop down container's width
			this._dropdownContEl.style.width = `${this.parentDetails.width}px`;
			this._dropdownContEl.style.height = `${dropdownHight}px`;

			// position overlay content
			this._overlayEl.style.top = `${overlayTop}px`;
			this._overlayEl.style.left = `${overlayLeft}px`;
			this._overlayEl.classList.add("show");
			this._initialized = true;

			// scroll active item into view
			this._showActiveElement(_scrollIntoViewBlock);
		}, 0);
	}

	private _showActiveElement(_scrollIntoViewBlock: ScrollLogicalPosition = "center") {
		setTimeout(() => {
			const activeEl: HTMLDivElement | null | undefined = this.shadowRoot?.querySelector(".active");
			if (activeEl) {
				activeEl.scrollIntoView({ block: _scrollIntoViewBlock });
			}
		}, 0);
	}

	/** Find selected item index */
	private _getSelectedItemIndex(): void {
		this._selectedItemIndex = this._parsedSearchResults.find(
			(item) => item.value === this._selectedItem?.value
		)?.index ?? null;
	}
	
	private _updateActiveItem() {
		// TODO: refactor this to use forEach() loop
		this._parsedSearchResults = this._parsedSearchResults.map((item) => {
			// update active flag
			return {
				...item,
				active: item.value === this._selectedItem?.value,
			};
		});
	}

	/** Parse provided search results for further processing. */
	private _parseSearchResults(): void {
		this._parsedSearchResults = [];

		// check if search results were provided
		if (this.searchResults?.length) {
			// parse items
			this.searchResults.forEach((item, index) => {
				const { label, value, payload } = item;

				this._parsedSearchResults.push({
					index,
					label,
					value,
					active: index === this._selectedItemIndex,
					payload: { ...payload },
				});
			});
		}
	}

	private _selectPreviousItem(): void {
		console.log("%c _selectPreviousItem", "font-size: 24px; color: green;");
		console.log("%c _initialized", "font-size: 24px; color: green;", this._initialized);
		console.log("%c _selectedItem", "font-size: 24px; color: green;", this._selectedItem);
		console.log("%c selectedItemIndex", "font-size: 24px; color: green;", this._selectedItemIndex);

		if (!this._initialized) {
			this._initialized = true;
			return;
		}

		if (this._selectedItemIndex === null) {
			this._selectedItemIndex = 0;
		} else if (this._selectedItemIndex === 0) {
			this._selectedItemIndex = this._parsedSearchResults.length - 1;
		} else {
			this._selectedItemIndex -= 1;
		}
		// select item
		this._selectItemByIndex(this._selectedItemIndex);
	}

	private _selectNextItem(): void {
		console.log("%c _selectNextItem", "font-size: 24px; color: green;");
		console.log("%c _initialized", "font-size: 24px; color: green;", this._initialized);
		console.log("%c _selectedItem", "font-size: 24px; color: green;", this._selectedItem);
		console.log("%c selectedItemIndex", "font-size: 24px; color: green;", this._selectedItemIndex);

		if (!this._initialized) {
			this._initialized = true;
			return;
		}

		if (this._selectedItemIndex === null ||
			this._selectedItemIndex === this._parsedSearchResults.length - 1
		) {
			this._selectedItemIndex = 0;
		} else {
			this._selectedItemIndex += 1;
		}
		// select item
		this._selectItemByIndex(this._selectedItemIndex);
	}

	private _selectItemByIndex(index: number) {
		const selectedItem = this._parsedSearchResults.find((item) => item.index === index) ?? null;
		if (selectedItem) {
			this._selectedItem = {
				label: selectedItem.label,
				value: selectedItem.value,
				payload: { ...selectedItem.payload },
			};
		} else {
			this._selectedItem = null;
		}
		this._updateActiveItem();
		console.log("%c ⚡ [SEARCH OVERLAY] (_selectItemByIndex)", "font-size: 16px; color: crimson; background: black;", this._selectedItem);
		// show active element after change
		this._showActiveElement();
	}
	
	/**
	 * Communicate with combo box component using custom event
	 * @param {PostMessageType} action - type of action for combo box to take as a result of this event
	 * @param {PandaSearchItem} selectedItem - item to be selected
	 */
	private _triggerPostMessageEvent(
		action: PostMessageType,
		selectedItem: PandaSearchItem | null = null
	): void {
		console.log("%c ⚡ [SEARCH OVERLAY] (_triggerPostMessageEvent)", "font-size: 16px; color: crimson; background: black;", action, selectedItem);
		const event: PostMessageEvent = new CustomEvent("post-message", {
			detail: {
				action,
				selectedItem,
			}
		});
		this.dispatchEvent(event);
	}

	/** Apply user defined custom style to this components shadowRoot */
	private _applyCustomStyle(): void {
		if (this.customStyle && this.shadowRoot) {
			const customStyle = document.createElement("style");
			customStyle.innerHTML = this.customStyle;
			customStyle.setAttribute("scope", "custom-style");
			this._overlayEl.appendChild(customStyle);
		}
	}
	
	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _preventMouseEvent(e: MouseEvent) {
		// prevent click event to prevent overlay from closing
		e.stopPropagation();
		e.preventDefault();
	}

	private _onKeyDown(event: KeyboardEvent) {
		console.log("%c ⚡ [SEARCH OVERLAY] (_onKeyDown)", "font-size: 16px; color: crimson; background: black;", event);
		switch (event.key) {
			case "Enter":
			case "Tab":
				event.stopPropagation();
				this._onSelect(this._selectedItem);
				break;
			case "ArrowUp":
				event.stopPropagation();
				this._selectPreviousItem();
				break;
			case "ArrowDown":
				event.stopPropagation();
				this._selectNextItem();
				break;
			case "Escape":
				event.stopPropagation();
				this._onClose();
				break;
			}
	}

	private _onOverlayScroll() {
		// update overlay position
		this._showOverlayContent();
	}

	private _onSelect(searchItem: PandaSearchItem | null): void {
		if (searchItem) {
			console.log("%c ⚡ [SEARCH OVERLAY] (_onSelect) searchItem", "font-size: 16px; color: crimson; background: black;", searchItem);
			this._triggerPostMessageEvent(
				PostMessageType.SELECT,
				searchItem,
			);
		} else {
			console.log("%c ⚡ [SEARCH OVERLAY] (_onSelect) CLOSE", "font-size: 16px; color: crimson; background: black;", searchItem);
			this._triggerPostMessageEvent(PostMessageType.CLOSE);
		}
	}
	
	private _onClose(): void {
		this._triggerPostMessageEvent(PostMessageType.CLOSE);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-search-overlay": PandaSearchOverlay;
	}
}
	