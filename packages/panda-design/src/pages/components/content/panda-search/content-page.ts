// types
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-search";

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";

// samples
import "./samples/sample-1/sample-1";

@page(pageConfig)
@customElement("panda-search-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId = pageConfig.pageId;
	public customStyles = styles;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const _primaryColor = getComputedStyle(this).getPropertyValue("--panda-primary-color");
		const _secondaryColor = getComputedStyle(this).getPropertyValue("--panda-secondary-color");
		const _tertiaryColor = getComputedStyle(this).getPropertyValue("--panda-tertiary-color");
		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [
				{
					particleCount: 30,
					blur: true,
					blurMax: 2,
					blurMin: 1,
					colors: [_primaryColor, _secondaryColor, _tertiaryColor],
					colorOpacityVariation: 80,
					colorSaturationVariation: 10,
					maxSpeedX: 0.1,
					minSpeedX: -0.1,
					maxSpeedY: -0.5,
					minSpeedY: -0.1,
					sizeMax: 15,
					sizeMin: 5,
				},
				{
					particleCount: 20,
					blur: true,
					blurMax: 5,
					blurMin: 2,
					colors: [_primaryColor, _secondaryColor, _tertiaryColor],
					colorOpacityVariation: 90,
					// colorSaturationVariation: 20,

					maxSpeedX: 0.1,
					minSpeedX: -0.1,
					maxSpeedY: -0.1,
					minSpeedY: -0.1,
					sizeMax: 120,
					sizeMin: 80,

				}
			]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					<div class="content">
						<h1>SEARCH</h1>
					</div>
					<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
				</panda-particle-banner>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}


	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<panda-search-sample-1></panda-search-sample-1>
					</div>
				</div>
			</div>
		`;
	}
}