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
				MY BUTTON
			</panda-button>

			<panda-button
				.busy="${false}"
				@click="${() => this._onButtonClick()}"
			>
				<div class="icon" slot="prefix">
					<panda-icon class="icon" icon="arrow-left">P</panda-icon>
				</div>
				AWESOME BUTTON
				<div class="icon" slot="suffix">S</div>
			</panda-button>
		`;
	}

	private _onButtonClick() {
		console.log("%c [PANDA BUTTON] CLICK", "font-size: 24px; color: green;");
	}
}
window.customElements.define("demo-page", DemoPage);
