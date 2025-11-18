// types
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-multi-select-combo-box";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";
import { PandaMultiSelectComboBoxItem } from "@panda-wbc/panda-multi-select-combo-box";
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
// code snippets
// ...

import { SyntaxHighlighter } from "./code";

@page(pageConfig)
@customElement("panda-multi-select-combo-box-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// demo props

	private readonly _items: PandaMultiSelectComboBoxItem[] = [
		{ label: "Poland", value: "PL" },
		{ label: "Singapore", value: "SG" },
		{ label: "Vietnam", value: "VN" },
		{ label: "China", value: "CN", disabled: true },
	];

	private readonly _itemsCustom: any[] = [
		{ name: "Poland", code: "PL" },
		{ name: "Singapore", code: "SG" },
		{ name: "Vietnam", code: "VN" },
		{ name: "China", code: "CN", disabled: true },
	];

	private _value = "SG";

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>Multi-Select Combo Box</h1>
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
		const ts = `
const xxx = async (name: string): void => {
  // comments
  console.log(\`Hello, \${name}!\`);
}

// @syntax-html
<!-- comments -->
<div class="asd" disabled>
  <div class="asd" disabled><p>
    Some text
  </div>
</div>
`;
		// const code = new SyntaxHighlighter([{ code: ts, language: 'typescript' }]).highlight();
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						// describe multiselect component

					</p>
				</div>

				<div class="sample-cont" style="height: 2000px;">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-half">
									<panda-button>PLACEHOLDER</panda-button>
								</div>
							</div>
							<div class="row">

								<div class="col-half">
									<panda-multi-select-combo-box
										label="Select country:"
										help-text="this is a help text"
										error-message="this is an error message"
										placeholder="Select..."
										.items="${this._itemsCustom}"
										.value="${["VN", "PL"]}"
										item-label-path="name"
										item-value-path="code"
									>
										<div slot="prefix">
											<panda-icon icon="check"></panda-icon>
										</div>
										<div slot="suffix">
											SOME TEXT
										</div>
									</panda-multi-select-combo-box>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
}