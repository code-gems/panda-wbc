// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("panda-icon")
export class PandaIcon extends LitElement {
	static get styles() {
		return styles;
	}

	render() {
		return html`
			*
		`;
	}
}
