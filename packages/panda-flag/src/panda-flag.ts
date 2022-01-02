// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// flags
import { flagCn, flagCnSquare } from "./resources/cn";
import { flagHk, flagHkSquare } from "./resources/hk";
import { flagId, flagIdSquare } from "./resources/id";
import { flagPl, flagPlSquare } from "./resources/pl";
import { flagSg, flagSgSquare } from "./resources/sg";

@customElement("panda-flag")
export class PandaFlag extends LitElement {
	//css styles
	static styles = styles;

	@property({ type: String, attribute: true })
	flag!: string;

	@property({ type: Boolean, attribute: true })
	square!: boolean;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		console.log("%c flag", "font-size: 24px; color: green;", this.flag);
		console.log("%c square", "font-size: 24px; color: green;", this.square);
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html` <div class="flag" part="flag">${this._renderFlag()}</div> `;
	}

	private _renderFlag() {
		switch (this.flag?.toLocaleLowerCase()) {
			case "cn":
				return this.square ? flagCnSquare : flagCn;
			case "hk":
				return this.square ? flagHkSquare : flagHk;
			case "id":
				return this.square ? flagIdSquare : flagId;
			case "pl":
				return this.square ? flagPlSquare : flagPl;
			case "sg":
				return this.square ? flagSgSquare : flagSg;
			default:
				return html`???`;
		}
	}
}
