// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators";

@customElement("panda-button")
export class PandaButton extends LitElement {


	@property({ type: Boolean, attribute: true })
	busy!: boolean;

	protected render() {
		return html``;
	}
}