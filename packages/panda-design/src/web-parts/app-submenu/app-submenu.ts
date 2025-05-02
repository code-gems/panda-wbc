// types
import { Store, PageCategory } from "panda-design-typings";
import { SearchParams } from "@panda-wbc/panda-router";
import { PandaSearchOnInputEvent } from "@panda-wbc/panda-search";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-search";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import PageLibrary from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

@customElement("app-submenu")
@reduxify()
class AppSubmenu extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			scrollbar,
			uiComponents.modifiers,
		];
	}

	@property({ type: String })
	pageCategory!: PageCategory;

	@property({ type: String })
	pathname!: string;

	@property({ type: String })
	searchParams!: SearchParams;

	// view props
	@property({ type: String })
	private _searchText: string = "";

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: Store) {
		const {
			currentPageDetails: {
				pathname,
				searchParams,
			}
		} = state;
		this.pathname = pathname;
		this.searchParams = searchParams;
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="submenu">
				<div class="header">
					<div class="search">
						<panda-search @on-input="${this._onContentSearch}"></panda-search>
					</div>
				</div>
				<div class="body scrollbar">
					${this._renderPageList()}
				</div>
				<div class="footer">
				</div>
			</div>
		`;
	}

	private _renderPageList() {
		const listHtml: TemplateResult[] = [];
		const allPages = new PageLibrary().getPages(this.pageCategory, true);

		allPages.forEach((page) => {
			const active = page.pageId === this.searchParams.page
				? "active"
				: "";
			
			// filer menu against search text
			if (this._searchText) {
				// check page keywords
				let _foundKeywordMatch = false;
				if (page.keywords) {
					page.keywords.forEach((keyword) => {
						if (keyword.toLocaleLowerCase().includes(this._searchText.toLocaleLowerCase())) {
							_foundKeywordMatch = true;
						}
					});
				}

				// check page name
				if (page.pageName.toLocaleLowerCase().includes(this._searchText.toLocaleLowerCase()) || _foundKeywordMatch) {
					listHtml.push(html`
						<div
							class="list-item ${active}"
							@click="${(e: MouseEvent) => navigate(page.pageUri, e)}"
						>
							<label>${page.pageName}</label>
							<div class="icon">
								<panda-icon icon="chevron-right"></panda-icon>
							</div>
						</div>
					`);
				}
			} else {
				listHtml.push(html`
					<div
						class="list-item ${active}"
						@click="${(e: MouseEvent) => navigate(page.pageUri, e)}"
					>
						<label>${page.pageName}</label>
						<div class="icon">
							<panda-icon icon="chevron-right"></panda-icon>
						</div>
					</div>
				`);
			}
		});

		return html`
			<div class="menu-list">
				${listHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onContentSearch(event: PandaSearchOnInputEvent): void {
		const searchText = event.detail.value;
		this._searchText = searchText;
	}
}