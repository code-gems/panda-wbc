// style
import pandaThemeController from "@panda-wbc/panda-theme/lib/panda-theme-controller";
import { styles } from "./styles/theme-group-preview-styles";

export class PandaThemeGroupPreview extends HTMLElement {
	/** component version */
	static readonly version: string = "1.0.0";
	
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = ["theme", "theme-group-id"];

	// themeGroupId ===================================================================================================
	private _themeGroupId!: string;
	
	get themeGroupId(): string {
		return this._themeGroupId;
	}

	set themeGroupId(value: string) {
		if (this._themeGroupId !== value) {
			this._themeGroupId = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("theme-group-id");
			} else {
				this.setAttribute("theme-group-id", this._themeGroupId);
			}
			// update preview tokens
			this._getPreviewTokens();
		}
	}

	// theme ==========================================================================================================
	private _theme!: string;
	
	get theme(): string {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("theme");
			} else {
				this.setAttribute("theme", this._theme);
			}
		}
	}

	// private props ==================================================================================================

	private _themePreviewTokens!: string;

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
			<div class="theme-preview" part="theme-preview">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 256 192"
				>
					<defs>
						<mask id="mask">
							<polygon fill="#FFFFFF" points="256,192 0,192 256,0"/>
						</mask>
					</defs>
					
					<g class="light">
						${this._getThemePreviewTemplate()}
					</g>
					<g class="dark" mask="url(#mask)">
						${this._getThemePreviewTemplate()}
					</g>
				</svg>
			</div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._themePreviewTokens = "";
		this._themeGroupId = "";
		this._theme = "";
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		console.log(
			`%c ⚡ [THEME GROUP PREVIEW] (attributeChangedCallback) _name: ${_name}, _oldValue: ${_oldValue}, _newValue: ${_newValue}`,
			"font-size: 24px; color: crimson; background: black;"
		);
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		// handle attribute changes
		if (_name === "theme") {
			this._theme = _newValue;
		} else if (_name === "theme-group-id") {
			this._themeGroupId = _newValue;
			// get and apply preview tokens
			this._getPreviewTokens();
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles + this._themePreviewTokens);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/**
	 * Get and apply preview tokens for the current theme group.
	 * @returns void
	 */
	private _getPreviewTokens(): void {
		if (!this._themeGroupId) {
			this._themePreviewTokens = "";
			console.log(
				`%c ⚡ [THEME GROUP PREVIEW] (_getPreviewTokens) Theme group ID not provided: ${this._themeGroupId}`,
				"font-size: 24px; color: crimson; background: black;"
			);
			return;
		}

		const themeGroup = pandaThemeController.getThemeGroupById(this._themeGroupId);
		if (themeGroup?.previewTokens) {
			this._themePreviewTokens = themeGroup.previewTokens;
			console.log(
				`%c ⚡ [THEME GROUP PREVIEW] (_getPreviewTokens) Applying previewTokens: ${themeGroup.previewTokens}`,
				"font-size: 24px; color: crimson; background: black;"
			);
		} else {
			this._themePreviewTokens = "";
			console.log(
				`%c ⚡ [THEME GROUP PREVIEW] (_getPreviewTokens) No preview tokens provided: ${themeGroup?.name}`,
				"font-size: 24px; color: crimson; background: black;"
			);
		}
		// apply component styles + preview tokens
		this._applyStyles();
	}

	private _getThemePreviewTemplate(): string {
		return `
			<rect class="background" width="256" height="192"/>
			<g id="app-background">
				<path
					class="app-background"	
					d="M226,19.368H30c-5.792,0-10.5,4.56-10.5,10.166V163.84c0,5.605,4.708,10.166,10.5,10.166
					h196c5.791,0,10.5-4.561,10.5-10.166V29.534C236.5,23.928,231.792,19.368,226,19.368z"
				/>
			</g>
			<g id="buttons">
				<path 
					class="button"
					d="M135.5,50.238c0,2.746-2.239,4.974-5,4.974h-29c-2.76,0-5-2.228-5-4.974l0,0c0-2.746,2.24-4.974,5-4.974h29
					C133.261,45.264,135.5,47.492,135.5,50.238L135.5,50.238z"
				/>
				<path 
					class="button primary"
					d="M229.771,50.238c0,2.746-2.239,4.974-5,4.974h-46c-2.76,0-5-2.228-5-4.974l0,0c0-2.746,2.24-4.974,5-4.974
					h46C227.531,45.264,229.771,47.492,229.771,50.238L229.771,50.238z"
				/>
			</g>
			<g id="sidebar">
				<path
					class="sidebar-background"
					d="M89.979,173.643V39.295H20v124.399c0,5.497,4.479,9.948,10,9.948H89.979z"
				/>
				<path
					class="sidebar-item selected"
					d="M83.5,53.321c0,2.751-2.24,4.974-5,4.974H30.969c-2.76,0-5-2.223-5-4.974l0,0c0-2.746,2.24-4.974,5-4.974
					H78.5C81.26,48.347,83.5,50.575,83.5,53.321L83.5,53.321z"
				/>
				<path
					class="sidebar-item"
					d="M83.5,71.052c0,2.751-2.24,4.974-5,4.974H30.969c-2.76,0-5-2.223-5-4.974l0,0c0-2.746,2.24-4.974,5-4.974
					H78.5C81.26,66.078,83.5,68.306,83.5,71.052L83.5,71.052z"
				/>
				<path
					class="sidebar-item"
					d="M83.5,88.788c0,2.746-2.24,4.974-5,4.974H30.969c-2.76,0-5-2.228-5-4.974l0,0c0-2.746,2.24-4.974,5-4.974
					H78.5C81.26,83.813,83.5,86.042,83.5,88.788L83.5,88.788z"
				/>
				<path
					class="sidebar-item"
					d="M83.625,106.508c0,2.756-2.24,4.974-5,4.974H30.844c-2.76,0-5-2.218-5-4.974l0,0
					c0-2.735,2.24-4.975,5-4.975h47.781C81.385,101.533,83.625,103.772,83.625,106.508L83.625,106.508z"
				/>
			</g>
			<g id="content">
				<path
					class="content"
					d="M230.323,162.768c0,2.745-2.24,4.974-5,4.974h-72.313c-2.761,0-5-2.229-5-4.974v-41.233
					c0-2.757,2.239-4.975,5-4.975h72.313c2.76,0,5,2.218,5,4.975V162.768z"
				/>
				<path
					class="content"
					d="M141.104,162.768c0,2.745-2.24,4.974-5,4.974h-33.208c-2.761,0-5-2.229-5-4.974v-41.233
					c0-2.757,2.239-4.975,5-4.975h33.208c2.76,0,5,2.218,5,4.975V162.768L141.104,162.768z"
				/>
				<path
					class="content"
					d="M176.729,104.063c0,2.745-2.24,4.974-5,4.974h-68.833c-2.761,0-5-2.229-5-4.974V66.445
					c0-2.746,2.239-4.974,5-4.974h68.833c2.76,0,5,2.229,5,4.974V104.063z"
				/>
				<path
					class="content"
					d="M230.771,104.063c0,2.745-2.239,4.974-5,4.974h-36.625c-2.76,0-5-2.229-5-4.974V66.445
					c0-2.746,2.24-4.974,5-4.974h36.625c2.761,0,5,2.229,5,4.974V104.063z"
				/>
			</g>
			<g id="top-bar">
				<path
					class="top-bar-background-color"
					d="M236,39.295H20v-9.482c0-5.497,4.479-9.948,10-9.948h196c5.521,0,10,4.451,10,9.948V39.295z"
				/>
				<circle class="top-bar-button-red" cx="30.917" cy="29.931" r="3.5"/>
				<circle class="top-bar-button-yellow" cx="40.865" cy="30" r="3.5"/>
				<circle class="top-bar-button-green" cx="50.813" cy="30" r="3.5"/>
			</g>
		`;
	}
}

// Register the custom element
if (!customElements.get("panda-theme-group-preview")) {
	customElements.define("panda-theme-group-preview", PandaThemeGroupPreview);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-group-preview": PandaThemeGroupPreview;
	}
}