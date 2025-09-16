// style
import { styles } from "./styles/theme-preview-styles";

export class PandaThemePreview extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = ["theme"];

	// theme ==========================================================================================================
	private _theme!: string;
	
	get theme(): string {
		return this._theme;
	}

	set theme(value: string) {
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			this.setAttribute("theme", this._theme);
		}
	}

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
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 256 192"
					enable-background="new 0 0 256 192"
					xml:space="preserve"
				>
					<defs>
						<mask id="mask">
							<polygon fill="#FFFFFF" points="256,192 0,192 256,0 "/>
						</mask>
					</defs>
					
					<g class="light">
						${this._getThemePreviewTemplate()}
					</g>
					<g class="dark">
						${this._getThemePreviewTemplate()}
					</g>
					<g class="system dark" mask="url(#mask)">
						${this._getThemePreviewTemplate()}
					</g>
				</svg>
			</div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._theme = "";
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

	private _getThemePreviewTemplate(): string {
		return `
			<rect class="background" width="256" height="192"/>
			<g id="app-background">
				<path
					class="app-background"
					d="M19.5,192.5V29.685c0-5.634,4.71-10.218,10.5-10.218h196c5.79,0,10.5,4.583,10.5,10.218V192.5H19.5z"
				/>
				<path
					class="app-background-border"
					d="M226,19.967c5.521,0,10,4.351,10,9.718V192H20V29.685c0-5.367,4.477-9.718,10-9.718H226 M226,18.967H30
					c-6.065,0-11,4.808-11,10.718V192v1h1h216h1v-1V29.685C237,23.775,232.064,18.967,226,18.967L226,18.967z"
				/>
			</g>
			<g id="tabs">
				<rect class="tabs-background" x="20" y="39.5" width="216" height="21.747"/>
				<path
					class="tab"
					d="M135.5,50.5c0,2.762-2.238,5-5,5h-29c-2.762,0-5-2.238-5-5l0,0c0-2.762,2.238-5,5-5h29
					C133.262,45.5,135.5,47.738,135.5,50.5L135.5,50.5z"
				/>
				<path
					class="tab selected"
					d="M93,50.5c0,2.762-2.238,5-5,5H59c-2.762,0-5-2.238-5-5l0,0c0-2.762,2.238-5,5-5h29
					C90.762,45.5,93,47.738,93,50.5L93,50.5z"
				/>
				<path
					class="tab primary"
					d="M229.771,50.5c0,2.762-2.238,5-5,5h-46c-2.763,0-5-2.238-5-5l0,0c0-2.762,2.237-5,5-5
					h46C227.533,45.5,229.771,47.738,229.771,50.5L229.771,50.5z"
				/>
			</g>
			<g id="sidebar">
				<polygon
					class="sidebar-background"
					points="47.313,192.127 20.083,191.885 20,39.5 47.313,39.742 "
				/>
				<path
					class="sidebar-item selected"
					d="M40.834,53.601c0,2.762-2.238,5-5,5h-4.865c-2.762,0-5-2.238-5-5l0,0
					c0-2.761,2.238-5,5-5h4.865C38.596,48.601,40.834,50.84,40.834,53.601L40.834,53.601z"
				/>
				<path
					class="sidebar-item"
					d="M40.834,71.424c0,2.762-2.238,5-5,5h-4.865c-2.762,0-5-2.238-5-5l0,0c0-2.761,2.238-5,5-5
					h4.865C38.596,66.424,40.834,68.663,40.834,71.424L40.834,71.424z"
				/>
				<path
					class="sidebar-item"
					d="M40.834,89.248c0,2.762-2.238,5-5,5h-4.865c-2.762,0-5-2.238-5-5l0,0
					c0-2.761,2.238-5,5-5h4.865C38.596,84.248,40.834,86.487,40.834,89.248L40.834,89.248z"
				/>
				<path
					class="sidebar-item"
					d="M40.959,107.07c0,2.763-2.238,5-5,5h-5.115c-2.762,0-5-2.237-5-5l0,0
					c0-2.762,2.238-5,5-5h5.115C38.721,102.07,40.959,104.311,40.959,107.07L40.959,107.07z"
				/>
			</g>
			<g id="content">
				<path 
					class="content"
					d="M230.324,179.697c0,2.762-2.238,5-5,5h-93.648c-2.761,0-5-2.238-5-5v-45.469
					c0-2.763,2.239-5,5-5h93.648c2.762,0,5,2.237,5,5V179.697z"
				/>
				<path 
					class="content"
					d="M119.771,179.697c0,2.762-2.238,5-5,5H60.229c-2.761,0-5-2.238-5-5v-45.469c0-2.763,2.239-5,5-5
					h54.542c2.762,0,5,2.237,5,5V179.697z"
				/>
				<path 
					class="content"
					d="M155.395,118.123c0,2.762-2.237,5-5,5H60.229c-2.761,0-5-2.238-5-5V74.652c0-2.761,2.239-5,5-5
					h90.166c2.763,0,5,2.239,5,5V118.123z"
				/>
				<path 
					class="content"
					d="M230.771,118.122c0,2.762-2.238,5-5,5l-57.959,0.001c-2.762,0-5-2.238-5-5V74.652
					c0-2.762,2.238-5,5-5l57.959-0.001c2.762,0,5,2.238,5,5V118.122z"
				/>
			</g>
			<g id="top-bar">
				<path
					class="top-bar-background-color"
					d="M236,39.5H20v-9.533c0-5.523,4.477-10,10-10h196c5.521,0,10,4.477,10,10V39.5z"
				/>
				<circle fill="#E95124" cx="30.917" cy="29.931" r="3.5"/>
				<circle fill="#FEDA1F" cx="40.865" cy="30" r="3.5"/>
				<circle fill="#6BBD45" cx="50.813" cy="30" r="3.5"/>
			</g>
		`;
	}
}

// Register the custom element
if (!customElements.get("panda-theme-preview")) {
	customElements.define("panda-theme-preview", PandaThemePreview);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-preview": PandaThemePreview;
	}
}