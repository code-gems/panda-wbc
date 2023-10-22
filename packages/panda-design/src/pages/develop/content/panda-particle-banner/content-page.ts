// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-particle-banner";

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import {
	pageId,
	pageName,
	pageUri,
	keywords,
	description,
	contextMenu
} from "./page-config";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

@customElement("panda-particle-banner-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-particle-banner-content-page></panda-particle-banner-content-page>`
})
export class PandaParticleBannerContentPage extends ContentPageTemplate {
	// css styles
	static get styles() {
		return [
			styles,
			scrollbar,
			uiComponents.banner,
			uiComponents.table,
			uiComponents.sample,
			uiComponents.form,
			uiComponents.appLayout,
			uiComponents.columnSystem,
			uiComponents.modifiers,
		];
	}

	// page details
	pageId: string = pageId;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		const bannerConfig: PandaParticleBannerConfig = {
			particleCount: 80,
			interactive: true,
			mouseOffsetXSensitivity: 10,
			mouseOffsetYSensitivity: 10,

			minSpeedX: -0.1,
			maxSpeedX: 0.1,
			minSpeedY: -0.1,
			maxSpeedY: 0.1,

			sizeMin: 5,
			sizeMax: 100,

			blur: true,
			blurMin: 5,
			blurMax: 10,
		};

		return html`banner`;
		return html`
			<div class="banner small">
				<panda-particle-banner
					.config="${bannerConfig}"
					
				>
					<div>
						<h1>PARTICLE BANNER</h1>
						<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
					</div>
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
		const bannerConfig: PandaParticleBannerConfig[] = [
			{
				particleCount: 50,
				// walls: true,
				// connect: true,
				// connectionDistance: 50,
				// interactive: true,
				// mouseOffsetXSensitivity: 10,
				
				sizeMin: 10,
				sizeMax: 3,
				
				minSpeedX: -2,
				maxSpeedX: 2,
				minSpeedY: -2,
				maxSpeedY: 2,
				
				blur: true,
				blurMin: 1,
				blurMax: 2,
				// getBlur: (particle, metadata, index) => {
				// 	const clientX = metadata.mouse.clientX ?? 0;
				// 	const clientY = metadata.mouse.clientY ?? 0;
				// 	const bannerWidth = metadata.bannerRect?.width ?? 0;
				// 	const dist = Math.floor(Math.sqrt(Math.pow((particle.x - clientX), 2) + Math.pow((particle.y - clientY), 2)));
				// 	const blur = (dist * 15) / bannerWidth;
				// 	return blur;
				// },
			},
			{
				particleCount: 30,
				sizeMin: 100,
				sizeMax: 50,

				minSpeedX: -0.5,
				maxSpeedX: 0.5,
				minSpeedY: -0.5,
				maxSpeedY: 0.5,

				blur: true,
				blurMin: 5,
				blurMax: 10,
			}
		];
			
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<h2>Overview</h2>
					<p>
						...
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
							<panda-particle-banner
								.config="${bannerConfig}"
								verbose
							>
							</panda-particle-banner>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}