// types
import { ContextMenuItem, PageCategory } from "panda-design-typings";
import { IconDetails } from "panda-icon-typings";

// styles
import { styles } from "./styles/styles";
import { uiComponents } from "../../../../styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/food-icon-pack";
import "@panda-wbc/panda-icon/lib/av-icon-pack";
import "@panda-wbc/panda-icon/lib/map-icon-pack";

// utils & config
import { html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, queryAll } from "lit/decorators.js";
import { PageLibrary, page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";
import { getIconListDetails } from "./icon-list";
import { ContentPage } from "../../../content-page";

@customElement("panda-icon-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-icon-content-page></panda-icon-content-page>`
})
export class PandaIconContentPage extends ContentPage {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.banner,
			uiComponents.appLayout,
			uiComponents.columnSystem,
			uiComponents.modifiers,
		];
	}

	// page details
	pageId: string = pageId;
	contextMenu: ContextMenuItem[] = contextMenu;

	@property({ type: String, attribute: false })
	private _searchText: string = ""; 

	private _iconList: IconDetails[] = getIconListDetails();

	@property({ type: Map })
	private _iconPackMap: Map<string, IconDetails[]> = new Map();

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// generate icon pack map
		this._iconList.forEach((iconDetails) => {
			const { iconPack } = iconDetails;

			if (this._iconPackMap.has(iconPack)) {
				const icons = this._iconPackMap.get(iconDetails.iconPack) ?? [];
				icons.push(iconDetails);
			} else {
				this._iconPackMap.set(iconPack, [iconDetails]);
			}
		});
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>ICONS</h1>
				<p>


				</p>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview">
				<div class="section">
					<h2></h2>
					<p>

					</p>
				</div>
			</div> <!-- END OF CONTENT SECTION -->

			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="implementation">
				<div class="section">
					<h2>Implementation</h2>
					<p>

					</p>
				</div>
			</div> <!-- END OF CONTENT SECTION -->

			<!-- ICON LIST -->
			<div class="content-section" data-content-section-name="icon-list">
				<div class="section">
					<h2>Icon List</h2>
					<p>

					</p>
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
				</div>
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderIconList() {
		const iconListHtml: TemplateResult[] = [];

		this._iconPackMap.forEach((iconDetails, iconPack) => {
			// add section header
			iconListHtml.push(html`
				<div class="list-header">
					${iconPack}
				</div>
			`);

			iconDetails.forEach((iconDetail) => {
				const { name } = iconDetail;

				if (this._searchText === "" || this._iconMatch(iconDetail)) {
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
			// check if search text matches the icon group
			group.forEach((groupName) => {
				if (groupName.match(this._searchText.toLowerCase())) {
					found = true;
				}
			});
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