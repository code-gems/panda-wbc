// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// spinners
import { dots } from "./resources/dots";

@customElement("panda-spinner")
export class PandaSpinner extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	spinner!: string;

	protected render() {
		return html`
			<div class="spinner" part="spinner">
				${this._renderSpinner()}
			</div>
		`;
	}

	_renderSpinner() {
		switch (this.spinner) {
			case "dots":
				return dots;

			default:
				return
		}
	}
}