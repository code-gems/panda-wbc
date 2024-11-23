// types
import { Store, PageCategory } from "panda-design-typings";
import { Debouncer } from "@panda-wbc/panda-utils/types";

// styles & mixins
// import { styles } from "./styles/styles";

// web parts
import "../../web-parts/main-nav/main-nav";

// utils
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import PageLibrary, { page } from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { debounce } from "@panda-wbc/panda-utils";


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

	private readonly _pageLibrary: PageLibrary = new PageLibrary();;

	private readonly _debounce: Debouncer = debounce(this._debounceCallback, 2000, 4000);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: Store) {
		console.log("%c [CORE PAGE] stateChanged", "font-size: 24px; color: green;", state);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._debounce) {
			this._debounce.cancel();
		}
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