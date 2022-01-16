import { LitElement, html, css } from "lit";
import "../src/panda-spinner";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			<panda-spinner spinner="dots"></panda-spinner>
			<panda-spinner spinner="circle"></panda-spinner>
			<panda-spinner spinner="video"></panda-spinner>
		`;
	}


}
window.customElements.define("demo-page", DemoPage);
