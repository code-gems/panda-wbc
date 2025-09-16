// types
import { PandaThemeMode } from "@panda-wbc/panda-theme";
import { PandaThemeModeChangeEventDetails } from "..";

// style
import { styles } from "./styles/theme-mode-switcher-styles";

// theme service
import { pandaThemeController } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// components
import "@panda-wbc/panda-icon";

export class PandaThemeModeSwitcher extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["light-icon", "dark-icon"];

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
			<div class="theme-switcher" part="theme-switcher">
				<div class="switcher-cont" part="switcher-cont">
					<div class="switcher" part="switcher">
						<div class="btn" part="btn-light">
							<panda-icon icon="sun" part="light-icon"></panda-icon>
						</div>
						<div class="btn" part="btn-dark">
							<panda-icon icon="moon" part="dark-icon"></panda-icon>
						</div>
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
			this._switcherEl = this.shadowRoot.querySelector(".switcher") as HTMLDivElement;
		}
	}

	connectedCallback() {
		// add event listeners to component template
		this._switcherEl.addEventListener("click", () => this._themeModeChangeEvent("system"));
	}

	disconnectedCallback() {
		// remove event listeners
		this._switcherEl.removeEventListener("click", this._themeModeChangeEvent);
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
				this._updateState();
				break;
			case "dark-icon":
				this._darkIcon = _newValue;
				this._updateState();
				break;
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

	/** Update the component state based on the current value. */
	private _updateState(): void {

	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	/**
	 * Handle theme change events.
	 * @param themeMode The new theme mode value.
	 */
	private _onThemeModeChange(themeMode: PandaThemeMode): void {
		this._themeMode = themeMode;
		pandaThemeController.setThemeMode(themeMode);
		this._updateState();
		this.dispatchEvent(new CustomEvent<PandaThemeModeChangeEventDetails>("change", {
			detail: {
				themeMode: this._themeMode
			}
		}));
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