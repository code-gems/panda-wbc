// types
import { AppState, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// web parts
import "@panda-wbc/panda-particle-banner";
import "../../web-parts/app-side-bar/app-side-bar";
import "../../web-parts/main-nav/main-nav";
import { pandaLogo } from "../../web-parts/panda-logo";

// utils
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PageLibrary, page } from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

@customElement("home-page")
@page({
	pageId: "home",
	pageName: "Home",
	pageUri: "/home",
	icon: "home",
	parent: true,
	category: PageCategory.HOME,
	keywords: [],
	description: [],
	contextMenu: [],
	template: html`<home-page></home-page>`
})
@reduxify()
class HomePage extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.banner,
			uiComponents.appLayout,
			uiComponents.modifiers,
		];
	}

	@property({ type: String })
	private _pageId!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: AppState) {
		console.log("%c [HOME PAGE] stateChanged", "font-size: 24px; color: green;", state);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="app">
				<div class="side-bar">
					<app-side-bar></app-side-bar>
				</div>
				<div class="body">
					${this._renderPageTemplate()}
				</div>
			</div>
		`;
	}

	private _renderMainPage() {
		const bannerConfig: PandaParticleBannerConfig = {
			particleCount: 180,
			mouseOffset: true,
			mouseOffsetXSensitivity: 10,
			mouseOffsetYSensitivity: 10,

			speedXMin: -0.1,
			speedXMax: 0.1,
			speedYMin: -0.1,
			speedYMax: 0.1,

			sizeMin: 5,
			sizeMax: 100,

			blur: true,
			blurMin: 5,
			blurMax: 10,
		};

		return html`
			<div class="body-wrap scroll">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					${pandaLogo}
					some text here
				</panda-particle-banner>
			</div>
		`;
	}

	private _renderPageTemplate() {
		if (this._pageId) {
			const selectedPage = new PageLibrary().getPageById(this._pageId);
			return selectedPage?.template;
		} else {
			return this._renderMainPage();
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}