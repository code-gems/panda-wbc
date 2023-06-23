// types
import { PageCategory } from "panda-design-typings";

// utils
import { LitElement, TemplateResult, html } from "lit";
import PageLibrary from "../utils/page-library";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

export abstract class ParentPageTemplate extends LitElement {
	// page details
	abstract pageId: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================


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

	private _renderPageTemplate() {
		if (this.pageId) {
			const selectedPage = new PageLibrary().getPageById(this.pageId);
			return selectedPage?.template;
		} else {
			return this._renderPageContent();
		}
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

	abstract _renderBanner(): TemplateResult;

	abstract _renderPageContent(): TemplateResult;

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...

}
