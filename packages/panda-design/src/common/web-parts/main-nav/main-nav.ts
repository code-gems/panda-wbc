// types
import { AppState } from "panda-design-typings";
import { Page } from "../../page-library";

// styles & mixins
import { styles } from "./styles/styles";

// web parts
// ... eg. global search component

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import PageLibrary from "../../page-library";
import { reduxify } from "../../../redux/store";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

@customElement("main-nav")
@reduxify()
class MainNav extends LitElement {
	// css styles
	static get styles() {
		return [
			styles
		];
	}

	private _pageLibrary!: PageLibrary;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this._pageLibrary = new PageLibrary();
	}

	stateChanged(state: AppState) {
		console.log("%c [MAIN NAV] stateChanged", "font-size: 24px; color: green;", state);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		const pageListHtml: TemplateResult[] = [];
		const parentPages: Page[] = this._pageLibrary.getParentPages();
		console.log("%c [MAIN NAV] parentPages", "font-size: 24px; color: pink;", parentPages);

		parentPages.forEach(({ pageName, pageUri }) => {
			pageListHtml.push(html`
				<a
					href="#"
					@click="${(e: MouseEvent) => navigate(pageUri, e)}"
				>
					${pageName}
				</a>
			`);
		});

		return html`
			small logo | 
			PANDA WEB COMPONENTS
			<nav>
				${pageListHtml}
			</nav>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

}