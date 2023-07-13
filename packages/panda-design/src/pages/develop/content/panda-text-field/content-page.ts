// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";

// components
import "@panda-wbc/panda-text-field";

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

@customElement("panda-text-field-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-text-field-content-page></panda-text-field-content-page>`
})
export class PandaTextFieldContentPage extends ContentPageTemplate {
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

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>TEXT FIELD</h1>
				<p>
					Buttons play a vital role in web applications, providing users with interactive elements to perform various actions and trigger specific functionalities.
				</p>
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
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<h2>Overview</h2>
					<p>
						Buttons serve as triggers for performing actions within the application. 
						They can initiate processes like submitting forms, saving data, navigating between pages, or executing specific tasks.
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
										<panda-text-field
											.label="${`First name:`}"
											.placeholder="${`Enter your name`}"
										>
											<div class="prefix" slot="prefix">http://</div>
											<div class="suffix" slot="suffix">.com</div>
										</panda-text-field>
									</div>
								</div>
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${`Disabled`}"
											.placeholder="${`Enter your name`}"
											disabled
										>
										</panda-text-field>
									</div>
								</div>
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${`Busy`}"
											.placeholder="${`Enter your name`}"
											busy
										>
										</panda-text-field>
									</div>
								</div>
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${`Mandatory`}"
											.placeholder="${`Enter your name`}"
											mandatory
										>
										</panda-text-field>
									</div>
								</div>
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${`Valid`}"
											.placeholder="${`Enter your name`}"
											theme="valid"
										>
										</panda-text-field>
									</div>
								</div>
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${`Invalid`}"
											.placeholder="${`Enter your name`}"
											theme="invalid"
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}