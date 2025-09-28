// types
import { Store } from "panda-design-typings";
import { PandaThemeSwitcherToggleEvent, PandaThemeSwitcherTheme } from "@panda-wbc/panda-theme-switcher";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// components & web parts
// import "@panda-wbc/panda-theme-controls/lib/panda-theme-switcher";
import "../dragon-logo/dragon-logo";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import PageLibrary from "../../utils/page-library";
import { appStore, reduxify } from "../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

// actions
import { changeTheme } from "../../redux/actions/common";

@customElement("app-side-bar")
@reduxify()
class AppSideBar extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			scrollbar,
			uiComponents.modifiers,
		];
	}

	@state()
	private _pathname!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: Store) {
		const {
			currentPageDetails: {
				pathname
			}
		} = state;
		this._pathname = pathname;
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="side-bar">
				<div class="header">
					<div class="logo">
						<dragon-logo>
						</dragon-logo>
					</div>
				</div>
				<div class="body scrollbar">
					${this._renderSideMenu()}
				</div>
				<div class="footer">
					<panda-theme-mode-switcher></panda-theme-mode-switcher>
				</div>
			</div>
		`;
	}

	private _renderSideMenu() {
		const btnHtml: TemplateResult[] = [];
		const allPages = new PageLibrary().getParentPages();

		allPages.forEach((page) => {
			// console.log("%c page", "font-size: 24px; color: green;", page);
			const active = page.pageUri === this._pathname
				? "active"
				: "";

			btnHtml.push(html`
				<div
					class="btn ${active}"
					@click="${(e: MouseEvent) => navigate(page.pageUri, e)}"
				>
					<div class="icon">
						<panda-icon .icon="${page.icon}"></panda-icon>
					</div>
					<label>${page.pageName}</label>
				</div>
			`);
		});

		return btnHtml;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeTheme(event: PandaThemeSwitcherToggleEvent) {
		const selectedTheme = event.detail.value;
		let themeName = "panda-theme-light";
		if (selectedTheme === PandaThemeSwitcherTheme.LIGHT) {
			themeName = "panda-theme-light";
		} else {
			themeName = "panda-theme-dark";
		}

		appStore.dispatch(
			changeTheme({
				themeName
			})
		);
	}
}