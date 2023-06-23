// types
import { AppState } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
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
			uiComponents.modifiers,
		];
	}

	@property({ type: String })
	selectedTheme: string | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: AppState) {
		const {
			selectedTheme
		} = state;
		this.selectedTheme = selectedTheme;
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="side-bar">
				<div class="header">
					<div class="logo">
						LOGO
					</div>
				</div>
				<div class="body scroll">
					${this._renderSideMenu()}
				</div>
				<div class="footer">
					${this._renderThemeSwitcher()}
				</div>
			</div>
		`;
	}

	private _renderSideMenu() {
		const btnHtml: TemplateResult[] = [];
		const allPages = new PageLibrary().getParentPages();

		allPages.forEach((page) => {
			btnHtml.push(html`
				<div
					class="btn"
					@click="${(e: MouseEvent) => navigate(page.pageUri, e)}"
				>
					<div class="icon">
						<panda-icon icon="${page.icon}"></panda-icon>
					</div>
					<label>${page.pageName}</label>
				</div>
			`);
		});

		return btnHtml;
	}

	private _renderThemeSwitcher() {
		const flip = this.selectedTheme === "panda-theme-light"
			? "flip"
			: "";

		return html`
			<div class="theme-switcher">
				<div class="switcher-cont ${flip}">
					<div class="switcher">
						<div
							class="btn-icon"
							@click="${() => this._onChangeTheme("panda-theme-light")}"
							title="Switch to light theme"
						>
							<panda-icon icon="sun"></panda-icon>
						</div>
						<div
							class="btn-icon"
							@click="${() => this._onChangeTheme("panda-theme-dark")}"
							title="Switch to dark theme"
						>
							<panda-icon icon="moon"></panda-icon>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeTheme(themeName: string) {
		appStore.dispatch(
			changeTheme({
				themeName
			})
		);
	}
}