export interface LanguageDefinition {
	name: string;
	keywords: string[];
	types?: string[];
	builtins?: string[];
	operators?: string[];
	comments: {
		line?: string;
		blockStart?: string;
		blockEnd?: string;
	};
	strings: {
		single?: boolean;
		double?: boolean;
		template?: boolean;
	};
}

export interface LanguageConfig {
	[key: string]: LanguageDefinition;
}

export interface CodeBlock {
	code: string;
	lang: string;
	line?: string; // Line highlighting: "1" or "1,3,5" or "3-5" or "1,3-5,7"
}