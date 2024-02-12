// types
import { PandaRadioGroupChangeEvent } from "@panda-wbc/panda-radio-group";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-radio-group";

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";

@customElement("panda-radio-button-content-page")
@page(pageConfig)
export class PandaRadioButtonContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles = styles;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>RADIO BUTTON</h1>

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
					<h2>Overview</h2>
					<p>
						Radio buttons are a type of input used in web applications to present a list of options where the user can select only one. 
						They are typically used when the user needs to see all available options listed and can select only one of them. 
					</p>
					<p>
						Radio buttons are often grouped together, and the system ensures that only one radio button within a group can be selected at a time. 
						They are useful for creating a list of mutually exclusive options, such as asking a yes or no question or selecting an age or salary range.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">

						<panda-radio-group
							label="Select Theme:"
							@change="${this._onChangeValue}"
							.disabled="${true}"
						>
							<panda-radio-button .value="${"Light"}" checked>Light</panda-radio-button>
							<panda-radio-button .value="${"Dark"}">Dark</panda-radio-button>
							<panda-radio-button .value="${"Tropical Lime"}">Tropical Lime</panda-radio-button>
							<panda-radio-button .value="${"Sunset"}" disabled>Sunset</panda-radio-button>
							<panda-radio-button .value="${"Midnight Blue"}">Midnight Blue</panda-radio-button>
						</panda-radio-group>

					</div>
				</div>

				<div class="sample-cont">
					<div class="sample">

						<panda-radio-group
							label="Select Theme:"
							@change="${this._onChangeValue}"
							.disabled="${false}"
						>
							<panda-radio-button .value="${"Light"}" checked>Light</panda-radio-button>
							<panda-radio-button .value="${"Dark"}">Dark</panda-radio-button>
							<panda-radio-button .value="${"Tropical Lime"}">Tropical Lime</panda-radio-button>
							<panda-radio-button .value="${"Sunset"}" disabled>Sunset</panda-radio-button>
							<panda-radio-button .value="${"Midnight Blue"}">Midnight Blue</panda-radio-button>
						</panda-radio-group>

					</div>
				</div>

			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeValue(event: PandaRadioGroupChangeEvent) {
		const value = event.detail.value;
		console.log("%c 🚀 [DEMO PAGE] @change", "font-size: 24px; color: green;", value);
	}
}