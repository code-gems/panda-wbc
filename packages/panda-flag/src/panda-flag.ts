// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, svg } from "lit";
import { customElement, property } from "lit/decorators.js";

// flags
import { flagAm } from "./resources/am"; // Armenia
import { flagAt } from "./resources/at"; // Austria
import { flagBe } from "./resources/be"; // Belgium
import { flagCh } from "./resources/ch"; // Switzerland
import { flagCn } from "./resources/cn"; // China
import { flagDe } from "./resources/de"; // Germany
import { flagDk } from "./resources/dk"; // Denmark
import { flagFi } from "./resources/fi"; // Finland
import { flagFr } from "./resources/fr"; // France
import { flagGb } from "./resources/gb"; // Great Britain
import { flagGr } from "./resources/gr"; // Greece
import { flagHk } from "./resources/hk"; // Hong Kong
import { flagHn } from "./resources/hn"; // Honduras
import { flagHu } from "./resources/hu"; // Hungary
import { flagId } from "./resources/id"; // Indonesia
import { flagIe } from "./resources/ie"; // Ireland
import { flagIt } from "./resources/it"; // Italy
import { flagJp } from "./resources/jp"; // Japan
import { flagLu } from "./resources/lu"; // Luxembourg
import { flagMc } from "./resources/mc"; // Monaco
import { flagMo } from "./resources/mo"; // Macao
import { flagNg } from "./resources/ng"; // Nigeria
import { flagNl } from "./resources/nl"; // Netherlands
import { flagNo } from "./resources/no"; // Norway
import { flagPa } from "./resources/pa"; // Panama
import { flagPe } from "./resources/pe"; // Peru
import { flagPl } from "./resources/pl"; // Poland
import { flagPs } from "./resources/ps"; // Palestine
import { flagPt } from "./resources/pt"; // Portugal
import { flagQa } from "./resources/qa"; // Qatar
import { flagRu } from "./resources/ru"; // Russia
import { flagSe } from "./resources/se"; // Sweden
import { flagSg } from "./resources/sg"; // Singapore
import { flagSv } from "./resources/sv"; // El Salvador
import { flagTw } from "./resources/tw"; // Taiwan
import { flagUa } from "./resources/ua"; // Ukraine
import { flagUs } from "./resources/us"; // Unites States
import { flagVe } from "./resources/ve"; // Venezuela
import { flagVn } from "./resources/vn"; // Vietnam

@customElement("panda-flag")
export class PandaFlag extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, reflect: true })
	flag: string = "";

	@property({ type: Boolean, reflect: true })
	square: boolean = false;

	private readonly flagMapper: { [countryCode: string]: (square: boolean) => TemplateResult; } = {
		am: flagAm,
		at: flagAt,
		be: flagBe,
		ch: flagCh,
		cn: flagCn,
		de: flagDe,
		dk: flagDk,
		fi: flagFi,
		fr: flagFr,
		gb: flagGb,
		gr: flagGr,
		hk: flagHk,
		hn: flagHn,
		hu: flagHu,
		id: flagId,
		ie: flagIe,
		it: flagIt,
		jp: flagJp,
		lu: flagLu,
		mo: flagMo,
		mc: flagMc,
		no: flagNo,
		ng: flagNg,
		nl: flagNl,
		pa: flagPa,
		pe: flagPe,
		pl: flagPl,
		ps: flagPs,
		pt: flagPt,
		qa: flagQa,
		ru: flagRu,
		se: flagSe,
		sg: flagSg,
		sv: flagSv,
		tw: flagTw,
		ua: flagUa,
		uk: flagGb,
		us: flagUs,
		ve: flagVe,
		vn: flagVn,
	};

	// ================================================================================================================
	// RENDERERS ======================================================================================================
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
	// HELPERS ========================================================================================================
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
			"826": "gb",
			gbr: "gb",
			["great britain"]: "gb",
			["united kingdom"]: "gb",

			// Greece
			"300": "gr",
			grc: "gr",
			greece: "gr",

			// Hong Kong
			"344": "hk",
			hkg: "hk",
			["hong kong"]: "hk",

			// Honduras
			"340": "hn",
			hnd: "hn",
			honduras: "hn",

			// Hungary
			"348": "hu",
			hun: "hu",
			hungary: "hu",

			// Indonesia
			"360": "id",
			idn: "id",
			indonesia: "id",

			// Ireland
			"372": "ie",
			irl: "ie",
			ireland: "ie",

			// Italy
			"380": "it",
			ita: "it",
			italy: "it",

			// Japan
			"392": "jp",
			jpn: "jp",
			japan: "jp",

			// Luxembourg
			"442": "lu",
			lux: "lu",
			luxembourg: "lu",

			// Macau
			"446": "mo",
			mac: "mo",
			macao: "mo",
			macau: "mo",

			// Monaco
			"492": "mo",
			mco: "mo",
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

			// Palestine
			"275": "ps",
			pse: "ps",
			palestine: "ps",

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
