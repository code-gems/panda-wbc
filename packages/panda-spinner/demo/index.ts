import { LitElement, html, css } from "lit";
import "../src/panda-spinner";

class DemoPage extends LitElement {
	// css styles
	static get styles() {
		return css`
			.spinner-cont {
				display: inline-block;
				padding: 30px;
				background-color: var(--panda-primary-color);
				border-radius: 10px;
				box-shadow: 0px 1px 2px var(--panda-shadow-50opc);
			}
	
		`;
	}

	protected render() {
		return html`

			<div class="spinner-cont">
				<panda-spinner spinner="dots"></panda-spinner>
			</div>
			<div class="spinner-cont">
				<panda-spinner spinner="circle"></panda-spinner>
			</div>
			<div class="spinner-cont">
				<panda-spinner spinner="video"></panda-spinner>
			</div>

		`;
	}


}
window.customElements.define("demo-page", DemoPage);
