// types
import { Store } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import PageLibrary from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

@customElement("app-mobile-menu")
@reduxify()
class AppMobileMenu extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@state()
	private _showMobileMenu!: boolean;

	@state()
	private _pathname!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: Store) {
		const {
			showMobileMenu,
			currentPageDetails: {
				pathname
			}
		} = state;
		this._pathname = pathname;
		this._showMobileMenu = showMobileMenu;
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const showMenu = this._showMobileMenu ? "show" : "";
		return html`
			<div class="menu ${showMenu}">
				${this._renderMenu()}
			</div>
		`;
	}

	private _renderMenu() {
		const allPages = new PageLibrary().getParentPages();
		const menuItemHtml: TemplateResult[] = [];

		allPages.forEach((page) => {
			const active = page.pageUri === this._pathname
				? "active"
				: "";

			menuItemHtml.push(html`
				<a
					class="item ${active}"
					@click="${(event: MouseEvent) => navigate(page.pageUri, event)}"
				>
					${page.pageName}
				</a>
			`);
		});

		return menuItemHtml;
	}

}