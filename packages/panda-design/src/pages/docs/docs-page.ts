// types
import { AppState, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/ui-components";

// web parts
import "../../common/web-parts/main-nav/main-nav";

// load demo pages
import "./loader";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import PageLibrary, { page } from "../../common/page-library";
import { reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

@customElement("docs-page")
@page({
	pageId: "docs",
	pageName: "Docs",
	pageUri: "/docs",
	parent: true,
	category: PageCategory.DOCS,
	keywords: ["components", "custom", "elements", "documentation", "code", "snippets"],
	description: ["Docs description"],
	contextMenu: [],
	template: html`<docs-page></docs-page>`
})
@reduxify()
class DocsPage extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.menuList
		];
	}

	private _pageLibrary!: PageLibrary;

	@property({ type: String, attribute: false })
	private _demoPage!: string;

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

			this._demoPage = searchParams?.demo || null;
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
		const demoPages = this._pageLibrary.getPages(PageCategory.DOCS, true);

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
		if (this._demoPage) {
			const selectedPage = this._pageLibrary.getPageById(this._demoPage);
			return selectedPage?.template;
		} else {
			return html`Select demo page...`;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================


}