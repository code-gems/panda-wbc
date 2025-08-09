// types
import { PandaSearchItem, PandaSearchOnInputEvent, PandaSearchOnSelectEvent } from "@panda-wbc/panda-search";

// components
import "@panda-wbc/panda-search";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { SampleTemplate } from "../../../../../sample-template";

// static data
import { getCountryList } from "../../../../static-data";


@customElement("panda-search-sample-1")
class Sample extends SampleTemplate {
	@state()
	private readonly _countryList: Array<{ code: string; name: string }> = getCountryList();

	@state()
	private _searchText: string = "";
		
	/**
	 * Internationalization - Custom messages / language
	 */
	private readonly _i18n = {
		noResults: "没有结果。尝试更改您的搜索条件并重试",
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	renderDemo(): TemplateResult {
		return html`
			<div class="rows">
				<div class="row">
					<div class="col-full">
						<panda-search
							label="Search:"
							.placeholders="${["Find country...", "eg. Poland"]}"
							.value="${this._searchText}"
							.i18n="${this._i18n}"
							.search="${this._searchCallback.bind(this)}"
							.headerRenderer="${this._renderSearchResultsHeader}"
							.footerRenderer="${this._renderSearchResultsHeader}"
							@on-input="${this._onInput}"
							@on-input-debounced="${this._onInputDebounced}"
							@on-select="${this._onSelect}"
						>
						</panda-search>
					</div>
				</div>
				<div class="row">
					<div class="col-full">
						<panda-search
							placeholder="Find country..."
						>
						</panda-search>
					</div>
				</div>
			</div>
		`;
	}

	private _renderSearchResultsHeader(searchText: string, searchResults: PandaSearchItem[]): TemplateResult | null {
		if (searchResults.length) {
			return html`
				Found: ${searchResults?.length ?? 0} results for: "${searchText}"
			`;
		} else {
			return null;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private async _searchCallback(): Promise<PandaSearchItem[]> {
		// simulate API response latency
		await new Promise((resolve) => setTimeout(resolve, 500));
		// search through static data
		const searchResults = this._countryList.reduce(
			(results, { name, code }) => {
				// find matches
				if (name.toLocaleLowerCase().includes(this._searchText.toLocaleLowerCase())) {
					results.push({
						label: name,
						value: code,
					});
				}
				return results;
			}, [] as PandaSearchItem[]
		);
		this.log(`(_searchCallback) search results: ${searchResults.length}`);

		return searchResults;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInput(event: PandaSearchOnInputEvent): void {
		this.log(`(_onInput) search: ${event.detail.value}`);
	}

	private _onInputDebounced(event: PandaSearchOnInputEvent): void {
		this._searchText = event.detail.value;
		this.log(`(_onInputDebounced) search: ${this._searchText}`);
	}

	private _onSelect(event: PandaSearchOnSelectEvent): void {
		this.log(`(_onSelect) selectedItem: ${event.detail.selectedItem.label} / ${event.detail.selectedItem.value}`);
	}
}