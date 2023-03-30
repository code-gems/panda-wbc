/** */
// types
import { PandaRouterNavigateEvent, RouterConfig } from "@panda-wbc/panda-router";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-theme";
import "@panda-wbc/panda-router";

// pages
import "./pages/home/home-page";
import "./pages/get-started/get-started-page";
import "./pages/docs/docs-page";
import "./pages/themes/themes-page";
import "./pages/core/core-page";

// utils & config
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import appStore from "./redux/store";
import { getRouterConfig } from "./router-config";

// actions
import { gotoPage } from "./redux/actions/common";

@customElement("panda-design-app")
class PandaApp extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	private _routerConfig!: RouterConfig;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		// router config
		this._routerConfig = getRouterConfig();
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<panda-theme></panda-theme>
			<panda-router
				.routerConfig="${this._routerConfig}"
				@on-navigate="${(e: CustomEvent) => this._onNavigate(e.detail)}"
			></panda-router>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
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
