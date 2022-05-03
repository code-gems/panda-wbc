// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, svg } from "lit";
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
import { flagGr, flagGrSquare } from "./resources/gr"; // Greece
import { flagHk, flagHkSquare } from "./resources/hk"; // Hong Kong
import { flagHn, flagHnSquare } from "./resources/hn"; // Honduras
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
import { flagPa, flagPaSquare } from "./resources/pa"; // Panama
import { flagPe, flagPeSquare } from "./resources/pe"; // Peru
import { flagPl, flagPlSquare } from "./resources/pl"; // Poland
import { flagPt, flagPtSquare } from "./resources/pt"; // Portugal
import { flagQa, flagQaSquare } from "./resources/qa"; // Qatar
import { flagRu, flagRuSquare } from "./resources/ru"; // Russia
import { flagSe, flagSeSquare } from "./resources/se"; // Sweden
import { flagSg, flagSgSquare } from "./resources/sg"; // Singapore
import { flagSv, flagSvSquare } from "./resources/sv"; // El Salvador
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
			gr: (square) => square ? flagGrSquare : flagGr,
			hk: (square) => square ? flagHkSquare : flagHk,
			hn: (square) => square ? flagHnSquare : flagHn,
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
			pa: (square) => square ? flagPaSquare : flagPa,
			pe: (square) => square ? flagPeSquare : flagPe,
			pl: (square) => square ? flagPlSquare : flagPl,
			pt: (square) => square ? flagPtSquare : flagPt,
			qa: (square) => square ? flagQaSquare : flagQa,
			ru: (square) => square ? flagRuSquare : flagRu,
			se: (square) => square ? flagSeSquare : flagSe,
			sg: (square) => square ? flagSgSquare : flagSg,
			sv: (square) => square ? flagSvSquare : flagSv,
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
			return html`?`;
		}
	}

	// ================================================================================================================
	// ======================================================================================================== HELPERS
	// ================================================================================================================

	/**
	 * Convert country key to country code. Compliant with the ISO 3166 international standard.
	 * @param {String} key - country key eg. POLAND -> PL
	 */
	private _getCountryCode(key: string): string {
		const keyMap: { [countryKey: string]: string } = {
			// Armenia
			"051": "am",
			arm: "am",
			armenia: "am",

			// Austria
			"040": "at",
			aut: "at",
			austria: "at",

			// Belgium
			"056": "be",
			bel: "be",
			belgium: "be",

			// Switzerland
			"756": "ch",
			che: "ch",
			switzerland: "ch",

			// China
			"156": "cn",
			chn: "cn",
			china: "cn",

			// Germany
			"276": "de",
			deu: "de",
			germany: "de",

			// Denmark
			"208": "dk",
			dnk: "dk",
			denmark: "dk",

			// Finland
			"246": "fi",
			fin: "fi",
			finland: "fi",

			// France
			"250": "fr",
			fra: "fr",
			france: "fr",

			// Great Britain
			["great britain"]: "gb",
			["united kingdom"]: "gb",

			// Greece
			"300": "gr",
			grc: "gr",
			greece: "gr",

			// Hong Kong
			["hong kong"]: "hk",

			// Honduras
			"340": "hn",
			hnd: "hn",
			honduras: "hn",

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
			"566": "ng",
			nga: "ng",
			nigeria: "ng",

			// Netherlands 
			"528": "nl",
			nld: "nl",
			netherlands: "nl",
			holland: "nl",

			// Norway
			"578": "no",
			nor: "no",
			norway: "no",

			// Panama
			"591": "pa",
			pan: "pa",
			panama: "pa",

			// Peru
			"604": "pe",
			per: "pe",
			peru: "pe",

			// Poland
			"616": "pl",
			pol: "pl",
			poland: "pl",

			// Portugal
			"620": "pt",
			prt: "pt",
			portugal: "pt",

			// Qatar
			"634": "qa",
			qat: "qa",
			qatar: "qa",

			// Russia
			"643": "ru",
			rus: "ru",
			russia: "ru",

			// Sweden
			"752": "se",
			swe: "se",
			sweden: "se",

			// Singapore
			"702": "sg",
			sgp: "sg",
			singapore: "sg",

			// El Salvador
			"222": "sv",
			slv: "sv",
			"el salvador": "sv",

			// Taiwan
			"158": "tw",
			twn: "tw",
			taiwan: "tw",

			// Ukraine
			"804": "ua",
			ukr: "ua",
			ukraine: "ua",

			// United States
			"840": "us",
			usa: "us",
			["united states"]: "us",
			["united states of america"]: "us",

			// Venezuela
			"862": "ve",
			ven: "ve",
			venezuela: "ve",

			// Vietnam
			"704": "vn",
			vnm: "vn",
			"viet nam": "vn",
			vietnam: "vn",
		};
		return keyMap[String(key)] || key;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-flag": PandaFlag;
	}
}
