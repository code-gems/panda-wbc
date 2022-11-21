// types
import { AppState, PageCategory } from "panda-design-typings";

// styles & mixins
// import { styles } from "./styles/styles";

// web parts
import "../../common/web-parts/main-nav/main-nav";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import PageLibrary, { page } from "../../common/page-library";
import { reduxify } from "../../redux/store";
import { debounce } from "@panda-wbc/panda-core";


@customElement("core-page")
@page({
	pageId: "core",
	pageName: "Core",
	pageUri: "/core",
	parent: true,
	category: PageCategory.CORE,
	keywords: ["utility", "debounce", "helper", "library"],
	description: ["Core utility library description"],
	contextMenu: [],
	template: html`<core-page></core-page>`
})
@reduxify()
class CorePage extends LitElement {
	// css styles
	// static get styles() {
	// 	return [
	// 		styles
	// 	];
	// }

	private _pageLibrary!: PageLibrary;

	private _debounce: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// init page library 
		this._pageLibrary = new PageLibrary();
		this._debounce = debounce(this._debounceCallback, 2000, 4000);
	}

	stateChanged(state: AppState) {
		console.log("%c [CORE PAGE] stateChanged", "font-size: 24px; color: green;", state);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<main-nav></main-nav>
			<div class="page">
				<div class="page-cont">
					<div class="column column-left">
						GS LEFT s
					</div>
					<div class="column">
						<button
							@click="${this._onTriggerDebouncer}"
						>
							TRIGGER DEBOUNCER [2 sec, max 4 sec]
						</button>
						
					</div>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _debounceCallback() {
		console.log("%c [CORE PAGE] _debounceCallback", "font-size: 24px; color: orange;");

	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onTriggerDebouncer() {
		console.log("%c [CORE PAGE] _onTriggerDebounce", "font-size: 24px; color: green;");
		this._debounce();
	}
}