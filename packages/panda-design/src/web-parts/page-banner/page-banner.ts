// types
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-particle-banner";
import "../version-badge/version-badge";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeWatch } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// banner presets
import { bannerConfig1 } from "./banner-presets";

@customElement("pd-page-banner")
@themeWatch()
class PageBanner extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	header!: string;

	@property({ type: String })
	version!: string;

	@property({ type: Boolean })
	native!: boolean;

	// private props
	private _config!: PandaParticleBannerConfig;

	// elements
	private _bannerEl!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		this._config = bannerConfig1();
	}

	onThemeChange(): void {
		// generate new config with new color values after theme change
		this._config = bannerConfig1();
		// find banner element and update config
		this._bannerEl = this.shadowRoot?.querySelector("panda-particle-banner");
		if (this._bannerEl != null) {
			this._bannerEl.reload(this._config);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		const versionBadgeHtml = this.version == null
			? html``
			: html`
				<version-badge
					.version="${this.version}"
					?native="${this.native}"
				></version-badge>
			`;

		return html`
			<div class="banner">
				<panda-particle-banner .config="${this._config}"></panda-particle-banner>
				<div class="header">
					<div class="text">${this.header}</div>
					${versionBadgeHtml}
				</div>
			</div>
		`;
	}
}