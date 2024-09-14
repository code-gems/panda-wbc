// types

export type FlagDetails = {
	fullName: string;
	name: string;
	keywords: string[];
}

// flag list
export const flagList = (): FlagDetails[] => {
	return [
		{ fullName: "Armenia", 			name: "am", keywords: ["051", "arm"] },
		{ fullName: "Austria", 			name: "at", keywords: ["040", "aut"] },
		{ fullName: "Belgium", 			name: "be", keywords: ["056", "bel"] },
		{ fullName: "Switzerland", 		name: "ch", keywords: ["756", "che"] },
		{ fullName: "China", 			name: "cn", keywords: ["156", "chn"] },
		{ fullName: "Germany", 			name: "de", keywords: ["276", "deu"] },
		{ fullName: "Denmark", 			name: "dk", keywords: ["208", "dnk"] },
		{ fullName: "Finland", 			name: "fi", keywords: ["246", "fin"] },
		{ fullName: "France", 			name: "fr", keywords: ["250", "fra"] },
		{ fullName: "Great Britain", 	name: "gb", keywords: ["826", "gbr", "United Kingdom"] },
		{ fullName: "Greece", 			name: "gr", keywords: ["300", "grc"] },
		{ fullName: "Hong Kong", 		name: "hk", keywords: ["344", "hkg"] },
		{ fullName: "Honduras", 		name: "hn", keywords: ["340", "hnd"] },
		{ fullName: "Hungary", 			name: "hu", keywords: ["348", "hun"] },
		{ fullName: "Indonesia", 		name: "id", keywords: ["360", "idn"] },
		{ fullName: "Ireland", 			name: "ie", keywords: ["372", "irl"] },
		{ fullName: "Italy", 			name: "it", keywords: ["380", "ita"] },
		{ fullName: "Japan", 			name: "jp", keywords: ["392", "jpn"] },
		{ fullName: "Luxembourg", 		name: "lu", keywords: ["442", "lux"] },
		{ fullName: "Monaco", 			name: "mc", keywords: ["492", "mco"] },
		{ fullName: "Macao", 			name: "mo", keywords: ["446", "mac", "macao", "macau"] },
		{ fullName: "Nigeria", 			name: "ng", keywords: ["566", "nga"] },
		{ fullName: "Netherlands", 		name: "nl", keywords: ["528", "nld", "holland"] },
		{ fullName: "Norway", 			name: "no", keywords: ["578", "nor"] },
		{ fullName: "Panama", 			name: "pa", keywords: ["591", "pan"] },
		{ fullName: "Peru", 			name: "pe", keywords: ["604", "per"] },
		{ fullName: "Poland", 			name: "pl", keywords: ["616", "pol"] },
		{ fullName: "Palestine", 		name: "ps", keywords: ["275", "pse"] },
		{ fullName: "Portugal", 		name: "pt", keywords: ["620", "prt"] },
		{ fullName: "Qatar", 			name: "qa", keywords: ["634", "qat"] },
		{ fullName: "Russia", 			name: "ru", keywords: ["643", "rus"] },
		{ fullName: "Sweden", 			name: "se", keywords: ["752", "swe"] },
		{ fullName: "Singapore", 		name: "sg", keywords: ["702", "sgp"] },
		{ fullName: "El Salvador", 		name: "sv", keywords: ["222", "slv"] },
		{ fullName: "Taiwan", 			name: "tw", keywords: ["158", "twn"] },
		{ fullName: "Ukraine", 			name: "ua", keywords: ["804", "ukr"] },
		{ fullName: "Unites States", 	name: "us", keywords: ["840", "usa", "United States of America"] },
		{ fullName: "Venezuela", 		name: "ve", keywords: ["862", "ven"] },
		{ fullName: "Vietnam", 			name: "vn", keywords: ["704", "vnm", "viet nam"] },
	];
}