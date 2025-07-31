// resources
import { flagAm } from "../resources/am"; // Armenia
import { flagAt } from "../resources/at"; // Austria
import { flagBe } from "../resources/be"; // Belgium
import { flagBg } from "../resources/bg"; // Bulgaria
import { flagBo } from "../resources/bo"; // Bolivia
import { flagBr } from "../resources/br"; // Brazil
import { flagCh } from "../resources/ch"; // Switzerland
import { flagCn } from "../resources/cn"; // China
import { flagDe } from "../resources/de"; // Germany
import { flagDk } from "../resources/dk"; // Denmark
import { flagEg } from "../resources/eg"; // Egypt
import { flagFi } from "../resources/fi"; // Finland
import { flagFr } from "../resources/fr"; // France
import { flagGb } from "../resources/gb"; // Great Britain
import { flagGr } from "../resources/gr"; // Greece
import { flagHk } from "../resources/hk"; // Hong Kong
import { flagHn } from "../resources/hn"; // Honduras
import { flagHu } from "../resources/hu"; // Hungary
import { flagId } from "../resources/id"; // Indonesia
import { flagIe } from "../resources/ie"; // Ireland
import { flagIt } from "../resources/it"; // Italy
import { flagJp } from "../resources/jp"; // Japan
import { flagLu } from "../resources/lu"; // Luxembourg
import { flagMc } from "../resources/mc"; // Monaco
import { flagMo } from "../resources/mo"; // Macao
import { flagNg } from "../resources/ng"; // Nigeria
import { flagNl } from "../resources/nl"; // Netherlands
import { flagNo } from "../resources/no"; // Norway
import { flagPa } from "../resources/pa"; // Panama
import { flagPe } from "../resources/pe"; // Peru
import { flagPl } from "../resources/pl"; // Poland
import { flagPs } from "../resources/ps"; // Palestine
import { flagPt } from "../resources/pt"; // Portugal
import { flagQa } from "../resources/qa"; // Qatar
import { flagRo } from "../resources/ro"; // Romania
import { flagRu } from "../resources/ru"; // Russia
import { flagSa } from "../resources/sa"; // Saudi Arabia
import { flagSe } from "../resources/se"; // Sweden
import { flagSg } from "../resources/sg"; // Singapore
import { flagSv } from "../resources/sv"; // El Salvador
import { flagTg } from "../resources/tg"; // Togo
import { flagTw } from "../resources/tw"; // Taiwan
import { flagUa } from "../resources/ua"; // Ukraine
import { flagUs } from "../resources/us"; // Unites States
import { flagVe } from "../resources/ve"; // Venezuela
import { flagVn } from "../resources/vn"; // Vietnam
// default template
import { defaultFlag } from "../resources/default";

/**
 * Get the flag template for a specific country.
 * @param flag country code or name, e.g. "am", "armenia", "Armenia", "AM"
 * @param square whether to use a square flag template
 * @returns SVG string of the flag template
 */
export const getFlagTemplate = (flag: string, square: boolean) => {
	// map of country codes to flag templates
	// the keys are the country codes, and the values are functions that return the SVG string
	const flagTemplateMap: { [countryCode: string]: (square: boolean) => string } = {
		am: flagAm,
		at: flagAt,
		be: flagBe,
		bo: flagBo,
		br: flagBr,
		ch: flagCh,
		cn: flagCn,
		de: flagDe,
		dk: flagDk,
		eg: flagEg,
		fi: flagFi,
		fr: flagFr,
		gb: flagGb,
		bg: flagBg,
		gr: flagGr,
		hk: flagHk,
		hn: flagHn,
		hu: flagHu,
		id: flagId,
		ie: flagIe,
		it: flagIt,
		jp: flagJp,
		lu: flagLu,
		mc: flagMc,
		mo: flagMo,
		ng: flagNg,
		nl: flagNl,
		no: flagNo,
		pa: flagPa,
		pe: flagPe,
		pl: flagPl,
		ps: flagPs,
		pt: flagPt,
		qa: flagQa,
		ro: flagRo,
		ru: flagRu,
		sa: flagSa,
		se: flagSe,
		sg: flagSg,
		sv: flagSv,
		tg: flagTg,
		tw: flagTw,
		ua: flagUa,
		uk: flagGb,
		us: flagUs,
		ve: flagVe,
		vn: flagVn,
		default: defaultFlag, // default flag template for unknown country codes
	};
	const viewBox = square
		? "0 0 256 256"
		: "0 0 256 192";
	const flagTemplate = flagTemplateMap[getCountryCode(flag)] || flagTemplateMap.default;
	// return the SVG template with the correct viewBox and flag template
	return /*html*/`
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="${viewBox}"
			preserveAspectRatio="xMidYMid meet"
			x="0"
			y="0"
		>
			${flagTemplate(square)}
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
		afghanistan: "af",

		// Aland Islands
		"248": "ax",
		ala: "ax",
		"aland islands": "ax",

		// Albania
		"008": "al",
		alb: "al",
		albania: "al",

		// Algeria
		"012": "dz",
		dza: "dz",
		algeria: "dz",

		// American Samoa
		"016": "as",
		asm: "as",
		"american samoa": "as",

		// Andorra
		"020": "ad",
		and: "ad",
		andorra: "ad",

		// Angola
		"024": "ao",
		ago: "ao",
		angola: "ao",

		// Anguilla
		"660": "ai",
		aia: "ai",
		anguilla: "ai",

		// Antarctica
		"010": "aq",
		ata: "aq",
		antarctica: "aq",

		// Antigua and Barbuda
		"028": "ag",
		atg: "ag",
		antigua: "ag",
		"antigua and barbuda": "ag",

		// Argentina
		"032": "ar",
		arg: "ar",
		argentina: "ar",

		// Armenia
		"051": "am",
		arm: "am",
		armenia: "am",

		// Aruba
		"533": "aw",
		abw: "aw",
		aruba: "aw",

		// Australia
		"036": "au",
		aus: "au",
		australia: "au",

		// Austria
		"040": "at",
		aut: "at",
		austria: "at",

		// Azerbaijan
		"031": "az",
		aze: "az",
		azerbaijan: "az",

		// Bahamas
		"044": "bs",
		bhs: "bs",
		bahamas: "bs",

		// Bangladesh
		"050": "bd",
		bgd: "bd",
		bangladesh: "bd",

		// Bahrain
		"048": "bh",
		bhr: "bh",
		bahrain: "bh",

		// Barbados
		"052": "bb",
		brb: "bb",
		barbados: "bb",

		// Belarus
		"112": "by",
		blr: "by",
		belarus: "by",

		// Belgium
		"056": "be",
		bel: "be",
		belgium: "be",

		// Belize
		"084": "bz",
		blz: "bz",
		belize: "bz",

		// Benin
		"204": "bj",
		ben: "bj",
		benin: "bj",

		// Bermuda
		"060": "bm",
		bmu: "bm",
		bermuda: "bm",

		// Bhutan
		"064": "bt",
		btn: "bt",
		bhutan: "bt",

		// Bolivia
		"068": "bo",
		bol: "bo",
		bolivia: "bo",

		// Bonaire, Sint Eustatius and Saba
		"535": "bq",
		bes: "bq",
		"bonaire sint eustatius and saba": "bq",

		// Bosnia and Herzegovina
		"070": "ba",
		bih: "ba",
		bosnia: "ba",
		"bosnia and herzegovina": "ba",

		// Botswana
		"072": "bw",
		bwa: "bw",
		botswana: "bw",

		// Bouvet Island
		"074": "bv",
		bvt: "bv",
		bouvet: "bv",

		// Brazil
		"076": "br",
		bra: "br",
		brazil: "br",

		// British Indian Ocean Territory
		"086": "io",
		iot: "io",
		"british indian ocean territory": "io",

		// Brunei Darussalam
		"096": "bn",
		brn: "bn",
		"brunei darussalam": "bn",

		// Bulgaria
		"100": "bg",
		bgr: "bg",
		bulgaria: "bg",

		// Burkina Faso
		"854": "bf",
		bfa: "bf",
		burkina: "bf",
		"burkina faso": "bf",

		// Burundi
		"108": "bi",
		bdi: "bi",
		burundi: "bi",

		// Cabo Verde
		"132": "cv",
		cpv: "cv",
		cabo: "cv",
		"cabo verde": "cv",

		// Cambodia
		"116": "kh",
		khm: "kh",
		cambodia: "kh",

		// Cameroon
		"120": "cm",
		cmr: "cm",
		cameroon: "cm",

		// Canada
		"124": "ca",
		can: "ca",
		canada: "ca",

		// Cayman Islands
		"136": "ky",
		cym: "ky",
		cayman: "ky",
		"cayman islands": "ky",

		// Central African Republic
		"140": "cf",
		caf: "cf",
		"central african republic": "cf",

		// Chad
		"148": "td",
		tcd: "td",
		chad: "td",

		// Chile
		"152": "cl",
		chl: "cl",
		chile: "cl",

		// China
		"156": "cn",
		chn: "cn",
		china: "cn",

		// Christmas Island
		"162": "cx",
		cxr: "cx",
		"christmas island": "cx",

		// Cocos (Keeling) Islands
		"166": "cc",
		cck: "cc",
		"cocos islands": "cc",

		// Colombia
		"170": "co",
		col: "co",
		colombia: "co",

		// Comoros
		"174": "km",
		com: "km",
		comoros: "km",

		// Congo
		"178": "cg",
		cog: "cg",
		congo: "cg",

		// Congo, Democratic Republic of the
		"180": "cd",
		cod: "cd",
		"congo democratic republic of the": "cd",

		// Cook Islands
		"184": "ck",
		cok: "ck",
		"cook islands": "ck",

		// Costa Rica
		"188": "cr",
		cri: "cr",
		"costa rica": "cr",

		// Croatia
		"191": "hr",
		hrv: "hr",
		croatia: "hr",

		// Cuba
		"192": "cu",
		cub: "cu",
		cuba: "cu",

		// Curaçao
		"531": "cw",
		cuw: "cw",
		curacao: "cw",

		// Cyprus
		"196": "cy",
		cyp: "cy",
		cyprus: "cy",

		// Czechia
		"203": "cz",
		cze: "cz",
		czechia: "cz",
		"czech republic": "cz",

		// Côte d'Ivoire
		"384": "ci",
		civ: "ci",
		"cote d'ivoire": "ci",

		// Denmark
		"208": "dk",
		dnk: "dk",
		denmark: "dk",

		// Djibouti
		"262": "dj",
		dji: "dj",
		djibouti: "dj",

		// Dominica
		"212": "dm",
		dma: "dm",
		dominica: "dm",

		// Dominican Republic
		"214": "do",
		dom: "do",
		"dominican republic": "do",

		// Ecuador
		"218": "ec",
		ecu: "ec",
		ecuador: "ec",
	
		// Egypt
		"818": "eg",
		egy: "eg",
		egypt: "eg",
	
		// El Salvador
		"222": "sv",
		slv: "sv",
		"el salvador": "sv",

		// Equatorial Guinea
		"226": "gq",
		gnq: "gq",
		"equatorial guinea": "gq",

		// Eritrea
		"232": "er",
		eri: "er",
		eritrea: "er",

		// Estonia
		"233": "ee",
		est: "ee",
		estonia: "ee",

		// Eswatini
		"748": "sz",
		swz: "sz",
		eswatini: "sz",

		// Ethiopia
		"231": "et",
		eth: "et",
		ethiopia: "et",

		// Falkland Islands
		"238": "fk",
		flk: "fk",
		"falkland islands": "fk",
		"islas malvinas": "fk",

		// Faroe Islands
		"234": "fo",
		fro: "fo",
		"faroe islands": "fo",

		// Fiji
		"242": "fj",
		fji: "fj",
		fiji: "fj",

		// Finland
		"246": "fi",
		fin: "fi",
		finland: "fi",

		// France
		"250": "fr",
		fra: "fr",
		france: "fr",

		// French Guiana
		"254": "gf",
		guf: "gf",
		"french guiana": "gf",

		// French Polynesia
		"258": "pf",
		pyf: "pf",
		"french polynesia": "pf",

		// French Southern Territories
		"260": "tf",
		atf: "tf",
		"french southern territories": "tf",

		// Gabon
		"266": "ga",
		gab: "ga",
		gabon: "ga",

		// Gambia
		"270": "gm",
		gmb: "gm",
		gambia: "gm",

		// Georgia
		"268": "ge",
		geo: "ge",
		georgia: "ge",

		// Germany
		"276": "de",
		deu: "de",
		germany: "de",

		// Ghana
		"288": "gh",
		gha: "gh",
		ghana: "gh",

		// Gibraltar
		"292": "gi",
		gib: "gi",
		gibraltar: "gi",

		// Greece
		"300": "gr",
		grc: "gr",
		greece: "gr",

		// Greenland
		"304": "gl",
		grl: "gl",
		greenland: "gl",

		// Grenada
		"308": "gd",
		grd: "gd",
		grenada: "gd",

		// Guadeloupe
		"312": "gp",
		glp: "gp",
		guadeloupe: "gp",

		// Guam
		"316": "gu",
		gum: "gu",
		guam: "gu",

		// Guatemala
		"320": "gt",
		gtm: "gt",
		guatemala: "gt",

		// Guernsey
		"831": "gg",
		ggy: "gg",
		guernsey: "gg",

		// Guinea
		"324": "gn",
		gin: "gn",
		guinea: "gn",

		// Guinea-Bissau
		"624": "gw",
		gnb: "gw",
		"guinea-bissau": "gw",

		// Guyana
		"328": "gy",
		guy: "gy",
		guyana: "gy",

		// Haiti
		"332": "ht",
		hti: "ht",
		haiti: "ht",

		// Heard Island and McDonald Islands
		"334": "hm",
		hmd: "hm",
		"heard island and mcdonald islands": "hm",

		// Holy See
		"336": "va",
		vat: "va",
		"holy see": "va",

		// Honduras
		"340": "hn",
		hnd: "hn",
		honduras: "hn",

		// Hong Kong
		"344": "hk",
		hkg: "hk",
		"hong kong": "hk",

		// Hungary
		"348": "hu",
		hun: "hu",
		hungary: "hu",

		// Iceland
		"352": "is",
		isl: "is",
		iceland: "is",

		// India
		"356": "in",
		ind: "in",
		india: "in",

		// Indonesia
		"360": "id",
		idn: "id",
		indonesia: "id",

		// Iran
		"364": "ir",
		irn: "ir",
		iran: "ir",

		// Iraq
		"368": "iq",
		irq: "iq",
		iraq: "iq",

		// Ireland
		"372": "ie",
		irl: "ie",
		ireland: "ie",

		// Isle of Man
		"833": "im",
		imn: "im",
		"isle of man": "im",

		// Israel
		"376": "il",
		isr: "il",
		israel: "il",

		// Italy
		"380": "it",
		ita: "it",
		italy: "it",

		// Jamaica
		"388": "jm",
		jam: "jm",
		jamaica: "jm",

		// Japan
		"392": "jp",
		jpn: "jp",
		japan: "jp",

		// Jersey
		"832": "je",
		jey: "je",
		jersey: "je",

		// Jordan
		"400": "jo",
		jor: "jo",
		jordan: "jo",

		// Kazakhstan
		"398": "kz",
		kaz: "kz",
		kazakhstan: "kz",

		// Kenya
		"404": "ke",
		ken: "ke",
		kenya: "ke",

		// Kiribati
		"296": "ki",
		kir: "ki",
		kiribati: "ki",

		// Korea, Democratic People's Republic of
		"408": "kp",
		prk: "kp",
		"north korea": "kp",

		// Korea, Republic of
		"410": "kr",
		kor: "kr",
		"south korea": "kr",

		// Kuwait
		"414": "kw",
		kwt: "kw",
		kuwait: "kw",

		// Kyrgyzstan
		"417": "kg",
		kgz: "kg",
		kyrgyzstan: "kg",

		// Lao People's Democratic Republic
		"418": "la",
		lao: "la",
		laos: "la",

		// Latvia
		"428": "lv",
		lva: "lv",
		latvia: "lv",

		// Lebanon
		"422": "lb",
		lbn: "lb",
		lebanon: "lb",

		// Lesotho
		"426": "ls",
		lso: "ls",
		lesotho: "ls",

		// Liberia
		"430": "lr",
		lbr: "lr",
		liberia: "lr",

		// Libya
		"434": "ly",
		lby: "ly",
		libya: "ly",

		// Liechtenstein
		"438": "li",
		lie: "li",
		liechtenstein: "li",

		// Lithuania
		"440": "lt",
		ltu: "lt",
		lithuania: "lt",

		// Luxembourg
		"442": "lu",
		lux: "lu",
		luxembourg: "lu",

		// Macao Special Administrative Region of China
		"446": "mo",
		mac: "mo",
		macao: "mo",
		macau: "mo",

		// Madagascar
		"450": "mg",
		mdg: "mg",
		madagascar: "mg",

		// Malawi
		"454": "mw",
		mwi: "mw",
		malawi: "mw",

		// Malaysia
		"458": "my",
		mys: "my",
		malaysia: "my",

		// Maldives
		"462": "mv",
		mdv: "mv",
		maldives: "mv",

		// Mali
		"466": "ml",
		mli: "ml",
		mali: "ml",

		// Malta
		"470": "mt",
		mlt: "mt",
		malta: "mt",

		// Marshall Islands
		"584": "mh",
		mhl: "mh",
		"marshall islands": "mh",

		// Martinique
		"474": "mq",
		mtq: "mq",
		martinique: "mq",

		// Mauritania
		"478": "mr",
		mrt: "mr",
		mauritania: "mr",

		// Mauritius
		"480": "mu",
		mus: "mu",
		mauritius: "mu",

		// Mayotte
		"175": "yt",
		myt: "yt",
		mayotte: "yt",

		// Mexico
		"484": "mx",
		mex: "mx",
		mexico: "mx",

		// Micronesia, Federated States of
		"583": "fm",
		fsm: "fm",
		micronesia: "fm",

		// Moldova
		"498": "md",
		mda: "md",
		moldova: "md",

		// Monaco
		"492": "mo",
		mco: "mo",
		monaco: "mc",

		// Mongolia
		"496": "mn",
		mng: "mn",
		mongolia: "mn",

		// Montenegro
		"499": "me",
		mne: "me",
		montenegro: "me",

		// Montserrat
		"500": "ms",
		msr: "ms",
		montserrat: "ms",

		// Morocco
		"504": "ma",
		mar: "ma",
		morocco: "ma",

		// Mozambique
		"508": "mz",
		moz: "mz",
		mozambique: "mz",

		// Myanmar
		"104": "mm",
		mmr: "mm",
		myanmar: "mm",

		// Namibia
		"516": "na",
		nam: "na",
		namibia: "na",

		// Nauru
		"520": "nr",
		nru: "nr",
		nauru: "nr",

		// Nepal
		"524": "np",
		npl: "np",
		nepal: "np",

		// Netherlands 
		"528": "nl",
		nld: "nl",
		netherlands: "nl",
		holland: "nl",

		// New Caledonia
		"540": "nc",
		ncl: "nc",
		"new caledonia": "nc",

		// New Zealand
		"554": "nz",
		nzl: "nz",
		"new zealand": "nz",

		// Nicaragua
		"558": "ni",
		nic: "ni",
		nicaragua: "ni",

		// Niger
		"562": "ne",
		ner: "ne",
		niger: "ne",

		// Nigeria
		"566": "ng",
		nga: "ng",
		nigeria: "ng",

		// Niue
		"570": "nu",
		niu: "nu",
		niue: "nu",

		// Norfolk Island
		"574": "nf",
		nfk: "nf",
		"norfolk island": "nf",

		// Northern Mariana Islands
		"580": "mp",
		mnp: "mp",
		"northern mariana islands": "mp",

		// Norway
		"578": "no",
		nor: "no",
		norway: "no",

		// Oman
		"512": "om",
		omn: "om",
		oman: "om",

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

		// Tonga <========================================================================================= HERE

		// Ukraine
		"804": "ua",
		ukr: "ua",
		ukraine: "ua",

		// United Kingdom of Great Britain and Northern Ireland
		"826": "gb",
		gbr: "gb",
		"united kingdom": "gb",
		"great britain": "gb",

		// United States
		"840": "us",
		usa: "us",
		"united states": "us",
		"united states of america": "us",

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
	// parse key value
	const _key = (key + "").toLocaleLowerCase();
	return keyMap[_key] || _key;
}
