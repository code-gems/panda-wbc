// types
import { AppState, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// web parts
import "../../web-parts/side-menu-bar/side-menu-bar";

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
	icon: "code-sample",
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

	@property({ type: String, attribute: false })
	private _pageId!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

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
			<div class="app">
				<div class="side-bar">
					<side-menu-bar></side-menu-bar>
				</div>
				<div class="submenu">
					<div class="header">
						<panda-search
							placeholder="Find..."
							.on-input=""
						>
						</panda-search>
					</div>
					<div class="body scroll">
						${this._renderPageList()}
					</div>
				</div>
				<div class="body">
					${this._renderPageTemplate()}
				</div>
			</div>
		`;
	}

	private _renderMainPage() {
		return html`
			<div class="body-wrap scroll">
				<div class="banner">
					<h1>DEVELOP</h1>
					<p>
						Welcome to Panda Develop Section.
						Panda Components is a collection of pre-built and reusable user interface components and elements that are specifically designed for a particular application or website. 
					</p>
				</div>
				
				<div class="section">
					<h1>Tailored Design & Branding</h1>
					<p>
						Unlike generic UI libraries, a panda element library is tailored to match the unique design requirements and branding of a specific application or website. 
						The elements within the library are carefully crafted to reflect the visual identity, color scheme, typography, and overall style guidelines of the project. 
						This ensures a cohesive and visually pleasing user experience that aligns with the brand's image.
					</p>
				</div>
				
				<div class="section">
					<h1>Consistency & Efficiency</h1>
					<p>
						By utilizing a custom element library, developers can ensure a consistent look and feel throughout the application or website. 
						Since the elements are pre-designed and thoroughly tested, they maintain a standardized behavior and visual consistency across different screens and interactions. 
						This consistency not only enhances the user experience but also improves development efficiency as developers can reuse and modify existing components rather than starting from scratch.
					</p>
				</div>
				
				<div class="section">
					<h1>Flexibility & Extensibility</h1>
					<p>
						While a custom element library provides a set of predefined components, it should also allow for flexibility and extensibility. 
						Developers should be able to customize the elements to suit specific needs or create new components that seamlessly integrate with the existing library. 
						This flexibility ensures that the library can adapt to evolving design requirements and accommodate future enhancements.
					</p>
				</div>
			</div>
		`;
	}

	private _renderPageList() {
		const menuHtml: TemplateResult[] = [];
		const demoPages = new PageLibrary().getPages(PageCategory.DEVELOP, true);

		demoPages.forEach((page) => {
			menuHtml.push(html`
				<div
					class="list-item"
					@click="${(e: MouseEvent) => navigate(page.pageUri, e)}"
				>
					<label>${page.pageName}</label>
					<div class="icon">
						<panda-icon icon="chevron-right"></panda-icon>
					</div>
				</div>
			`);
		});

		return html`
			<div class="menu-list">
				${menuHtml}
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