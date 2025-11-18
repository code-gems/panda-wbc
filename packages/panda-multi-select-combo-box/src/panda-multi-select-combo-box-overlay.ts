// types
import {
	ElementDetails,
	PostMessageEvent,
	PostMessageType,
	SuperItem,
} from "./types";

// styles
import { styles } from "./styles/overlay-styles";

// component
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-text-field";

export class PandaMultiSelectComboBoxOverlay extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// parentDetails =================================================================================================
	private _parentDetails!: ElementDetails;

	get parentDetails(): ElementDetails {
		return this._parentDetails;
	}

	set parentDetails(details: ElementDetails) {
		if (this._parentDetails !== details) {
			this._parentDetails = details;
		}
	}
	
	// items ==========================================================================================================
	private _items!: SuperItem[];

	get items(): SuperItem[] {
		return this._items;
	}

	set items(items: SuperItem[]) {
		if (this._items !== items) {
			this._items = items;
		}
	}

	// multiselect ====================================================================================================
	private _multiselect!: boolean;
	
	get multiselect(): boolean {
		return this._multiselect;
	}

	set multiselect(value: boolean) {
		if (this._multiselect !== value) {
			this._multiselect = value;
		}
	}

	// showFilter ====================================================================================================
	private _showFilter!: boolean;
	
	get showFilter(): boolean {
		return this._showFilter;
	}

	set showFilter(value: boolean) {
		if (this._showFilter !== value) {
			this._showFilter = value;
		}
	}

	// dropdownWidth ==================================================================================================
	private _dropdownWidth!: string;

	get dropdownWidth(): string {
		return this._dropdownWidth;
	}

	set dropdownWidth(value: string) {
		if (this._dropdownWidth !== value) {
			this._dropdownWidth = value;
		}
	}

	// itemRenderer ===================================================================================================

	itemRenderer!: (item: SuperItem) => string;

	// filter =========================================================================================================

	filter!: (item: SuperItem, searchText: string) => boolean;

	// view properties ================================================================================================
	
	private _ready!: boolean;
	private _preventClose!: boolean;

	// elements
	private readonly _overlayEl!: HTMLDivElement;
	private readonly _dropdownEl!: PandaMultiSelectComboBoxOverlay;


	// events
	private readonly _closeEvent = this._onClose.bind(this);
	private readonly _preventMouseEvent = this._onPreventMouseEvent.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// create shadow root
		this.attachShadow({ mode: "open", delegatesFocus: true });

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
					>
						
						<div
							id="buttons"
							class="buttons"
							part="buttons"
						>
							<panda-button
								id="select-all-btn"
								theme="plain size-s"
							>
								Select All
							</panda-button>
							<panda-button
								id="reset-btn"
								theme="plain size-s"
							>
								Reset
							</panda-button>
						</div>
					</div>
					<div
						id="list"
						class="list"
						part="list"
					>
						<div class="list-item">
							<div class="label">Item 1</div>
						</div>
						<div class="list-item">
							<div class="label">Item 2</div>
						</div>
						<div class="list-item selected">
							<div class="label">Item 3 (selected)</div>
						</div>
						<div class="list-item">
							<div class="label">Item 4</div>
						</div>
						<div class="list-item active">
							<div class="label">Item 5 (active)</div>
						</div>
						<div class="list-item">
							<div class="label">Item 6</div>
						</div>
						<div class="list-item">
							<div class="label">Item 7</div>
						</div>
						<div class="list-item">
							<div class="label">Item 8</div>
						</div>
						<div class="list-item">
							<div class="label">
								Item 9 - Lorem ipsum dolor sit amet 
								Lorem ipsum dolor sit amet 
								Lorem ipsum dolor sit amet 
								Lorem ipsum dolor sit amet 
								Lorem ipsum dolor sit amet
							</div>
						</div>
						<div class="list-item">
							<div class="label">Item 10</div>
						</div>
						<div class="list-item">
							<div class="label">Item 11</div>
						</div>
						<div class="list-item">
							<div class="label">Item 12</div>
						</div>
						<div class="list-item">
							<div class="label">Item 13</div>
						</div>
						<div class="list-item">
							<div class="label">Item 14</div>
						</div>
						<div class="list-item">
							<div class="label">Item 15</div>
						</div>
						<div class="list-item">
							<div class="label">Item 16</div>
						</div>
						<div class="list-item">
							<div class="label">Item 17</div>
						</div>
						<div class="list-item">
							<div class="label">Item 18</div>
						</div>
						<div class="list-item">
							<div class="label">Item 19</div>
						</div>
					</div>
					<div class="footer">

					</div>
				</div>
			</div>
		`;
		// create filter template
		const filterTemplate = document.createElement("template");
		filterTemplate.innerHTML = /*html*/`
			<div
				id="filter"
				class="filter"
				part="filter"
			>
				<panda-text-field>
					<div slot="prefix" class="icon">
						<panda-icon icon="search"></panda-icon>
					</div>
				</panda-text-field>
			</div>
		`;

		// create buttons template
		const buttonsTemplate = document.createElement("template");
		buttonsTemplate.innerHTML = /*html*/`
			<div
				id="buttons"
				class="buttons"
				part="buttons"
			>
				<panda-button
					id="select-all-btn"
					theme="plain size-s"
				>
					Select All
				</panda-button>
				<panda-button
					id="reset-btn"
					theme="plain size-s"
				>
					Reset
				</panda-button>
			</div>
		`;

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._items = [];
		this._ready = false;
		this._preventClose = false;
		this._showFilter = false;
		this._multiselect = false;

		// get template element handles
		if (this.shadowRoot) {
			this._overlayEl = this.shadowRoot.getElementById("overlay") as HTMLDivElement;
			this._dropdownEl = this.shadowRoot.getElementById("dropdown") as PandaMultiSelectComboBoxOverlay;

			// add events
			this._overlayEl.addEventListener("click", this._closeEvent);
			this._dropdownEl.addEventListener("click", this._preventMouseEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._updatePosition();
		this._updateComponent();
	}

	disconnectedCallback(): void {

	}

	private _updateComponent() {
		if (this._ready) {
			if (this._showFilter || this._multiselect) {
				// this._dropdownEl.insertBefore(this._headerEl, this._listEl);
			}
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

	private _updatePosition(): void {
		// reset dropdown height
		this._dropdownEl.style.height = "auto";
		// get dropdown size details
		const dropdownRect = this._dropdownEl.getBoundingClientRect();
		let dropdownTop = this._parentDetails.bottom - document.documentElement.scrollTop;
		let dropdownLeft = this._parentDetails.left - document.documentElement.scrollLeft;

		// check if we have enough space at the bottom of the dropdown to display it fully
		let dropdownHight = dropdownRect.height;
		if (dropdownTop - window.scrollY + dropdownRect.height > window.innerHeight) {
			// correct dropdown height if it protrude out the visible space
			const _hightOffset = this.parentDetails.top - dropdownRect.height - document.documentElement.scrollTop;
			dropdownTop = Math.max(_hightOffset, 10);
			if (_hightOffset < 0) {
				dropdownHight = dropdownHight - 10 + _hightOffset;
			}
		}


		// check if dropdown width css variable was set
		const dropdownWidth = this.dropdownWidth ?? `${this.parentDetails.width}px`;
		// set drop down container's width
		this._dropdownEl.style.width = dropdownWidth;
		// set drop down container's height
		this._dropdownEl.style.height = `${dropdownHight}px`;



		this._dropdownEl.style.top = `${dropdownTop}px`;
		this._dropdownEl.style.left = `${dropdownLeft}px`;
	}

	/**
	 * Communicate with combo box component using custom event
	 * @param {PostMessageType} action - type of action for combo box to take as a result of this event
	 * @param {Any} value - value to be selected
	 */
	private _triggerPostMessageEvent(action: PostMessageType, value: any = null): void {
		const event: PostMessageEvent = new CustomEvent("post-message", {
			detail: {
				action,
				value,
			}
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onClose(): void {
		if (this._preventClose) {
			this._preventClose = false;
			return;
		}
		this._triggerPostMessageEvent(PostMessageType.CLOSE);
	}

	private _onPreventMouseEvent(event: MouseEvent): void {
		this._preventClose = true;
	}
}

// Register the custom element
if (!customElements.get("panda-multi-select-combo-box-overlay")) {
	customElements.define("panda-multi-select-combo-box-overlay", PandaMultiSelectComboBoxOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-multi-select-combo-box-overlay": PandaMultiSelectComboBoxOverlay;
	}
}
