// types
import { Store } from "panda-design-typings";
import { PandaRouterNavigateEvent, RouterConfig } from "@panda-wbc/panda-router";

// styles
import { styles } from "./styles/styles";

// custom themes
import { pandaThemeTurquoise } from "./themes/panda-theme-turquoise";

// components
import "@panda-wbc/panda-theme";
import "@panda-wbc/panda-router";
import "@panda-wbc/panda-notifications";

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
import pandaThemeController from "@panda-wbc/panda-theme/lib/panda-theme-controller";

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

	private readonly _routerConfig: RouterConfig = getRouterConfig();

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// register custom themes
		pandaThemeController.registerThemeGroup({
			groupName: "Panda Design",
			options: [
				{
					id: "panda-theme-turquoise",
					name: "Turquoise",
					theme: pandaThemeTurquoise
				},
			]
		});
		// get selected theme or select default one
		const selectedTheme = localStorage.getItem("theme") ?? "panda-theme-turquoise";
		appStore.dispatch(
			changeTheme({
				themeName: selectedTheme
			})
		);
	}

	stateChanged(state: Store) {
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
			<panda-notifications
				position="top-center"
				show-dismiss-all-button
			></panda-notifications>
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
