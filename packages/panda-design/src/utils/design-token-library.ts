// types
import { TokenDetails, TokenLibraryEntry } from "panda-design-typings";

class DesignTokenLibrary {
	static instance: DesignTokenLibrary;
	private _tokenLibrary!: TokenLibraryEntry[];

	constructor() {
		// implement singleton pattern
		if (DesignTokenLibrary.instance) {
			return DesignTokenLibrary.instance;
		}
		DesignTokenLibrary.instance = this;
		// initialize class properties
		this._tokenLibrary = [];
	}

	static getInstance(): DesignTokenLibrary {
		if (!DesignTokenLibrary.instance) {
			// create new instance
			DesignTokenLibrary.instance = new DesignTokenLibrary();
		}
		// return instance
		return DesignTokenLibrary.instance;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public registerTokens(entry: TokenLibraryEntry): void {
		this._tokenLibrary.push(entry);
	}

	public getAllTokens(): TokenLibraryEntry[] {
		return this._tokenLibrary;
	}

	public getComponentTokens(componentName: string): TokenDetails[] {
		return this._tokenLibrary.find((entry) => entry.componentName === componentName)?.tokenList || [];
	}
}

export const designTokenLibrary = new DesignTokenLibrary();
export { type DesignTokenLibrary };
// add to global scope
window.designTokenLibrary = designTokenLibrary;