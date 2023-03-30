// types
import { AppState, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";

// web parts
import "../../web-parts/main-nav/main-nav";
import { pandaLogo } from "../../web-parts/panda-logo";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import PageLibrary, { page } from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

@customElement("home-page")
@page({
	pageId: "home",
	pageName: "Home",
	pageUri: "/home",
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
			styles
		];
	}

	private _pageLibrary!: PageLibrary;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		// init page library 
		this._pageLibrary = new PageLibrary();
	}

	stateChanged(state: AppState) {
		console.log("%c [HOME PAGE] stateChanged", "font-size: 24px; color: green;", state);
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<main-nav></main-nav>
			<div class="banner">
				${pandaLogo}
			</div>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>

			<hr />
			${this._renderPageList()}
		`;
	}

	private _renderPageList() {
		const listTemplate: TemplateResult[] = [];

		const allPages = this._pageLibrary.getAllPages();

		allPages.forEach((page) => {
			listTemplate.push(html`
				<div
					class="nav-item"
					@click="${(e: MouseEvent) => this._onNavigate(e, page.pageName)}"
				>
					${page.pageName}
				</div>
			`);
		});

		return html`
			<div class="nav">
				${listTemplate}
			</div>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onNavigate(e: MouseEvent, pathName: string) {
		navigate(pathName, e);
	}
}