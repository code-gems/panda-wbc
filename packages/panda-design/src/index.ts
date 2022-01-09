// types

// styles
import { styles } from "./styles/styles";

// components
import "@panda/panda-theme";

// pages
import "./demo-pages/panda-button/panda-button-demo-page";
import "./demo-pages/panda-flag/panda-flag-demo-page";

// utils
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("panda-app")
export class PandaApp extends LitElement {
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
			PAGES
		

			<panda-button-demo-page>
			</panda-button-demo-page>
			<hr>
			<panda-flag-demo-page>
			</panda-flag-demo-page>
		`;
	}

}
