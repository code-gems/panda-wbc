// types
import { Store } from "panda-design-typings";

// styles
import { styles, navigation } from "./styles/styles";

// components & web parts
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-theme-controls/lib/panda-theme-mode-switcher";
import "../app-logo/app-logo";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import PageLibrary from "../../utils/page-library";
import { appStore, reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

// actions
import { toggleMobileMenu } from "../../redux/actions/common";

@customElement("app-header")
@reduxify()
export class AppHeader extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			navigation,
		];
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
		return html`
			<div class="container">
				<div class="logo" @click="${() => navigate("/home")}">
					<app-logo></app-logo>
				</div>
				<div class="grow"></div>
				<nav class="menu">
					${this._renderMenu()}
				</nav>
				<div class="menu-btn mobile">
					<panda-button
						theme="size-s icon"
						@click="${this._onToggleMobileMenu}"
					>
						<panda-icon icon="menu"></panda-icon>
					</panda-button>
				</div>
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleMobileMenu(): void {
		appStore.dispatch(
			toggleMobileMenu({
				show: !this._showMobileMenu
			})
		);
	}
}