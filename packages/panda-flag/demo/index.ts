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
		{ countryName: "Austria", countryCode: "at" },
		{ countryName: "China", countryCode: "cn" },
		{ countryName: "Germany", countryCode: "de" },
		{ countryName: "France", countryCode: "fr" },
		{ countryName: "United Kingdom", countryCode: "gb" },
		{ countryName: "Hong Kong", countryCode: "hk" },
		{ countryName: "Hungary", countryCode: "hu" },
		{ countryName: "Indonesia", countryCode: "id" },
		{ countryName: "Ireland", countryCode: "ie" },
		{ countryName: "Italy", countryCode: "it" },
		{ countryName: "Japan", countryCode: "jp" },
		{ countryName: "Luxemburg", countryCode: "lu" },
		{ countryName: "Macau", countryCode: "mo" },
		{ countryName: "Monaco", countryCode: "mc" },
		{ countryName: "Holland", countryCode: "nl" },
		{ countryName: "Peru", countryCode: "pe" },
		{ countryName: "Poland", countryCode: "pl" },
		{ countryName: "Qatar", countryCode: "qa" },
		{ countryName: "Russia", countryCode: "ru" },
		{ countryName: "Singapore", countryCode: "sg" },
		{ countryName: "Taiwan", countryCode: "tw" },
		{ countryName: "Ukraine", countryCode: "ua" },
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
						<panda-flag flag="${countryCode}"></panda-flag>
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
