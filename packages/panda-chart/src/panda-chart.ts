// types
import { PandaChartData } from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-chart")
export class PandaChart extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: Array })
	chartData!: PandaChartData;

	@property({ type: Boolean })
	verbose!: boolean;

	// view props
	private _minAxisY!: number;
	private _maxAxisY!: number;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.verbose = false;
	}

	updated(changedProps: PropertyValues) {
		if (changedProps.has("chartData") && this.chartData) {
			this._parseChartData();
		}
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="green"
					fill-opacity="0.5"
					stroke-size="2" 
					stroke="blue"
					d="M0 0 L0 10 C10,10 40,10 40,25"
				/>
				<circle cx="10" cy="10" r="2" fill="red"/>
				<circle cx="40" cy="10" r="2" fill="red"/>
				<circle cx="40" cy="25" r="2" fill="red"/>
			</svg>
		`;
	}

	private _renderChart() {

	}

	// ================================================================================================================
	// ======================================================================================================== HELPERS
	// ================================================================================================================

	private _parseChartData() {
		const allDatasets = this.chartData?.datasets ?? [];
		let setLength = 0;

		// parse data
		allDatasets.forEach((dataset) => {
			const data: number[] = dataset?.data ?? [];
			// check set length
			if (setLength < data.length) {
				setLength = data.length;
			}

			data.forEach((value) => {
				if (
					this._minAxisY === undefined ||
					value < this._minAxisY
				) {
					this._minAxisY = value;
				}
				if (
					this._maxAxisY === undefined ||
					value >= this._maxAxisY
				) {
					this._maxAxisY = value;
				}
			});
		});


		console.log("%c min/max", "font-size: 24px; color: green;", this._minAxisY, this._maxAxisY, setLength);
	}
}
