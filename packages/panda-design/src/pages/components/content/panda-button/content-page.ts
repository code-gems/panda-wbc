// types
import { ComponentEventDetails, ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-button-new";

// utils
import { ContentPageTemplate } from "../../../content-page-template";
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageConfig } from "./page-config";

// code snippets
import {
	alertThemeSnippet,
	busyStateSnippet,
	defaultStateSnippet,
	disabledStateSnippet,
	doneThemeSnippet,
	implementationSnippet,
	infoThemeSnippet,
	installationSnippet,
	primaryThemeSnippet,
	warnThemeSnippet,
} from "./snippets/snippets";
import { toastCenter } from "../../../../utils/toast-center";

@page(pageConfig)
@customElement("panda-button-content-page")
export class PandaButtonContentPage extends ContentPageTemplate {
	// page details
	public contentPageConfig = pageConfig;
	public customStyles: CSSResultGroup = styles;

	// demo props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "disabled", type: "boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "busy", type: "boolean", defaultValue: "false", description: "Sets busy state for the component." },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "click", returnType: "Event", description: "" }
	];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderComponentStatesSection()}
			${this._renderFeaturesSection()}
			${this._renderThemingSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Buttons serve as triggers for performing actions within the application. 
						They can initiate processes like submitting forms, saving data, navigating between pages, or executing specific tasks.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-2">
									<panda-button-new
										@click="${this._onClick}"
									>
										Default New
									</panda-button-new>
								</div>
								<div class="col-2">
									<panda-button
										@click="${this._onClick}"
										working
									>
										Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										disabled
										@click="${this._onClick}"
									>
										Disabled
									</panda-button>
								</div>
							</div><!-- row -->

							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
									>
										Primary
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										working
									>
										Primary Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										disabled
									>
										Primary Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
									>
										Secondary
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										working
									>
										Secondary Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										disabled
									>
										Secondary Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="info"
										@click="${this._onClick}"
									>
										Info
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										working
									>
										Info Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										disabled
									>
										Info Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="done"
										@click="${this._onClick}"
									>
										Done
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="done"
										@click="${this._onClick}"
										working
									>
										Done Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="done"
										@click="${this._onClick}"
										disabled
									>
										Done Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path 
													fill-rule="evenodd" 
													clip-rule="evenodd" 
													fill="white"
													d="M7.2 1.2002C4.54904 1.2002 2.4 3.34923 2.4 6.0002V9.6002C2.4 10.2629 1.86275 10.8002 1.2 10.8002C0.537258 10.8002 0 11.3375 0 12.0002C0 12.6629 0.537258 13.2002 1.2 13.2002C1.86275 13.2002 2.4 13.7375 2.4 14.4002V18.0001C2.4 20.6512 4.54904 22.8001 7.2 22.8001C7.86275 22.8001 8.4 22.263 8.4 21.6001C8.4 20.9374 7.86275 20.4001 7.2 20.4001C5.87451 20.4001 4.8 19.3257 4.8 18.0001V14.4002C4.8 13.4782 4.45338 12.6371 3.88332 12.0002C4.45338 11.3633 4.8 10.5222 4.8 9.6002V6.0002C4.8 4.67471 5.87451 3.6002 7.2 3.6002C7.86275 3.6002 8.4 3.06294 8.4 2.4002C8.4 1.73745 7.86275 1.2002 7.2 1.2002ZM16.8 1.2002C16.1373 1.2002 15.6 1.73745 15.6 2.4002C15.6 3.06294 16.1373 3.6002 16.8 3.6002C18.1255 3.6002 19.2 4.67471 19.2 6.0002V9.6002C19.2 10.5222 19.5466 11.3633 20.1166 12.0002C19.5466 12.6371 19.2 13.4782 19.2 14.4002V18.0001C19.2 19.3257 18.1255 20.4001 16.8 20.4001C16.1373 20.4001 15.6 20.9374 15.6 21.6001C15.6 22.263 16.1373 22.8001 16.8 22.8001C19.451 22.8001 21.6 20.6512 21.6 18.0001V14.4002C21.6 13.7375 22.1373 13.2002 22.8 13.2002C23.4627 13.2002 24 12.6629 24 12.0002C24 11.3375 23.4627 10.8002 22.8 10.8002C22.1373 10.8002 21.6 10.2629 21.6 9.6002V6.0002C21.6 3.34923 19.451 1.2002 16.8 1.2002ZM11.7977 15.6121C11.7977 15.6921 11.8217 15.7602 11.8697 15.8161C11.9257 15.8721 11.9977 15.9001 12.0857 15.9001H13.1777C13.2577 15.9001 13.3257 15.8721 13.3817 15.8161C13.4377 15.7602 13.4657 15.6921 13.4657 15.6121V7.78812C13.4657 7.70813 13.4377 7.64012 13.3817 7.58412C13.3257 7.52813 13.2577 7.50012 13.1777 7.50012H12.1217C12.0657 7.50012 12.0137 7.50413 11.9657 7.51212C11.9177 7.52012 11.8697 7.54412 11.8217 7.58412L9.13371 9.66012C9.06171 9.70812 9.01772 9.77213 9.00171 9.85212C8.99372 9.93212 9.01371 10.0081 9.06171 10.0801L9.56571 10.7281C9.62172 10.8001 9.68571 10.8441 9.75771 10.8601C9.82971 10.8681 9.90171 10.8481 9.97371 10.8001L11.7977 9.39612V15.6121Z"
												/>
											</svg>
										</div>
										Warn
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
										working
									>
										Warn Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
										disabled
									>
										Warn Disabled
									</panda-button>
								</div>
							</div><!-- row -->
												
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path 
													fill-rule="evenodd" 
													clip-rule="evenodd" 
													fill="white"
													d="M7.2 1.2002C4.54904 1.2002 2.4 3.34923 2.4 6.0002V9.6002C2.4 10.2629 1.86275 10.8002 1.2 10.8002C0.537258 10.8002 0 11.3375 0 12.0002C0 12.6629 0.537258 13.2002 1.2 13.2002C1.86275 13.2002 2.4 13.7375 2.4 14.4002V18.0001C2.4 20.6512 4.54904 22.8001 7.2 22.8001C7.86275 22.8001 8.4 22.263 8.4 21.6001C8.4 20.9374 7.86275 20.4001 7.2 20.4001C5.87451 20.4001 4.8 19.3257 4.8 18.0001V14.4002C4.8 13.4782 4.45338 12.6371 3.88332 12.0002C4.45338 11.3633 4.8 10.5222 4.8 9.6002V6.0002C4.8 4.67471 5.87451 3.6002 7.2 3.6002C7.86275 3.6002 8.4 3.06294 8.4 2.4002C8.4 1.73745 7.86275 1.2002 7.2 1.2002ZM16.8 1.2002C16.1373 1.2002 15.6 1.73745 15.6 2.4002C15.6 3.06294 16.1373 3.6002 16.8 3.6002C18.1255 3.6002 19.2 4.67471 19.2 6.0002V9.6002C19.2 10.5222 19.5466 11.3633 20.1166 12.0002C19.5466 12.6371 19.2 13.4782 19.2 14.4002V18.0001C19.2 19.3257 18.1255 20.4001 16.8 20.4001C16.1373 20.4001 15.6 20.9374 15.6 21.6001C15.6 22.263 16.1373 22.8001 16.8 22.8001C19.451 22.8001 21.6 20.6512 21.6 18.0001V14.4002C21.6 13.7375 22.1373 13.2002 22.8 13.2002C23.4627 13.2002 24 12.6629 24 12.0002C24 11.3375 23.4627 10.8002 22.8 10.8002C22.1373 10.8002 21.6 10.2629 21.6 9.6002V6.0002C21.6 3.34923 19.451 1.2002 16.8 1.2002ZM8.93385 15.8101C8.98986 15.8661 9.05785 15.8941 9.13785 15.8941H14.8738C14.9619 15.8941 15.0299 15.8661 15.0779 15.8101C15.1338 15.7542 15.1618 15.6861 15.1618 15.6061V14.7541C15.1618 14.6661 15.1338 14.5981 15.0779 14.5501C15.0299 14.4941 14.9619 14.4661 14.8738 14.4661H11.4538L13.1579 12.7381C13.5419 12.4341 13.8699 12.1381 14.1419 11.8501C14.4139 11.5541 14.6219 11.2501 14.7659 10.9381C14.9098 10.6181 14.9818 10.2701 14.9818 9.89412C14.9818 9.41412 14.8699 8.98212 14.6458 8.59812C14.4298 8.21412 14.1019 7.91012 13.6618 7.68612C13.2298 7.46213 12.6819 7.35012 12.0178 7.35012C11.5459 7.35012 11.1219 7.42613 10.7458 7.57812C10.3699 7.73012 10.0499 7.93412 9.78585 8.19012C9.52986 8.43812 9.33385 8.72612 9.19785 9.05412C9.06186 9.37412 8.98986 9.70613 8.98185 10.0501C8.98185 10.1141 9.00585 10.1701 9.05385 10.2181C9.10185 10.2661 9.16185 10.2901 9.23385 10.2901H10.3018C10.3738 10.2901 10.4459 10.2701 10.5178 10.2301C10.5898 10.1901 10.6339 10.1181 10.6498 10.0141C10.6899 9.78212 10.7619 9.57012 10.8658 9.37812C10.9779 9.18612 11.1299 9.03413 11.3218 8.92212C11.5139 8.80212 11.7499 8.74212 12.0299 8.74212C12.4539 8.74212 12.7618 8.85413 12.9538 9.07812C13.1539 9.30212 13.2539 9.59412 13.2539 9.95412C13.2539 10.1941 13.1779 10.4381 13.0259 10.6861C12.8819 10.9261 12.6459 11.1941 12.3179 11.4901C11.9979 11.7781 11.5739 12.1301 11.0459 12.5461L9.14985 14.4301C9.02185 14.5341 8.93785 14.6381 8.89785 14.7421C8.86586 14.8381 8.84985 14.9221 8.84985 14.9941V15.6061C8.84985 15.6861 8.87786 15.7542 8.93385 15.8101Z"
												/>
											</svg>
										</div>
										Alert
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
										working
									>
										Alert Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
										disabled
									>
										Alert Disabled
									</panda-button>
								</div>
							</div><!-- row -->
		
							<div class="row" style="background: url(./transparent.png);">
								<div class="col-2">
									<panda-button
										theme="plain size-xl"
										@click="${this._onClick}"
									>
										Plain
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="plain size-xl"
										@click="${this._onClick}"
										working
									>
										Plain Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="plain size-xl"
										@click="${this._onClick}"
										disabled
									>
										Plain Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary size-s"
										@click="${this._onClick}"
									>
										Size-S
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-s"
										@click="${this._onClick}"
										working
									>
										Size-S Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-s"
										@click="${this._onClick}"
										disabled
									>
										Size-S Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary "
										@click="${this._onClick}"
									>
										Default
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary "
										@click="${this._onClick}"
										working
									>
										Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary "
										@click="${this._onClick}"
										disabled
									>
										Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary size-l"
										@click="${this._onClick}"
									>
										Size-L
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-l"
										@click="${this._onClick}"
										working
									>
										Size-L Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-l"
										@click="${this._onClick}"
										disabled
									>
										Size-L Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary size-xl"
										@click="${this._onClick}"
									>
										Size-XL
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-xl"
										@click="${this._onClick}"
										working
									>
										Size-XL Working
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-xl"
										@click="${this._onClick}"
										disabled
									>
										Size-XL Disabled
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary icon size-xl"
										@click="${this._onClick}"
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon size-l"
										@click="${this._onClick}"
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon"
										@click="${this._onClick}"
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon size-s"
										@click="${this._onClick}"
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary icon size-xl"
										@click="${this._onClick}"
										working
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon size-l"
										@click="${this._onClick}"
										working
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon"
										@click="${this._onClick}"
										working
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon size-s"
										@click="${this._onClick}"
										working
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary icon size-xl"
										@click="${this._onClick}"
										disabled
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon size-l"
										@click="${this._onClick}"
										disabled
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon"
										@click="${this._onClick}"
										disabled
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
									<panda-button
										theme="primary icon size-s"
										@click="${this._onClick}"
										disabled
									>
										<panda-icon icon="settings"></panda-icon>
									</panda-button>
								</div>
							</div><!-- row -->
							
							<div class="row">
								<div class="col-2">
									<panda-button
										theme="primary size-xl"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary size-l"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary "
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary size-s"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-xl"
										@click="${this._onClick}"
										working
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary size-l"
										@click="${this._onClick}"
										working
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary "
										@click="${this._onClick}"
										working
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary size-s"
										@click="${this._onClick}"
										working
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="primary size-xl"
										@click="${this._onClick}"
										disabled
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary size-l"
										@click="${this._onClick}"
										disabled
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary "
										@click="${this._onClick}"
										disabled
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
									<panda-button
										theme="primary size-s"
										@click="${this._onClick}"
										disabled
									>
										<div slot="prefix">
											<panda-icon icon="settings"></panda-icon>
										</div>
										Button Label
										<div slot="suffix">
											<panda-icon icon="check"></panda-icon>
										</div>
									</panda-button>
								</div>
							</div><!-- row -->

							<div class="row">
								<div class="col-2">
									<panda-button
										theme="align-right"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<panda-icon icon="chevron-left"></panda-icon>
										</div>
										Back
									</panda-button>
								</div>
								<div class="col-2">
									<panda-button
										theme="align-left"
										@click="${this._onClick}"
									>
										Next
										<div slot="suffix">
											<panda-icon icon="chevron-right"></panda-icon>
										</div>
									</panda-button>
								</div>
							</div><!-- row -->

						</div>
					</div>
				</div>
			</div>
			<hr />
			<panda-button
				style="width: 70px;"
				@click="${this._onClick}"
			>
				Primary Disabled
			</panda-button>
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- INSTALLATION -->
			<div class="content-section" data-content-section-name="${ContentSectionName.INSTALLATION}">
				<div class="section">
					<internal-link theme="h2">Installation</internal-link>
					<p>
						Start by initiating the installation of the npm library through a command executed in either the terminal or command prompt.
						Utilize the package manager, indicating both the library name and its version for installation.
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
			<!-- USAGE -->
			<div class="content-section" data-content-section-name="${ContentSectionName.USAGE}">
				<div class="section">
					<internal-link theme="h2">Usage</internal-link>
					<p>
						This section will help you to get familiar with component's properties and events. 
						Purpose of this segment is to equip developers with knowledge necessary to streamline the development process and elevate your web projects.
					</p>
	
					<code-sample header="Implementation Example">
						${implementationSnippet}
					</code-sample>
				</div>

				${this._renderComponentPropertiesSection()}
				${this._renderComponentEventsSection()}
			</div>
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section" data-content-section-name="${ContentSectionName.PROPERTIES}">
				<internal-link theme="h3">Properties</internal-link>
				<p>
					Component properties play a crucial role in specifying the component's behavior, appearance, and functionality, 
					and they are frequently employed for data binding purposes. 
				</p>
				<p>
					Here is a compilation of the supported properties/attributes for this particular component:
				</p>
				
				${this._renderComponentPropertyTable(this._componentProperties)}
			</div>
		`;
	}

	private _renderComponentEventsSection(): TemplateResult {
		return html`
			<!-- COMPONENT EVENTS -->
			<div class="section" data-content-section-name="${ContentSectionName.EVENTS}">
				<internal-link theme="h3">Events</internal-link>
				<p>
					Component events are instrumental in elevating the interactivity and adaptability of software applications. 
					These events serve as carefully designed triggers that facilitate communication between the component and the application, 
					frequently enabling the exchange of data and actions across diverse user interface elements.
				</p>
				<p>
					See list of events provided below:
				</p>
				
				${this._renderComponentEventsTable(this._componentEvents)}
			</div>
		`;
	}

	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Web components typically have different states that reflect their behavior and appearance based on user interaction or application logic.
						Below is the list of few states that are typical to this component:
					</p>
					<ul>
						<li>Default</li>
						<li>Disabled</li>
						<li>Busy</li>
					</ul>

					<!-- SAMPLE -->
					<div class="sample-cont">
						<div class="sample">
							<div class="rows">

								<div class="row">
									<div class="col-4">
										<panda-button
											@click="${this._onClick}"
										>
											Click Me!
										</panda-button>
									</div>
									<div class="col-4">
										<panda-button
											theme="primary"
											@click="${this._onClick}"
										>
											Click Me!
										</panda-button>
									</div>
									<div class="col-4">
										<panda-button
											theme="secondary"
											@click="${this._onClick}"
										>
											Click Me!
										</panda-button>
									</div>
								</div><!-- row -->

								<div class="row">
									<div class="col-4">
										<panda-button
											@click="${this._onClick}"
										>
											Primary
										</panda-button>
									</div>
									<div class="col-4">
										<label>Disabled</label>
										<panda-button
											theme="primary"
											@click="${this._onClick}"
										>
											Primary
										</panda-button>
									</div>
									<div class="col-4">
										<label>Disabled</label>
										<panda-button
											theme="secondary"
											@click="${this._onClick}"
										>
											Primary
										</panda-button>
									</div>
								</div><!-- row -->

							</div><!-- rows -->
						</div><!-- sample -->
					</div><!-- sample-cont -->
				</div><!-- section -->

				${this._renderDefaultComponentStateSection()}
				${this._renderDisabledComponentStateSection()}
				${this._renderBusyComponentStateSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderDefaultComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-default">
				<internal-link theme="h3">Default</internal-link>
				<p>
					The default state represents the initial appearance and behavior of the component when it is first rendered or loaded.
					It reflects the component's default settings and may display placeholder content or default styling.
				</p>

				

				<code-sample header="Default State Example">
					${defaultStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderDisabledComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-disabled">
				<internal-link theme="h3">Disabled</internal-link>
				<p>
					When a component enters this state, it becomes non-interactive, signaling to users that its functionality is temporarily unavailable or restricted.
					Visually, disabled components often appear grayed out or faded to indicate their inactive status.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Disabled State Example">
					${disabledStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderBusyComponentStateSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="component-states-busy">
				<internal-link theme="h3">Busy</internal-link>
				<p>
					The busy state of a component is instrumental in providing real-time feedback to users 
					during processes that require time to complete, such as data fetching, calculations, or file uploads. 
					When a component enters this state, it indicates to users that an operation is in progress, thereby 
					managing expectations and reducing confusion. 
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Busy State Example">
					${busyStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderFeaturesSection(): TemplateResult {
		return html`
			<!-- FEATURES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.FEATURES}">
				<div class="section">
					<internal-link theme="h2">Features</internal-link>
					<p>
						The component feature section provides a comprehensive overview of the available features and capabilities of the component. 
						This section serves as a valuable resource for developers, enabling them to understand the full potential of the component and how it can be effectively utilized within their projects. 
					</p>
					<p>
						See list of all supported features below:
					</p>
				</div>

				${this._renderPrefixFeatureSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderPrefixFeatureSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="feature-prefix">
				<internal-link theme="h3">Prefix</internal-link>
				<p>
					TBD
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
									>
										<div slot="prefix">
											<panda-icon icon="check"></panda-icon>
										</div>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										disabled
									>
										<div slot="prefix">
											<panda-icon icon="check"></panda-icon>
										</div>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										busy
									>
										<div slot="prefix">
											<panda-icon icon="check"></panda-icon>
										</div>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Info Theme Example">
					${infoThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderThemingSection(): TemplateResult {
		return html`
			<!-- THEMING -->
			<div class="content-section" data-content-section-name="${ContentSectionName.THEMING}">
				<div class="section">
					<internal-link theme="h2">Theming</internal-link>
					<p>
						Theming a web component with four base themes provides developers with a versatile toolkit 
						for visually communicating different states and messages to users. 
						Each theme corresponds to a specific context: info for neutral information, success for 
						positive feedback, warning for cautionary alerts, and error for critical errors.
					</p>
				</div>

				${this._renderInfoThemeSection()}
				${this._renderDoneThemeSection()}
				${this._renderWarnThemeSection()}
				${this._renderAlertThemeSection()}

				${this._renderPrimaryThemeSection()}
				${this._renderSecondaryThemeSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderInfoThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-info">
				<internal-link theme="h3">Info Theme</internal-link>
				<p>
					Buttons with the <i class="code">info</i> theme could be used for actions that provide users with additional information or guidance without invoking any significant changes or consequences. 
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="info"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Info Theme Example">
					${infoThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderDoneThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-done">
				<internal-link theme="h3">Done Theme</internal-link>
				<p>
					Buttons with the <i class="code">done</i> theme are often used to confirm successful actions or completion of a task.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="done"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="done"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="done"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Done Theme Example">
					${doneThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderWarnThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-warn">
				<internal-link theme="h3">Warn Theme</internal-link>
				<p>
					Buttons with the <i class="code">warn</i> theme are typically used to signify actions that may have potentially risky or irreversible consequences.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="warn"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Warn Theme Example">
					${warnThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderAlertThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-alert">
				<internal-link theme="h3">Alert Theme</internal-link>
				<p>
					Buttons with the <i class="code">alert</i> theme are prominently displayed to prompt users to take corrective action when errors or validation issues occur. 
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="alert"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Alert Theme Example">
					${alertThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderPrimaryThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-primary">
				<internal-link theme="h3">Primary Theme</internal-link>
				<p>
					Buttons with the <i class="code">primary</i> theme are prominently displayed to encourage users to take the most essential actions within the interface.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="primary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Primary Theme Example">
					${primaryThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderSecondaryThemeSection(): TemplateResult {
		return html`
			<div class="section" data-content-section-name="theming-secondary">
				<internal-link theme="h3">Secondary Theme</internal-link>
				<p>
					Buttons with the <i class="code">secondary</i> theme complement primary actions by offering additional, but less frequently used, functionality.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										disabled
									>
										Click Me!
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										theme="secondary"
										@click="${this._onClick}"
										busy
									>
										Click Me!
									</panda-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<code-sample header="Primary Theme Example">
					${primaryThemeSnippet}
				</code-sample>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClick(): void {
		console.log("%c ⚡ [BUTTON DEMO PAGE] click", "font-size: 24px; color: orange;");
		toastCenter.createToast({
			message: "Button Clicked",
			theme: "info",
			closable: true,
			interval: 1000,
		});
	}


}