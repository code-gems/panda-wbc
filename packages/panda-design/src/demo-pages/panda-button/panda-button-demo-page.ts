import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

// components
import "@panda/panda-button";

@customElement("panda-flag-demo-page")
export class PandaFlagDemoPage extends LitElement {




	protected render() {
		return html`
			PANDA BUTTON DEMO PAGE

			<panda-button>
				My Button
			</panda-button>
		`;
	}
}