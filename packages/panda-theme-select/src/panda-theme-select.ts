// types
import { PandaThemeSelectChangeEventDetails, PandaThemeSelectI18nConfig } from "../index";
import { PandaThemePreview } from "./panda-theme-preview";

// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "./panda-theme-preview";

export class PandaThemeSelect extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = ["value"];

	// value ==========================================================================================================
	private _value!: string;
	
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		if (this._value !== value) {
			this._value = value;
			// reflect to attribute
			this.setAttribute("value", this._value);
		}
	}

	// i18n ===========================================================================================================
	private _i18n!: PandaThemeSelectI18nConfig;

	get i18n(): PandaThemeSelectI18nConfig {
		return this._i18n;
	}

	set i18n(value: PandaThemeSelectI18nConfig) {
		this._i18n = {
			...this._getDefaultI18nConfig(),
			...value,
		};
		this._updateThemeLabel();
	}

	// view properties ================================================================================================

	// template elements
	private readonly _themePreviewSystemEl!: PandaThemePreview;
	private readonly _themePreviewLightEl!: PandaThemePreview;
	private readonly _themePreviewDarkEl!: PandaThemePreview;

	private readonly _themeLabelSystemEl!: HTMLDivElement;
	private readonly _themeLabelLightEl!: HTMLDivElement;
	private readonly _themeLabelDarkEl!: HTMLDivElement;

	// events
	private readonly _themeChangeEvent!: any;

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
			<div class="theme-select" part="theme-select">
				<div
					id="system"
					class="theme-item system"
					part="theme-item system"
				>
					<div class="preview">
						<panda-theme-preview theme="system"></panda-theme-preview>
					</div>
					<div class="footer" part="footer system">
						<div class="label" part="label system">System Preference</div>
						<div class="icon" part="icon system">
							<panda-icon icon="check-circle"></panda-icon>
						</div>
					</div>
				</div>
				<div
					id="light"
					class="theme-item light"
					part="theme-item light"
				>
					<div class="preview">
						<panda-theme-preview theme="light"></panda-theme-preview>
					</div>
					<div class="footer" part="footer light">
						<div class="label" part="label light">Light</div>
						<div class="icon" part="icon light">
							<panda-icon icon="check-circle"></panda-icon>
						</div>
					</div>
				</div>
				<div
					id="dark"
					class="theme-item dark"
					part="theme-item dark"
				>
					<div class="preview">
						<panda-theme-preview theme="dark"></panda-theme-preview>
					</div>
					<div class="footer" part="footer dark">
						<div class="label" part="label dark">Dark</div>
						<div class="icon" part="icon dark">
							<panda-icon icon="check-circle"></panda-icon>
						</div>
					</div>
				</div>
			</div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._value = "";
		this._i18n = this._getDefaultI18nConfig();

		// init events
		this._themeChangeEvent = this._onThemeChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			this._themePreviewSystemEl = this.shadowRoot.querySelector("#system") as PandaThemePreview;
			this._themePreviewLightEl = this.shadowRoot.querySelector("#light") as PandaThemePreview;
			this._themePreviewDarkEl = this.shadowRoot.querySelector("#dark") as PandaThemePreview;
			this._themeLabelSystemEl = this.shadowRoot.querySelector("#system .label") as HTMLDivElement;
			this._themeLabelLightEl = this.shadowRoot.querySelector("#light .label") as HTMLDivElement;
			this._themeLabelDarkEl = this.shadowRoot.querySelector("#dark .label") as HTMLDivElement;
		}
	}

	connectedCallback() {
		// add event listeners to component template
		this._themePreviewSystemEl.addEventListener("click", () => this._themeChangeEvent("system"));
		this._themePreviewLightEl.addEventListener("click", () => this._themeChangeEvent("light"));
		this._themePreviewDarkEl.addEventListener("click", () => this._themeChangeEvent("dark"));
	}

	disconnectedCallback() {
		// remove event listeners
		this._themePreviewSystemEl.removeEventListener("click", this._themeChangeEvent);
		this._themePreviewLightEl.removeEventListener("click", this._themeChangeEvent);
		this._themePreviewDarkEl.removeEventListener("click", this._themeChangeEvent);
	}

	/**
	 * Handle attribute changes.
	 * @param _name The name of the attribute that changed.
	 * @param _oldValue The old value of the attribute.
	 * @param _newValue The new value of the attribute.
	 */
	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "value") {
			this._value = _newValue;
			this._updateState();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply component styles. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/** Update the component state based on the current value. */
	private _updateState(): void {
		switch (this._value) {
			case "system":
				this._themePreviewSystemEl.classList.add("selected");
				this._themePreviewLightEl.classList.remove("selected");
				this._themePreviewDarkEl.classList.remove("selected");
				break;
			case "light":
				this._themePreviewLightEl.classList.add("selected");
				this._themePreviewSystemEl.classList.remove("selected");
				this._themePreviewDarkEl.classList.remove("selected");
				break;
			case "dark":
				this._themePreviewDarkEl.classList.add("selected");
				this._themePreviewSystemEl.classList.remove("selected");
				this._themePreviewLightEl.classList.remove("selected");
				break;
		}
	}

	/** Update the theme labels based on the current i18n configuration. */
	private _updateThemeLabel(): void {
		this._themeLabelSystemEl.textContent = this._i18n.system;
		this._themeLabelLightEl.textContent = this._i18n.light;
		this._themeLabelDarkEl.textContent = this._i18n.dark;
	}

	/**
	 * Get the default internationalization (i18n) configuration.
	 * @returns {PandaThemeSelectI18nConfig} The default i18n configuration.
	 */
	private _getDefaultI18nConfig(): PandaThemeSelectI18nConfig {
		return {
			light: "Light",
			dark: "Dark",
			system: "System Preference"
		};
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	/**
	 * Handle theme change events.
	 * @param theme The new theme value.
	 */
	private _onThemeChange(theme: string): void {
		this._value = theme;
		this._updateState();
		this.dispatchEvent(new CustomEvent<PandaThemeSelectChangeEventDetails>("change", {
			detail: {
				theme: this._value
			}
		}));
	}

}

// Register the custom element
if (!customElements.get("panda-theme-select")) {
	customElements.define("panda-theme-select", PandaThemeSelect);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-select": PandaThemeSelect;
	}
}