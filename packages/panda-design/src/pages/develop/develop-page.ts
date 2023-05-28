// types
import { AppState, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// web parts
import "../../web-parts/main-nav/main-nav";

// load demo pages
import "./loader";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import PageLibrary, { page } from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

@customElement("develop-page")
@page({
	pageId: "develop",
	pageName: "Develop",
	pageUri: "/develop",
	parent: true,
	category: PageCategory.DEVELOP,
	keywords: ["components", "custom", "elements", "documentation", "code", "snippets"],
	description: ["Develop description"],
	contextMenu: [],
	template: html`<develop-page></develop-page>`,
})
@reduxify()
class DevelopPage extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.banner,
			uiComponents.appLayout,
			uiComponents.menuList,
			uiComponents.modifiers,
		];
	}

	private _pageLibrary!: PageLibrary;

	@property({ type: String, attribute: false })
	private _pageId!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// init page library 
		this._pageLibrary = new PageLibrary();
	}

	stateChanged(state: AppState) {
		if (state?.currentPageDetails) {
			const {
				currentPageDetails: {
					searchParams
				}
			} = state;

			this._pageId = searchParams?.content || null;
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<main-nav></main-nav>
			<div class="page">
				<div class="page-cont">
					<div class="column column-left">
						${this._renderDemoPageList()}
					</div>
					<div class="column">
						${this._renderDemoPage()}
					</div>
				</div>
			</div>
		`;
	}

	private _renderDemoPageList() {
		const menuHtml: TemplateResult[] = [];
		const demoPages = this._pageLibrary.getPages(PageCategory.DEVELOP, true);

		demoPages.forEach((page) => {
			menuHtml.push(html`
				<div
					class="menu-list-item"
					@click="${() => navigate(page.pageUri)}"
				>
					${page.pageName}
				</div>
			`);
		});

		return html`
			<div class="menu-list">
				${menuHtml}
			</div>
		`;
	}

	private _renderDemoPage() {
		if (this._pageId) {
			const selectedPage = this._pageLibrary.getPageById(this._pageId);
			return selectedPage?.template;
		} else {
			return html`Select demo page...`;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================


}