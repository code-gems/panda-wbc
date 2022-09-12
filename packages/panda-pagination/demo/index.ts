import { LitElement, html, TemplateResult, css } from "lit";
import "../src/panda-pagination";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			<panda-pagination
				.busy="${false}"
				@click="${() => this._onButtonClick()}"
			>
			</panda-pagination>
		`;
	}

	private _onButtonClick() {
		console.log("%c [PANDA BUTTON] CLICK", "font-size: 24px; color: green;");
	}
}
window.customElements.define("demo-page", DemoPage);
