// types
import { TemplateResult } from "lit";

export interface Page {
	pageId: string;
	pageName: string;
	pageUri: string;
	parent?: boolean;
	category: string;
	template: TemplateResult;
	keywords?: string[];
	description?: string[];
	contextMenu?: any[];
	order?:number;
}

export class PageLibrary {
	static instance: PageLibrary;
	private _demoPages: Page[];

	constructor() {
		if (!PageLibrary.instance) {
			PageLibrary.instance = this;
		}
		this._demoPages = [];
		return PageLibrary.instance;
	}

	public register(page: Page) {
		this._demoPages.push(page);
		console.log("%c register::page", "font-size: 24px; color: red;", page, this._demoPages);
	}

	public getAllPages(): Page[] {
		return this._demoPages;
	}

	/**
	 * Get all parent pages from pool of registered pages.
	 * @returns {Array} list of parent pages
	 */
	public getParentPages(): Page[] {
		return this._demoPages.filter((page) => page.parent);
	}

	public getAllCategories(): string[] {
		const allCategories: Set<string> = new Set();
		this._demoPages.forEach((page) => {
			if (page.category) {
				allCategories.add(page.category);
			}
		});
		return [...allCategories];
	}

	/**
	 * Extract all pages for particular category. Category string is case sensitive!
	 * @param {String} category - category of pages to extract.
	 */
	public getPages(category: string, childrenOnly: boolean = false): Page[] {
		const pages: Page[] = [];
		this._demoPages.forEach((page) => {
			if (page.category === category) {
				if (childrenOnly && !page.parent || !childrenOnly && page.parent) {
					pages.push({ ...page });
				}
			}
		});
		return pages;
	}

	public getPageById(pageId: string): Page | null {
		return this._demoPages.find((page) => page.pageId === pageId) || null;
	}
}

/**
 * Decorator for registration of pages
 * @param {Page} page - page details
 */
export const page = (page: Page) => {
	return (target: any) => {
		new PageLibrary().register(page);
		return target;
	};
}

export default PageLibrary;