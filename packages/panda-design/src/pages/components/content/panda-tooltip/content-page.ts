// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// components
import "@panda-wbc/panda-tooltip";
import "@panda-wbc/panda-combo-box";

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

@customElement("panda-tooltip-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-tooltip-content-page></panda-tooltip-content-page>`,
})
export class PandaTooltipContentPage extends ContentPageTemplate {
	// css styles
	static get styles() {
		return [
			styles,
			scrollbar,
			uiComponents.banner,
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
		return html`
			<div class="banner small">
				<h1>TOOLTIP</h1>

				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
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
			<div class="content-section" data-content-section-name="overview" style="height: 1000px;">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Tooltips are essential user interface components in web applications that provide additional information and context to users when they interact with elements on a webpage. 
						They serve as a valuable UX enhancement tool by offering concise explanations, hints, or descriptions of elements such as buttons, icons, links, or form fields.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<h2 id="my-header">
							HOVER HERE
						</h2>
						<panda-tooltip
							for="my-header"
							position="top-right"
							.delay="${0}"
						>
							<template>
								<style>
									.tooltip-content {
										display: flex;
										flex-flow: row nowrap;
										min-width: 150px;
										min-height: 100px;
										padding: 10px;
									}
									.tooltip-content .icon {
										display: flex;
										justify-content: center;
										align-items: center;
										width: 40px;
										height: 100%;
										--panda-icon-color: #fff;
									}
									.tooltip-content .message {
										padding: 5px 0px;
									}
								</style>
								<div class="tooltip-content">
									<div class="icon">
										<panda-icon icon="info"></panda-icon>
									</div>
									<div class="message">
										Some<br />
										text<br />
										here
									</div>
								</div>
							</template>
						</panda-tooltip>

						<panda-combo-box
							id="ccy"
							.items="${["USD", "SGD"]}"
							.value="${"SGD"}"
						>
						</panda-combo-box>
						<br />
						<br />
						<panda-tooltip for="ccy" position="right" .delay="${0}">
							<template>
								Thank you!
							</template>
						</panda-tooltip>
					</div>
				</div>			

			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================


}