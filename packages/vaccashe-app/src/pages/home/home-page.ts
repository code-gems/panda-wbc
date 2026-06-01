// styles & mixins
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-chips";
import "@panda-wbc/panda-icon";

// web parts
// ...

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { ParentPageTemplate } from "../parent-page-template";
import { page } from "../../utils/page-library";

// page config
import { pageConfig } from "./page-config";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

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
						<div class="text-l mt-4">
							At Vaccashe Superfood we serve real food that performs — built for gym-goers, surfers and anyone chasing a high-performance lifestyle.
						</div>
						<div class="actions">
							<panda-button
								class="efx-jump"
								theme="primary"
								@click="${this._onNavigateToMenu}"
							>
								SEE THE MENU
								<div slot="suffix" class="icon">
									<panda-icon icon="check"></panda-icon>
								</div>
							</panda-button>
							<panda-button @click="${this._onNavigateToContact}">
								VISIT US
							</panda-button>
						</div>
						<div class="flex flex-row mt-4 gap-2">
							<panda-chip theme="size-s" icon="check">
								No seed oils
							</panda-chip>
							<panda-chip theme="size-s" icon="check">
								No MSG
							</panda-chip>
							<panda-chip theme="size-s" icon="check">
								High protein
							</panda-chip>
							<panda-chip theme="size-s" icon="check">
								Real ingredients
							</panda-chip>
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

	private _onNavigateToMenu(): void {
		navigate("/menu");
	}

	private _onNavigateToContact(): void {
		navigate("/contact");
	}
}