// types
import { ElementDetails, PandaComboBoxItem, PandaComboBoxOverlayUpdateInputFieldEvent } from "../index";

interface ParsedComboBoxItem {
	index: number;
	value: any;
	label: string;
	active: boolean;
}

// style
import { styles } from "./styles/overlay-styles";

// utils
import { LitElement, html, PropertyValues, TemplateResult, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import {
	getItemValue,
	minValue,
	getItemLabel,
} from "./utils/utils";

@customElement("panda-combo-box-overlay")
export class PandaComboBoxOverlay extends LitElement {
	// css style
	static get styles() {
		return [
			styles,
		];
	}

	@property({ type: String })
	value: string | number | null = null;

	@property({ type: Array })
	items: PandaComboBoxItem[] | null | undefined = [];

	@property({ type: String, attribute: "item-label-path" })
	itemLabelPath: string | null = null;

	@property({ type: String, attribute: "item-value-path" })
	itemValuePath: string | null = null;

	@property({ type: String })
	searchText: string | null = null;

	parentDetails!: ElementDetails;

	filter!: (searchText: string | number, items: PandaComboBoxItem[] | any[]) => PandaComboBoxItem[] | any[];

	// view props
	private _initialized: boolean = false;

	@property({ type: Array })
	private _parsedItems: ParsedComboBoxItem[] = [];

	@property({ type: Number })
	private _selectedItemIndex!: number | null;

	// elements
	@query("#overlay")
	private _overlayEl!: HTMLDivElement;

	@query("#dropdown-cont")
	private _dropdownContEl!: HTMLDivElement;

	// events
	private _windowResizeEvent: any = this.close.bind(this); // close overlay when window resizes;
	private _keyDownEvent: any = this._onKeyDown.bind(this);
	private _scrollEvent: any = this._onOverlayScroll.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(_changedProperties: PropertyValues): void {
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

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (
			(_changedProperties.has("items") && this.items?.length) ||
			(_changedProperties.has("searchText") && this.searchText !== null)
		) {
			this._parseComboBoxItems();
			this._getSelectedItemIndex();
			this._showOverlayContent();
		}

		if (_changedProperties.has("searchText") && this.searchText !== undefined) {
			console.log(
				"%c ⚡ [COMBO-BOX-OVERLAY] (updated) searchText / is null? ",
				"font-size: 24px; color: pink;",
				this.searchText,
				this.searchText === null
			);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div
				class="overlay-cont"
				part="overlay-cont"
				@click="${this.close}"
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

		this._parsedItems.forEach(({ label, value, active }) => {
			itemsHtml.push(html`
				<div
					class="item ${active ? "active" : ""}"
					part="item"
					@click="${() => this._triggerChangeEvent(value)}"
				>
					${label}
				</div>
			`);
		});

		// check if there is any dropdown item to display
		if (this._parsedItems.length) {
			return html`
				<div class="dropdown" part="dropdown">
					<div class="dropdown-wrap scroll" part="dropdown-wrap">
						${itemsHtml}
					</div>
				</div>
			`;
		} else {
			return html``;
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public close() {
		this.dispatchEvent(new CustomEvent("close", {}));
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showOverlayContent(): void {
		setTimeout(() => {
			console.log("%c ⚡ [COMBO-BOX-OVERLAY] _showOverlayContent", "font-size: 24px; color: pink;");
			// reset dropdown height
			this._dropdownContEl.style.height = `auto`;

			// get overlay size details
			const overlayRect = this._overlayEl.getBoundingClientRect();
			let overlayTop = this.parentDetails.bottom - document.documentElement.scrollTop;
			let overlayLeft = this.parentDetails.left - document.documentElement.scrollLeft;
			let dropdownHight = overlayRect.height;
			
			// set default scroll to view behavior
			let _scrollIntoViewBlock: ScrollLogicalPosition = "start";

			// check if we have enough space at the bottom of the combo-box to display dropdown
			if (overlayTop - window.scrollY + overlayRect.height > window.innerHeight) {
				// correct dropdown height if it protrude out the visible space
				const _hightOffset = this.parentDetails.top - overlayRect.height - document.documentElement.scrollTop;
				overlayTop = minValue(_hightOffset, 10);
				if (_hightOffset < 0) {
					dropdownHight = dropdownHight - 10 + _hightOffset;
				}
				// change scroll to view behavior
				_scrollIntoViewBlock = "end";
			}

			// check if we have enough space on the right side of the combo-box to display dropdown 
			if (overlayLeft - window.scrollX + overlayRect.width > window.innerWidth) {
				overlayLeft = this.parentDetails.right - overlayRect.width - document.documentElement.scrollLeft;
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
		this._selectedItemIndex = this._parsedItems.find((item) => item.value === this.value)?.index ?? null;
	}

	/** Filter items against search string using "includes" condition */	
	private _filterItemsWithIncludes(searchText: string, items: PandaComboBoxItem[] | any[]): PandaComboBoxItem[] | any[] {
		const filteredItems: PandaComboBoxItem[] | any[] = [];

		items.forEach((item) => {
			const _label = getItemLabel(item, this.itemLabelPath);
			// filter items
			if (_label && _label.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) {
				filteredItems.push(item);
			}
		});

		return filteredItems;
	}

	/**
	 * Parse provided items for further processing.
	 * Filter items if user entered searching text.
	*/
	private _parseComboBoxItems(): void {
		this._parsedItems = [];
		let _items = [];
		let index = 0;

		// check if we have items to filter and parse
		if (this.items?.length) {
			// check if user is searching for items
			if (this.searchText) {
				// check if custom filter is provided and it's a function
				if (this.filter && typeof this.filter === "function") {
					_items = this.filter(this.searchText, this.items);
				} else {
					_items = this._filterItemsWithIncludes(this.searchText, this.items);
				}
			} else {
				_items = this.items;
			}

			// parse items
			_items.forEach((item) => {
				const _value = getItemValue(item, this.itemValuePath);
				const _label = getItemLabel(item, this.itemLabelPath);
				// check if user is searching and if we have matches
				this._parsedItems.push({
					index,
					// active: this.value === _value,
					active: false,
					value: _value,
					label: _label,
				});
				index++;
			});
		}
	}

	private _selectPreviousItem(): void {
		if (!this._initialized) {
			this._initialized = true;
			return;
		}

		if (this._selectedItemIndex === null) {
			this._selectedItemIndex = 0;
		} else if (this._selectedItemIndex === 0) {
			this._selectedItemIndex = this._parsedItems.length - 1;
		} else {
			this._selectedItemIndex -= 1;
		}
		// select item
		this._selectItemByIndex(this._selectedItemIndex);
	}

	private _selectNextItem(): void {
		if (!this._initialized) {
			this._initialized = true;
			return;
		}

		if (this._selectedItemIndex === null ||
			this._selectedItemIndex === this._parsedItems.length - 1
		) {
			this._selectedItemIndex = 0;
		} else {
			this._selectedItemIndex += 1;
		}
		// select item
		this._selectItemByIndex(this._selectedItemIndex);
	}

	private _selectItemByIndex(index: number) {
		const selectedItem = this._parsedItems.find((item) => item.index === index);
		this.value = selectedItem?.value;

		console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_selectItemByIndex)", "font-size: 24px; color: pink;", selectedItem?.label, index);

		// update active flag
		this._parsedItems = this._parsedItems.map((item) => {
			return {
				...item,
				active: item.value === this.value
			};
		});

		// check if item was selected and update combo-box input field value
		if (selectedItem) {
			this._triggerUpdateInputFieldEvent(selectedItem.label);
		}
		// show active element after change
		this._showActiveElement();
	}

	private _triggerChangeEvent(value: any, searchText: string | null = null): void {
		console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_triggerChangeEvent) value, searchText", "font-size: 24px; color: pink;", value, searchText);
		const event = new CustomEvent("change", {
			detail: {
				value,
				searchText,
			}
		});
		this.dispatchEvent(event);
	}

	/**
	 * Update combo-box input field value when navigating list with arrows
	 * @param value - value to be send to combo-box input
	 */
	private _triggerUpdateInputFieldEvent(value: any): void {
		console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_triggerUpdateInputFieldEvent) value:", "font-size: 24px; color: pink;", value);
		const event: PandaComboBoxOverlayUpdateInputFieldEvent = new CustomEvent("update-input-field", {
			detail: {
				value
			}
		});
		this.dispatchEvent(event);
		// clean up search text
		this.searchText = null;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _preventMouseEvent(event: MouseEvent) {
		// prevent click event to prevent overlay from closing
		event.stopPropagation();
		event.preventDefault();
	}

	private _onKeyDown(event: KeyboardEvent) {
		console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onKeyDown) key: ", "font-size: 24px; color: pink;", event.key);
		switch (event.key) {
			case "Enter":
			case "Tab":
				event.stopPropagation();
				console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onKeyDown) -> value", "font-size: 24px; color: red;", this.value);
				console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onKeyDown) -> searchText / is null?", "font-size: 24px; color: red;", this.searchText, this.searchText ===  null);
				this._triggerChangeEvent(this.value, this.searchText);
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
				this.close();
				break;
		}
	}

	private _onOverlayScroll() {
		console.log("%c ⚡ [COMBO-BOX-OVERLAY] _onOverlayScroll", "font-size: 24px; color: pink;");
		// update overlay position
		this._showOverlayContent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-combo-box-overlay": PandaComboBoxOverlay;
	}
}
