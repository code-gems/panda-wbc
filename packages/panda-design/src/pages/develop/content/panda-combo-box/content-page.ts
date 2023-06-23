// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";

// components
import "@panda-wbc/panda-combo-box";
import "../../../../web-parts/code-sample/code-sample";
import "../../../../web-parts/version-shield/version-shield";

// utils
import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";

// code snippets
import {
	installationSnippet, usageSnippet,
} from "./snippets/snippets";

// page config
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-combo-box-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-combo-box-content-page></panda-combo-box-content-page>`,
})
export class PandaComboBoxContentPage extends ContentPageTemplate {
	// css styles
	static get styles() {
		return [
			styles,
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

	// view props
	@property({ type: String })
	private _value: string | null = "value 1";

	@property({ type: Array })
	private _items: any[] = [
		{ name: "Item #1", value: "value 1" },
		{ name: "Item #2", value: "value 2" },
		{ name: "Item #3", value: "value 3" },
		{ name: "Item #4", value: "value 4" },
		{ name: "Item #5", value: "value 5" },
		{ name: "Item #6", value: "value 6" },
	];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>COMBO BOX</h1>
				<p>
					A combo box component, also known as a dropdown, is a user interface element commonly used in software applications and web forms. 
					It combines the functionality of a text input field with a list of predefined options, allowing users to select a value from the provided choices or enter their own value.
				</p>
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<h2>Overview</h2>
					<p>
						Combo boxes are widely used in various applications, such as forms, configuration panels, and settings menus. 
						They enhance the user experience by providing a compact and intuitive interface for selecting options, 
						reducing the need for manual data entry, and ensuring data consistency within the application.
					</p>
					<p>
						One of the key advantages of a combo box is its ability to handle both predefined options and user-generated input. 
						It offers a convenient way for users to select from a limited set of choices, 
						while still allowing them the flexibility to enter custom values when necessary.
					</p>
				</div>

				<!-- OVERVIEW -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-combo-box
											.label="${"Select Destination:"}"
											.value="${this._value}"
											.items="${this._items}"
											@change="${this._onChange}"
											mandatory
										>
										</panda-combo-box>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="installation">
				<div class="section">
					<h2>Installation</h2>
					<p>
						Begin by installing the npm library by running a command in the terminal or command prompt. 
						Use the npm package manager, specifying the library name and version.
					</p>

					<code-sample header="Installation">
						${installationSnippet}
					</code-sample>
				</div>
			</div>
		`;
	}

	private _renderUsageSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="usage">
				<div class="section">
					<h2>Usage</h2>
					<p>
						The following example showcase use of component:
					</p>

					<code-sample header="Usage">
						${usageSnippet}
					</code-sample>
				</div>
			</div>
		`;
	}
		
	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChange(e: any) {
		console.log("%c _onChange", "font-size: 24px; color: green;", e);
	}
}