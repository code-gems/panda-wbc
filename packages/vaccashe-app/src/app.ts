// types
import { Store } from "panda-design-typings";
import { PandaRouterNavigateEvent, RouterConfig } from "@panda-wbc/panda-router";
import { PandaThemeMode } from "@panda-wbc/panda-theme";

// styles
import { styles } from "./styles/styles";

// theme service
import pandaThemeController from "@panda-wbc/panda-theme/lib/panda-theme-controller";

// custom themes
// ...

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
import { customElement, state } from "lit/decorators.js";
import { appStore, reduxify } from "./redux/store";
import { getRouterConfig } from "./router-config";

// actions
import { gotoPage } from "./redux/actions/common";

@customElement("panda-design-app")
@reduxify()
class PandaApp extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@state()
	private _selectedThemeGroupId!: string | null;

	@state()
	private _selectedThemeMode!: PandaThemeMode;

	@state()
	private _selectedAccentColorId!: string | null;

	private readonly _routerConfig: RouterConfig = getRouterConfig();

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// get selected theme or select default one
		const themeGroupId = localStorage.getItem("themeGroupId") ?? "panda-theme-light";
		const themeMode = localStorage.getItem("themeMode") ?? "light";
		const accentColorId = localStorage.getItem("accentColorId") ?? "blue";
		
		// register custom themes
		pandaThemeController.setThemeGroupId(themeGroupId);
		pandaThemeController.setThemeMode(themeMode as PandaThemeMode);
		pandaThemeController.setAccentColorId(accentColorId);
	}

	stateChanged(state: Store) {
		const {
			selectedThemeGroupId,
			selectedThemeMode,
			selectedAccentColorId,
		} = state;
		this._selectedThemeGroupId = selectedThemeGroupId;
		this._selectedThemeMode = selectedThemeMode;
		this._selectedAccentColorId = selectedAccentColorId;
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<panda-notifications
				position="top-center"
				show-dismiss-all-button
			></panda-notifications>
			<panda-router
				.routerConfig="${this._routerConfig}"
				@on-navigate="${this._onNavigate}"
			></panda-router>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onNavigate(event: PandaRouterNavigateEvent): void {
		// console.log("%c [APP] _onNavigate", "font-size: 24px; color: green;", event);
		const {
			pathname,
			search,
			searchParams
		} = event.detail;

		appStore.dispatch(
			gotoPage({
				pathname,
				search,
				searchParams
			})
		);
	}
}
