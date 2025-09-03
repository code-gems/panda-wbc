// types
import { ComponentPropertyDetails, ContentSectionName } from "panda-design-typings";
import { FlagDetails } from "./flag-list";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-flag";
import "@panda-wbc/panda-search";
import "@panda-wbc/panda-toggle";

// utils & config
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ContentPageTemplate } from "../../../content-page-template";
import { page } from "../../../../utils/page-library";

// static data
import { flagList } from "./flag-list";

// page config
import { pageConfig } from "./page-config";
import { PandaToggleChangeEvent } from "@panda-wbc/panda-toggle";
import { getCountryList } from "../../static-data";

@customElement("panda-flag-content-page")
@page(pageConfig)
export class PandaFlagContentPage extends ContentPageTemplate {
	// page details
	public pageId = pageConfig.pageId;
	public customStyles = styles;

	// component props
	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "flag", type: "String", defaultValue: "-", description: "Country code or other country id compliant with ISO 3166 international standard." },
		{ name: "square", type: "Boolean", defaultValue: "false", description: "Show flag as a square box." },
	];

	// view props
	@state()
	private _searchText = "";

	@state()
	private _flagList: FlagDetails[] = flagList();

	@state()
	private _selectedFlagName: string | null = null;

	@state()
	private _showFlagDetailsDialog = false;

	@state()
	private _square = false;

	@state()
	private _round = false;

	@state()
	private readonly _countryList: Array<{ name: string; code: string; }> = getCountryList();

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>FLAGS</h1>
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
			${this._renderFlagListSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						Panda Flag is a versatile and dynamic solution designed to effortlessly incorporate national flags into your user interface. 
						This intuitive component serves as a visual gateway to represent countries, fostering a rich and engaging user experience.
					</p>
					<p>
						Component offers an aesthetically pleasing display of flags based on specified country codes compliant with ISO 3166 international standard. 
						With a focus on simplicity and flexibility, this component offers two size formats to fit your preference. 
					</p>
					<panda-flag flag="pl"></panda-flag>
				</div>
			</div>
			${this._renderComponentPropertiesSection()}
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section">
				<h3>Properties</h3>
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

	private _renderFlagListSection(): TemplateResult {
		return html`
			<!-- FLAG LIST -->
			<div class="content-section" data-content-section-name="${ContentSectionName.LIST}">
				<div class="section">
					<internal-link theme="h2">Flag List</internal-link>
					<p>
						...TBD	
					</p>
					<div class="row">
						<div class="col-4">
							<panda-search
								placeholder="Find..."
								@on-input="${this._onFlagSearch}"
							>
							</panda-search>
						</div>
						<div class="col-4 justify-center">
							<div class="control">
								<panda-toggle
									theme="size-s"
									?selected="${this._square}"
									@change="${this._onToggleSquareFlag}"
								>
								</panda-toggle>
								Square
							</div>
							<div class="control">
								<panda-toggle
									theme="size-s"
									?selected="${this._round}"
									@change="${this._onToggleRoundFlag}"
								>
								</panda-toggle>
								Round
							</div>
						</div>
					</div>
					<div class="row push-m">
						<div class="col-full">
							${this._renderFlagList()}
						</div>
					</div>
				</div>
			</div> <!-- END OF CONTENT SECTION -->		
		`;
	}

	private _renderFlagList(): TemplateResult {
		const listHtml: TemplateResult[] = [];

		for (const country of this._countryList) {
			const { name, code } = country;
			const flagDetail = this._flagList.find(
				(flag) => flag.name.toLocaleLowerCase() === code.toLocaleLowerCase()
			) ?? {
				fullName: name,
				name: code.toLocaleLowerCase(),
				keywords: [],
			};

			if (this._searchText === "" || this._flagMatch(flagDetail)) {
				// get keywords string
				const  keywords = flagDetail.keywords?.length
					? `, ${flagDetail.keywords.join(", ")}`
					: ``;

				listHtml.push(html`
					<div
						class="list-item"
						@click="${() => this._onShowIconDetailsDialog(name)}"
					>
						<div class="flag ${this._round ? "round" : ""}">
							<panda-flag
								.flag="${flagDetail.name.toLocaleLowerCase()}"
								?square="${this._square}"
								?round="${this._round}"
							></panda-flag>
						</div>
						<div class="name">${flagDetail.fullName}</div>
						<div class="keywords">${flagDetail.name.toLocaleLowerCase()}${keywords}</div>
					</div>
				`);
			}
		}
		return html`
			<div class="flag-list scrollbar">
				${listHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _flagMatch(flagDetails: FlagDetails): boolean {
		let found = false;

		// do not filter if search text is empty
		if (this._searchText === "") {
			found = true;
		} else {
			const { fullName, name, keywords } = flagDetails;
			// check if search text matches the icon name
			if (fullName.toLowerCase().match(this._searchText.toLowerCase())) {
				found = true;
			}
			// check if search text matches the icon name
			if (name.toLowerCase().match(this._searchText.toLowerCase())) {
				found = true;
			}
			// check if search text matches the icon keywords
			keywords.forEach((keyword) => {
				console.log(`%c ${keyword.toLowerCase()} == ${this._searchText.toLowerCase()}`, "font-size: 24px; color: crimson; background: black;", typeof keyword, typeof this._searchText);
				if (keyword.toLowerCase().includes(this._searchText.toLowerCase())) {
					found = true;
				}
			});
		}
		return found;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFlagSearch(event: any) {
		this._searchText = event.detail.value;
	}

	private _onShowIconDetailsDialog(iconName: string) {
		this._selectedFlagName = iconName;
		this._showFlagDetailsDialog = true;
	}

	private _onToggleSquareFlag(event: PandaToggleChangeEvent) {
		this._square = event.detail.selected;
	}

	private _onToggleRoundFlag(event: PandaToggleChangeEvent) {
		this._round = event.detail.selected;
	}
}