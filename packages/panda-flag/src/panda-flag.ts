// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// flags
import { flagAm, flagAmSquare } from "./resources/am"; // Armenia
import { flagAt, flagAtSquare } from "./resources/at"; // Austria
import { flagBe, flagBeSquare } from "./resources/be"; // Belgium
import { flagCh, flagChSquare } from "./resources/ch"; // Switzerland
import { flagCn, flagCnSquare } from "./resources/cn"; // China
import { flagDe, flagDeSquare } from "./resources/de"; // Germany
import { flagDk, flagDkSquare } from "./resources/dk"; // Denmark
import { flagFi, flagFiSquare } from "./resources/fi"; // Finland
import { flagFr, flagFrSquare } from "./resources/fr"; // France
import { flagGb, flagGbSquare } from "./resources/gb"; // Great Britain
import { flagHk, flagHkSquare } from "./resources/hk"; // Hong Kong
import { flagHu, flagHuSquare } from "./resources/hu"; // Hungary
import { flagId, flagIdSquare } from "./resources/id"; // Indonesia
import { flagIe, flagIeSquare } from "./resources/ie"; // Ireland
import { flagIt, flagItSquare } from "./resources/it"; // Italy
import { flagJp, flagJpSquare } from "./resources/jp"; // Japan
import { flagLu, flagLuSquare } from "./resources/lu"; // Luxembourg
import { flagMc, flagMcSquare } from "./resources/mc"; // Monaco
import { flagMo, flagMoSquare } from "./resources/mo"; // Macao
import { flagNg, flagNgSquare } from "./resources/ng"; // Nigeria
import { flagNl, flagNlSquare } from "./resources/nl"; // Netherlands
import { flagNo, flagNoSquare } from "./resources/no"; // Norway
import { flagPe, flagPeSquare } from "./resources/pe"; // Peru
import { flagPl, flagPlSquare } from "./resources/pl"; // Poland
import { flagPt, flagPtSquare } from "./resources/pt"; // Portugal
import { flagQa, flagQaSquare } from "./resources/qa"; // Qatar
import { flagRu, flagRuSquare } from "./resources/ru"; // Russia
import { flagSe, flagSeSquare } from "./resources/se"; // Sweden
import { flagSg, flagSgSquare } from "./resources/sg"; // Singapore
import { flagTw, flagTwSquare } from "./resources/tw"; // Taiwan
import { flagUa, flagUaSquare } from "./resources/ua"; // Ukraine
import { flagUs, flagUsSquare } from "./resources/us"; // Unites States
import { flagVe, flagVeSquare } from "./resources/ve"; // Venezuela
import { flagVn, flagVnSquare } from "./resources/vn"; // Vietnam

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
			am: (square) => square ? flagAmSquare : flagAm,
			at: (square) => square ? flagAtSquare : flagAt,
			be: (square) => square ? flagBeSquare : flagBe,
			ch: (square) => square ? flagChSquare : flagCh,
			cn: (square) => square ? flagCnSquare : flagCn,
			de: (square) => square ? flagDeSquare : flagDe,
			dk: (square) => square ? flagDkSquare : flagDk,
			fi: (square) => square ? flagFiSquare : flagFi,
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
			no: (square) => square ? flagNoSquare : flagNo,
			ng: (square) => square ? flagNgSquare : flagNg,
			nl: (square) => square ? flagNlSquare : flagNl,
			pe: (square) => square ? flagPeSquare : flagPe,
			pl: (square) => square ? flagPlSquare : flagPl,
			pt: (square) => square ? flagPtSquare : flagPt,
			qa: (square) => square ? flagQaSquare : flagQa,
			ru: (square) => square ? flagRuSquare : flagRu,
			se: (square) => square ? flagSeSquare : flagSe,
			sg: (square) => square ? flagSgSquare : flagSg,
			tw: (square) => square ? flagTwSquare : flagTw,
			ua: (square) => square ? flagUaSquare : flagUa,
			uk: (square) => square ? flagGbSquare : flagGb,
			us: (square) => square ? flagUsSquare : flagUs,
			ve: (square) => square ? flagVeSquare : flagVe,
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
		if (this.flagMapper[this._getCountryCode(this.flag?.toLocaleLowerCase())]) {
			return this.flagMapper[this._getCountryCode(this.flag?.toLocaleLowerCase())](this.square);
		} else {
			return html`???`;
		}
	}

	// ================================================================================================================
	// ======================================================================================================== HELPERS
	// ================================================================================================================

	/**
	 * Convert country key to country code
	 * @param {String} key - country key eg. POLAND -> PL
	 */
	private _getCountryCode(key: string): string {
		const keyMap: { [countryKey: string | number]: string } = {
			// Armenia
			armenia: "am",

			// Austria
			austria: "at",

			// Belgium
			belgium: "be",

			// Switzerland
			switzerland: "ch",

			// China
			china: "cn",

			// Germany
			germany: "de",

			// Denmark
			denmark: "dk",

			// Finland
			finland: "fi",

			// France
			france: "fr",

			// Great Britain
			["great britain"]: "gb",
			["united kingdom"]: "gb",

			// Hong Kong
			["hong kong"]: "hk",

			// Hungary
			hungary: "hu",

			// Indonesia
			indonesia: "id",

			// Ireland
			ireland: "ie",

			// Italy
			italy: "it",

			// Japan
			japan: "jp",

			// Luxembourg
			luxembourg: "lu",

			// Macau
			macao: "mo",
			macau: "mo",

			// Monaco
			monaco: "mc",

			// Nigeria
			566: "ng",
			nga: "ng",
			nigeria: "ng",

			// Netherlands 
			netherlands: "nl",
			holland: "nl",

			// Norway
			norway: "no",

			peru: "pe",
			poland: "pl",
			portugal: "pt",
			qatar: "qa",
			russia: "ru",
			sweden: "se",
			singapore: "sg",
			taiwan: "tw",
			ukraine: "ua",
			["united states"]: "us",
			usa: "us",
			venezuela: "ve",
			vietnam: "vn",
		};
		return keyMap[key] || key;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-flag": PandaFlag;
	}
}
