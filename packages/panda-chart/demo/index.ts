// types
import { PandaChartData } from "../index";

import { LitElement, html, css } from "lit";
import "../src/panda-chart";

class DemoPage extends LitElement {
	// css styles
	static styles = css`
		
	`;

	_chartData: PandaChartData = {
		datasets: [
			{
				data: [30, 40, 25, 52, 45, 23, 67, 18, 36, 31, 48, 23],
				label: "Expenses"
			},
			{
				data: [102, 105, 100, 140, 100, 123, 167, 118, 126, 111, 138, 113],
				label: "Income"
			}
		],
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	}

	protected render() {
		return html`
			<panda-chart
				.chartData="${this._chartData}"
			>
			</panda-chart>
		`;
	}
}
window.customElements.define("demo-page", DemoPage);
