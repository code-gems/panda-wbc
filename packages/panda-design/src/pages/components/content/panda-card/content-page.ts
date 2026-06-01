// types
import { ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-card";

// utils & config
import { TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-card-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles = styles;

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>

					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-12">

									<panda-card horizontal>
										<img slot="media" src="https://picsum.photos/id/235/400/200" alt="Card Media">
										
										<div slot="header-prefix">
											<panda-icon icon="user"></panda-icon>
										</div>
										<div slot="title">Card Title</div>
										<div slot="subtitle">Card Subtitle</div>
										<div slot="header-suffix">
											<panda-badge theme="done">Active</panda-badge>
										</div>

										Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
										Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										
										<panda-button slot="footer" theme="primary">Action 1</panda-button>
										<panda-button slot="footer" theme="secondary">Action 2</panda-button>
									</panda-card>

								</div>
								<div class="col-4">

									<panda-card>
										<img slot="media" src="https://picsum.photos/id/237/400/300" alt="Card Media">
										
										<div slot="title">Puppy</div>
										<div slot="subtitle">Card Subtitle</div>
										<div slot="header-suffix">
											<panda-badge theme="done">Active</panda-badge>
										</div>

										Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
										Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
										
										<panda-button slot="footer" theme="primary">Action 1</panda-button>
										<panda-button slot="footer" theme="secondary">Action 2</panda-button>
									</panda-card>

								</div>
								<div class="col-4">

									<panda-card class="gradient-border">
										<div slot="title">Puppy</div>
										<div slot="subtitle">Card Subtitle</div>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
										Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</panda-card>

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