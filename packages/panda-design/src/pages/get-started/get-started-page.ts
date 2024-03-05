// types
import { Store } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";

// web parts
import "../../web-parts/main-nav/main-nav";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import PageLibrary from "../../utils/page-library";
import { reduxify } from "../../redux/store";

declare var navigate: (pathName: string, e: MouseEvent) => void;

@customElement("get-started-page")
@reduxify()
class GetStartedPage extends LitElement {
	// css styles
	static get styles() {
		return [
			styles
		];
	}

	private _pageLibrary!: PageLibrary;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		// init page library 
		this._pageLibrary = new PageLibrary();
	}

	stateChanged(state: Store) {
		console.log("%c [GET STARTED PAGE] stateChanged", "font-size: 24px; color: green;", state);
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<div class="page">
				<div class="page-cont">
					<div class="column column-left">
						GS LEFT
					</div>
					<div class="column">
						GS CENTER
					</div>
				</div>
			</div>
		`;
	}


	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================


}