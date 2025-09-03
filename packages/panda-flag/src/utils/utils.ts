// resources
import { flagAd } from "../resources/ad"; // Andorra
import { flagAi } from "../resources/ai";
import { flagAl } from "../resources/al";
import { flagAm } from "../resources/am"; // Armenia
import { flagAo } from "../resources/ao";
import { flagAr } from "../resources/ar";
import { flagAs } from "../resources/as";
import { flagAt } from "../resources/at"; // Austria
import { flagAu } from "../resources/au";
import { flagAx } from "../resources/ax";
import { flagBe } from "../resources/be"; // Belgium
import { flagBg } from "../resources/bg"; // Bulgaria
import { flagBo } from "../resources/bo"; // Bolivia
import { flagBr } from "../resources/br"; // Brazil
import { flagBs } from "../resources/bs"; // Bahamas
import { flagBt } from "../resources/bt";
import { flagCa } from "../resources/ca"; // Canada
import { flagCh } from "../resources/ch"; // Switzerland
import { flagCi } from "../resources/ci"; // Ivory Coast
import { flagCn } from "../resources/cn"; // China
import { flagCy } from "../resources/cy";
import { flagCz } from "../resources/cz"; // Czechia / Czech Republic
import { flagDe } from "../resources/de"; // Germany
import { flagDj } from "../resources/dj"; // Djibouti
import { flagDk } from "../resources/dk"; // Denmark
import { flagDo } from "../resources/do"; // Dominican Republic
import { flagDz } from "../resources/dz";
import { flagEe } from "../resources/ee";
import { flagEg } from "../resources/eg"; // Egypt
import { flagEs } from "../resources/es";
import { flagFi } from "../resources/fi"; // Finland
import { flagFr } from "../resources/fr"; // France
import { flagGb } from "../resources/gb"; // Great Britain
import { flagGr } from "../resources/gr"; // Greece
import { flagGt } from "../resources/gt"; // Guatemala
import { flagHk } from "../resources/hk"; // Hong Kong
import { flagHn } from "../resources/hn"; // Honduras
import { flagHu } from "../resources/hu"; // Hungary
import { flagId } from "../resources/id"; // Indonesia
import { flagIe } from "../resources/ie"; // Ireland
import { flagIl } from "../resources/il"; // Israel
import { flagIn } from "../resources/in";
import { flagIs } from "../resources/is";
import { flagIt } from "../resources/it"; // Italy
import { flagJp } from "../resources/jp"; // Japan
import { flagKz } from "../resources/kz";
import { flagLi } from "../resources/li";
import { flagLt } from "../resources/lt";
import { flagLu } from "../resources/lu"; // Luxembourg
import { flagMc } from "../resources/mc"; // Monaco
import { flagMl } from "../resources/ml"; // Mali
import { flagMo } from "../resources/mo"; // Macao
import { flagMu } from "../resources/mu"; // Mauritius
import { flagNg } from "../resources/ng"; // Nigeria
import { flagNl } from "../resources/nl"; // Netherlands
import { flagNo } from "../resources/no"; // Norway
import { flagPa } from "../resources/pa"; // Panama
import { flagPe } from "../resources/pe"; // Peru
import { flagPh } from "../resources/ph"; // Philippines
import { flagPl } from "../resources/pl"; // Poland
import { flagPr } from "../resources/pr";
import { flagPs } from "../resources/ps"; // Palestine
import { flagPt } from "../resources/pt"; // Portugal
import { flagPw } from "../resources/pw";
import { flagQa } from "../resources/qa"; // Qatar
import { flagRo } from "../resources/ro"; // Romania
import { flagRu } from "../resources/ru"; // Russia
import { flagSa } from "../resources/sa"; // Saudi Arabia
import { flagSc } from "../resources/sc"; // Seychelles
import { flagSe } from "../resources/se"; // Sweden
import { flagSg } from "../resources/sg"; // Singapore
import { flagSi } from "../resources/si"; // Slovenia
import { flagSk } from "../resources/sk";
import { flagSl } from "../resources/sl"; // Sierra Leone
import { flagSv } from "../resources/sv"; // El Salvador
import { flagTd } from "../resources/td"; // Chad
import { flagTg } from "../resources/tg"; // Togo
import { flagTl } from "../resources/tl"; // Timor-Leste
import { flagTn } from "../resources/tn"; // Tunisia
import { flagTo } from "../resources/to"; // Tonga
import { flagTr } from "../resources/tr"; // Turkey
import { flagTw } from "../resources/tw"; // Taiwan
import { flagUa } from "../resources/ua"; // Ukraine
import { flagUs } from "../resources/us"; // Unites States
import { flagVe } from "../resources/ve"; // Venezuela
import { flagVn } from "../resources/vn"; // Vietnam
// default template
import { defaultFlag } from "../resources/default";
// extras
import { flagPirate } from "../resources/pirate";
import { flagEu } from "../resources/eu";


/**
 * Get the flag template for a specific country.
 * @param {String} flag country code or name, e.g. "am", "armenia", "Armenia", "AM"
 * @param {Boolean} square whether to use a square flag template
 * @param {Boolean} round whether to use a square flag template for round flag style
 * @returns {String} SVG string of the flag template
 */
export const getFlagTemplate = (flag: string, square: boolean, round: boolean) => {
	// map of country codes to flag templates
	// the keys are the country codes, and the values are functions that return the SVG string
	const flagTemplateMap: { [countryCode: string]: (square: boolean) => string } = {
		ad: flagAd, // Andorra
		ai: flagAi, // Anguilla
		al: flagAl, // Albania
		am: flagAm, // Armenia
		ao: flagAo, // Angola
		ar: flagAr, // Argentina
		as: flagAs, // American Samoa
		at: flagAt, // Austria
		au: flagAu, // Australia
		ax: flagAx, // Aland Islands
		be: flagBe, // Belgium
		bg: flagBg, // Bulgaria
		bo: flagBo, // Bolivia
		br: flagBr, // Brazil
		bs: flagBs, // Bahamas
		bt: flagBt, // Bhutan
		ca: flagCa, // Canada
		ch: flagCh, // Switzerland
		ci: flagCi, // Ivory Coast
		cn: flagCn, // China
		cy: flagCy, // Cyprus
		cz: flagCz, // Czech Republic
		de: flagDe, // Germany
		dj: flagDj, // Djibouti
		dk: flagDk, // Denmark
		do: flagDo, // Dominican Republic
		dz: flagDz, // Algeria
		ee: flagEe, // Estonia
		eg: flagEg, // Egypt
		es: flagEs, // Spain
		fi: flagFi, // Finland
		fr: flagFr, // France
		gb: flagGb, // United Kingdom
		gr: flagGr, // Greece
		gt: flagGt, // Guatemala
		hk: flagHk, // Hong Kong
		hn: flagHn, // Honduras
		hu: flagHu, // Hungary
		id: flagId, // Indonesia
		ie: flagIe, // Ireland
		il: flagIl, // Israel
		in: flagIn, // India
		is: flagIs, // Iceland
		it: flagIt, // Italy
		jp: flagJp, // Japan
		kz: flagKz, // Kazakhstan
		li: flagLi, // Liechtenstein
		lt: flagLt, // Lithuania
		lu: flagLu, // Luxembourg
		mc: flagMc, // Monaco
		ml: flagMl, // Mali
		mo: flagMo, // Macau
		mu: flagMu, // Mauritius
		ng: flagNg, // Nigeria
		nl: flagNl, // Netherlands
		no: flagNo, // Norway
		pa: flagPa, // Panama
		pe: flagPe, // Peru
		ph: flagPh, // Philippines
		pl: flagPl, // Poland
		pr: flagPr, // Puerto Rico
		ps: flagPs, // Palestine
		pt: flagPt, // Portugal
		pw: flagPw, // Palau
		qa: flagQa, // Qatar
		ro: flagRo, // Romania
		ru: flagRu, // Russia
		sa: flagSa, // Saudi Arabia
		sc: flagSc, // Seychelles
		se: flagSe, // Sweden
		sg: flagSg, // Singapore
		si: flagSi, // Slovenia
		sk: flagSk, // Slovakia
		sl: flagSl, // Slovenia
		sv: flagSv, // El Salvador
		td: flagTd, // Chad
		tg: flagTg, // Togo
		tl: flagTl, // Timor-Leste
		tn: flagTn, // Tunisia
		to: flagTo, // Tonga
		tr: flagTr, // Turkey
		tw: flagTw, // Taiwan
		ua: flagUa, // Ukraine
		uk: flagGb, // United Kingdom
		us: flagUs, // United States
		ve: flagVe, // Venezuela
		vn: flagVn, // Vietnam
		default: defaultFlag, // default flag template for unknown country codes
		// extras
		eu: flagEu, // European Union
		pirate: flagPirate, // Pirate Flag
	};
	const viewBox = square || round
		? "0 0 256 256"
		: "0 0 256 192";
	const flagTemplate = flagTemplateMap[getCountryCode(flag)] || flagTemplateMap.default;
	// return the SVG template with the correct viewBox and flag template
	return /*html*/`
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink" 
			version="1.1"
			viewBox="${viewBox}"
			preserveAspectRatio="xMidYMid meet"
			x="0"
			y="0"
		>
			${flagTemplate(square || round)}
		</svg>
	`;
}

/**
 * Convert country key to country code. Compliant with the ISO 3166 international standard.
 * @param {String} key country key eg. POLAND -> pl, "poland" -> pl, "pol" -> pl
 * @returns {String} country code eg. pl, de, us, etc.
 * @example
 * getCountryCode("POLAND") // "pl"
 * getCountryCode("poland") // "pl"
 * getCountryCode("pol") // "pl"
 */
export const getCountryCode = (key: string): string => {
	const keyMap: { [countryKey: string]: string } = {
		// Afghanistan
		"004": "af",
		afg: "af",

		// Aland Islands
		"248": "ax",
		ala: "ax",

		// Albania
		"008": "al",
		alb: "al",

		// Algeria
		"012": "dz",
		dza: "dz",

		// American Samoa
		"016": "as",
		asm: "as",

		// Andorra
		"020": "ad",
		and: "ad",

		// Angola
		"024": "ao",
		ago: "ao",

		// Anguilla
		"660": "ai",
		aia: "ai",

		// Antarctica
		"010": "aq",
		ata: "aq",

		// Antigua and Barbuda
		"028": "ag",
		atg: "ag",

		// Argentina
		"032": "ar",
		arg: "ar",

		// Armenia
		"051": "am",
		arm: "am",

		// Aruba
		"533": "aw",
		abw: "aw",

		// Australia
		"036": "au",
		aus: "au",

		// Austria
		"040": "at",
		aut: "at",

		// Azerbaijan
		"031": "az",
		aze: "az",

		// Bahamas
		"044": "bs",
		bhs: "bs",

		// Bahrain
		"048": "bh",
		bhr: "bh",

		// Bangladesh
		"050": "bd",
		bgd: "bd",

		// Barbados
		"052": "bb",
		brb: "bb",

		// Belarus
		"112": "by",
		blr: "by",

		// Belgium
		"056": "be",
		bel: "be",

		// Belize
		"084": "bz",
		blz: "bz",

		// Benin
		"204": "bj",
		ben: "bj",

		// Bermuda
		"060": "bm",
		bmu: "bm",

		// Bhutan
		"064": "bt",
		btn: "bt",

		// Bolivia
		"068": "bo",
		bol: "bo",

		// Bonaire, Sint Eustatius and Saba
		"535": "bq",
		bes: "bq",

		// Bosnia and Herzegovina
		"070": "ba",
		bih: "ba",

		// Botswana
		"072": "bw",
		bwa: "bw",

		// Bouvet Island
		"074": "bv",
		bvt: "bv",

		// Brazil
		"076": "br",
		bra: "br",

		// British Indian Ocean Territory
		"086": "io",
		iot: "io",

		// Brunei Darussalam
		"096": "bn",
		brn: "bn",

		// Bulgaria
		"100": "bg",
		bgr: "bg",

		// Burkina Faso
		"854": "bf",
		bfa: "bf",

		// Burundi
		"108": "bi",
		bdi: "bi",

		// Cabo Verde
		"132": "cv",
		cpv: "cv",

		// Cambodia
		"116": "kh",
		khm: "kh",

		// Cameroon
		"120": "cm",
		cmr: "cm",

		// Canada
		"124": "ca",
		can: "ca",

		// Cayman Islands
		"136": "ky",
		cym: "ky",

		// Central African Republic
		"140": "cf",
		caf: "cf",

		// Chad
		"148": "td",
		tcd: "td",

		// Chile
		"152": "cl",
		chl: "cl",

		// China
		"156": "cn",
		chn: "cn",

		// Christmas Island
		"162": "cx",
		cxr: "cx",

		// Cocos (Keeling) Islands
		"166": "cc",
		cck: "cc",

		// Colombia
		"170": "co",
		col: "co",

		// Comoros
		"174": "km",
		com: "km",

		// Congo
		"178": "cg",
		cog: "cg",

		// Congo, Democratic Republic of the
		"180": "cd",
		cod: "cd",

		// Cook Islands
		"184": "ck",
		cok: "ck",

		// Costa Rica
		"188": "cr",
		cri: "cr",

		// Croatia
		"191": "hr",
		hrv: "hr",

		// Cuba
		"192": "cu",
		cub: "cu",

		// Curaçao
		"531": "cw",
		cuw: "cw",

		// Cyprus
		"196": "cy",
		cyp: "cy",

		// Czechia
		"203": "cz",
		cze: "cz",

		// Côte d'Ivoire
		"384": "ci",
		civ: "ci",

		// Denmark
		"208": "dk",
		dnk: "dk",

		// Djibouti
		"262": "dj",
		dji: "dj",

		// Dominica
		"212": "dm",
		dma: "dm",

		// Dominican Republic
		"214": "do",
		dom: "do",

		// Ecuador
		"218": "ec",
		ecu: "ec",
	
		// Egypt
		"818": "eg",
		egy: "eg",
	
		// El Salvador
		"222": "sv",
		slv: "sv",

		// Equatorial Guinea
		"226": "gq",
		gnq: "gq",

		// Eritrea
		"232": "er",
		eri: "er",

		// Estonia
		"233": "ee",
		est: "ee",

		// Eswatini
		"748": "sz",
		swz: "sz",

		// Ethiopia
		"231": "et",
		eth: "et",

		// Falkland Islands
		"238": "fk",
		flk: "fk",

		// Faroe Islands
		"234": "fo",
		fro: "fo",

		// Fiji
		"242": "fj",
		fji: "fj",

		// Finland
		"246": "fi",
		fin: "fi",

		// France
		"250": "fr",
		fra: "fr",

		// French Guiana
		"254": "gf",
		guf: "gf",

		// French Polynesia
		"258": "pf",
		pyf: "pf",

		// French Southern Territories
		"260": "tf",
		atf: "tf",

		// Gabon
		"266": "ga",
		gab: "ga",

		// Gambia
		"270": "gm",
		gmb: "gm",

		// Georgia
		"268": "ge",
		geo: "ge",

		// Germany
		"276": "de",
		deu: "de",

		// Ghana
		"288": "gh",
		gha: "gh",
		ghana: "gh",

		// Gibraltar
		"292": "gi",
		gib: "gi",

		// Greece
		"300": "gr",
		grc: "gr",

		// Greenland
		"304": "gl",
		grl: "gl",

		// Grenada
		"308": "gd",
		grd: "gd",

		// Guadeloupe
		"312": "gp",
		glp: "gp",

		// Guam
		"316": "gu",
		gum: "gu",

		// Guatemala
		"320": "gt",
		gtm: "gt",

		// Guernsey
		"831": "gg",
		ggy: "gg",

		// Guinea
		"324": "gn",
		gin: "gn",

		// Guinea-Bissau
		"624": "gw",
		gnb: "gw",

		// Guyana
		"328": "gy",
		guy: "gy",

		// Haiti
		"332": "ht",
		hti: "ht",

		// Heard Island and McDonald Islands
		"334": "hm",
		hmd: "hm",

		// Holy See
		"336": "va",
		vat: "va",

		// Honduras
		"340": "hn",
		hnd: "hn",

		// Hong Kong
		"344": "hk",
		hkg: "hk",

		// Hungary
		"348": "hu",
		hun: "hu",

		// Iceland
		"352": "is",
		isl: "is",

		// India
		"356": "in",
		ind: "in",
		india: "in",

		// Indonesia
		"360": "id",
		idn: "id",

		// Iran
		"364": "ir",
		irn: "ir",

		// Iraq
		"368": "iq",
		irq: "iq",

		// Ireland
		"372": "ie",
		irl: "ie",

		// Isle of Man
		"833": "im",
		imn: "im",

		// Israel
		"376": "il",
		isr: "il",

		// Italy
		"380": "it",
		ita: "it",

		// Jamaica
		"388": "jm",
		jam: "jm",

		// Japan
		"392": "jp",
		jpn: "jp",

		// Jersey
		"832": "je",
		jey: "je",

		// Jordan
		"400": "jo",
		jor: "jo",

		// Kazakhstan
		"398": "kz",
		kaz: "kz",

		// Kenya
		"404": "ke",
		ken: "ke",

		// Kiribati
		"296": "ki",
		kir: "ki",

		// Korea, Democratic People's Republic of
		"408": "kp",
		prk: "kp",

		// Korea, Republic of
		"410": "kr",
		kor: "kr",

		// Kuwait
		"414": "kw",
		kwt: "kw",

		// Kyrgyzstan
		"417": "kg",
		kgz: "kg",

		// Lao People's Democratic Republic
		"418": "la",
		lao: "la",

		// Latvia
		"428": "lv",
		lva: "lv",

		// Lebanon
		"422": "lb",
		lbn: "lb",

		// Lesotho
		"426": "ls",
		lso: "ls",

		// Liberia
		"430": "lr",
		lbr: "lr",

		// Libya
		"434": "ly",
		lby: "ly",

		// Liechtenstein
		"438": "li",
		lie: "li",

		// Lithuania
		"440": "lt",
		ltu: "lt",

		// Luxembourg
		"442": "lu",
		lux: "lu",

		// Macao Special Administrative Region of China
		"446": "mo",
		mac: "mo",

		// Madagascar
		"450": "mg",
		mdg: "mg",

		// Malawi
		"454": "mw",
		mwi: "mw",

		// Malaysia
		"458": "my",
		mys: "my",
		malaysia: "my",

		// Maldives
		"462": "mv",
		mdv: "mv",

		// Mali
		"466": "ml",
		mli: "ml",

		// Malta
		"470": "mt",
		mlt: "mt",

		// Marshall Islands
		"584": "mh",
		mhl: "mh",

		// Martinique
		"474": "mq",
		mtq: "mq",

		// Mauritania
		"478": "mr",
		mrt: "mr",

		// Mauritius
		"480": "mu",
		mus: "mu",

		// Mayotte
		"175": "yt",
		myt: "yt",

		// Mexico
		"484": "mx",
		mex: "mx",

		// Micronesia, Federated States of
		"583": "fm",
		fsm: "fm",

		// Moldova
		"498": "md",
		mda: "md",

		// Monaco
		"492": "mo",
		mco: "mo",

		// Mongolia
		"496": "mn",
		mng: "mn",

		// Montenegro
		"499": "me",
		mne: "me",

		// Montserrat
		"500": "ms",
		msr: "ms",

		// Morocco
		"504": "ma",
		mar: "ma",

		// Mozambique
		"508": "mz",
		moz: "mz",

		// Myanmar
		"104": "mm",
		mmr: "mm",

		// Namibia
		"516": "na",
		nam: "na",

		// Nauru
		"520": "nr",
		nru: "nr",

		// Nepal
		"524": "np",
		npl: "np",

		// Netherlands 
		"528": "nl",
		nld: "nl",

		// New Caledonia
		"540": "nc",
		ncl: "nc",

		// New Zealand
		"554": "nz",
		nzl: "nz",

		// Nicaragua
		"558": "ni",
		nic: "ni",

		// Niger
		"562": "ne",
		ner: "ne",

		// Nigeria
		"566": "ng",
		nga: "ng",

		// Niue
		"570": "nu",
		niu: "nu",

		// Norfolk Island
		"574": "nf",
		nfk: "nf",

		// Northern Mariana Islands
		"580": "mp",
		mnp: "mp",

		// Norway
		"578": "no",
		nor: "no",

		// Oman
		"512": "om",
		omn: "om",

		// Pakistan
		"586": "pk",
		pak: "pk",
		pakistan: "pk",

		// Palau
		"585": "pw",
		plw: "pw",
		palau: "pw",

		// Palestine, State of
		"275": "ps",
		pse: "ps",
		palestine: "ps",

		// Panama
		"591": "pa",
		pan: "pa",
		panama: "pa",

		// Papua New Guinea
		"598": "pg",
		png: "pg",
		"papua new guinea": "pg",

		// Paraguay
		"600": "py",
		pry: "py",
		paraguay: "py",

		// Peru
		"604": "pe",
		per: "pe",
		peru: "pe",

		// Philippines
		"608": "ph",
		phl: "ph",
		philippines: "ph",

		// Pitcairn
		"612": "pn",
		pcn: "pn",
		pitcairn: "pn",

		// Poland
		"616": "pl",
		pol: "pl",
		poland: "pl",

		// Portugal
		"620": "pt",
		prt: "pt",
		portugal: "pt",

		// Puerto Rico
		"630": "pr",
		pri: "pr",
		"puerto rico": "pr",

		// Qatar
		"634": "qa",
		qat: "qa",
		qatar: "qa",

		// Republic of North Macedonia
		"807": "mk",
		mkd: "mk",
		macedonia: "mk",
		"republic of north macedonia": "mk",

		// Romania
		"642": "ro",
		rou: "ro",
		romania: "ro",

		// Russian Federation
		"643": "ru",
		rus: "ru",
		russia: "ru",
		"russian federation": "ru",

		// Rwanda
		"646": "rw",
		rwa: "rw",
		rwanda: "rw",

		// Réunion
		"638": "re",
		reu: "re",
		reunion: "re",

		// Saint Barthélemy
		"652": "bl",
		blm: "bl",
		"saint barthelemy": "bl",

		// Saint Helena, Ascension and Tristan da Cunha
		"654": "sh",
		shn: "sh",
		"saint helena": "sh",

		// Saint Kitts and Nevis
		"659": "kn",
		kna: "kn",
		"saint kitts and nevis": "kn",

		// Saint Lucia
		"662": "lc",
		lca: "lc",
		"saint lucia": "lc",

		// Saint Martin (French part)
		"663": "mf",
		maf: "mf",
		"saint martin": "mf",

		// Saint Pierre and Miquelon
		"666": "pm",
		spm: "pm",
		"saint pierre and miquelon": "pm",

		// Saint Vincent and the Grenadines
		"670": "vc",
		vct: "vc",
		"saint vincent and the grenadines": "vc",

		// Samoa
		"882": "ws",
		wsm: "ws",
		samoa: "ws",

		// San Marino
		"674": "sm",
		smr: "sm",
		"san marino": "sm",

		// Sao Tome and Principe
		"678": "st",
		stp: "st",
		"sao tome and principe": "st",

		// Saudi Arabia
		"682": "sa",
		sau: "sa",
		"saudi arabia": "sa",

		// Senegal
		"686": "sn",
		sen: "sn",
		senegal: "sn",

		// Serbia
		"688": "rs",
		srb: "rs",
		serbia: "rs",

		// Seychelles
		"690": "sc",
		syc: "sc",
		seychelles: "sc",

		// Sierra Leone
		"694": "sl",
		sle: "sl",
		"sierra leone": "sl",

		// Singapore
		"702": "sg",
		sgp: "sg",
		singapore: "sg",

		// Sint Maarten (Dutch part)
		"534": "sx",
		sxm: "sx",
		"sint maarten": "sx",

		// Slovakia
		"703": "sk",
		svk: "sk",
		slovakia: "sk",

		// Slovenia
		"705": "si",
		svn: "si",
		slovenia: "si",

		// Solomon Islands
		"090": "sb",
		slb: "sb",
		"solomon islands": "sb",

		// Somalia
		"706": "so",
		som: "so",
		somalia: "so",

		// South Africa
		"710": "za",
		zaf: "za",
		"south africa": "za",

		// South Georgia and the South Sandwich Islands
		"239": "gs",
		sgs: "gs",
		"south georgia and the south sandwich islands": "gs",

		// South Sudan
		"728": "ss",
		ssd: "ss",
		"south sudan": "ss",

		// Spain
		"724": "es",
		esp: "es",
		spain: "es",

		// Sri Lanka
		"144": "lk",
		lka: "lk",
		"sri lanka": "lk",

		// Sudan
		"729": "sd",
		sdn: "sd",
		sudan: "sd",

		// Suriname
		"740": "sr",
		sur: "sr",
		suriname: "sr",

		// Svalbard and Jan Mayen
		"744": "sj",
		sjm: "sj",
		"svalbard and jan mayen": "sj",

		// Sweden
		"752": "se",
		swe: "se",
		sweden: "se",

		// Switzerland
		"756": "ch",
		che: "ch",
		switzerland: "ch",

		// Syria
		"760": "sy",
		syr: "sy",
		syria: "sy",

		// Taiwan
		"158": "tw",
		twn: "tw",
		taiwan: "tw",

		// Tajikistan
		"762": "tj",
		tjk: "tj",
		tajikistan: "tj",

		// Tanzania, United Republic of
		"834": "tz",
		tza: "tz",
		tanzania: "tz",

		// Thailand
		"764": "th",
		tha: "th",
		thailand: "th",

		// Timor-Leste
		"626": "tl",
		tls: "tl",
		"timor-leste": "tl",

		// Togo
		"768": "tg",
		tgo: "tg",
		togo: "tg",

		// Tokelau
		"772": "tk",
		tkl: "tk",
		tokelau: "tk",

		// Tonga
		"776": "to",
		ton: "to",
		tonga: "to",

		// Trinidad and Tobago
		"780": "tt",
		tto: "tt",
		"trinidad and tobago": "tt",

		// Tunisia
		"788": "tn",
		tun: "tn",
		tunisia: "tn",

		// Turkey
		"792": "tr",
		tur: "tr",
		turkey: "tr",

		// Turkmenistan
		"795": "tm",
		tkm: "tm",
		turkmenistan: "tm",

		// Turks and Caicos Islands
		"796": "tc",
		tca: "tc",
		"turks and caicos islands": "tc",

		// Tuvalu
		"798": "tv",
		tuv: "tv",
		tuvalu: "tv",

		// Uganda
		"800": "ug",
		uga: "ug",
		uganda: "ug",

		// Ukraine
		"804": "ua",
		ukr: "ua",
		ukraine: "ua",

		// United Arab Emirates
		"784": "ae",
		are: "ae",
		"united arab emirates": "ae",

		// United Kingdom of Great Britain and Northern Ireland
		"826": "gb",
		gbr: "gb",
		"united kingdom": "gb",
		"great britain": "gb",

		// United States Minor Outlying Islands
		"581": "um",
		umi: "um",
		"united states minor outlying islands": "um",

		// United States
		"840": "us",
		usa: "us",
		"united states": "us",
		"united states of america": "us",

		// Uruguay
		"858": "uy",
		ury: "uy",
		"uruguay": "uy",

		// Uzbekistan
		"860": "uz",
		uzb: "uz",
		"uzbekistan": "uz",

		// Vanuatu
		"548": "vu",
		vut: "vu",
		"vanuatu": "vu",

		// Venezuela
		"862": "ve",
		ven: "ve",
		venezuela: "ve",

		// Vietnam
		"704": "vn",
		vnm: "vn",
		"viet nam": "vn",
		vietnam: "vn",

		// Virgin Islands (British)
		"092": "vg",
		vgb: "vg",
		"virgin islands (british)": "vg",

		// Virgin Islands (U.S.)
		"850": "vi",
		vir: "vi",
		"virgin islands (u.s.)": "vi",

		// Wallis and Futuna
		"876": "wf",
		wlf: "wf",
		"wallis and futuna": "wf",

		// Western Sahara
		"732": "eh",
		esh: "eh",
		"western sahara": "eh",

		// Yemen
		"887": "ye",
		yem: "ye",
		"yemen": "ye",

		// Zambia
		"894": "zm",
		zmb: "zm",
		"zambia": "zm",

		// Zimbabwe
		"716": "zw",
		zwe: "zw",
		"zimbabwe": "zw",
	};
	// parse key value
	const _key = (key + "").toLocaleLowerCase();
	return keyMap[_key] || _key;
}
