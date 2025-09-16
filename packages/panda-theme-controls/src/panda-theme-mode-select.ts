// types
import { PandaThemeMode, PandaThemeState } from "@panda-wbc/panda-theme";
import { PandaThemeModeChangeEventDetails, PandaThemeSelectI18nConfig } from "..";
import { PandaThemePreview } from "./panda-theme-preview";

// theme service
import { pandaThemeController, themeWatch } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// style
import { styles } from "./styles/theme-mode-select-styles";

// components
import "@panda-wbc/panda-icon";
import "./panda-theme-preview";

@themeWatch()
export class PandaThemeModeSelect extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
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

	private _themeMode!: PandaThemeMode;

	// template elements
	private readonly _themePreviewSystemEl!: PandaThemePreview;
	private readonly _themePreviewLightEl!: PandaThemePreview;
	private readonly _themePreviewDarkEl!: PandaThemePreview;

	private readonly _headerTextSystemEl!: HTMLDivElement;
	private readonly _headerIconSystemEl!: HTMLDivElement;
	private readonly _footerTextSystemEl!: HTMLDivElement;
	private readonly _footerDescriptionSystemEl!: HTMLDivElement;
	
	private readonly _headerTextLightEl!: HTMLDivElement;
	private readonly _headerIconLightEl!: HTMLDivElement;
	private readonly _footerTextLightEl!: HTMLDivElement;
	private readonly _footerDescriptionLightEl!: HTMLDivElement;
	
	private readonly _headerTextDarkEl!: HTMLDivElement;
	private readonly _headerIconDarkEl!: HTMLDivElement;
	private readonly _footerTextDarkEl!: HTMLDivElement;
	private readonly _footerDescriptionDarkEl!: HTMLDivElement;

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
			<div class="theme-select" part="theme-select">
				<div
					id="system"
					class="theme-item system"
					part="theme-item system"
				>
					<div class="header" part="header system">
						<div class="icon">
							<panda-icon icon="monitor"></panda-icon>
						</div>
						<div class="title" part="title system"></div>
					</div>
					<div class="body" part="body system">
						<div class="preview" part="preview system">
							<panda-theme-preview theme="system"></panda-theme-preview>
						</div>
					</div>
					<div class="footer" part="footer system">
						<div class="header" part="header system">
							<div class="title" part="title system"></div>
							<div class="icon" part="icon system">
								<panda-icon icon="check-circle"></panda-icon>
							</div>
						</div>
						<div class="description"></div>
					</div>
				</div>
				<div
					id="light"
					class="theme-item light"
					part="theme-item light"
				>
					<div class="header" part="header light">
						<div class="icon">
							<panda-icon icon="sun"></panda-icon>
						</div>
						<div class="title" part="title light"></div>
					</div>
					<div class="body" part="body light">
						<div class="preview" part="preview light">
							<panda-theme-preview theme="light"></panda-theme-preview>
						</div>
					</div>
					<div class="footer" part="footer light">
						<div class="header" part="header light">
							<div class="title" part="title light"></div>
							<div class="icon" part="icon light">
								<panda-icon icon="check-circle"></panda-icon>
							</div>
						</div>
						<div class="description"></div>
					</div>
				</div>
				<div
					id="dark"
					class="theme-item dark"
					part="theme-item dark"
				>
					<div class="header" part="header dark">
						<div class="icon">
							<panda-icon icon="moon"></panda-icon>
						</div>
						<div class="title" part="title dark"></div>
					</div>
					<div class="body" part="body dark">
						<div class="preview" part="preview dark">
							<panda-theme-preview theme="dark"></panda-theme-preview>
						</div>
					</div>
					<div class="footer" part="footer dark">
						<div class="header" part="header dark">
							<div class="title" part="title dark"></div>
							<div class="icon" part="icon dark">
								<panda-icon icon="check-circle"></panda-icon>
							</div>
						</div>
						<div class="description"></div>
					</div>
				</div>
			</div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._themeMode = pandaThemeController.getThemeMode();
		this._i18n = this._getDefaultI18nConfig();

		// init events
		this._themeModeChangeEvent = this._onThemeModeChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			this._themePreviewSystemEl = this.shadowRoot.querySelector("#system") as PandaThemePreview;
			this._headerTextSystemEl = this.shadowRoot.querySelector("#system .header .title") as HTMLDivElement;
			this._headerIconSystemEl = this.shadowRoot.querySelector("#system .header .icon") as HTMLDivElement;
			this._footerTextSystemEl = this.shadowRoot.querySelector("#system .footer .title") as HTMLDivElement;
			this._footerDescriptionSystemEl = this.shadowRoot.querySelector("#system .footer .description") as HTMLDivElement;
			
			this._themePreviewLightEl = this.shadowRoot.querySelector("#light") as PandaThemePreview;
			this._headerTextLightEl = this.shadowRoot.querySelector("#light .header .title") as HTMLDivElement;
			this._headerIconLightEl = this.shadowRoot.querySelector("#light .header .icon") as HTMLDivElement;
			this._footerTextLightEl = this.shadowRoot.querySelector("#light .footer .title") as HTMLDivElement;
			this._footerDescriptionLightEl = this.shadowRoot.querySelector("#light .footer .description") as HTMLDivElement;
			
			this._themePreviewDarkEl = this.shadowRoot.querySelector("#dark") as PandaThemePreview;
			this._headerTextDarkEl = this.shadowRoot.querySelector("#dark .header .title") as HTMLDivElement;
			this._headerIconDarkEl = this.shadowRoot.querySelector("#dark .header .icon") as HTMLDivElement;
			this._footerTextDarkEl = this.shadowRoot.querySelector("#dark .footer .title") as HTMLDivElement;
			this._footerDescriptionDarkEl = this.shadowRoot.querySelector("#dark .footer .description") as HTMLDivElement;
		}
	}

	connectedCallback() {
		// add event listeners to component template
		this._themePreviewSystemEl.addEventListener("click", () => this._themeModeChangeEvent("system"));
		this._themePreviewLightEl.addEventListener("click", () => this._themeModeChangeEvent("light"));
		this._themePreviewDarkEl.addEventListener("click", () => this._themeModeChangeEvent("dark"));
	}

	disconnectedCallback() {
		// remove event listeners
		this._themePreviewSystemEl.removeEventListener("click", this._themeModeChangeEvent);
		this._themePreviewLightEl.removeEventListener("click", this._themeModeChangeEvent);
		this._themePreviewDarkEl.removeEventListener("click", this._themeModeChangeEvent);
	}

	onThemeChange(themeState: PandaThemeState): void {
		const { themeMode } = themeState;
		this._themeMode = themeMode;
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

	/** Update the component state based on the current value. */
	private _updateState(): void {
		switch (this._themeMode) {
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
		this._headerTextSystemEl.textContent = this._i18n.systemHeaderText;
		this._headerIconSystemEl.setAttribute("icon", this._i18n.systemHeaderIcon as string);
		this._footerTextSystemEl.textContent = this._i18n.systemFooterText as string;
		this._footerDescriptionSystemEl.textContent = this._i18n.systemFooterDescription as string;

		this._headerTextLightEl.textContent = this._i18n.lightHeaderText;
		this._headerIconLightEl.setAttribute("icon", this._i18n.lightHeaderIcon as string);
		this._footerTextLightEl.textContent = this._i18n.lightFooterText as string;
		this._footerDescriptionLightEl.textContent = this._i18n.lightFooterDescription as string;

		this._headerTextDarkEl.textContent = this._i18n.darkHeaderText;
		this._headerIconDarkEl.setAttribute("icon", this._i18n.darkHeaderIcon as string);
		this._footerTextDarkEl.textContent = this._i18n.darkFooterText as string;
		this._footerDescriptionDarkEl.textContent = this._i18n.darkFooterDescription as string;
	}

	/**
	 * Get the default internationalization (i18n) configuration.
	 * @returns {PandaThemeSelectI18nConfig} The default i18n configuration.
	 */
	private _getDefaultI18nConfig(): PandaThemeSelectI18nConfig {
		return {
			lightHeaderText: "Light Theme",
			lightHeaderIcon: "sun",
			lightFooterText: "Light Mode",
			lightFooterDescription: "Bright and clear light color scheme for well-lit environments",

			darkHeaderText: "Dark Theme",
			darkHeaderIcon: "moon",
			darkFooterText: "Dark Mode",
			darkFooterDescription: "Eyes friendly dark color scheme for low light environments",

			systemHeaderText: "System Theme",
			systemHeaderIcon: "monitor",
			systemFooterText: "System Preference",
			systemFooterDescription: "This theme will fallback to your system settings.",
		};
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	/**
	 * Handle theme change events.
	 * @param themeMode The new theme value.
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
if (!customElements.get("panda-theme-mode-select")) {
	customElements.define("panda-theme-mode-select", PandaThemeModeSelect);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-mode-select": PandaThemeModeSelect;
	}
}