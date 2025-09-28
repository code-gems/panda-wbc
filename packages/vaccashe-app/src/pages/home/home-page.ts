// types
import { Store, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// web parts
import "../../web-parts/app-side-bar/app-side-bar";
import "../../web-parts/main-nav/main-nav";

// utils
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PageLibrary, page } from "../../utils/page-library";
import { reduxify } from "../../redux/store";

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

	stateChanged(state: Store) {
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
		

		return html`
			home
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