import { LitElement, html, TemplateResult, css } from "lit";
import "../src/panda-icon";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			<panda-button icon="menu"></panda-button>
		`;
	}

	private _onButtonClick() {
		console.log("%c [PANDA BUTTON] CLICK", "font-size: 24px; color: green;");
	}
}
window.customElements.define("demo-page", DemoPage);
