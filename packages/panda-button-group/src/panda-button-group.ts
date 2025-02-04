// types
import { SuperItem } from "panda-button-group-types";
import { PandaButtonGroupItem, PandaButtonGroupChangeEvent } from "../index";
import { PandaButtonGroupItem as PandaButtonGroupItemElement } from "./panda-button-group-item";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";
import "./panda-button-group-item";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { generateUuid } from "@panda-wbc/panda-utils";

@customElement("panda-button-group")
export class PandaButtonGroup extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: String, reflect: true })
	label!: string;

	@property({ type: String, reflect: true })
	theme!: string;

	@property({ type: Array })
	items: PandaButtonGroupItem[] = [];
	
	@property({ type: Array })
	selected!: any[];
	
	@property({ type: Boolean, attribute: "multiselect", reflect: true })
	multiselect!: boolean;

	@property({ type: Boolean, reflect: true })
	disabled!: boolean;

	@property({ type: Boolean, reflect: true })
	working!: boolean;

	@property({ type: String, attribute: "spinner-type", reflect: true })
	spinnerType!: string;

	@property({ type: String })
	customStyle!: string;

	// state props
	@state()
	private _parsedItemList: SuperItem[] = [];
	
	@state()
	private _parsedSlottedItemList: PandaButtonGroupItemElement[] = [];

	// elements
	@query("#items")
	private readonly _slotEl!: HTMLSlotElement;

	// events
	private readonly _selectSlottedItem: (node: any) => any = this._onSelectSlottedItem.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	updated(_changedProps: PropertyValues): void {
		// check if items are provided
		if (_changedProps.has("items") && this.items) {
			this._parsedItems();
		}
		// check if custom style is defined
		if (_changedProps.has("customStyle") && this.customStyle) {
			this._applyCustomStyle();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// check if slotted items are present
		if (this._parsedSlottedItemList.length) {
			// remove events
			for (const item of this._parsedSlottedItemList) {
				item.removeEventListener("click", this._selectSlottedItem);
			}
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		let labelHtml: TemplateResult = html``;
		let spinnerHtml: TemplateResult = html``;

		if (this.label) {
			labelHtml = html`<div class="label" part="label">${this.label}</div>`;
		}

		// check if component is in working state
		if (this.working) {
			const spinnerType = this.spinnerType ?? "dots";
			spinnerHtml = html`
				<div class="spinner-cont" part="spinner-cont">
					<panda-spinner spinner="${spinnerType}"></panda-spinner>
				</div>
			`;
		}

		return html`
			${labelHtml}
			<div class="group ${this.working ? "working" : ""}">
				<slot name="prefix"></slot>
				<slot id="items" @slotchange="${this._parseSlottedItems}"></slot>
				${this._renderItems()}
				<slot name="suffix"></slot>
				${spinnerHtml}
			</div>	
		`;
	}

	private _renderItems(): TemplateResult[] {
		const itemsHtml: TemplateResult[] = [];

		this._parsedItemList.forEach((item, index) => {
			const {
				id,
				label,
				selected,
				disabled,
				working,
				prefixIcon,
				suffixIcon,
				prefixBadge,
				suffixBadge,
			} = item;
			let prefixIconHtml = html``;
			let suffixIconHtml = html``;
			let prefixBadgeHtml = html``;
			let suffixBadgeHtml = html``;
			const modCss: string[] = [];

			if (index === 0) {
				modCss.push("first-item");
			}
			if (index === this._parsedItemList.length - 1) {
				modCss.push("last-item");
			}
			if (selected) {
				modCss.push("selected");
			}
			if (disabled) {
				modCss.push("disabled");
			}
			if (working) {
				modCss.push("working");
			}
			// check for prefix icon
			if (prefixIcon) {
				prefixIconHtml = html`
					<div
						slot="prefix-icon"
						part="prefix-icon ${modCss.join(" ")}"
						class="icon ${modCss.join(" ")}"
					>
						<panda-icon .icon="${prefixIcon}"></panda-icon>
					</div>
				`;
			}
			// check for suffix icon
			if (suffixIcon) {
				suffixIconHtml = html`
					<div
						slot="suffix-icon"
						part="suffix-icon ${modCss.join(" ")}"
						class="icon ${modCss.join(" ")}"
					>
						<panda-icon .icon="${suffixIcon}"></panda-icon>
					</div>
				`;
			}
			// check for prefix badge
			if (prefixBadge) {
				prefixBadgeHtml = html`
					<div
						slot="prefix-badge"
						part="prefix-badge ${modCss.join(" ")}"
						class="badge ${modCss.join(" ")}"
					>
						${prefixBadge}
					</div>
				`;
			}
			// check for suffix badge
			if (suffixBadge) {
				suffixBadgeHtml = html`
					<div
						slot="suffix-badge"
						part="suffix-badge ${modCss.join(" ")}"
						class="badge ${modCss.join(" ")}"
					>
						${suffixBadge}
					</div>
				`;
			}

			itemsHtml.push(html`
				<panda-button-group-item
					theme="${modCss.join(" ")}"
					part="button ${modCss.join(" ")}"
					.id="${id}"
					.label="${label}"
					.selected="${selected}"
					.disabled="${this.disabled || disabled}"
					.working="${this.working || working}"
					@click="${() => this._onSelectItem(item)}"
				>
					${prefixIconHtml}
					${prefixBadgeHtml}
					${suffixBadgeHtml}
					${suffixIconHtml}
				</panda-button-group-item>
			`);
		});

		return itemsHtml;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _parsedItems(): void {
		if (Array.isArray(this.items)) {
			this._parsedItemList = this.items.map((item) => {
				const disabled = this.disabled || item.disabled;
				const selected = this.selected?.includes(item.value) ?? item.selected ?? false;
				return {
					id: generateUuid(),
					label: item.label ?? "",
					value: item.value ?? null,
					disabled: disabled ?? false,
					working: item.working ?? false,
					selected,
					prefixIcon: item.prefixIcon,
					suffixIcon: item.suffixIcon,
					prefixBadge: item.prefixBadge,
					suffixBadge: item.suffixBadge,
				};
			});
		} else {
			console.warn("%c 🔥 (PANDA BUTTON GROUP) Invalid items! Items must be of type array!", "font-size: 16px;");
		}
	}

	private _parseSlottedItems(): void {
		const slottedItems: Node[] = this._slotEl.assignedNodes({ flatten: true });
		// clear the list
		this._parsedSlottedItemList = [];
		
		slottedItems.forEach((node) => {
			// aggregate button group items only
			if (node.nodeName === "PANDA-BUTTON-GROUP-ITEM") {
				// add events
				node.addEventListener("click", () => this._selectSlottedItem(node as PandaButtonGroupItemElement))
				// push node to an array
				this._parsedSlottedItemList.push(node as PandaButtonGroupItemElement);
			}
		});

		if (this._parsedSlottedItemList.length) {
			// clear items in case both are provided
			this._parsedItemList = [];
			// parse items based on provided options + add themes
			this._parsedSlottedItemList.forEach((item, index) => {
				// check if global disabled flag is set
				item.disabled = this.disabled
					? true
					: item.disabled;
				// check for selected values
				if (this.selected?.length) {
					item.selected = this.selected?.includes(item.value);
				}
				// add themes
				const themes = item.theme ?? "";
				const themeList: string[] = themes.split(" ");
				// add first-item theme if not present
				if (
					!themeList.includes("first-item") &&
					index === 0
				) {
					themeList.push("first-item");
					item.theme = themeList.join(" ");
				}
				// add last-item theme if not present
				if (
					!themeList.includes("last-item") &&
					this._parsedSlottedItemList.length - 1 === index
				) {
					themeList.push("last-item");
					item.theme = themeList.join(" ");
				}
			});
		}
	}

	private _triggerChangeEvent(selectedValues: any[]): void {
		const event: PandaButtonGroupChangeEvent = new CustomEvent("change", {
			detail: {
				selectedValues,
			}
		});
		this.dispatchEvent(event);
	}

	/**
	 * Aggregate values from provided selected items.
	 * @param {Array} itemList - item list to look through
	 * @returns {Array} values of selected items
	 */
	private _getSelectedValues(itemList: SuperItem[] | PandaButtonGroupItemElement[]): any[] {
		const values: any[] = [];
		itemList.forEach((item) => {
			if (item.selected) {
				values.push(item.value);
			}
		});
		return values;
	}

	/** Apply user defined custom style to this components shadowRoot */
	private _applyCustomStyle(): void {
		if (this.customStyle && this.shadowRoot) {
			const customStyle = document.createElement("style");
			customStyle.innerHTML = this.customStyle;
			customStyle.setAttribute("scope", "custom-style");
			this.appendChild(customStyle);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSelectItem(item: SuperItem): void {
		if (!item.disabled && !item.working) {
			console.log("%c ⚡ (_onSelectItem)", "font-size: 24px; color: green;", item.id);

			// check if multi-select is enabled
			if (this.multiselect) {
				item.selected = !item.selected;
			} else {
				// check if item is already selected
				if (item.selected) {
					return;
				}
				this._parsedItemList.forEach((item) => {
					item.selected = false;
				});
				item.selected = true;
			}
			// aggregate values from selected items
			const values = this._getSelectedValues(this._parsedItemList);
			// notify about change event
			this._triggerChangeEvent(values);
			this.requestUpdate();
		}
	}

	private _onSelectSlottedItem(itemEl: PandaButtonGroupItemElement): void {
		if (!itemEl.disabled && !itemEl.working) {
			console.log("%c ⚡ (_onSelectSlottedItem)", "font-size: 24px; color: green;", itemEl);

			// check if multi-select is enabled
			if (this.multiselect) {
				itemEl.selected = !itemEl.selected;
			} else {
				// check if item is already selected
				if (itemEl.selected) {
					return;
				}
				this._parsedSlottedItemList.forEach((item) => {
					item.selected = false;
				});
				itemEl.selected = true;
			}

			// aggregate values from selected items
			const values: any[] = [];
			this._parsedSlottedItemList.forEach((item) => {
				if (item.selected) {
					values.push(item.value);
				}
			});
			// notify about change event
			this._triggerChangeEvent(values);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button-group": PandaButtonGroup;
	}
}
