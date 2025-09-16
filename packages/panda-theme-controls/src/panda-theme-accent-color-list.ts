// types
import { PandaThemeAccentColorListChangeEvent } from "..";
import { PandaThemeAccentColor, PandaThemeState } from "@panda-wbc/panda-theme";

// style
import { styles } from "./styles/theme-accent-color-list-styles";

// theme service
import { pandaThemeController, themeWatch } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// components
import "@panda-wbc/panda-icon";
import "./panda-theme-accent-color-item";

@themeWatch()
export class PandaThemeAccentColorList extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// view properties ================================================================================================

	private _accentColorId!: string | null;

	private _accentColorList!: PandaThemeAccentColor[];

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
		this._accentColorId = "";
		this._accentColorList = pandaThemeController.getAvailableAccentColors();

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

	onThemeChange(themeState: PandaThemeState): void {
		const { accentColorId } = themeState;
		this._accentColorId = accentColorId;
		this._accentColorList = pandaThemeController.getAvailableAccentColors();
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _render(): void	{
		if (this.shadowRoot) {
			const listHtml: string[] = [];
			// generate list items
			if (this._accentColorList?.length) {
				this._accentColorList.forEach((item) => {
					listHtml.push(/*html*/`
						<panda-theme-accent-color-item
							data-id="${item.id}"
							${item.primaryTextColor ? `primary-color="${item.primaryColor}"` : ""}
							${item.primaryTextColor ? `primary-text-color="${item.primaryTextColor}"` : ""}
							${item.secondaryColor ? `secondary-color="${item.secondaryColor}"` : ""}
							${this._accentColorId === item.id ? "selected" : ""}
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
		cssStyleSheet.replaceSync(styles);
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
			this._accentColorId = clickedItem.dataset.id || "";
			this._render();

			console.log(
				`%c 🧪 [PANDA ACCENT COLOR LIST] (_onAccentColorSelect)`,
				"font-size: 16px; color: green; background: black;",
				this._accentColorId
			);

			pandaThemeController.setAccentColorId(this._accentColorId);

			const changeEvent: PandaThemeAccentColorListChangeEvent = new CustomEvent("change", {
				detail: {
					accentColorId: this._accentColorId,
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