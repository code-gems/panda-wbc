// types
import { PandaThemeAccentColor, PandaThemeAccentColorListChangeEvent } from "../index";

// style
import { accentColorListStyles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

export class PandaThemeAccentColorList extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["selected"];

	// selected =======================================================================================================
	private _selected!: string | null;

	get selected(): string | null {
		return this._selected;
	}

	set selected(value: string | null) {
		if (this._selected !== value) {
			this._selected = value;
			// reflect to attribute
			if (this._selected != null) {
				this.setAttribute("selected", this._selected);
			} else {
				this.removeAttribute("selected");
			}
		}
	}

	// list ===========================================================================================================
	private _list!: PandaThemeAccentColor[];

	get list(): PandaThemeAccentColor[] {
		return this._list;
	}

	set list(value: PandaThemeAccentColor[]) {
		this._list = value;
		this._render();
	}

	// view properties ================================================================================================

	// events
	private readonly _selectAccentColorEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// create shadow root
		this.attachShadow({ mode: "open", delegatesFocus: true });
		// apply component styles
		this._applyStyles();
		// initialize class properties
		this._selected = "";
		this._list = [];
		// init events
		this._selectAccentColorEvent = this._onAccentColorSelect.bind(this);
		// render component template
		this._render();
	}

	connectedCallback() {
		if (this.shadowRoot) {
			// add event listeners to component template
			this.shadowRoot.addEventListener("click", this._selectAccentColorEvent);
		}
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "selected") {
			this._selected = _newValue;
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render(): void	{
		if (this.shadowRoot) {
			const listHtml: string[] = [];
			// generate list items
			if (this._list?.length) {
				this._list.forEach((item) => {
					listHtml.push(/*html*/`
						<panda-theme-accent-color-item
							data-id="${item.id}"
							${item.primaryTextColor ? `primary-color="${item.primaryColor}"` : ""}
							${item.primaryTextColor ? `primary-text-color="${item.primaryTextColor}"` : ""}
							${item.secondaryColor ? `secondary-color="${item.secondaryColor}"` : ""}
							${this._selected === item.id ? "selected" : ""}
						></panda-theme-accent-color-item>
					`);
				});
			}
			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<div class="accent-color-list" part="accent-color-list">
					${listHtml.join("\n")}
				</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================
	
	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(accentColorListStyles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	/**
	 * Handle accent color change events.
	 * @param color The new accent color value.
	 */
	private _onAccentColorSelect(event: MouseEvent): void {
		const clickedItem = (event.target as HTMLElement).closest("panda-theme-accent-color-item");
		if (clickedItem != null) {
			this._selected = clickedItem.dataset.id || "";
			this._render();
			const changeEvent: PandaThemeAccentColorListChangeEvent = new CustomEvent("change", {
				detail: {
					selected: this._selected,
				},
				bubbles: true,
				composed: true,
			});
			this.dispatchEvent(changeEvent);
		}
	}
}

// Register the custom element
if (!customElements.get("panda-theme-accent-color-list")) {
	customElements.define("panda-theme-accent-color-list", PandaThemeAccentColorList);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-accent-color-list": PandaThemeAccentColorList;
	}
}