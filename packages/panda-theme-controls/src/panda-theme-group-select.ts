// types
import { PandaThemeState } from "@panda-wbc/panda-theme";
import { PandaThemeGroupChangeEventDetails } from "../index";

// style
import { styles } from "./styles/theme-group-select-styles";

// utils
import { pandaThemeController, themeWatch } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// components
import "@panda-wbc/panda-icon";
import "./panda-theme-group-preview";

@themeWatch()
export class PandaThemeGroupSelect extends HTMLElement {
	/** component version */
	static readonly version: string = "1.0.0";

	// view properties ================================================================================================

	private _selectedThemeGroupId!: string;

	private _ready!: boolean;

	// elements
	private readonly _themeGroupSelectEl!: HTMLSelectElement;

	// events
	private readonly _themeGroupChangeEvent!: any;

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
			<div class="theme-group-select" part="theme-group-select"></div>
		`;
		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._selectedThemeGroupId = pandaThemeController.getThemeGroupId();
		this._ready = false;

		// get template element handles
		if (this.shadowRoot) {
			this._themeGroupSelectEl = this.shadowRoot.querySelector(".theme-group-select") as HTMLSelectElement;
			// init event binders
			this._themeGroupChangeEvent = this._onThemeGroupChange.bind(this);
			this._themeGroupSelectEl.addEventListener("click", this._themeGroupChangeEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._updateState();
	}

	disconnectedCallback() {
		// remove event listeners
		this._themeGroupSelectEl.removeEventListener("click", this._themeGroupChangeEvent);
	}

	onThemeChange(themeState: PandaThemeState): void {
		const { themeGroupId } = themeState;
		this._selectedThemeGroupId = themeGroupId;
		this._updateState();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateState(): void {
		console.log(
			`%c ⚡ [PANDA THEME GROUP SELECT] (_updateState) ready?`,
			"font-size: 24px; color: crimson; background: black;",
			this._ready
		);

		if (this._ready) {
			const themeGroups = pandaThemeController.getThemeGroups();
			this._themeGroupSelectEl.innerHTML = "";
			const groupsHtml: string[] = [];

			themeGroups.forEach((themeGroup) => {
				const { id, name, description } = themeGroup;
				const themeGroupPreviewEl = document.createElement("panda-theme-group-preview");
				themeGroupPreviewEl.themeGroupId = id;

				console.log(
					`%c ⚡ [PANDA THEME GROUP SELECT] (_updateState) themeGroup`,
					"font-size: 24px; color: crimson; background: black;",
					themeGroup
				);

				const selected = this._selectedThemeGroupId === id
					? "selected"
					: "";

				groupsHtml.push(/*html*/`
					<div
						class="theme-group-item ${selected}"
						part="theme-group-item"
						data-theme-group-id="${id}"
					>
						<div class="header" part="header">
							<div class="title" part="title">${name}</div>
							<div class="icon" part="icon">
								<panda-icon icon="check-circle"></panda-icon>
							</div>
						</div>
						<div class="body" part="body">
							<div class="preview" part="preview">
								${themeGroupPreviewEl.outerHTML}
							</div>
						</div>
						<div class="footer" part="footer">
							<div class="description" part="description">${description ?? ""}</div>
						</div>
					</div>
				`);
			});
			this._themeGroupSelectEl.innerHTML = groupsHtml.join("\n");
		}
	}

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

	private _onThemeGroupChange(event: MouseEvent): void {
		const themeGroupItem = (event.target as HTMLElement).closest(".theme-group-item") as HTMLDivElement;
		if (themeGroupItem) {
			const themeGroupId = themeGroupItem.dataset.themeGroupId ?? "";
			this._selectedThemeGroupId = themeGroupId;
			pandaThemeController.setThemeGroupId(themeGroupId);

			this.dispatchEvent(new CustomEvent<PandaThemeGroupChangeEventDetails>("change", {
				detail: {
					themeGroupId: this._selectedThemeGroupId,
				}
			}));
		}
	}
}

// Register the custom element
if (!customElements.get("panda-theme-group-select")) {
	customElements.define("panda-theme-group-select", PandaThemeGroupSelect);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-group-select": PandaThemeGroupSelect;
	}
}