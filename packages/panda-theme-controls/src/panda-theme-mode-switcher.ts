// types
import { PandaThemeMode, PandaThemeState } from "@panda-wbc/panda-theme";
import { PandaThemeModeChangeEventDetails } from "../index";

// style
import { styles } from "./styles/theme-mode-switcher-styles";

// theme service
import { pandaThemeController, themeWatch } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// components
import "@panda-wbc/panda-icon";

@themeWatch()
export class PandaThemeModeSwitcher extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["light-icon", "dark-icon", "disabled"];

	// light icon =====================================================================================================
	private _lightIcon!: string;
	
	get lightIcon(): string {
		return this._lightIcon;
	}

	set lightIcon(value: string) {
		if (this._lightIcon !== value) {
			this._lightIcon = value;
			// reflect to attribute
			this.setAttribute("light-icon", this._lightIcon);
		}
	}

	// dark icon ======================================================================================================
	private _darkIcon!: string;
	
	get darkIcon(): string {
		return this._darkIcon;
	}

	set darkIcon(value: string) {
		if (this._darkIcon !== value) {
			this._darkIcon = value;
			// reflect to attribute
			this.setAttribute("dark-icon", this._darkIcon);
		}
	}

	// disabled =======================================================================================================
	private _disabled!: boolean;
	
	get disabled(): boolean {
		return this._disabled;
	}

	set disabled(value: boolean) {
		if (this._disabled !== value) {
			this._disabled = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("disabled", "");
			} else {
				this.removeAttribute("disabled");
			}
		}
	}

	// view properties ================================================================================================

	private _themeMode!: PandaThemeMode;

	// template elements
	private readonly _switcherContEl!: HTMLDivElement;
	private readonly _switcherEl!: HTMLDivElement;

	// events
	private readonly _themeModeChangeEvent!: any;

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
			<div class="switcher-cont" part="switcher-cont">
				<div class="switcher" part="switcher">
					<div
						data-mode="light"
						class="btn"
						part="btn-light"
					>
						<panda-icon icon="sun" part="light-icon"></panda-icon>
					</div>
					<div
						data-mode="dark"
						class="btn"
						part="btn-dark"
					>
						<panda-icon icon="moon" part="dark-icon"></panda-icon>
					</div>
				</div>
			</div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._lightIcon = "sun";
		this._darkIcon = "moon";
		this._themeMode = pandaThemeController.getThemeMode();

		// init events
		this._themeModeChangeEvent = this._onThemeModeChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			this._switcherContEl = this.shadowRoot.querySelector(".switcher-cont") as HTMLDivElement;
			this._switcherEl = this.shadowRoot.querySelector(".switcher") as HTMLDivElement;
		}
	}

	connectedCallback() {
		// add event listeners to component template
		this._switcherEl.addEventListener("click", this._themeModeChangeEvent);
	}

	disconnectedCallback() {
		// remove event listeners
		this._switcherEl.removeEventListener("click", this._themeModeChangeEvent);
	}

	onThemeChange(themeState: PandaThemeState): void {
		const { finalThemeMode } = themeState;
		this._themeMode = finalThemeMode;
		this._updateState();
	}

	/**
	 * Handle attribute changes.
	 * @param _name The name of the attribute that changed.
	 * @param _oldValue The old value of the attribute.
	 * @param _newValue The new value of the attribute.
	 */
	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		switch (_name) {
			case "light-icon":
				this._lightIcon = _newValue;
				break;
			case "dark-icon":
				this._darkIcon = _newValue;
				break;
			case "disabled":
				this._disabled = this._parseBooleanAttribute(_newValue);
				break;
		}
		this._updateState();
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

	/**
	 * Parses an attribute value to boolean.
	 * @param value value to parse
	 * @description Parses a value to boolean. If the value is "true" or true, it returns true, otherwise false.
	 * @returns {Boolean}
	 */
	private _parseBooleanAttribute(value: unknown): boolean {
		return value === "true" || value === true || value === "";
	}

	/** Update the component state based on the current value. */
	private _updateState(): void {
		if (this._themeMode === PandaThemeMode.LIGHT) {
			this._switcherContEl.classList.add("flip");
		} else {
			this._switcherContEl.classList.remove("flip");
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	/**
	 * Handle theme change events.
	 * @param themeMode The new theme mode value.
	 */
	private _onThemeModeChange(event: MouseEvent): void {
		const clickedItem = (event.target as HTMLDivElement).closest(".btn") as HTMLDivElement;
		if (clickedItem != null) {
			this._themeMode = clickedItem.dataset.mode as PandaThemeMode;
			console.log(`%c ⚡ (_onThemeModeChange) ${this._themeMode}`, "font-size: 24px; color: crimson; background: black;");

			pandaThemeController.setThemeMode(this._themeMode);
			this._updateState();
			this.dispatchEvent(new CustomEvent<PandaThemeModeChangeEventDetails>("change", {
				detail: {
					themeMode: this._themeMode
				}
			}));
		}
	}
}

// Register the custom element
if (!customElements.get("panda-theme-mode-switcher")) {
	customElements.define("panda-theme-mode-switcher", PandaThemeModeSwitcher);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-mode-switcher": PandaThemeModeSwitcher;
	}
}