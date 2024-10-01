// types
import { PandaSearchItem, PandaSearchOnInputEvent } from "@panda-wbc/panda-search";

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

	@state()
	private _searchResults: PandaSearchItem[] = [];
	
	@state()
	private _searchInProgress: boolean = false;

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
							.items="${this._searchResults}"
							icon-position="left"
							@on-input="${this._onSearch}"
							@on-input-debounced="${this._onSearchDebounced}"
							@focus="${this._onFocus}"
							@blur="${this._onBlur}"
							?searching="${this._searchInProgress}"
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

	private async _search(): Promise<void> {
		this._searchInProgress = true
		// simulate API response latency
		await new Promise((r) => setTimeout(r, 2000));
		// search through static data
		this._searchResults = this._countryList.reduce(
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
		this.log(`(_search) search results: ${this._searchResults.length}`);

		this._searchInProgress = false;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onFocus(): void {
		this.log("(_onFocus)");
	}

	private _onBlur(): void {
		this.log("(_onBlur)");
	}

	private _onSearch(): void {
		this._searchResults = [];
		this.warn("(_onSearch) clear search results");
	}

	private _onSearchDebounced(event: PandaSearchOnInputEvent): void {
		this._searchText = event.detail.value;
		if (this._searchText) {
			this.log(`(_onSearchDebounced) search: ${this._searchText}`);
			this._search();
		} else {
			this.error(`(_onSearchDebounced) skip search`);

		}
	}
}