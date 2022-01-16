import { LitElement, html, css } from "lit";
import "../src/panda-spinner";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			<panda-spinner spinner="dots"></panda-spinner>
		`;
	}


}
window.customElements.define("demo-page", DemoPage);
