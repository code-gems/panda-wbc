// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

// flags
import { flagCn, flagCnSquare } from "./resources/cn";
import { flagDe, flagDeSquare } from "./resources/de";
import { flagFr, flagFrSquare } from "./resources/fr";
import { flagHk, flagHkSquare } from "./resources/hk";
import { flagHu, flagHuSquare } from "./resources/hu";
import { flagId, flagIdSquare } from "./resources/id";
import { flagIe, flagIeSquare } from "./resources/ie";
import { flagIt, flagItSquare } from "./resources/it";
import { flagMo, flagMoSquare } from "./resources/mo";
import { flagMc, flagMcSquare } from "./resources/mc";
import { flagNl, flagNlSquare } from "./resources/nl";
import { flagPl, flagPlSquare } from "./resources/pl";
import { flagRu, flagRuSquare } from "./resources/ru";
import { flagSg, flagSgSquare } from "./resources/sg";
import { flagTw, flagTwSquare } from "./resources/tw";
import { flagUa, flagUaSquare } from "./resources/ua";

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
			case "de":
				return this.square ? flagDeSquare : flagDe;
			case "fr":
				return this.square ? flagFrSquare : flagFr;
			case "hk":
				return this.square ? flagHkSquare : flagHk;
			case "hu":
				return this.square ? flagHuSquare : flagHu;
			case "id":
				return this.square ? flagIdSquare : flagId;
			case "ie":
				return this.square ? flagIeSquare : flagIe;
			case "it":
				return this.square ? flagItSquare : flagIt;
			case "mo":
				return this.square ? flagMoSquare : flagMo;
			case "mc":
				return this.square ? flagMcSquare : flagMc;
			case "nl":
				return this.square ? flagNlSquare : flagNl;
			case "pl":
				return this.square ? flagPlSquare : flagPl;
			case "ru":
				return this.square ? flagRuSquare : flagRu;
			case "sg":
				return this.square ? flagSgSquare : flagSg;
			case "tw":
				return this.square ? flagTwSquare : flagTw;
			case "ua":
				return this.square ? flagUaSquare : flagUa;
			default:
				return html`???`;
		}
	}
}
