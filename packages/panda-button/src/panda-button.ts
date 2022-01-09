// style
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-button")
export class PandaButton extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true })
	busy!: boolean;

	protected render() {
		return html`
			<div class="button" part="button">
				<slot name="prefix"></slot>
				<slot></slot>
				<slot name="suffix"></slot>
			</div>
		`;
	}
}