import { LitElement, html, TemplateResult, css } from "lit";
import "../src/panda-button";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			<panda-button
				.busy="${false}"
				@click="${() => this._onButtonClick()}"
			>
				<div slot="prefix">P</div>
				BUTTON
				<div slot="suffix">S</div>
			</panda-button>
		`;
	}

	private _onButtonClick() {
		console.log("%c [PANDA BUTTON] CLICK", "font-size: 24px; color: green;");
	}
}
window.customElements.define("demo-page", DemoPage);
