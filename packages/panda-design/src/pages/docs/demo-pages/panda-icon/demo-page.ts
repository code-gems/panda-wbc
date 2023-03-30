// types
import { PageCategory } from "panda-design-typings";
import { IconDetails } from "panda-icon-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/ui-components";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/food-icon-pack";

// utils & config
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";
import { getIconList } from "./icon-list";

@customElement("panda-icon-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-icon-demo-page></panda-icon-demo-page>`
})
export class PandaIconDemoPage extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.columnSystem
		];
	}

	@property({ type: String, attribute: false })
	private _searchText!: string; 

	private _iconList!: IconDetails[];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this._searchText = "";
		this._iconList = getIconList();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="row">
				<div class="col-full">
					<h1>Icons</h1><panda-icon-pro></panda-icon-pro>
				</div>
			</div>
			<div class="row">
				<div class="col-full">
					<input
						type="text"
						placeholder="Find..."
						@input="${(e: any) => this._onIconSearch(e.target.value)}"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-full">
					${this._renderIconList()}
				</div>
			</div>
			
		`;
	}

	private _renderIconList() {
		const iconListHtml: TemplateResult[] = [];
		
		this._iconList.forEach((iconDetails) => {
			const { name } = iconDetails;

			if (this._searchText === "" || this._iconMatch(iconDetails)) {
				iconListHtml.push(html`
					<div class="list-item">
						<div class="icon">
							<panda-icon icon="${name}"></panda-icon>
						</div>
						<div class="name">${name}</div>
					</div>
				`);
			}
		});

		return html`
			<div class="icon-list">
				${iconListHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _iconMatch(iconDetails: IconDetails): boolean {
		let found: boolean = false;

		// do not filter if search text is empty
		if (this._searchText === "") {
			found = true;
		} else {
			const { name, keywords, group } = iconDetails;
			// check if search text matches the icon name
			if (name.match(this._searchText.toLowerCase())) {
				found = true;
			}
			// check if search text matches the icon keywords
			keywords.forEach((keyword) => {
				if (keyword.match(this._searchText.toLowerCase())) {
					found = true;
				}
			});
		}
		return found;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onIconSearch(searchText: string) {
		console.log("%c _onIconSearch", "font-size: 24px; color: green;", searchText);
		this._searchText = searchText;
	}
}