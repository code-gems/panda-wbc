// styles & mixins
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-button";

// web parts
// ...

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { ParentPageTemplate } from "../parent-page-template";
import { page } from "../../utils/page-library";

// page config
import { pageConfig } from "./page-config";

@page(pageConfig)
@customElement("home-page")
class HomePage extends ParentPageTemplate {
	// page details
	pageConfig = pageConfig;
	customStyles = styles;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderSection1()}
		`;
	};

	private _renderSection1(): TemplateResult {
		return html`
			<section class="container px-8 py-19 md:py-24">
				<div class="row">
					<div class="col-7 sm:col-12">
						<div class="eyebrow">&bull; CANGGU · BALI</div>
						<div class="header-xl">Clean fuel.</div>
						<div class="header-xl txt-primary">High protein.</div>
						<div class="header-xl">No seed oils.</div>
						<div class="text-l">
							At Vaccashe Superfood we serve real food that performs — built for gym-goers, surfers and anyone chasing a high-performance lifestyle.
						</div>
						<div>
							<panda-button
								theme="primary"
								@click=""
							>
								SEE THE MENU
								<div slot="suffix" class="icon">
									<panda-icon icon="check"></panda-icon>
								</div>
							</panda-button>
							<panda-button @click="">
								VISIT US
							</panda-button>
						</div>
					</div>
					<div class="col-5 sm:col-12">

					</div>
				</div>
			</section>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}