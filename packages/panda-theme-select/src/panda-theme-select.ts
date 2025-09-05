// types
import { PandaThemeSelectChangeEventDetails } from "../index";
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

	// view properties ================================================================================================

	// template elements
	private readonly _themePreviewSystem!: PandaThemePreview;
	private readonly _themePreviewLight!: PandaThemePreview;
	private readonly _themePreviewDark!: PandaThemePreview;

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
						<div class="label" part="label system">System</div>
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

		// init events
		this._themeChangeEvent = this._onThemeChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			this._themePreviewSystem = this.shadowRoot.querySelector("#system") as PandaThemePreview;
			this._themePreviewLight = this.shadowRoot.querySelector("#light") as PandaThemePreview;
			this._themePreviewDark = this.shadowRoot.querySelector("#dark") as PandaThemePreview;
		}
	}

	connectedCallback() {
		// add event listeners to component template
		this._themePreviewSystem.addEventListener("click", () => this._themeChangeEvent("system"));
		this._themePreviewLight.addEventListener("click", () => this._themeChangeEvent("light"));
		this._themePreviewDark.addEventListener("click", () => this._themeChangeEvent("dark"));
	}

	disconnectedCallback() {
		// remove event listeners
		this._themePreviewSystem.removeEventListener("click", this._themeChangeEvent);
		this._themePreviewLight.removeEventListener("click", this._themeChangeEvent);
		this._themePreviewDark.removeEventListener("click", this._themeChangeEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		if (_name === "value") {
			this._value = _newValue;
			this._updateState();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	private _updateState(): void {
		// update template elements based on new value
		switch (this._value) {
			case "system":
				this._themePreviewSystem.classList.add("selected");
				this._themePreviewLight.classList.remove("selected");
				this._themePreviewDark.classList.remove("selected");
				break;
			case "light":
				this._themePreviewLight.classList.add("selected");
				this._themePreviewSystem.classList.remove("selected");
				this._themePreviewDark.classList.remove("selected");
				break;
			case "dark":
				this._themePreviewDark.classList.add("selected");
				this._themePreviewSystem.classList.remove("selected");
				this._themePreviewLight.classList.remove("selected");
				break;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

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