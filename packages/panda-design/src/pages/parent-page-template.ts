// types
import { AppState, PageCategory } from "panda-design-typings";

// styles
import { uiComponents } from "../styles/styles";

// components & web-parts
import "../web-parts/app-side-bar/app-side-bar";
import "../web-parts/app-submenu/app-submenu";

// utils
import { CSSResultGroup, LitElement, TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import { reduxify } from "../redux/store";
import PageLibrary from "../utils/page-library";

@reduxify()
export abstract class ParentPageTemplate extends LitElement {
	// css styles
	static get styles() {
		return [
			uiComponents.banner,
			uiComponents.appLayout,
			uiComponents.modifiers,
		];
	}

	// page details
	@property({ type: String })
	public pageId!: string
	
	public customStyles!: CSSResultGroup;

	@property({ type: String })
	abstract pageCategory: PageCategory;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	protected stateChanged(state: AppState) {
		if (state?.currentPageDetails) {
			const {
				currentPageDetails: {
					searchParams
				}
			} = state;
			this.pageId = searchParams?.content || null;
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================
	
	protected render() {
		return html`
			<style>
				${this.customStyles || ""}
			</style>
			<div class="app">
				<div class="side-bar">
					<app-side-bar></app-side-bar>
				</div>
				<div class="submenu">
					<app-submenu .pageCategory="${this.pageCategory}"></app-submenu>
				</div>
				<div class="body">
					${this._renderPageTemplate()}
				</div>
			</div>
		`;
	}

	private _renderPageTemplate() {
		if (this.pageId) {
			const selectedPage = new PageLibrary().getPageById(this.pageId);
			return selectedPage?.template;
		} else {
			return html`
				${this._renderBanner()}
				${this._renderPageContent()}
			`;
		}
	}
	
	abstract _renderBanner(): TemplateResult;

	abstract _renderPageContent(): TemplateResult;
}
