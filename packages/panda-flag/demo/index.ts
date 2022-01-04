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
			grid-template-columns: repeat(3, minmax(0, 1fr));
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
		{ countryName: "China", countryCode: "cn" },
		{ countryName: "Germany", countryCode: "de" },
		{ countryName: "France", countryCode: "fr" },
		{ countryName: "Hong Kong", countryCode: "hk" },
		{ countryName: "Hungary", countryCode: "hu" },
		{ countryName: "Indonesia", countryCode: "id" },
		{ countryName: "Ireland", countryCode: "ie" },
		{ countryName: "Italy", countryCode: "it" },
		{ countryName: "Macau", countryCode: "mo" },
		{ countryName: "Monaco", countryCode: "mc" },
		{ countryName: "Holland", countryCode: "nl" },
		{ countryName: "Poland", countryCode: "pl" },
		{ countryName: "Russia", countryCode: "ru" },
		{ countryName: "Singapore", countryCode: "sg" },
		{ countryName: "Taiwan", countryCode: "tw" },
		{ countryName: "Ukraine", countryCode: "ua" },
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
					<div class="cell">
						<panda-flag flag="${countryCode}"></panda-flag>
					</div>
					<div class="cell">
						<panda-flag flag="${countryCode}" square></panda-flag>
					</div>
					<div class="cell">
						${countryName}
					</div>
				</div>
			`);
		});

		return html`
			<div class="table">
				<div class="table-header">
					<div class="cell"></div>
					<div class="cell"></div>
					<div class="cell"></div>
				</div>
				${listHtml}
			</div>
		`;
	}
}
window.customElements.define("demo-page", DemoPage);
