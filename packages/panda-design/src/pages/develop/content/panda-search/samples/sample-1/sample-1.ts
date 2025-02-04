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
	private _countryList: Array<{ code: string; name: string }> = getCountryList();

	@state()
	private _searchText: string = "";
		
	/**
	 * Internationalization - Custom messages / language
	 */
	private _i18n = {
		noSearchResults: "没有结果。尝试更改您的搜索条件并重试",
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
							.value="${this._searchText}"
							.i18n="${this._i18n}"
							icon-position="left"
							@on-input="${this._onInput}"
							@on-input-debounced="${this._onInputDebounced}"
							@on-select="${this._onSelect}"
							.search="${this._searchCallback.bind(this)}"
						>
						</panda-search>
					</div>
				</div>
			</div>
		`;
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

	private _onInput(): void {
		// this.log("(_onInput)");
	}

	private _onInputDebounced(event: PandaSearchOnInputEvent): void {
		this._searchText = event.detail.value;
		// this.log(`(_onInputDebounced) search: ${this._searchText}`);
	}

	private _onSelect(event: PandaSearchOnSelectEvent): void {
		this.log(`(_onSelect) selectedItem: ${event.detail.selectedItem.label} / ${event.detail.selectedItem.value}`);
	}
}