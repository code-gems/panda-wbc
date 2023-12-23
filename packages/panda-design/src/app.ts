// types
import { AppState } from "panda-design-typings";
import { PandaRouterNavigateEvent, RouterConfig } from "@panda-wbc/panda-router";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-theme";
import "@panda-wbc/panda-router";

// pages
import "./pages/home/home-page";
import "./pages/get-started/get-started-page";
import "./pages/develop/develop-page";
import "./pages/themes/themes-page";
import "./pages/core/core-page";

// utils & config
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { appStore, reduxify } from "./redux/store";
import { getRouterConfig } from "./router-config";

// actions
import { gotoPage, changeTheme } from "./redux/actions/common";

@customElement("panda-design-app")
@reduxify()
class PandaApp extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	selectedTheme: string | null = null;

	private _routerConfig: RouterConfig = getRouterConfig();

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// get selected theme or select default one
		const selectedTheme = localStorage.getItem("theme") ?? "panda-theme-light";
		appStore.dispatch(
			changeTheme({
				themeName: selectedTheme
			})
		);
	}

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
			<panda-theme theme="${this.selectedTheme}"></panda-theme>
			<panda-router
				.routerConfig="${this._routerConfig}"
				@on-navigate="${(e: CustomEvent) => this._onNavigate(e.detail)}"
			></panda-router>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onNavigate(navigateEvent: PandaRouterNavigateEvent): void {
		console.log("%c [APP] _onNavigate", "font-size: 24px; color: green;", navigateEvent);
		const {
			pathname,
			search,
			searchParams
		} = navigateEvent;

		appStore.dispatch(
			gotoPage({
				pathname,
				search,
				searchParams
			})
		);
	}
}
