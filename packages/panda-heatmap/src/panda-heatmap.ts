// types
import { PandaHeatmapI18nConfig, PandaHeatmapOrientation, PandaHeatmapXAxisPosition, PandaHeatmapYAxisPosition } from "../index";
import { PandaSpinner } from "@panda-wbc/panda-spinner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { interpolateColor, getTextColor, getI18nConfig } from "./utils/utils";

export class PandaHeatmap extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static get observedAttributes() {
		return [
			"theme",
			"min-value",
			"max-value",
			"orientation",
			"x-axis-labels",
			"y-axis-labels",
			"y-axis-label-position",
			"x-axis-label-position",
			"min-color",
			"max-color",
			"show-legend",
			"show-tooltip",
			"spinner-type",
			"working"
		];
	}

	// theme ==========================================================================================================
	private _theme!: string;

	get theme() {
		return this._theme;
	}

	set theme(value: string) {
		this._theme = value;
		this._render();
	}

	// data ===========================================================================================================
	private _data!: number[][];

	get data() {
		return this._data;
	}
	
	set data(value: number[][]) {
		this._data = value;
		this._render();
	}

	// minValue =======================================================================================================
	private _minValue!: number;

	get minValue() {
		return this._minValue;
	}

	set minValue(value: number) {
		this._minValue = value;
		this._render();
	}

	// maxValue =======================================================================================================
	private _maxValue!: number;

	get maxValue() {
		return this._maxValue;
	}

	set maxValue(value: number) {
		this._maxValue = value;
		this._render();
	}

	// orientation ====================================================================================================
	private _orientation!: PandaHeatmapOrientation;

	get orientation() {
		return this._orientation;
	}

	set orientation(value: PandaHeatmapOrientation) {
		this._orientation = value;
		this._render();
	}

	// xAxisLabels ====================================================================================================
	private _xAxisLabels!: string[];

	get xAxisLabels() {
		return this._xAxisLabels;
	}

	set xAxisLabels(value: string[]) {
		this._xAxisLabels = value;
		this._render();
	}

	// yAxisLabels ====================================================================================================
	private _yAxisLabels!: string[];

	get yAxisLabels() {
		return this._yAxisLabels;
	}

	set yAxisLabels(value: string[]) {
		this._yAxisLabels = value;
		this._render();
	}

	// xAxisLabelPosition =============================================================================================
	private _xAxisLabelPosition!: PandaHeatmapXAxisPosition;

	get xAxisLabelPosition() {
		return this._xAxisLabelPosition;
	}

	set xAxisLabelPosition(value: PandaHeatmapXAxisPosition) {
		this._xAxisLabelPosition = value;
		this._render();
	}

	// yAxisLabelPosition =============================================================================================
	private _yAxisLabelPosition!: PandaHeatmapYAxisPosition;

	get yAxisLabelPosition() {
		return this._yAxisLabelPosition;
	}

	set yAxisLabelPosition(value: PandaHeatmapYAxisPosition) {
		this._yAxisLabelPosition = value;
		this._render();
	}

	// minColor =======================================================================================================
	private _minColor!: string;

	get minColor() {
		return this._minColor;
	}

	set minColor(value: string) {
		this._minColor = value;
		this._render();
	}

	// maxColor =======================================================================================================
	private _maxColor!: string;

	get maxColor() {
		return this._maxColor;
	}

	set maxColor(value: string) {
		this._maxColor = value;
		this._render();
	}

	// showLegend =====================================================================================================
	private _showLegend!: boolean;

	get showLegend() {
		return this._showLegend;
	}

	set showLegend(value: boolean) {
		this._showLegend = value;
		this._render();
	}

	// showTooltip ====================================================================================================
	private _showTooltip!: boolean;

	get showTooltip() {
		return this._showTooltip;
	}

	set showTooltip(value: boolean) {
		if (this._showTooltip !== value) {
			this._showTooltip = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show-tooltip", "");
			} else {
				this.removeAttribute("show-tooltip");
			}
		}
	}

	// working ========================================================================================================
	private _working!: boolean;

	get working() {
		return this._working;
	}

	set working(value: boolean) {
		if (this._working !== value) {
			this._working = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("working", "");
			} else {
				this.removeAttribute("working");
			}
		}
	}

	// spinnerType ====================================================================================================
	private _spinnerType!: string;
		
	get spinnerType() {
		return this._spinnerType;
	}

	set spinnerType(value: string) {
		if (this._spinnerType !== value) {
			this._spinnerType = value;
			// reflect to attribute
			this.setAttribute("spinner-type", this._spinnerType);
		}
	}

	// i18n ===========================================================================================================
	private _i18n!: PandaHeatmapI18nConfig;

	get i18n() {
		return this._i18n;
	}

	set i18n(value: PandaHeatmapI18nConfig) {
		if (this._i18n !== value) {
			this._i18n = {
				...getI18nConfig(),
				...value,
			};
		}
	}

	// cellRenderer ===================================================================================================

	cellRenderer!: (value: number) => string;

	// tooltipRenderer ================================================================================================

	tooltipRenderer!: (value: number) => string;

	// private props
	private _minColorParsed!: string;
	private _maxColorParsed!: string;
	private _ready!: boolean;

	// elements
	private _heatmapContEl!: HTMLDivElement;
	private _heatmapWrapperEl!: HTMLDivElement;
	private _heatmapGridEl!: HTMLDivElement;
	private _spinnerContEl!: HTMLDivElement;
	private _spinnerEl!: PandaSpinner;
	private _noDataContEl!: HTMLDivElement;
	private _legendContEl!: HTMLDivElement;
	private _legendEl!: HTMLDivElement;
	private _legendGradientEl!: HTMLDivElement;
	private _legendLabelsEl!: HTMLDivElement;
	private _cornerSpacerEl!: HTMLDivElement;

	// events
	private _themeChangeEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<div class="heatmap-container" part="heatmap-container">
				<div class="heatmap-wrapper" part="heatmap-wrapper">
					<div class="heatmap-grid" part="heatmap-grid"></div>
				</div>
			</div>
		`;
		// create spinner element
		this._spinnerContEl = document.createElement("div");
		this._spinnerContEl.className = "spinner-cont";
		this._spinnerContEl.part = "spinner-cont";
		this._spinnerContEl.innerHTML = /*html*/`<panda-spinner part="spinner"></panda-spinner>`;
		// get spinner element handle
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";

		// create no data element
		this._noDataContEl = document.createElement("div");
		this._noDataContEl.className = "no-data-cont";
		this._noDataContEl.part = "no-data-cont";
		this._noDataContEl.textContent = "";

		// create legend element
		this._legendContEl = document.createElement("div");
		this._legendContEl.className = "legend-cont";
		this._legendContEl.part = "legend-cont";
		this._legendContEl.textContent = /*html*/`
			<div class="legend" part="legend">
				<div class="legend-gradient" part="legend-gradient"></div>
				<div class="legend-labels" part="legend-labels"></div>
			</div>
		`;
		// get legend elements
		this._legendEl = this._legendContEl.querySelector(".legend") as HTMLDivElement;
		this._legendGradientEl = this._legendContEl.querySelector(".legend-gradient") as HTMLDivElement;
		this._legendLabelsEl = this._legendContEl.querySelector(".legend-labels") as HTMLDivElement;

		this._cornerSpacerEl = document.createElement("div");
		this._cornerSpacerEl.className = "corner-spacer";
		this._cornerSpacerEl.part = "corner-spacer";

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._data = [];
		this._orientation = PandaHeatmapOrientation.HORIZONTAL;
		this._xAxisLabels = [];
		this._yAxisLabels = [];
		this._xAxisLabelPosition = PandaHeatmapXAxisPosition.TOP;
		this._yAxisLabelPosition = PandaHeatmapYAxisPosition.LEFT;
		this._showLegend = false;
		this._showTooltip = false;
		this._working = false;
		this._spinnerType = "dots";
		this._minColorParsed = "";
		this._maxColorParsed = "";
		this._ready = false;

		// init events
		this._themeChangeEvent = this._updateColors.bind(this);
		
		// get template element handles
		if (this.shadowRoot) {
			// get elements handle
			this._heatmapContEl = this.shadowRoot.querySelector(".heatmap-container") as HTMLDivElement;
			this._heatmapWrapperEl = this.shadowRoot.querySelector(".heatmap-wrapper") as HTMLDivElement;
			this._heatmapGridEl = this.shadowRoot.querySelector(".heatmap-grid") as HTMLDivElement;

			// add event listeners
			document.addEventListener("panda-theme-change", this._themeChangeEvent);
		}
	}

	connectedCallback() {
		this._updateColors();
		this._render();
		this._ready = true;
		this._updateComponent();
	}

	disconnectedCallback() {
		// remove event listeners
		document.removeEventListener("panda-theme-change", this._themeChangeEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}

		switch (_name) {
			case "theme":
				this._theme = _newValue;
				this._updateColors();
				break;
			case "min-value":
				this._minValue = Number(_newValue);
				break;
			case "max-value":
				this._maxValue = Number(_newValue);
				break;
			case "orientation":
				this._orientation = _newValue || PandaHeatmapOrientation.HORIZONTAL;
				break;
			case "x-axis-labels":
				try {
					this._xAxisLabels = JSON.parse(_newValue);
				} catch (error) {
					console.warn("Invalid JSON for x-axis-labels:", error);
				}
				break;
			case "y-axis-labels":
				try {
					this._yAxisLabels = JSON.parse(_newValue);
				} catch (error) {
					console.warn("Invalid JSON for y-axis-labels:", error);
				}
				break;
			case "x-axis-label-position":
				this._xAxisLabelPosition = _newValue || PandaHeatmapXAxisPosition.TOP;
				break;
			case "y-axis-label-position":
				this._yAxisLabelPosition = _newValue || PandaHeatmapYAxisPosition.LEFT;
				break;
			case "min-color":
				this._minColor = _newValue;
				break;
			case "max-color":
				this._maxColor = _newValue;
				break;
			case "spinner-type":
				this._spinnerType = _newValue || "dots";
				break;
			case "show-legend":
				this._showLegend = this._parseBooleanAttribute(_newValue);
				break;
			case "working":
				this._working = this._parseBooleanAttribute(_newValue);
				break;
			case "show-tooltip":
				this._showTooltip = this._parseBooleanAttribute(_newValue);
				break;
		}
		this._render();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_render() {
		if (this.shadowRoot) {
			const rows = this._data.length;
			const cols = this._data[0]?.length || 0;
			const isVertical = this._orientation === PandaHeatmapOrientation.VERTICAL;
			const gridCols = isVertical ? rows : cols;
			const gridRows = isVertical ? cols : rows;
			const computedStyles = getComputedStyle(this.shadowRoot.host);
			const cellWidth = Number.parseInt(computedStyles.getPropertyValue("--panda-heatmap-cell-width")) || 40;
			const cellHeight = Number.parseInt(computedStyles.getPropertyValue("--panda-heatmap-cell-height")) || 40;

			// check for working state
			const spinnerHtml = this._working
				? /*html*/`
					<div class="spinner-cont" part="spinner-cont">
						<panda-spinner
							part="spinner"
							spinner="${this._spinnerType ?? "dots"}"
						></panda-spinner>
					</div>
				`
				: "";

			const noDataHtml = this._data == null || (Array.isArray(this._data) && this._data.length === 0)
				? /*html*/`
					<div class="no-data-cont" part="no-data-cont">
						No data available
					</div>
				`
				: "";

			// Add corner spacer if both axes have labels
			const cornerSpacerHtml = this._xAxisLabels.length > 0 && this._yAxisLabels.length > 0
				? /*html*/`<div class="corner-spacer" part="corner-spacer"></div>`
				: "";

			// Find min and max values for color scaling (excluding null/undefined)
			let min = this._minValue ?? Infinity;
			let max = this._maxValue ?? -Infinity;

			for (const row of this._data) {
				for (const value of row) {
					if (value != null && typeof value === "number") {
						min = Math.min(min, value);
						max = Math.max(max, value);
					}
				}
			}
			// If no valid values found, set defaults
			if (min === Infinity) {
				min = 0;
			}
			if (max === -Infinity) {
				max = 1;
			}

			// Create x-axis labels ===================================================================================
			let xAxisLabelsHtml = ""; 
			if (this._xAxisLabels.length > 0) {
				// Create x-axis dynamic style based on cell width and number of columns
				const xAxisLabelsStyle: string[] = [];
				xAxisLabelsStyle.push(`grid-template-columns: repeat(${gridCols}, ${cellWidth}px);`);
				if (this._yAxisLabels.length > 0) {
					xAxisLabelsStyle.push("grid-column: 2;");
				}

				xAxisLabelsHtml = /*html*/`
					<div
						class="x-axis-labels"
						part="x-axis-labels"
						style="${xAxisLabelsStyle.join(" ")}"
					>
				`;
				const xLabels = isVertical
					? this._yAxisLabels
					: this._xAxisLabels;
				// Generate x-axis labels
				for (let i = 0; i < gridCols; i++) {
					xAxisLabelsHtml += /*html*/`
						<div
							class="x-label"
							part="x-label"
						>
							${xLabels[i] || ""}
						</div>
					`;
				}
				xAxisLabelsHtml += "</div>";
			}

			// Create y-axis labels ===================================================================================
			let yAxisLabelsHtml = ""; 
			if (this._yAxisLabels.length > 0) {
				// Create y-axis dynamic style based on cell height and number of rows
				const yAxisLabelsStyle: string[] = [];
				yAxisLabelsStyle.push(`grid-template-rows: repeat(${gridRows}, ${cellHeight}px);`);
				if (this._xAxisLabels.length > 0) {
					yAxisLabelsStyle.push("grid-row: 2;");
				}

				yAxisLabelsHtml = /*html*/`
					<div
						class="y-axis-labels"
						part="y-axis-labels"
						style="${yAxisLabelsStyle.join(" ")}"
					>
				`;
				const yLabels = isVertical
					? this._xAxisLabels
					: this._yAxisLabels;
				// Generate y-axis labels
				for (let i = 0; i < gridRows; i++) {
					yAxisLabelsHtml += /*html*/`
						<div
							class="y-label"
							part="y-label"
						>
							${yLabels[i] || ""}
						</div>
					`;
				}
				yAxisLabelsHtml += "</div>";
			}

			// Build heatmap grid and cells ===========================================================================

			let cellsHtml = "";

			if (isVertical) {
				// Vertical orientation: transpose the data
				for (let col = 0; col < cols; col++) {
					for (let row = 0; row < rows; row++) {
						const value = this._data[row][col];

						if (value == null) {
							cellsHtml += /*html*/`<div class="heatmap-cell empty" part="heatmap-cell empty"></div>`;
						} else {
							// compute cell color based on value
							const color = interpolateColor(
								value,
								min,
								max,
								this._minColorParsed,
								this._maxColorParsed
							);

							// check if cell renderer function is defined
							let parsedValue = value.toString();
							if (this.cellRenderer && typeof this.cellRenderer === "function") {
								parsedValue = this.cellRenderer(value);
							}
							
							// determine text color for readability
							const textColor = getTextColor(color);
							// append cell html
							cellsHtml += /*html*/`
								<div
									class="heatmap-cell"
									part="heatmap-cell"
									style="background-color: ${color}; color: ${textColor};"
									${this._showTooltip ? `title="${value}"` : ""}
								>
									${parsedValue}
								</div>
							`;
						}
					}
				}
			} else {
				// Horizontal orientation: use data as-is
				for (let row = 0; row < rows; row++) {
					for (let col = 0; col < cols; col++) {
						const value = this._data[row][col];

						if (value === null || value === undefined) {
							cellsHtml += /*html*/`<div class="heatmap-cell empty" part="heatmap-cell empty"></div>`;
						} else {
							// compute cell color based on value
							const color = interpolateColor(
								value,
								min,
								max,
								this._minColorParsed,
								this._maxColorParsed
							);

							// check if cell renderer function is defined
							let parsedValue = value.toString();
							if (this.cellRenderer && typeof this.cellRenderer === "function") {
								parsedValue = this.cellRenderer(value);
							}

							// determine text color for readability
							const textColor = getTextColor(color);
							// append cell html
							cellsHtml += /*html*/`
								<div
									class="heatmap-cell"
									part="heatmap-cell"
									style="background-color: ${color}; color: ${textColor};"
									${this._showTooltip ? `title="${value}"` : ""}
								>
									${parsedValue}
								</div>
							`;
						}
					}
				}
			}

			// Create legend ===========================================================================================
			let legendHtml = "";
			if (this._showLegend) {
				const legendGradientStyle = /*css*/`background: linear-gradient(to right, ${this._minColorParsed}, ${this._maxColorParsed});`;

				legendHtml = /*html*/`
					<div class="legend" part="legend">
						<div>
							<div
								class="legend-gradient"
								part="legend-gradient"
								style="${legendGradientStyle}"
							></div>
							<div class="legend-labels" part="legend-labels">
								<span>${min.toFixed(1)}</span>
								<span>${max.toFixed(1)}</span>
							</div>
						</div>
					</div>
				`;
			}

			// Add css modifiers for axes labels
			const wrapperCss: string[] = [];
			if (this._yAxisLabels.length > 0) {
				wrapperCss.push("has-y-axis-labels");
			}
			if (this._xAxisLabels.length > 0) {
				wrapperCss.push("has-x-axis-labels");
			}

			// Create heatmap grid styles
			const gridStyles: string[] = [];
			gridStyles.push(
				`grid-template-columns: repeat(${gridCols}, ${cellWidth}px);`,
				`grid-template-rows: repeat(${gridRows}, ${cellHeight}px);`
			);

			if (this._yAxisLabels.length > 0) {
				gridStyles.push(`grid-column: 2;`);
			}
			if (this._xAxisLabels.length > 0) {
				gridStyles.push(`grid-row: 2;`);
			}

			// render component template
			this.shadowRoot.innerHTML = /*html*/`
				<div class="heatmap-container" part="heatmap-container">
					<div
						class="heatmap-wrapper ${wrapperCss.join(" ")}"
						part="heatmap-wrapper ${wrapperCss.join(" ")}"
					>
						<div
							class="heatmap-grid"
							part="heatmap-grid"
							style="${gridStyles.join(" ")}"
						>
							${cellsHtml}
						</div>
						${cornerSpacerHtml}
						${xAxisLabelsHtml}
						${yAxisLabelsHtml}
					</div>
					<!-- SPINNER -->
					${spinnerHtml}
					<!-- END OF SPINNER -->
					${legendHtml}
					${noDataHtml}
				</div>
			`;
		}
	}

	private _updateComponent() {
		if (this._ready) {
			// add or remove spinner
			if (this._working) {
				this._heatmapContEl.appendChild(this._spinnerContEl);
			} else {
				this._spinnerContEl.remove();
			}

			// add or remove no data element
			if (this._noData()) {
				this._noDataContEl.textContent = this._i18n.noDataText || "No data available";
				this._heatmapContEl.appendChild(this._noDataContEl);
			} else {
				this._noDataContEl.remove();
			}

			// add or remove legend
			if (this._showLegend) {
				this._heatmapContEl.appendChild(this._legendContEl);
			} else {
				this._legendContEl.remove();
			}

			// add or remove corner spacer
			if (this._xAxisLabels.length > 0 && this._yAxisLabels.length > 0) {
				this._heatmapWrapperEl.appendChild(this._cornerSpacerEl);
			} else {
				this._cornerSpacerEl.remove();
			}

			// update heatmap grid
			this._renderGrid();

			// update template css
			this._updateTemplateCss();
		}
	}

	private _updateTemplateCss(): void {
		if (this._ready) {
			const rows = this._data.length;
			const cols = this._data[0]?.length || 0;
			const isVertical = this._orientation === PandaHeatmapOrientation.VERTICAL;
			const gridCols = isVertical ? rows : cols;
			const gridRows = isVertical ? cols : rows;
			const computedStyles = getComputedStyle(this.shadowRoot!.host);
			const cellWidth = Number.parseInt(computedStyles.getPropertyValue("--panda-heatmap-cell-width")) || 40;
			const cellHeight = Number.parseInt(computedStyles.getPropertyValue("--panda-heatmap-cell-height")) || 40;
			const css: string[] = [];
	
	
			// update class names and parts
			const cssString = css.join(" ");

			// update legend
			if (this._showLegend) {
				// update legend gradient
				this._legendGradientEl.style.background = `linear-gradient(to right, ${this._minColorParsed}, ${this._maxColorParsed})`;
				// update legend labels
				this._legendLabelsEl.innerHTML = /*html*/`
					<span>${this._minValue}</span>
					<span>${this._maxValue}</span>
				`;
			}

			// update wrapper classes
			const wrapperCss: string[] = [];
			if (this._yAxisLabels.length > 0) {
				wrapperCss.push("has-y-axis-labels");
			}
			if (this._xAxisLabels.length > 0) {
				wrapperCss.push("has-x-axis-labels");
			}
			this._heatmapWrapperEl.className = `heatmap-wrapper ${wrapperCss.join(" ")}`;
			this._heatmapWrapperEl.part = this._heatmapWrapperEl.className;

			// update grid classes
			const gridStyles: string[] = [];
			gridStyles.push(
				`grid-template-columns: repeat(${gridCols}, ${cellWidth}px);`,
				`grid-template-rows: repeat(${gridRows}, ${cellHeight}px);`
			);

			if (this._yAxisLabels.length > 0) {
				gridStyles.push(`grid-column: 2;`);
			}
			if (this._xAxisLabels.length > 0) {
				gridStyles.push(`grid-row: 2;`);
			}
			this._heatmapGridEl.style.cssText = gridStyles.join(" ");

		}

	}

	private _renderGrid(): void {
		let cellsHtml = "";
		const rows = this._data.length;
		const cols = this._data[0]?.length || 0;
		const isVertical = this._orientation === PandaHeatmapOrientation.VERTICAL;
		const gridCols = isVertical ? rows : cols;
		const gridRows = isVertical ? cols : rows;
		// Find min and max values for color scaling (excluding null/undefined)
		let min = this._minValue ?? Infinity;
		let max = this._maxValue ?? -Infinity;

		for (const row of this._data) {
			for (const value of row) {
				if (value != null && typeof value === "number") {
					min = Math.min(min, value);
					max = Math.max(max, value);
				}
			}
		}
		// If no valid values found, set defaults
		if (min === Infinity) {
			min = 0;
		}
		if (max === -Infinity) {
			max = 1;
		}

		if (isVertical) {
			// Vertical orientation: transpose the data
			for (let col = 0; col < cols; col++) {
				for (let row = 0; row < rows; row++) {
					const value = this._data[row][col];

					if (value == null) {
						cellsHtml += /*html*/`<div class="heatmap-cell empty" part="heatmap-cell empty"></div>`;
					} else {
						// compute cell color based on value
						const color = interpolateColor(
							value,
							min,
							max,
							this._minColorParsed,
							this._maxColorParsed
						);

						// check if cell renderer function is defined
						let parsedValue = value.toString();
						if (this.cellRenderer && typeof this.cellRenderer === "function") {
							parsedValue = this.cellRenderer(value);
						}
						
						// determine text color for readability
						const textColor = getTextColor(color);
						// append cell html
						cellsHtml += /*html*/`
							<div
								class="heatmap-cell"
								part="heatmap-cell"
								style="background-color: ${color}; color: ${textColor};"
								${this._showTooltip ? `title="${value}"` : ""}
							>
								${parsedValue}
							</div>
						`;
					}
				}
			}
		} else {
			// Horizontal orientation: use data as-is
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const value = this._data[row][col];

					if (value === null || value === undefined) {
						cellsHtml += /*html*/`<div class="heatmap-cell empty" part="heatmap-cell empty"></div>`;
					} else {
						// compute cell color based on value
						const color = interpolateColor(
							value,
							min,
							max,
							this._minColorParsed,
							this._maxColorParsed
						);

						// check if cell renderer function is defined
						let parsedValue = value.toString();
						if (this.cellRenderer && typeof this.cellRenderer === "function") {
							parsedValue = this.cellRenderer(value);
						}

						// determine text color for readability
						const textColor = getTextColor(color);
						// append cell html
						cellsHtml += /*html*/`
							<div
								class="heatmap-cell"
								part="heatmap-cell"
								style="background-color: ${color}; color: ${textColor};"
								${this._showTooltip ? `title="${value}"` : ""}
							>
								${parsedValue}
							</div>
						`;
					}
				}
			}
		}
		// update heatmap grid inner HTML
		this._heatmapGridEl.innerHTML = cellsHtml;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	/**
	 * Parses an attribute value to boolean.
	 * @param value value to parse
	 * @description Parses a value to boolean. If the value is "true" or true, it returns true, otherwise false.
	 * @returns {Boolean}
	 */
	private _parseBooleanAttribute(value: unknown): boolean {
		return value === "true" || value === true || value === "";
	}

	private _updateColors(): void {
		if (this.shadowRoot) {
			const computedStyles = getComputedStyle(this);
			// check if minColor is not defined
			if (this._minColor == null) {
				// check if min-color token is defined in styles
				const minColor = computedStyles.getPropertyValue("--panda-heatmap-min-color");

				this._minColorParsed = minColor === ""
					? computedStyles.getPropertyValue("--panda-form-background-color")
					: minColor;
			}

			// check if maxColor is not defined
			if (this._maxColor == null) {
				// check if max-color token is defined in styles
				const maxColor = computedStyles.getPropertyValue("--panda-heatmap-max-color");

				const maxColorFromTheme = this._getColorFromTheme();
				this._maxColorParsed = maxColor === ""
					? computedStyles.getPropertyValue(maxColorFromTheme)
					: maxColor;
			}
			this._render();
		}
	}

	/** Get the color token from the theme. */
	private _getColorFromTheme(): string {
		let color = "";
		
		switch (this._theme) {
			case "secondary":
				color = "--panda-secondary-color";
				break;
			case "tertiary":
				color = "--panda-tertiary-color";
				break;
			case "done":
				color = "--panda-action-color-done";
				break;
			case "warn":
				color = "--panda-action-color-warn";
				break;
			case "alert":
				color = "--panda-action-color-alert";
				break;
			case "info":
				color = "--panda-action-color-info";
				break;
			default:
				color = "--panda-primary-color";
		}

		return color;
	}

	private _noData(): boolean {
		return this._data == null || (Array.isArray(this._data) && this._data.length === 0);
	}
}

// Register the custom element
if (!customElements.get("panda-heatmap")) {
	customElements.define("panda-heatmap", PandaHeatmap);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-heatmap": PandaHeatmap;
	}
}
