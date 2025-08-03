// types

export type FlagDetails = {
	fullName: string;
	name: string;
	keywords: string[];
}

// flag list
export const flagList = (): FlagDetails[] => {
	return [
		{ fullName: "Armenia", 				name: "am", keywords: ["051", "arm"] },
		{ fullName: "Austria", 				name: "at", keywords: ["040", "aut"] },
		{ fullName: "Belgium", 				name: "be", keywords: ["056", "bel"] },
		{ fullName: "Bolivia", 				name: "bo", keywords: ["068", "bol"] },
		{ fullName: "Brazil", 				name: "br", keywords: ["076", "bra"] },
		{ fullName: "Bulgaria", 			name: "bg", keywords: ["100", "bgr"] },
		{ fullName: "Chad", 				name: "td", keywords: ["148", "tcd"] },
		{ fullName: "China", 				name: "cn", keywords: ["156", "chn"] },
		{ fullName: "Czech Republic", 		name: "cz", keywords: ["203", "cze", "czechia"] },
		{ fullName: "Denmark", 				name: "dk", keywords: ["208", "dnk"] },
		{ fullName: "Dominican Republic", 	name: "do", keywords: ["214", "dom"] },
		{ fullName: "Egypt", 				name: "eg", keywords: ["818", "egy"] },
		{ fullName: "El Salvador", 			name: "sv", keywords: ["222", "slv"] },
		{ fullName: "Finland", 				name: "fi", keywords: ["246", "fin"] },
		{ fullName: "France", 				name: "fr", keywords: ["250", "fra"] },
		{ fullName: "Germany", 				name: "de", keywords: ["276", "deu"] },
		{ fullName: "Great Britain", 		name: "gb", keywords: ["826", "gbr", "United Kingdom"] },
		{ fullName: "Greece", 				name: "gr", keywords: ["300", "grc"] },
		{ fullName: "Guatemala",			name: "gt", keywords: ["320", "gtm"] },
		{ fullName: "Honduras", 			name: "hn", keywords: ["340", "hnd"] },
		{ fullName: "Hong Kong", 			name: "hk", keywords: ["344", "hkg"] },
		{ fullName: "Hungary", 				name: "hu", keywords: ["348", "hun"] },
		{ fullName: "Indonesia", 			name: "id", keywords: ["360", "idn"] },
		{ fullName: "Ireland", 				name: "ie", keywords: ["372", "irl"] },
		{ fullName: "Israel", 				name: "il", keywords: ["376", "isr"] },
		{ fullName: "Italy", 				name: "it", keywords: ["380", "ita"] },
		{ fullName: "Ivory Coast", 			name: "ci", keywords: ["384", "civ", "côte d'ivoire"] },
		{ fullName: "Japan", 				name: "jp", keywords: ["392", "jpn"] },
		{ fullName: "Luxembourg", 			name: "lu", keywords: ["442", "lux"] },
		{ fullName: "Macao", 				name: "mo", keywords: ["446", "mac", "macao", "macau"] },
		{ fullName: "Monaco", 				name: "mc", keywords: ["492", "mco"] },
		{ fullName: "Netherlands", 			name: "nl", keywords: ["528", "nld", "holland"] },
		{ fullName: "Nigeria", 				name: "ng", keywords: ["566", "nga"] },
		{ fullName: "Norway", 				name: "no", keywords: ["578", "nor"] },
		{ fullName: "Palestine", 			name: "ps", keywords: ["275", "pse"] },
		{ fullName: "Panama", 				name: "pa", keywords: ["591", "pan"] },
		{ fullName: "Peru", 				name: "pe", keywords: ["604", "per"] },
		{ fullName: "Poland", 				name: "pl", keywords: ["616", "pol"] },
		{ fullName: "Portugal", 			name: "pt", keywords: ["620", "prt"] },
		{ fullName: "Qatar", 				name: "qa", keywords: ["634", "qat"] },
		{ fullName: "Russia", 				name: "ru", keywords: ["643", "rus"] },
		{ fullName: "Saudi Arabia", 		name: "sa", keywords: ["682", "sau"] },
		{ fullName: "Sierra Leone", 		name: "sl", keywords: ["694", "sle"] },
		{ fullName: "Singapore", 			name: "sg", keywords: ["702", "sgp"] },
		{ fullName: "Sweden", 				name: "se", keywords: ["752", "swe"] },
		{ fullName: "Switzerland", 			name: "ch", keywords: ["756", "che"] },
		{ fullName: "Taiwan", 				name: "tw", keywords: ["158", "twn"] },
		{ fullName: "Tunisia", 				name: "tn", keywords: ["788", "tun"] },
		{ fullName: "Turkey", 				name: "tr", keywords: ["792", "tur"] },
		{ fullName: "Ukraine", 				name: "ua", keywords: ["804", "ukr"] },
		{ fullName: "Unites States", 		name: "us", keywords: ["840", "usa", "United States of America"] },
		{ fullName: "Venezuela", 			name: "ve", keywords: ["862", "ven"] },
		{ fullName: "Vietnam", 				name: "vn", keywords: ["704", "vnm", "viet nam"] },

		{ fullName: "Philippines", 			name: "ph", keywords: ["608", "phl"] },
	];
}