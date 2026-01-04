// types
import { PandaSelectI18nConfig } from "../index";
import {
	ElementDetails,
	PostMessageEvent,
	MessageType,
	SuperItem,
	DropdownPosition,
} from "./types";
import { PandaTextField, PandaTextFieldOnInputEvent } from "@panda-wbc/panda-text-field";
import { PandaButton } from "@panda-wbc/panda-button";

// styles
import { styles } from "./styles/overlay-styles";

// component
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-text-field";

// utils
import {
	getI18nConfig,
	getSelectableItemsCount,
} from "./utils/utils";

export class PandaSelectOverlay extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// parentDetails =================================================================================================
	private _parentDetails!: ElementDetails;

	get parentDetails() {
		return this._parentDetails;
	}

	set parentDetails(details: ElementDetails) {
		if (this._parentDetails !== details) {
			this._parentDetails = details;
		}
	}

	// items ==========================================================================================================
	private _items!: SuperItem[];

	get items() {
		return this._items;
	}

	set items(items: SuperItem[]) {
		if (this._items !== items) {
			// create shallow copy of items array
			this._items = items.map((item) => ({ ...item }));
			this._positionUpdated = false;
			this._updateComponent();
		}
	}

	// max ============================================================================================================
	private _max!: number | null;

	get max() {
		return this._max;
	}

	set max(value: number | null) {
		if (this._max !== value) {
			this._max = value;
			this._updateComponent();
		}
	}

	// multiselect ====================================================================================================
	private _multiselect!: boolean;

	get multiselect() {
		return this._multiselect;
	}

	set multiselect(value: boolean) {
		if (this._multiselect !== value) {
			this._multiselect = value;
		}
	}

	// showFilter ====================================================================================================
	private _showFilter!: boolean;

	get showFilter() {
		return this._showFilter;
	}

	set showFilter(value: boolean) {
		if (this._showFilter !== value) {
			this._showFilter = value;
			this._updateComponent();
		}
	}

	// filterPlaceholder ==============================================================================================
	private _filterPlaceholder!: string | string[];

	get filterPlaceholder() {
		return this._filterPlaceholder;
	}

	set filterPlaceholder(value: string | string[]) {
		if (this._filterPlaceholder !== value) {
			if (Array.isArray(value) && value?.length === 0) {
				this._filterPlaceholder = [];
			} else {
				this._filterPlaceholder = value;
			}
			this._textFieldEl.placeholder = this._filterPlaceholder
				? this._filterPlaceholder
				: this._i18n.filterPlaceholder;
			this._updateComponent();
		}
	}

	// filterPlaceholderInterval ======================================================================================
	private _filterPlaceholderInterval!: number;

	get filterPlaceholderInterval() {
		return this._filterPlaceholderInterval;
	}

	set filterPlaceholderInterval(value: number) {
		if (this._filterPlaceholderInterval !== value) {
			this._filterPlaceholderInterval = value;
			this._textFieldEl.placeholderInterval = value;
		}
	}

	// dropdownWidth ==================================================================================================
	private _dropdownWidth!: string | null;

	get dropdownWidth() {
		return this._dropdownWidth;
	}

	set dropdownWidth(value: string | null) {
		if (this._dropdownWidth !== value) {
			this._dropdownWidth = value;
		}
	}

	// dropdownMaxHeight ==================================================================================================
	private _dropdownMaxHeight!: string | null;

	get dropdownMaxHeight() {
		return this._dropdownMaxHeight;
	}

	set dropdownMaxHeight(value: string | null) {
		if (this._dropdownMaxHeight !== value) {
			this._dropdownMaxHeight = value;
		}
	}

	// i18n ===========================================================================================================
	private _i18n!: PandaSelectI18nConfig;

	get i18n(): PandaSelectI18nConfig {
		return this._i18n;
	}

	set i18n(value: PandaSelectI18nConfig) {
		this._i18n = value;
		// update filter placeholder if not set
		if (this._filterPlaceholder.length === 0) {
			this._textFieldEl.placeholder = this._i18n.filterPlaceholder;
		}
		this._updateComponent();
	}

	// customStyle ====================================================================================================
	private _customStyle!: string;

	get customStyle() {
		return this._customStyle;
	}

	set customStyle(value: string) {
		if (this._customStyle !== value) {
			this._customStyle = value;
			this._applyCustomStyle();
		}
	}

	// groupRenderer ==================================================================================================

	groupRenderer!: (groupName: string, items: SuperItem[]) => string;

	// itemRenderer ===================================================================================================

	/** Custom item template render function. */
	itemRenderer!: (item: SuperItem) => string;

	// footerRenderer ===================================================================================================

	/** Footer template render function. */
	footerRenderer!: (items: SuperItem[]) => string;

	// filter =========================================================================================================

	/** Custom filter function. */
	filter!: (item: SuperItem, searchText: string) => boolean;

	// view properties ================================================================================================

	/** Flag to indicate if the component is ready. */
	private _ready!: boolean;

	/** Flag to indicate if the close action should be prevented. */
	private _preventClose!: boolean;

	/** Filter text entered by the user. */
	private _filterText!: string;

	/** Index of the currently active item in the list. */
	private _activeItemIndex!: number | null;
	/** Total number of items in the list (filtered). */
	private _itemCount!: number | null;

	/** Flag to indicate if the maximum selection limit has been reached. */
	private _maxLimitReached!: boolean;

	/**
	 * Flag to indicate if the dropdown position has been updated.
	 * It is used to control when dropdown should get its position recomputed.
	 * It is to enhance performance by preventing unnecessary position computations.
	 */
	private _positionUpdated!: boolean;

	/**
	 * Initial position of the dropdown at the time of first computation.
	 * It is used to retain the position when the dropdown is recomputed.
	 * This is to prevent dropdown from jumping up and down when user types in filter box.
	 */
	private _initialPosition!: DropdownPosition | null;

	// elements =======================================================================================================
	private readonly _overlayEl!: HTMLDivElement;
	private readonly _dropdownEl!: PandaSelectOverlay;
	private readonly _headerEl!: HTMLDivElement;
	private readonly _buttonsEl!: HTMLDivElement;
	private readonly _selectAllBtnEl!: PandaButton;
	private readonly _resetBtnEl!: PandaButton;
	private readonly _listEl!: HTMLDivElement;
	private readonly _filterEl!: HTMLDivElement;
	private readonly _textFieldEl!: PandaTextField;
	private readonly _filterTabKeyEvent!: any;
	private readonly _calloutEl!: HTMLDivElement;
	private readonly _calloutMessageEl!: HTMLDivElement;
	private readonly _footerEl!: HTMLDivElement;

	// events =========================================================================================================
	private readonly _documentKeyDownEvent: any;
	private readonly _closeEvent: any;
	private readonly _preventMouseEvent: any;
	private readonly _selectAllEvent: any;
	private readonly _selectAllTabKeyEvent: any;
	private readonly _resetEvent: any;
	private readonly _resetTabKeyEvent: any;
	private readonly _filterChangeEvent: any;
	private readonly _overlayTabKeyEvent: any;
	private readonly _selectEvent: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// create shadow root
		this.attachShadow({ mode: "open" });

		// apply component styles
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div
				id="overlay"
				class="overlay"
				part="overlay"
			>
				<div
					id="dropdown"
					class="dropdown"
					part="dropdown"
				>
					<div
						id="header"
						class="header"
						part="header"
					></div>
					<div
						id="list"
						class="list"
						part="list"
						tabindex="0"
					></div>
				</div>
			</div>
		`;
		// create filter template
		this._filterEl = document.createElement("div");
		this._filterEl.className = "filter";
		this._filterEl.part = "filter";
		this._filterEl.innerHTML = /*html*/`
			<panda-text-field show-clear-button>
				<div slot="prefix" class="icon">
					<panda-icon icon="search"></panda-icon>
				</div>
			</panda-text-field>
		`;

		// create buttons template
		this._buttonsEl = document.createElement("div");
		this._buttonsEl.className = "buttons";
		this._buttonsEl.part = "buttons";
		this._buttonsEl.innerHTML = /*html*/`
			<panda-button
				id="select-all-btn"
				part="select-all-btn"
				theme="plain size-s"
			></panda-button>
			<panda-button
				id="reset-btn"
				part="reset-btn"
				theme="plain size-s"
			></panda-button>
		`;

		// create footer template
		this._footerEl = document.createElement("div");
		this._footerEl.className = "footer";
		this._footerEl.part = "footer";
		this._footerEl.innerHTML = ``;

		// create callout template
		this._calloutEl = document.createElement("div");
		this._calloutEl.className = "callout";
		this._calloutEl.part = "callout";
		this._calloutEl.innerHTML = /*html*/`
			<div class="icon" part="icon">
				<panda-icon icon="info"></panda-icon>
			</div>
			<div class="text" part="text"></div>
		`;
		this._calloutMessageEl = this._calloutEl.querySelector(".text") as HTMLDivElement;

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._items = [];
		this._preventClose = false;
		this._showFilter = false;
		this._multiselect = false;
		this._i18n = getI18nConfig();
		this._filterText = "";
		this._filterPlaceholder = "";
		this._positionUpdated = false;
		this._initialPosition = null;
		this._activeItemIndex = null;
		this._itemCount = null;
		this._ready = false;

		// get template element handles
		if (this.shadowRoot) {
			this._overlayEl = this.shadowRoot.getElementById("overlay") as HTMLDivElement;
			this._dropdownEl = this.shadowRoot.getElementById("dropdown") as PandaSelectOverlay;
			this._headerEl = this.shadowRoot.getElementById("header") as HTMLDivElement;
			this._listEl = this.shadowRoot.getElementById("list") as HTMLDivElement;
			// get filter text field element
			this._textFieldEl = this._filterEl.querySelector("panda-text-field")!;
			// get buttons elements
			this._selectAllBtnEl = this._buttonsEl.querySelector("#select-all-btn")!;
			this._resetBtnEl = this._buttonsEl.querySelector("#reset-btn")!;

			// init event handlers
			this._documentKeyDownEvent = this._onDocumentKeyDown.bind(this);
			this._overlayTabKeyEvent = this._onOverlayTabKey.bind(this);
			this._preventMouseEvent = this._onPreventMouseEvent.bind(this);
			this._closeEvent = this._onClose.bind(this);
			this._filterChangeEvent = this._onFilterChange.bind(this);
			this._filterTabKeyEvent = this._onFilterTabKey.bind(this);
			this._selectAllEvent = this._onSelectAll.bind(this);
			this._selectAllTabKeyEvent = this._onSelectAllTabKey.bind(this);
			this._resetEvent = this._onReset.bind(this);
			this._resetTabKeyEvent = this._onResetTabKey.bind(this);
			this._selectEvent = this._onSelect.bind(this);

			// add event listeners
			window.addEventListener("resize", this._closeEvent);
			document.addEventListener("keydown", this._documentKeyDownEvent);
			this._overlayEl.addEventListener("click", this._closeEvent);
			this._overlayEl.addEventListener("keydown", this._overlayTabKeyEvent);
			this._dropdownEl.addEventListener("click", this._preventMouseEvent);
			this._textFieldEl.addEventListener("on-input", this._filterChangeEvent);
			this._textFieldEl.addEventListener("keydown", this._filterTabKeyEvent);
			this._selectAllBtnEl.addEventListener("click", this._selectAllEvent);
			this._selectAllBtnEl.addEventListener("keydown", this._selectAllTabKeyEvent);
			this._resetBtnEl.addEventListener("click", this._resetEvent);
			this._resetBtnEl.addEventListener("keydown", this._resetTabKeyEvent);
			this._listEl.addEventListener("click", this._selectEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._updateComponent();

		// show selected element if not multiselect
		if (!this._multiselect) {
			this._showSelectedElement();
		}
	}

	disconnectedCallback(): void {
		// remove events
		window.removeEventListener("resize", this._closeEvent);
		document.removeEventListener("keydown", this._documentKeyDownEvent);
		this._overlayEl.removeEventListener("click", this._closeEvent);
		this._overlayEl.removeEventListener("keydown", this._overlayTabKeyEvent);
		this._dropdownEl.removeEventListener("click", this._preventMouseEvent);
		this._textFieldEl.removeEventListener("on-input", this._filterChangeEvent);
		this._textFieldEl.removeEventListener("keydown", this._filterTabKeyEvent);
		this._selectAllBtnEl.removeEventListener("click", this._selectAllEvent);
		this._selectAllBtnEl.removeEventListener("keydown", this._selectAllTabKeyEvent);
		this._resetBtnEl.removeEventListener("click", this._resetEvent);
		this._resetBtnEl.removeEventListener("keydown", this._resetTabKeyEvent);
		this._listEl.removeEventListener("click", this._selectEvent);
	}

	private _updateComponent() {
		if (this._ready) {
			// show/hide header container
			if (this._showFilter || this._multiselect) {
				this._headerEl.style.display = "flex";
			} else {
				this._headerEl.style.display = "none";
			}

			// add/remove filter element
			if (this._showFilter) {
				this._headerEl.appendChild(this._filterEl);
			} else {
				this._filterEl.remove();
			}

			// add/remove buttons element
			if (this._multiselect) {
				const selectAllLabel = this._i18n.selectAll ?? "Select All";

				if (this._max == null) {
					const counter = getSelectableItemsCount(this._items);
					// update buttons text
					this._selectAllBtnEl.textContent = `${selectAllLabel} (${counter})`;
				} else {
					this._selectAllBtnEl.disabled = true;
					this._selectAllBtnEl.textContent = selectAllLabel;
				}

				this._resetBtnEl.textContent = this._i18n.reset ?? "Reset";
				// append buttons
				this._headerEl.appendChild(this._buttonsEl);
			} else {
				this._buttonsEl.remove();
			}

			// render footer if footerRenderer is defined
			this._renderFooter();

			// generate list items
			this._renderListItems();

			// update position
			if (!this._positionUpdated) {
				this._updatePosition();
			}
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _renderListItems(): void {
		const groupsHtml: string[] = [];
		const itemMap = new Map<string, SuperItem[]>();
		let hasGroups = false;
		let selectedItems = 0;

		for (const item of this._items) {
			const { group, label, selected } = item;
			let match = true;

			// count selected items
			if (selected) {
				selectedItems++;
			}

			// apply filter
			if (this._filterText != "") {
				if (this.filter && typeof this.filter === "function") {
					// use custom filter function
					match = this.filter(item, this._filterText);
				} else {
					// default filter function
					match = label.toLocaleLowerCase().includes(this._filterText.toLocaleLowerCase());
				}
			}

			// check if item group matches the filter
			if (match) {
				// check if group exists
				if (itemMap.has(group)) {
					// add item to existing group
					const groupItems = itemMap.get(group)!;
					groupItems.push(item);
				} else {
					// create new group
					itemMap.set(group, [item]);
				}
			}
		}
		// update hasGroups flag
		hasGroups = itemMap.size > 1 || (itemMap.size === 1 && Array.from(itemMap.keys())[0] !== "");

		let itemOrder = 0;
		for (const [group, items] of itemMap) {
			const itemsHtml: string[] = [];

			for (const item of items) {
				const { index, label, value, selected, disabled } = item;
				const cssClasses: string[] = ["item"];
				// check if selection limit is reached
				this._maxLimitReached = this._max !== null && selectedItems >= this._max;
				let checkboxHtml = "";
				let labelHtml = "";

				// check if item is selected
				// add selected class only in single select mode
				if (selected && !this._multiselect) {
					cssClasses.push("selected");
				}
				// check if item is disabled
				if (disabled) {
					cssClasses.push("disabled");
				}
				// check if item is active
				if (this._activeItemIndex === itemOrder) {
					cssClasses.push("active");
				}

				// generate checkbox for multiselect mode
				if (this._multiselect) {
					checkboxHtml = /*html*/`
						<div class="checkbox">
							<panda-checkbox
								${selected ? "checked" : ""}
								${disabled || (this._maxLimitReached && !selected) ? "disabled" : ""}
								tabindex="-1"
							></panda-checkbox>
						</div>
					`;
				}

				// check if item renderer is defined
				if (this.itemRenderer != null && typeof this.itemRenderer === "function") {
					labelHtml = this.itemRenderer(item);
				} else {
					labelHtml = /*html*/`
						<div class="label">
							${label ?? String(value)}
						</div>
					`;
				}

				itemsHtml.push(/*html*/`
					<div
						class="${cssClasses.join(" ")}"
						part="${cssClasses.join(" ")}"
						tabindex="${disabled ? -1 : 0}"
						data-index="${index}"
						data-order="${disabled ? -1 : itemOrder}"
						data-disabled="${this._maxLimitReached && !selected ? "true" : "false"}"
					>
						${checkboxHtml}
						${labelHtml}
					</div>
				`);
				// increment item order only for enabled items
				if (!disabled) {
					itemOrder++;
				}
			} // next item

			// add group if items are present
			if (itemsHtml.length) {
				let groupHeaderHtml = "";
				if (hasGroups && group !== "") {
					// check if group renderer is defined
					if (this.groupRenderer != null && typeof this.groupRenderer === "function") {
						const content = this.groupRenderer(group, items);
						groupHeaderHtml = /*html*/`
							<div class="group-header" part="group-header">
								${content}
							</div>
						`;
					} else {
						groupHeaderHtml = /*html*/`
							<div class="group-header" part="group-header">
								${group}
							</div>
						`;
					}
				}
				// add group header
				groupsHtml.push(/*html*/`
					<div class="list-group" part="list-group">
						${groupHeaderHtml}
						${itemsHtml.join("\n")}
					</div>
				`);
			}
		} // next group

		// store rendered item count
		this._itemCount = itemOrder - 1;

		// show/hide callout message
		if (groupsHtml.length) {
			this._calloutEl.remove();
			this._listEl.innerHTML = groupsHtml.join("\n");
		} else {
			this._listEl.innerHTML = "";
			// show no data callout message
			const noDataMessage = this._i18n.noDataFound ?? "No data found";
			this._calloutMessageEl.textContent = noDataMessage;
			this._listEl.appendChild(this._calloutEl);
		}
	}

	private _renderFooter(): void {
		// render footer if footerRenderer is defined
		if (this.footerRenderer != null && typeof this.footerRenderer === "function") {
			this._dropdownEl.appendChild(this._footerEl);
			this._footerEl.innerHTML = this.footerRenderer(this._items);
		} else {
			this._footerEl.innerHTML = "";
			this._footerEl.remove();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	private _applyCustomStyle(): void {
		if (this.shadowRoot && this._customStyle) {
			const customStyleSheet = new CSSStyleSheet();
			customStyleSheet.replaceSync(this._customStyle);
			this.shadowRoot.adoptedStyleSheets.push(customStyleSheet);
		}
	}

	/** Update the position of the dropdown overlay based on the parent element's position and available viewport space. */
	private _updatePosition(): void {
		// reset dropdown height
		this._dropdownEl.style.height = "auto";
		// get dropdown size details
		const dropdownRect = this._dropdownEl.getBoundingClientRect();

		let dropdownTop = this._parentDetails.bottom - document.documentElement.scrollTop;
		let dropdownLeft = this._parentDetails.left - document.documentElement.scrollLeft;
		let dropdownHight = dropdownRect.height;

		// check if dropdown max height was set		
		if (this._dropdownMaxHeight != null && this._dropdownMaxHeight !== "") {
			dropdownHight = parseInt(this._dropdownMaxHeight);
		}
		
		// check if we have enough space at the bottom of the dropdown to display it fully
		if (dropdownTop - window.scrollY + dropdownHight > window.innerHeight) {
			// correct dropdown height if it protrude out the visible space
			const _hightOffset = this._parentDetails.top - dropdownHight - document.documentElement.scrollTop;
			dropdownTop = Math.max(_hightOffset, 10);
			if (_hightOffset < 0) {
				dropdownHight = dropdownHight - 10 + _hightOffset;
			}
			// set initial position if not already set
			this._initialPosition = this._initialPosition
				? this._initialPosition
				: DropdownPosition.TOP;
		} else {
			// set initial position if not already set
			this._initialPosition = this._initialPosition
				? this._initialPosition
				: DropdownPosition.BOTTOM;
		}

		// check if dropdown width css variable was set
		const dropdownWidth = this.dropdownWidth ?? `${this._parentDetails.width}px`;
		// set drop down container's width
		this._dropdownEl.style.width = dropdownWidth;
		// set drop down container's height
		this._dropdownEl.style.height = `${dropdownHight}px`;

		// set dropdown position based on initial position
		if (this._initialPosition === DropdownPosition.TOP) {
			dropdownTop = this._parentDetails.top - dropdownHight - document.documentElement.scrollTop;
		}
		this._dropdownEl.style.top = `${dropdownTop}px`;
		this._dropdownEl.style.left = `${dropdownLeft}px`;
		this._positionUpdated = true;
	}

	/**
	 * Communicate with component using custom event
	 * @param {MessageType} messageType - type of message to be sent
	 * @param {Array<SuperItem>} items - items data to be sent
	 */
	private _triggerPostMessageEvent(messageType: MessageType, items: SuperItem[] = []): void {
		const event: PostMessageEvent = new CustomEvent("post-message", {
			detail: {
				messageType,
				items,
			}
		});
		this.dispatchEvent(event);
	}

	/**
	 * Toggle list item selection state without re-rendering the entire list
	 * @param {Number} index index of the item to be toggled
	 * @param {Boolean} selected selection state to be set
	 */
	private _updateSingleItem(index: number, selected: boolean): void {
		const itemEl: HTMLDivElement | null = this._listEl.querySelector(`.item[data-index="${index}"]`);

		if (itemEl && this._multiselect) {
			// find item and checkbox element in the list
			const checkboxEl = itemEl.querySelector("panda-checkbox") as any;
			// update item selected state
			if (checkboxEl) {
				checkboxEl.checked = selected;
			}
		}

		if (itemEl && !this._multiselect) {
			// update item selected state
			if (selected) {
				itemEl.classList.add("selected");
			} else {
				itemEl.classList.remove("selected");
			}
		}
	}

	private _moveToNextItem(): void {
		// focus the list element to enable keyboard navigation
		this._listEl.focus();

		if (this._activeItemIndex === null) {
			this._activeItemIndex = 0;
		} else {
			this._activeItemIndex++;
		}

		// validate active item index and wrap around
		if (this._activeItemIndex > this._itemCount!) {
			this._activeItemIndex = 0;
		}

		// re-render list items
		this._renderListItems();
		// ensure active element is visible
		this._showActiveElement();
	}

	private _moveToPreviousItem(): void {
		// focus the list element to enable keyboard navigation
		this._listEl.focus();

		if (this._activeItemIndex === null) {
			this._activeItemIndex = 0;
		} else {
			this._activeItemIndex--;
		}
		// validate active item index and wrap around
		if (this._activeItemIndex < 0) {
			this._activeItemIndex = this._itemCount;
		}

		// re-render list items
		this._renderListItems();
		// ensure active element is visible
		this._showActiveElement();
	}

	private _showActiveElement(): void {
		const activeEl: HTMLDivElement | null = this._listEl.querySelector(".active");
		if (activeEl) {
			activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
		}
	}

	private _showSelectedElement(): void {
		setTimeout(() => {
			const selectedEl: HTMLDivElement | null = this._listEl.querySelector("[selected]");
			// scroll to selected element
			if (selectedEl) {
				selectedEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
				selectedEl.classList.add("active");
				this._activeItemIndex = Number.parseInt(selectedEl.dataset["order"] || "0", 10);
			}
		}, 0);
	}

	/** 
	 * Get the currently active item element in the list.
	 * @returns {HTMLDivElement|Null} The active item element or null if no active item.
	 */
	private _getActiveItemElement(): HTMLDivElement | null {
		if (this._activeItemIndex == null) {
			return null;
		} else {
			// find the item corresponding to the active index
			const activeItemEl: HTMLDivElement | null = this._listEl.querySelector(`.item[data-order="${this._activeItemIndex}"]`);
			return activeItemEl ?? null;
		}
	}

	/**
	 * Select the given item element in the list.
	 * @param {HTMLDivElement} itemEl The item element to be selected.
	 */
	private _selectItem(itemEl: HTMLDivElement): void {
		if (!itemEl) {
			return;
		}
		// get index of item from data attribute
		const index = Number.parseInt(itemEl.dataset["index"] || "-1", 10);
		const selectedItem = this._items[index];

		// check if item is soft disabled due to max selection limit
		const softDisable = itemEl.dataset.disabled === "true";
		if (softDisable) {
			return;
		}

		// ignore disabled items
		if (selectedItem.disabled) {
			this._activeItemIndex = null;
			this._renderListItems();
			return;
		}

		// toggle selected flag
		if (this._multiselect) {
			selectedItem.selected = !selectedItem.selected;
			// check if max selection limit is set
			if (this._max == null) {
				// update single list item element
				this._updateSingleItem(index, selectedItem.selected);
			} else {
				// re-render entire list to enforce max selection limit
				this._renderListItems();
			}
		} else {
			// get currently selected item
			const currentlySelectedItem = this._items.find((item) => item.selected);
			// if clicked item is already selected, do nothing
			if (currentlySelectedItem && currentlySelectedItem.index === selectedItem.index) {
				this._triggerPostMessageEvent(MessageType.CLOSE, []);
				return;
			}
			// deselect all other items
			this._items = this._items.map((item) => {
				item.selected = false;
				return item;
			});
			// select the clicked item
			selectedItem.selected = true;
			// set active item index
			this._activeItemIndex = Number.parseInt(itemEl.dataset["order"] || "0", 10);
			// update all list item elements
			this._renderListItems();
		}

		// re-render footer
		this._renderFooter();

		// trigger select event
		const messageType = this._multiselect
			? MessageType.UPDATE
			: MessageType.UPDATE_AND_CLOSE;
		this._triggerPostMessageEvent(messageType, this._items);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClose(): void {
		if (this._preventClose) {
			this._preventClose = false;
			return;
		}
		this._triggerPostMessageEvent(MessageType.CLOSE);
	}

	private _onPreventMouseEvent(): void {
		this._preventClose = true;
	}

	/* Handle click events on list items */
	private _onSelect(event: MouseEvent): void {
		const listItem = (event.target as HTMLElement).closest(".item") as HTMLDivElement;
		this._selectItem(listItem);
	}

	private _onSelectAll(): void {
		// update select flag on all items
		this._items = this._items.map((item) => {
			// only select item if not disabled
			item.selected = item.disabled
				? item.selected
				: true;
			return item;
		});
		// update the list item elements
		this._renderListItems();
		// re-render footer
		this._renderFooter();
		// trigger select all event
		this._triggerPostMessageEvent(MessageType.UPDATE, this._items);
	}

	private _onSelectAllTabKey(event: KeyboardEvent): void {
		// only handle tab key when focus is on the overlay
		if (document.activeElement === this && event.code === "Tab") {
			// prevent tab key to trap focus inside the overlay
			event.preventDefault();
			event.stopImmediatePropagation();

			if (event.shiftKey) {
				this._textFieldEl.focus();
			} else {
				this._resetBtnEl.focus();
			}
		}
	}

	private _onReset(): void {
		// update select flag on all items
		this._items = this._items.map((item) => {
			// only deselect item if not disabled
			item.selected = item.disabled
				? item.selected
				: false;
			return item;
		});
		// update the list item elements
		this._renderListItems();
		// re-render footer
		this._renderFooter();
		// trigger select all event
		this._triggerPostMessageEvent(MessageType.UPDATE, this._items);
	}

	private _onResetTabKey(event: KeyboardEvent): void {
		// only handle tab key when focus is on the overlay
		if (document.activeElement === this && event.code === "Tab") {
			// prevent tab key to trap focus inside the overlay
			event.preventDefault();
			event.stopImmediatePropagation();

			if (event.shiftKey) {
				this._selectAllBtnEl.focus();
			} else {
				this._textFieldEl.focus();
			}
		}
	}

	private _onFilterChange(event: PandaTextFieldOnInputEvent): void {
		this._filterText = event.detail.value;
		// reset active item index when filter changes
		this._activeItemIndex = null;
		// update the list item elements
		this._renderListItems();
		// reset position
		this._positionUpdated = false;
		this._updatePosition();
	}

	private _onFilterTabKey(event: KeyboardEvent): void {
		// prevent space key cancellation and stop it from propagation
		if (document.activeElement === this && event.code === "Space") {
			event.stopImmediatePropagation();
		}

		if (document.activeElement === this && event.code === "Tab") {
			// prevent tab key to trap focus inside the overlay
			event.preventDefault();
			event.stopImmediatePropagation();
			if (this._multiselect) {
				if (event.shiftKey) {
					// move focus back to text field
					this._resetBtnEl.focus();
				} else {
					// move focus to select all button
					this._selectAllBtnEl.focus();
				}
			} else {
				// set active item to first item
				this._moveToNextItem();
			}
		}
	}

	private _onOverlayTabKey(event: KeyboardEvent): void {
		if (document.activeElement === this && event.code === "Tab") {
			// prevent tab key to trap focus inside the overlay
			event.preventDefault();
		}
	}

	private _onDocumentKeyDown(event: KeyboardEvent): void {
		const activeItemEl = this._getActiveItemElement();

		switch (event.code) {
			case "ArrowDown":
				event.preventDefault();
				this._moveToNextItem();
				break;

			case "ArrowUp":
				event.preventDefault();
				this._moveToPreviousItem();
				break;

			case "Tab":
				// move focus back to filter text field
				this._textFieldEl.focus();
				// remove active status from items
				this._activeItemIndex = null;
				// re-render list items
				this._renderListItems();
				break;

			case "Enter":
				this._selectItem(activeItemEl!);
				break;

			case "Space":
				// prevent space key event from scrolling the page
				event.preventDefault();
				this._selectItem(activeItemEl!);
				break;

			case "Escape":
				this._triggerPostMessageEvent(MessageType.CLOSE);
				break;
		}
	}
}

// Register the custom element
if (!customElements.get("panda-select-overlay")) {
	customElements.define("panda-select-overlay", PandaSelectOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-select-overlay": PandaSelectOverlay;
	}
}
