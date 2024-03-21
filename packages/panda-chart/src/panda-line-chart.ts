import { PandaChartData } from "../index";

import { LitElement, html, css, svg } from 'lit';
import { property, customElement } from "lit/decorators.js";

@customElement("panda-line-chart")
class LineChart extends LitElement {
	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
	}

	@property({ type: Object })
	data: PandaChartData = {
		labels: [],
		datasets: [],
	};

	@property({ type: Object })
	options: any = {};

	render() {
		const { options } = this;
		const { width = 400, height = 300 } = options;

		return html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="${width}"
				height="${height}"
				viewBox="0 0 ${width} ${height}"
			>
				${this._renderChart()}
			</svg>
		`;
	}

	private _renderChart() {
		const {
			labels = [],
			datasets
		} = this.data;
		const {
			width = 400,
			height = 300,
			padding = 20,
			xAxisLabel = 'X',
			yAxisLabel = 'Y',
		} = this.options;

		const maxValue = Math.max(...datasets.flatMap((dataset: any) => dataset.data));
		const valueRange = maxValue - Math.min(0, ...datasets.flatMap((dataset: any) => dataset.data));
		const xScale = (width - 2 * padding) / (labels.length - 1);
		const yScale = (height - 2 * padding) / valueRange;

		return svg`
			${datasets.map(
				(dataset: any, index: number) => svg`
				<g>
					<path
						d="M ${dataset.data.map((value: number, i: number) => `${i * xScale + padding},${height - padding - value * yScale} ${i < dataset.data.length - 1 ? 'L' : 'L'}`).join("")}"
						fill="none"
						stroke="${dataset.color || `hsl(${(index * 137) % 360}, 70%, 50%)`}"
						stroke-width="2"
					/>
				</g>
			`)}
			<g>
				${labels.map((label: string, i: number) => svg`<text x="${i * xScale + padding}" y="${height - padding / 2}" font-size="12">${label}</text>`)}
			</g>
			<g>
				<text x="${padding}" y="${height / 2}" font-size="12" text-anchor="middle">${yAxisLabel}</text>
				<text x="${width / 2}" y="${height - padding / 4}" font-size="12" text-anchor="middle">${xAxisLabel}</text>
			</g>
		`;
	}
}
