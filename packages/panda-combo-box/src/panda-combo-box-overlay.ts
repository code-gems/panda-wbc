// types
import { ElementDetails, PostMessageEvent, PostMessageType, SuperComboBoxItem } from "panda-combo-box-types"
import { PandaComboBoxItem, PandaComboBoxRendererParams } from "../index";

// style
import { styles } from "./styles/overlay-styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// utils
import { LitElement, html, TemplateResult, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import {
	filterItemsWithIncludes,
	getItemLabel,
	getItemValue,
	minValue,
} from "./utils/utils";

@customElement("panda-combo-box-overlay")
export class PandaComboBoxOverlay extends LitElement {
	// css style
	static get styles() {
		return [styles, scrollbar];
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
	
	@property({ type: String })
	dropdownWidth!: string;
	
	@property({ type: String })
	dropdownMaxHeight!: string;

	@property({ type: String })
	customStyle!: string;

	filter!: (searchText: string | number, items: PandaComboBoxItem[] | any[]) => PandaComboBoxItem[] | any[];

	renderer!: (params: PandaComboBoxRendererParams) => TemplateResult | string | number;

	parentDetails!: ElementDetails;

	// state props
	private _initialized: boolean = false;

	@state()
	private _parsedItems: SuperComboBoxItem[] = [];

	@state()
	private _selectedItemIndex!: number | null;
	
	@state()
	private _updateAfterClose: boolean = false;

	// elements
	@query("#overlay")
	private readonly _overlayEl!: HTMLDivElement;

	@query("#dropdown-cont")
	private readonly _dropdownContEl!: HTMLDivElement;

	// events
	private readonly _windowResizeEvent: any = this._onClose.bind(this); // close overlay when window resizes;
	private readonly _keyDownEvent: any = this._onKeyDown.bind(this);
	private readonly _scrollEvent: any = this._onOverlayScroll.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
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
		// check if custom style is defined
		if (_changedProperties.has("customStyle") && this.customStyle !== undefined) {
			this._applyCustomStyle();
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
				@click="${this._onOverlayClick}"
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
			</div>
		`;
	}

	private _renderDropdown(): TemplateResult {
		const itemsHtml: TemplateResult[] = [];

		this._parsedItems.forEach(({ label, value, selected, active, disabled, data }) => {
			const modCss: string[] = [];

			if (selected) {
				modCss.push("selected");
			}
			if (active) {
				modCss.push("active");
			}
			if (disabled) {
				modCss.push("disabled");
			}

			const contentHtml = this.renderer && typeof this.renderer === "function"
				? this.renderer({ label, value, selected, active, disabled, data })
				: label;
			itemsHtml.push(html`
				<div
					class="item ${modCss.join(" ")}"
					part="item ${modCss.join(" ")}"
					@click="${() => this._onChange(value, null, disabled)}"
				>
					${contentHtml}
				</div>
			`);
		});

		// check if there is any dropdown item to display
		if (this._parsedItems.length) {
			return html`
				<div class="dropdown" part="dropdown">
					<div class="dropdown-wrap scrollbar" part="dropdown-wrap">
						${itemsHtml}
					</div>
				</div>
			`;
		} else {
			return html``;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _showOverlayContent(): void {
		setTimeout(() => {
			// console.log("%c ⚡ [COMBO-BOX-OVERLAY] _showOverlayContent", "font-size: 24px; color: pink;");
			// reset dropdown height
			this._dropdownContEl.style.height = "auto";

			// get overlay size details
			const overlayRect = this._overlayEl.getBoundingClientRect();
			let overlayTop = this.parentDetails.bottom - document.documentElement.scrollTop;
			let overlayLeft = this.parentDetails.left - document.documentElement.scrollLeft;
			// check if dropdown width css variable was set
			const dropdownWidth = this.dropdownWidth ?? `${this.parentDetails.width}px`;
			let dropdownHight = overlayRect.height;
			
			// check if we have enough space at the bottom of the combo-box to display dropdown
			if (overlayTop - window.scrollY + overlayRect.height > window.innerHeight) {
				// correct dropdown height if it protrude out the visible space
				const _hightOffset = this.parentDetails.top - overlayRect.height - document.documentElement.scrollTop;
				overlayTop = minValue(_hightOffset, 10);
				if (_hightOffset < 0) {
					dropdownHight = dropdownHight - 10 + _hightOffset;
				}
			}

			// check if we have enough space on the right side of the combo-box to display dropdown 
			if (overlayLeft - window.scrollX + overlayRect.width > window.innerWidth) {
				overlayLeft = this.parentDetails.right - overlayRect.width - document.documentElement.scrollLeft;
			}

			// set drop down container's width
			this._dropdownContEl.style.width = dropdownWidth;
			// set drop down container's height
			this._dropdownContEl.style.height = `${dropdownHight}px`;
			// check if max height variable was set
			if (this.dropdownMaxHeight) {
				this._dropdownContEl.style.maxHeight = this.dropdownMaxHeight;
			}

			// position overlay content
			this._overlayEl.style.top = `${overlayTop}px`;
			this._overlayEl.style.left = `${overlayLeft}px`;
			this._overlayEl.classList.add("show");
			this._initialized = true;

			// scroll active item into view
			this._showSelectedElement();
		}, 0);
	}

	private _showActiveElement(): void {
		setTimeout(() => {
			const _activeEl: HTMLDivElement | null | undefined = this.shadowRoot?.querySelector(".active");
			if (_activeEl) {
				_activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
			}
		}, 0);
	}

	private _showSelectedElement(): void {
		setTimeout(() => {
			const _selectedEl: HTMLDivElement | null | undefined = this.shadowRoot?.querySelector(".selected");
			if (_selectedEl) {
				_selectedEl.scrollIntoView({ block: "nearest", inline: "nearest" });
			}
		}, 0);
	}

	/** Find selected item index */
	private _getSelectedItemIndex(): void {
		this._selectedItemIndex = this._parsedItems.find((item) => item.value === this.value)?.index ?? null;
	}

	/**
	 * Parse provided items for further processing.
	 * Filter items if user entered searching text.
	*/
	private _parseComboBoxItems(): void {
		this._parsedItems = [];
		let index = 0;
		let _items: PandaComboBoxItem[] | any[] = [];

		// check if we have items to filter and parse
		if (this.items?.length) {
			// check if user is searching for items
			if (this.searchText) {
				// check if custom filter is provided and it's a function
				if (this.filter && typeof this.filter === "function") {
					_items = this.filter(this.searchText, this.items);
				} else {
					_items = filterItemsWithIncludes(
						this.items,
						this.searchText,
						this.itemLabelPath,
					);
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
					label: _label,
					value: _value,
					active: index === this._selectedItemIndex,
					selected: this.value === _value,
					disabled: item.disabled ?? false,
					data: { ...item },
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
		// console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_selectItemByIndex)", "font-size: 24px; color: pink;", selectedItem?.label, index);

		// update active flag
		this._parsedItems = this._parsedItems.map((item) => {
			return {
				...item,
				active: item.value === selectedItem?.value
			};
		});
		// check if item was selected and update combo-box input field value
		if (selectedItem && !selectedItem?.disabled) {
			this.value = selectedItem?.value;

			this._triggerPostMessageEvent(
				PostMessageType.UPDATE_INPUT,
				selectedItem.label,
			);
			this._updateAfterClose = true;
			// clean up search text
			this.searchText = null;
		}
		// show active element after change
		this._showActiveElement();
	}

	/**
	 * Communicate with combo box component using custom event
	 * @param {PostMessageType} action - type of action for combo box to take as a result of this event
	 * @param {Any} value - value to be selected
	 * @param {String} searchText - search text that user entered
	 */
	private _triggerPostMessageEvent(
		action: PostMessageType,
		value: any = null,
		searchText: string | null = null
	): void {
		// console.log(
		// 	"%c ⚡ [COMBO-BOX-OVERLAY] (_triggerPostMessageEvent) action/value/searchText",
		// 	"font-size: 24px; color: pink;",
		// 	action,
		// 	value,
		// 	searchText,
		// );
		const event: PostMessageEvent = new CustomEvent("post-message", {
			detail: {
				action,
				value,
				searchText,
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

	private _preventMouseEvent(event: MouseEvent) {
		// prevent click event to prevent overlay from closing
		event.stopPropagation();
		event.preventDefault();
	}

	private _onKeyDown(event: KeyboardEvent) {
		// console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onKeyDown) key: ", "font-size: 24px; color: pink;", event.key);
		switch (event.key) {
			case "Enter":
			case "Tab":
				event.stopPropagation();
				// console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onKeyDown) -> value", "font-size: 24px; color: red;", this.value);
				// console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onKeyDown) -> searchText / is null?", "font-size: 24px; color: red;", this.searchText, this.searchText ===  null);
				this._onChange(this.value, this.searchText);
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
				this._updateAfterClose = false;
				this._onClose();
				break;
		}
	}

	private _onOverlayScroll() {
		// console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onOverlayScroll)", "font-size: 24px; color: pink;");
		// update overlay position
		this._showOverlayContent();
	}

	private _onChange(value: any, searchText: string | null = null, disabled: boolean = false): void {
		// console.log("%c ⚡ [COMBO-BOX-OVERLAY] (_onChange) value, searchText", "font-size: 24px; color: pink;", value, searchText);
		if (!disabled) {
			this._triggerPostMessageEvent(
				PostMessageType.CHANGE,
				value,
				searchText,
			);
		}
	}

	private _onOverlayClick(): void {
		// check if user entered some search text
		if (this.searchText !== null) {
			this._updateAfterClose = true;
		}
		this._onClose();
	}

	private _onClose(): void {
		const action: PostMessageType = this._updateAfterClose
			? PostMessageType.CLOSE_AND_UPDATE
			: PostMessageType.CLOSE_AND_CANCEL;

		this._triggerPostMessageEvent(action);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-combo-box-overlay": PandaComboBoxOverlay;
	}
}
