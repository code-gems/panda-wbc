// types
import { ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { IconDetails } from "panda-icon-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/food-icon-pack";
import "@panda-wbc/panda-icon/lib/av-icon-pack";
import "@panda-wbc/panda-icon/lib/map-icon-pack";
import "@panda-wbc/panda-icon/lib/ai-icon-pack";
import "@panda-wbc/panda-text-field";
import "@panda-wbc/panda-dialog";
import "./components/icon-details-dialog/icon-details-dialog";

// utils & config
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { getIconListDetails } from "./icon-list";
import { ContentPageTemplate } from "../../../content-page-template";

// page details
import { pageConfig } from "./page-config";

// code snippets
import {
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";

@page(pageConfig)
@customElement("panda-icon-content-page")
export class ContentPage extends ContentPageTemplate {
	// page details
	public pageId = pageConfig.pageId;
	public customStyles = styles;

	private _componentProperties: ComponentPropertyDetails[] = [
		{ name: "icon", type: "String", defaultValue: "-", description: "Icon name to display." },
	];

	@state()
	private _searchText: string = ""; 
	
	@state()
	private _iconList: IconDetails[] = getIconListDetails();

	@state()
	private _iconPackMap: Map<string, IconDetails[]> = new Map();
	
	@state()
	private _selectedIconName: string | null = null;

	@state()
	private _showIconDetailsDialog: boolean = false;

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

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>ICONS</h1>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderInstallationSection()}
			${this._renderUsageSection()}
			${this._renderIconListSection()}

			<!-- ICON DETAILS DIALOG -->
			${this._renderIconDetailsDialog()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Panda icon pack is a collections of pre-designed, scalable icons that are used in web applications to enhance visual communication, 
						improve user experience, and provide intuitive visual cues. By incorporating icons from packs, web applications can enhance visual communication, 
						making it easier for users to understand and navigate through different sections, features, and functionalities.
					</p>
				</div>
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- INSTALLATION -->
			<div class="content-section" data-content-section-name="${ContentSectionName.INSTALLATION}">
				<div class="section">
					<internal-link theme="h2">Installation</internal-link>
					<p>
						Start by initiating the installation of the npm library through a command executed in either the terminal or command prompt.
						Utilize the package manager, indicating both the library name and its version for installation.
					</p>
	
					<code-sample header="Installation">
						${installationSnippet}
					</code-sample>
				</div>
			</div>
		`;
	}

	private _renderUsageSection(): TemplateResult {
		return html`
			<!-- USAGE -->
			<div class="content-section" data-content-section-name="${ContentSectionName.USAGE}">
				<div class="section">
					<internal-link theme="h2">Usage</internal-link>
					<p>
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
					</p>
	
					<code-sample header="Implementation">
						${implementationSnippet}
					</code-sample>
				</div>

				${this._renderComponentPropertiesSection()}
			</div>
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section" data-content-section-name="${ContentSectionName.PROPERTIES}">
				<internal-link theme="h3">Properties</internal-link>
				<p>
					Component properties play a crucial role in specifying the component's behavior, appearance, and functionality, 
					and they are frequently employed for data binding purposes. 
				</p>
				<p>
					Here is a compilation of the supported properties/attributes for this particular component:
				</p>
				
				${this._renderComponentPropertyTable(this._componentProperties)}
			</div>
		`;
	}
	
	private _renderIconListSection(): TemplateResult {
		return html`
			<!-- ICON LIST -->
			<div class="content-section" data-content-section-name="${ContentSectionName.LIST}">
				<div class="section">
					<internal-link theme="h2">Icon List</internal-link>
					<p>
						The following is a categorized list of available icons, organized into different icon packs based on the types of icons they represent.
					</p>
					<div class="row">
						<div class="col-full">
							<panda-text-field
								placeholder="Find..."
								@on-input="${(e: any) => this._onIconSearch(e.target.value)}"
							>
								<div class="suffix-icon" slot="suffix-icon">
									<panda-icon icon="search"></panda-icon>
								</div>
							</panda-text-field>
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
					<div class="btn">
						<panda-icon icon="chevron-down"></panda-icon>
					</div>
					<label>${iconPack}</label>
				</div>
			`);

			iconDetails.forEach((iconDetail) => {
				const { name } = iconDetail;

				if (this._searchText === "" || this._iconMatch(iconDetail)) {
					iconListHtml.push(html`
						<div
							class="list-item"
							@click="${() => this._onShowIconDetailsDialog(name)}"
						>
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

	private _renderIconDetailsDialog(): TemplateResult | void {
		if (this._showIconDetailsDialog && this._selectedIconName) {
			return html`
				<panda-dialog
					opened
					@close="${this._onDialogClose}"
				>
					<div template>
						<icon-details-dialog icon="${this._selectedIconName}"></icon-details-dialog>
					</div>	
				</panda-dialog>
			`;
		}
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
		this._searchText = searchText;
	}
	
	private _onShowIconDetailsDialog(iconName: string) {
		this._selectedIconName = iconName;
		this._showIconDetailsDialog = true;
		console.log("%c _onShowIconDetailsDialog", "font-size: 24px; color: red;", iconName);
	}

	private _onDialogClose() {
		console.log("%c _onDialogClose", "font-size: 24px; color: red;");
		this._selectedIconName = null;
		this._showIconDetailsDialog = false;
	}
}