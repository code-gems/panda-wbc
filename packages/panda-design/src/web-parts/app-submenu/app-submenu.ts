// types
import { AppState, PageCategory } from "panda-design-typings";
import { SearchParams } from "@panda-wbc/panda-router";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// components
import "@panda-wbc/panda-icon";

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

	stateChanged(state: AppState) {
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
					pageCategory: ${this.pageCategory}
				</div>
				<div class="body scroll">
					${this._renderPageList()}
				</div>
				<div class="footer">
					FOOTER
				</div>
			</div>
		`;
	}

	private _renderPageList() {
		const menuHtml: TemplateResult[] = [];
		const demoPages = new PageLibrary().getPages(this.pageCategory, true);
		console.log("%c demoPages", "font-size: 24px; color: green;", demoPages);
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}