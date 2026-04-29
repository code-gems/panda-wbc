// styles
import { styles, list } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/map-icon-pack";
import "@panda-wbc/panda-icon/lib/social-icon-pack";
import "../app-logo/app-logo";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

// constants
import {
	BRAND_EMAIL_ADDRESS,
	BRAND_INSTAGRAM_ACCOUNT,
	BRAND_STORE_SHORT_ADDRESS,
} from "../../constants";

@customElement("app-footer")
class AppFooter extends LitElement {
	// css styles
	static get styles() {
		return [styles, list];
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<footer>
				<div class="footer-cont">
					<div class="container top">

						<div class="footer-logo">
							<app-logo class="logo"></app-logo>
							<div class="text">
								Performance-driven nutrition in Canggu, Bali. 
								Clean ingredients, no&nbsp;seed oils, real food that fuels real bodies.
							</div>
						</div>

						<!-- VISIT -->
						<div class="list">
							<div class="header uppercase">Visit Us</div>
							<div class="item">
								<div class="icon">
									<panda-icon icon="map-pin-outline"></panda-icon>
								</div>
								<div class="text">${BRAND_STORE_SHORT_ADDRESS}</div>
							</div>
							<div class="item">
								<div class="icon">
									<panda-icon icon="mail-outline"></panda-icon>
								</div>
								<div class="text">${BRAND_EMAIL_ADDRESS}</div>
							</div>
							<div class="item">
								<div class="icon">
									<panda-icon icon="instagram"></panda-icon>
								</div>
								<div class="text">${BRAND_INSTAGRAM_ACCOUNT}</div>
							</div>
						</div>

						<!-- EXPLORE -->
						<div class="list">
							<div class="header uppercase">Explore</div>
							<div class="item">
								<div
									class="text link"
									@click=${() => navigate("/menu")}
								>
									Menu
								</div>
							</div>
							<div class="item">
								<div
									class="text link"
									@click=${() => navigate("/about")}
								>
									About
								</div>
							</div>
							<div class="item">
								<div
									class="text link"
									@click=${() => navigate("/contact")}
								>
									Contact
								</div>
							</div>
						</div>
					</div>

					<div class="border-top">
						<div class="container bottom font-size-xs">
							<div>© ${new Date().getFullYear()} Vaccashe Superfood. Fuel smart. Eat elite.</div>
							<div class="uppercase tracking-wide">No seed oils · No MSG · No junk</div>
						</div>
					</div>
				</div>
			</footer>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

}