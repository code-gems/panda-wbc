// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-button")
export class PandaButton extends LitElement {


	@property({ type: String, attribute: true })
	spinner!: string;

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