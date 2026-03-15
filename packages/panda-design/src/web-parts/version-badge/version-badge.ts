// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("version-badge")
class VersionBadge extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	version!: string;

	@property({ type: Boolean, reflect: true })
	native!: boolean;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		const nativeHtml = this.native
			? html`<div class="native">native</div>`
			: html``;

		return html`
			<div class="shield">
				<div class="version ${this.native ? "no-border-radius" : ""}">${this.version}</div>
				${nativeHtml}
			</div>
		`;
	}
}