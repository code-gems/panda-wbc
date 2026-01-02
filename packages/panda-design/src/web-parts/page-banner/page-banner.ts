// types
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// components
import "@panda-wbc/panda-particle-banner";

// utils
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { themeWatch } from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// banner presets
import { bannerConfig1 } from "./banner-presets";

@customElement("pd-page-banner")
@themeWatch()
class PageBanner extends LitElement {
	// css styles
	static get styles() {
		return [];
	}

	@property({ type: String })
	header!: string;

	@property({ type: String })
	version!: string;

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
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
}