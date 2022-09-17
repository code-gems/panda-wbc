import { LitElement, html, css } from "lit";
import "../src/panda-multi-input";

class DemoPage extends LitElement {
	// css styles
	static styles = css`
		
	`;


	protected render() {
		return html`
			<panda-multi-input
				.values="${["label 1", "label 2"]}"
				@on-input="${(e: any) => this._onInput(e)}"
			>
			</panda-multi-input>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInput(e: any) {
		console.log("%c _onInput", "font-size: 24px; color: green;", e);
	}
}
window.customElements.define("demo-page", DemoPage);
