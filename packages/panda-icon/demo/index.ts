import { LitElement, html, css } from "lit";
import "../src/panda-icon";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			<panda-icon icon="menu"></panda-icon>
		`;
	}

}
window.customElements.define("demo-page", DemoPage);
