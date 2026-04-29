// types
import { Store, Page } from "panda-design-typings";

// styles
import { uiComponents } from "../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// components & web-parts
import "../web-parts/app-header/app-header";
import "../web-parts/app-footer/app-footer";
import "../web-parts/app-mobile-menu/app-mobile-menu";

// utils
import { CSSResultGroup, LitElement, TemplateResult, html } from "lit";
import { state } from "lit/decorators.js";
import { reduxify } from "../redux/store";
import PageLibrary from "../utils/page-library";

@reduxify()
export abstract class ParentPageTemplate extends LitElement {
	// css styles
	static get styles() {
		return [
			scrollbar,
			uiComponents.layout,
			uiComponents.columnSystem,
			uiComponents.modifiers,
		];
	}

	// page details
	@state()
	public pageConfig!: Page;
	
	public customStyles!: CSSResultGroup;

	// private properties

	@state()
	private _pageId!: string;

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
			this._pageId = searchParams?.page as string;
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
				<header>
					<app-header></app-header>
					<app-mobile-menu></app-mobile-menu>
				</header>
				<main>
					<div class="body">
						<div class="body-wrap scrollbar">
							${this._renderPageTemplate()}
						</div>
					</div>
				</main>
				<footer>
					<app-footer></app-footer>
				</footer>
			</div>
		`;
	}

	private _renderPageTemplate(): TemplateResult {
		if (this._pageId) {
			const selectedPage = new PageLibrary().getPageById(this._pageId);
			return selectedPage?.template ?? html`NO TEMPLATE FOUND`;
		} else {
			return this._renderPageContent();
		}
	}
	
	abstract _renderPageContent(): TemplateResult;
}
