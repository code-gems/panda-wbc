// types

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-theme";
import { pandaLogo } from "./components/panda-logo";

// demo pages
import "./demo-pages/panda-button/panda-button-demo-page";
import "./demo-pages/panda-flag/panda-flag-demo-page";

// utils
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("panda-app")
class PandaApp extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<panda-theme></panda-theme>
			<div class="">
				${pandaLogo}
			</div>
		`;
	}

}
