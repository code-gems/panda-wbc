// types
interface FlagList {
	countryName: string;
	countryCode: string;
}

import { LitElement, html, TemplateResult, css } from "lit";
import "../src/panda-flag";

class DemoPage extends LitElement {
	// css styles
	static styles = css`
		.table {
			display: flex;
			flex-flow: column;
			width: max-content;
			width: fit-content;
			gap: 5px;

			padding: 30px;
			background-color: var(--panda-table-bg-color);
		}

		.table .table-header,
		.table .table-row {
			display: grid;
			grid-template-columns: repeat(5, minmax(0, 1fr));
			grid-gap: 10px;
		}

		.table .table-row {
			border-bottom: 1px dashed var(--panda-border-color-50opc);
		}
		.table .table-row:last-child {
			border-bottom: none;
		}

		.table .cell {
			font-size: var(--panda-font-size-s);
			font-family: var(--panda-font-family-bold);
		}
	`;

	private _flagList: FlagList[] = [
		{ countryName: "Armenia", countryCode: "am" },
		{ countryName: "Austria", countryCode: "at" },
		{ countryName: "Belgium", countryCode: "be" },
		{ countryName: "Switzerland", countryCode: "ch" },
		{ countryName: "China", countryCode: "cn" },
		{ countryName: "Germany", countryCode: "de" },
		{ countryName: "Denmark", countryCode: "dk" },
		{ countryName: "Finland", countryCode: "fi" },
		{ countryName: "France", countryCode: "fr" },
		{ countryName: "United Kingdom", countryCode: "gb" },
		{ countryName: "Greece", countryCode: "gr" },
		{ countryName: "Hong Kong", countryCode: "hk" },
		{ countryName: "Honduras", countryCode: "hn" },
		{ countryName: "Hungary", countryCode: "hu" },
		{ countryName: "Indonesia", countryCode: "id" },
		{ countryName: "Ireland", countryCode: "ie" },
		{ countryName: "Italy", countryCode: "it" },
		{ countryName: "Japan", countryCode: "jp" },
		{ countryName: "Luxembourg", countryCode: "lu" },
		{ countryName: "Macau", countryCode: "mo" },
		{ countryName: "Monaco", countryCode: "mc" },
		{ countryName: "Nigeria", countryCode: "ng" },
		{ countryName: "Netherlands", countryCode: "nl" },
		{ countryName: "Norway", countryCode: "no" },
		{ countryName: "Panama", countryCode: "pa" },
		{ countryName: "Peru", countryCode: "pe" },
		{ countryName: "Poland", countryCode: "pl" },
		{ countryName: "Portugal", countryCode: "pt" },
		{ countryName: "Qatar", countryCode: "qa" },
		{ countryName: "Russia", countryCode: "ru" },
		{ countryName: "Sweden", countryCode: "se" },
		{ countryName: "Singapore", countryCode: "sg" },
		{ countryName: "El Salvador", countryCode: "sv" },
		{ countryName: "Taiwan", countryCode: "tw" },
		{ countryName: "Ukraine", countryCode: "ua" },
		{ countryName: "United States", countryCode: "us" },
		{ countryName: "Venezuela", countryCode: "ve" },
		{ countryName: "Vietnam", countryCode: "vn" },
	];

	protected render() {
		return html`
			${this._renderFlagList()}
		`;
	}

	private _renderFlagList() {
		const listHtml: TemplateResult[] = [];

		this._flagList.forEach(({ countryName, countryCode }) => {
			listHtml.push(html`
				<div class="table-row">
					<div class="cell">${countryName}</div>
					<div class="cell">${countryCode}</div>
					<div class="cell">
						<panda-flag flag="${countryName}"></panda-flag>
					</div>
					<div class="cell">
						<panda-flag flag="${countryCode}" square></panda-flag>
					</div>
				</div>
			`);
		});

		return html`
			<div class="table">
				<div class="table-header">
					<div class="cell">Country</div>
					<div class="cell">Country code</div>
					<div class="cell">Flag</div>
					<div class="cell">Flag [square]</div>
				</div>
				${listHtml}
			</div>
		`;
	}
}
window.customElements.define("demo-page", DemoPage);
