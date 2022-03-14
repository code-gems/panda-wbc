// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// flags
import { flagAt, flagAtSquare } from "./resources/at";
import { flagCn, flagCnSquare } from "./resources/cn";
import { flagDe, flagDeSquare } from "./resources/de";
import { flagFr, flagFrSquare } from "./resources/fr";
import { flagGb, flagGbSquare } from "./resources/gb";
import { flagHk, flagHkSquare } from "./resources/hk";
import { flagHu, flagHuSquare } from "./resources/hu";
import { flagId, flagIdSquare } from "./resources/id";
import { flagIe, flagIeSquare } from "./resources/ie";
import { flagIt, flagItSquare } from "./resources/it";
import { flagLu, flagLuSquare } from "./resources/lu";
import { flagMc, flagMcSquare } from "./resources/mc";
import { flagMo, flagMoSquare } from "./resources/mo";
import { flagNl, flagNlSquare } from "./resources/nl";
import { flagPe, flagPeSquare } from "./resources/pe";
import { flagPl, flagPlSquare } from "./resources/pl";
import { flagQa, flagQaSquare } from "./resources/qa";
import { flagRu, flagRuSquare } from "./resources/ru";
import { flagSg, flagSgSquare } from "./resources/sg";
import { flagTw, flagTwSquare } from "./resources/tw";
import { flagUa, flagUaSquare } from "./resources/ua";
import { flagJp, flagJpSquare } from "./resources/jp";
import { flagVn, flagVnSquare } from "./resources/vn";

@customElement("panda-flag")
export class PandaFlag extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	flag!: string;

	@property({ type: Boolean, attribute: true })
	square!: boolean;

	private flagMapper!: { [countryCode: string]: (square: boolean) => TemplateResult; };

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.flag = "";
		this.square = false;

		// flag mapper
		this.flagMapper = {
			at: (square) => square ? flagAtSquare : flagAt,
			cn: (square) => square ? flagCnSquare : flagCn,
			de: (square) => square ? flagDeSquare : flagDe,
			fr: (square) => square ? flagFrSquare : flagFr,
			gb: (square) => square ? flagGbSquare : flagGb,
			hk: (square) => square ? flagHkSquare : flagHk,
			hu: (square) => square ? flagHuSquare : flagHu,
			id: (square) => square ? flagIdSquare : flagId,
			ie: (square) => square ? flagIeSquare : flagIe,
			it: (square) => square ? flagItSquare : flagIt,
			jp: (square) => square ? flagJpSquare : flagJp,
			lu: (square) => square ? flagLuSquare : flagLu,
			mo: (square) => square ? flagMoSquare : flagMo,
			mc: (square) => square ? flagMcSquare : flagMc,
			nl: (square) => square ? flagNlSquare : flagNl,
			pe: (square) => square ? flagPeSquare : flagPe,
			pl: (square) => square ? flagPlSquare : flagPl,
			qa: (square) => square ? flagQaSquare : flagQa,
			ru: (square) => square ? flagRuSquare : flagRu,
			sg: (square) => square ? flagSgSquare : flagSg,
			tw: (square) => square ? flagTwSquare : flagTw,
			ua: (square) => square ? flagUaSquare : flagUa,
			uk: (square) => square ? flagGbSquare : flagGb,
			vn: (square) => square ? flagVnSquare : flagVn,
		};
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html` <div class="flag" part="flag">${this._renderFlag()}</div> `;
	}

	private _renderFlag() {
		if (this.flagMapper[this.flag?.toLocaleLowerCase()]) {
			return this.flagMapper[this.flag?.toLocaleLowerCase()](this.square);
		} else {
			return html`???`;
		}
	}
};
