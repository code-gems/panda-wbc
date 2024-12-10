// style
import { PandaSelectChangeEvent, PandaSelectItem, PandaSelectRenderer } from "../index";
import { ElementDetails, SuperSelectItem } from "panda-select-types";

// style
import { styles } from "./styles/overlay-styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import {
	getItemLabel,
	getItemValue,
	minValue
} from "./utils/utils";

@customElement("panda-select-overlay")
export class PandaSelectOverlay extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: String })
	value: string | number | null = null;

	@property({ type: Array })
	items: PandaSelectItem[] | null | undefined = [];

	@property({ type: String, attribute: "item-label-path" })
	itemLabelPath: string | null = null;

	@property({ type: String, attribute: "item-value-path" })
	itemValuePath: string | null = null;
		
	@property({ type: String })
	dropdownWidth!: string;

	@property({ type: String })
	dropdownMaxHeight!: string;

	@property({ type: String })
	customStyle!: string;

	renderer!: (params: PandaSelectRenderer) => TemplateResult | string | number;


	parentDetails!: ElementDetails;

	// view props
	private _initialized: boolean = false;

	@property({ type: Array })
	private _parsedItems: SuperSelectItem[] = [];

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
		if (_changedProperties.has("items") && this.items?.length) {
			this._parseItems();
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
					@click="${() => this._onChange(value, disabled)}"
				>
					${contentHtml}
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

	/**
	 * Communicate to parent element that this overlay is getting closed
	 */
	public close() {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
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
			let overlayTop = this.parentDetails.top - document.documentElement.scrollTop;
			let overlayLeft = this.parentDetails.left - document.documentElement.scrollLeft;
			// check if dropdown width css variable was set
			const dropdownWidth = this.dropdownWidth ?? `${this.parentDetails.width}px`;
			let dropdownHight = overlayRect.height;

			// check if we have enough space at the bottom of the combo-box to display dropdown
			if (overlayTop - window.scrollY + overlayRect.height > window.innerHeight) {
				// correct dropdown height if it protrude out the visible space
				const _hightOffset = this.parentDetails.bottom - overlayRect.height - document.documentElement.scrollTop;
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
	private _parseItems(): void {
		this._parsedItems = [];
		let index = 0;

		if (this.items) {
			this.items.forEach((item) => {
				const _value = getItemValue(item, this.itemValuePath);
				const _label = getItemLabel(
					this.items,
					_value,
					this.itemValuePath,
					this.itemLabelPath
				);

				console.log("%c item", "font-size: 24px; color: green;", item);

				this._parsedItems.push({
					index,
					value: _value,
					label: _label,
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
		// update active flag
		this._parsedItems = this._parsedItems.map((item) => {
			return {
				...item,
				active: item.value === selectedItem?.value
			};
		});

		if (selectedItem && !selectedItem.disabled) {
			this.value = selectedItem?.value;
	
			const event: PandaSelectChangeEvent = new CustomEvent("select", {
				detail: {
					value: selectedItem?.value
				}
			});
			this.dispatchEvent(event);
		}
		// show active element after change
		this._showActiveElement();
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

	private _onChange(value: any, disabled: boolean = false): void {
		if (!disabled) {
			const event: PandaSelectChangeEvent = new CustomEvent("change", {
				detail: {
					value
				}
			});
			this.dispatchEvent(event);
		}
	}

	private _onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case "ArrowUp":
				this._selectPreviousItem();
				break;
			case "ArrowDown":
				this._selectNextItem();
				break;
		}
	}

	private _onOverlayScroll() {
		// update overlay position
		this._showOverlayContent();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-select-overlay": PandaSelectOverlay;
	}
}
