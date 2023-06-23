// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("version-shield")
class VersionShield extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: "prefix" })
	shieldPrefix!: string;

	@property({ type: String, attribute: true })
	version!: string;

	@property({ type: String, attribute: true })
	color: string = "limegreen";

	// elements
	@query("#version")
	private _versionEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		this._versionEl.style.backgroundColor = this.color || "limegreen";
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="shield">
				<div class="prefix">${this.shieldPrefix}</div>
				<div id="version" class="version">${this.version}</div>
			</div>
		`;
	}
}