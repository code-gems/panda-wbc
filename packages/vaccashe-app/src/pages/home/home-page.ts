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
			${this._renderSection2()}
			${this._renderSection3()}
		`;
	}

	/** Hero section */
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
									<panda-icon icon="arrow-forward"></panda-icon>
								</div>
							</panda-button>
							<panda-button @click="${this._onNavigateToContact}">
								VISIT US
							</panda-button>
						</div>
						<div class="flex flex-row mt-4 gap-2">
							<panda-chip theme="size-s" icon="leaf">
								No seed oils
							</panda-chip>
							<panda-chip theme="size-s" icon="flame">
								No MSG
							</panda-chip>
							<panda-chip theme="size-s" icon="dumbbell">
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

	/** Why we're different section */
	private _renderSection2(): TemplateResult {
		return html`
			<section class="container px-8 py-19 md:py-24 bg-700">
				<div class="row gap-8">
					<div class="col-6 sm:col-12 justify-center">
						<div class="eyebrow">Why we're different</div>
						<div class="header-l mt-4">No junk. Just results.</div>

						<div class="text-m mt-5 txt-label">
							Most cafes sell "healthy food" loaded with hidden oils and processed ingredients. 
							We do it differently — every single ingredient is chosen for what it does to your body.
						</div>
					</div>
					<div class="col-6 sm:col-12 justify-center sm:mt-8">
						<div class="flex flex-column gap-3">
							<panda-chip theme="size-l" icon="check-circle" class="list w-100">
								No seed oils, ever
							</panda-chip>
							<panda-chip theme="size-l" icon="check-circle" class="list w-100">
								No MSG or hidden additives
							</panda-chip>
							<panda-chip theme="size-l" icon="check-circle" class="list w-100">
								No ultra-processed ingredients
							</panda-chip>
							<panda-chip theme="size-l" icon="check-circle" class="list w-100">
								High protein in every meal
							</panda-chip>
							<panda-chip theme="size-l" icon="check-circle" class="list w-100">
								Transparent ingredients you can pronounce
							</panda-chip>
						</div>
					</div>
				</div>
			</section>
		`;
	}

	/** Signature plates section */
	private _renderSection3(): TemplateResult {
		return html`
			<section class="container px-8 py-19 md:py-24">
				<div class="row">

					<div class="col-8 sm:col-12">
						<div class="eyebrow">Signature plates</div>
						<div class="header-l mt-4">High protein meals that actually fuel performance.</div>
					</div>

					<div class="col-4 sm:col-12 justify-end align-end">
						<panda-button
							class="fit"
							@click="${this._onNavigateToMenu}"
						>
							FULL MENU
							<div slot="suffix" class="icon">
								<panda-icon icon="arrow-forward"></panda-icon>
							</div>
						</panda-button>
					</div>
				</div>

				<div class="row">

					<div class="col-4 sm:col-12">
						<div class="card">
							<div class="card-image">
								<img src="/assets/images/home/signature-plate-1.png" alt="Signature Plate 1">
							</div>
							<div class="card-content">
								<div class="card-title">The Power Bowl</div>
								<div class="card-description">
									Grilled chicken, quinoa, avocado, roasted veggies, and our signature superfood sauce.
								</div>
							</div>
						</div>
					</div>

					<div class="col-4 sm:col-12">
						<div class="card">
							<div class="card-image">
								<img src="/assets/images/home/signature-plate-2.png" alt="Signature Plate 2">
							</div>
							<div class="card-content">
								<div class="card-title">The Protein Stack</div>
								<div class="card-description">
									Grass-fed beef, sweet potato, sautéed greens, and our signature superfood sauce.
								</div>
							</div>
						</div>
					</div>

					<div class="col-4 sm:col-12">
						<div class="card">
							<div class="card-image">
								<img src="/assets/images/home/signature-plate-3.png" alt="Signature Plate 3">
							</div>
							<div class="card-content">
								<div class="card-title">The Power Bowl</div>
								<div class="card-description">
									Grilled chicken, quinoa, avocado, roasted veggies, and our signature superfood sauce.
								</div>
							</div>
						</div>
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