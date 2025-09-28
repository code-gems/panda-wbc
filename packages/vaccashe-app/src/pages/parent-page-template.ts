// types
import { Store, PageCategory } from "panda-design-typings";

// styles
import { uiComponents } from "../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

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
			scrollbar,
			uiComponents.appLayout,
			uiComponents.banner,
			uiComponents.cards,
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
	
	protected stateChanged(state: Store) {
		if (state?.currentPageDetails) {
			const {
				currentPageDetails: {
					searchParams
				}
			} = state;
			this.pageId = searchParams?.page || null;
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
					<div class="body-wrap scrollbar">
						${this._renderPageTemplate()}
					</div>
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
