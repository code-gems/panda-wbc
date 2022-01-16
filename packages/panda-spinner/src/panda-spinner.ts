// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// spinners
import { circle } from "./resources/circle";
import { dots } from "./resources/dots";
import { video } from "./resources/video";

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
			case "circle":
				return circle;
			case "dots":
				return dots;
			case "video":
			default:
				return video;
		}
	}
}