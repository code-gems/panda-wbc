// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-select";

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

@customElement("panda-select-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-select-content-page></panda-select-content-page>`
})
export class PandaTextFieldContentPage extends ContentPageTemplate {
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

	// static data
	private _items = [
		{ label: "Item # 1", value: 1 },
		{ label: "Item # 2", value: 2 },
		{ label: "Item # 3", value: 3 },
		{ label: "Item # 4", value: 4 },
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>SELECT</h1>
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
			<div class="content-section" data-content-section-name="overview" style="height: 2000px;">
				<div class="section">
					<h2>Overview</h2>
					<p>
						
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<panda-select
							.label="${`Option:`}"
							.placeholder="${`Select option...`}"
							.items="${this._items}"
						>
						</panda-select>
					</div>
				</div>
			</div>
		`;
	}
}