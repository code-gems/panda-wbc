// types
import type { LanguageConfig, LanguageDefinition } from '../index';

// utils
import { trimEmptyLines } from './utils/utils';

export default class PandaSyntaxHighlighter {
	private _languages!: LanguageConfig;

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	/** Registers a new language definition */
	registerLanguage(languageDefinition: LanguageDefinition): void {
		this._languages = {
			...this._languages,
			[languageDefinition.name]: languageDefinition,
		};
	}

	highlight(code: string, lang: string, trim: boolean = false): string {
		const language = this._languages[lang];
		if (!language) {
			return code;
		}
		// trim empty leading lines
		if (trim) {
			// trim empty leading and trailing lines
			code = trimEmptyLines(code);
		}

		// find inline syntax markers and apply corresponding syntax rules
		// if (language.inlineSyntax) {

		console.log(`%c ⚡ [PandaSyntaxHighlighter] (highlight)`, "font-size: 24px; color: crimson; background: black;", lang, code);

		return code;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================
}

export const pandaSyntaxHighlighter = new PandaSyntaxHighlighter();
