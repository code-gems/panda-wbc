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
	/** Version of the component. */
	public readonly version: string = "1.0.0";

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
			"show-values",
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
		if (this._theme !== value) {
			this._theme = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("theme");
			} else {
				this.setAttribute("theme", this._theme);
			}
		}
	}

	// data ===========================================================================================================
	private _data!: number[][];

	get data() {
		return this._data;
	}

	set data(value: number[][]) {
		this._data = value;
		this._updateMinMaxValues();
	}

	// minValue =======================================================================================================
	private _minValue!: number;

	get minValue() {
		return this._minValue;
	}

	set minValue(value: number) {
		if (this._minValue !== value) {
			this._minValue = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("min-value");
			} else {
				this.setAttribute("min-value", this._minValue.toString());
			}
			this._updateMinMaxValues();
		}
	}

	// maxValue =======================================================================================================
	private _maxValue!: number;

	get maxValue() {
		return this._maxValue;
	}

	set maxValue(value: number) {
		if (this._maxValue !== value) {
			this._maxValue = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("max-value");
			} else {
				this.setAttribute("max-value", this._maxValue.toString());
			}
			this._updateMinMaxValues();
		}
	}

	// orientation ====================================================================================================
	/**
	 * Orientation of the heatmap
	 * @default horizontal
	 */
	private _orientation!: PandaHeatmapOrientation;

	get orientation() {
		return this._orientation;
	}

	set orientation(value: PandaHeatmapOrientation) {
		if (this._orientation !== value) {
			this._orientation = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("orientation");
			} else {
				this.setAttribute("orientation", this._orientation);
			}
		}
	}

	// xAxisLabels ====================================================================================================
	private _xAxisLabels!: string[];

	get xAxisLabels() {
		return this._xAxisLabels;
	}

	set xAxisLabels(value: string[]) {
		this._xAxisLabels = value;
	}

	// yAxisLabels ====================================================================================================
	private _yAxisLabels!: string[];

	get yAxisLabels() {
		return this._yAxisLabels;
	}

	set yAxisLabels(value: string[]) {
		this._yAxisLabels = value;
	}

	// xAxisLabelPosition =============================================================================================
	/**
	 * X Axis Label Position
	 * @default top
	 */
	private _xAxisLabelPosition!: PandaHeatmapXAxisPosition;

	get xAxisLabelPosition() {
		return this._xAxisLabelPosition;
	}

	set xAxisLabelPosition(value: PandaHeatmapXAxisPosition) {
		if (this._xAxisLabelPosition !== value) {
			this._xAxisLabelPosition = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("x-axis-label-position");
			} else {
				this.setAttribute("x-axis-label-position", this._xAxisLabelPosition);
			}
		}
	}

	// yAxisLabelPosition =============================================================================================
	/**
	 * Y Axis Label Position
	 * @default left
	 */
	private _yAxisLabelPosition!: PandaHeatmapYAxisPosition;

	get yAxisLabelPosition() {
		return this._yAxisLabelPosition;
	}

	set yAxisLabelPosition(value: PandaHeatmapYAxisPosition) {
		if (this._yAxisLabelPosition !== value) {
			this._yAxisLabelPosition = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("y-axis-label-position");
			} else {
				this.setAttribute("y-axis-label-position", this._yAxisLabelPosition);
			}
		}
	}

	// minColor =======================================================================================================
	private _minColor!: string;

	get minColor() {
		return this._minColor;
	}

	set minColor(value: string) {
		if (this._minColor !== value) {
			this._minColor = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("min-color");
			} else {
				this.setAttribute("min-color", this._minColor);
			}
		}
	}

	// maxColor =======================================================================================================
	private _maxColor!: string;

	get maxColor() {
		return this._maxColor;
	}

	set maxColor(value: string) {
		if (this._maxColor !== value) {
			this._maxColor = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("max-color");
			} else {
				this.setAttribute("max-color", this._maxColor);
			}
		}
	}

	// showValues =====================================================================================================
	private _showValues!: boolean;

	get showValues() {
		return this._showValues;
	}

	set showValues(value: boolean) {
		if (this._showValues !== value) {
			this._showValues = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show-values", "");
			} else {
				this.removeAttribute("show-values");
			}
		}
	}

	// showLegend =====================================================================================================
	private _showLegend!: boolean;

	get showLegend() {
		return this._showLegend;
	}

	set showLegend(value: boolean) {
		if (this._showLegend !== value) {
			this._showLegend = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("show-legend", "");
			} else {
				this.removeAttribute("show-legend");
			}
		}
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
	/** Working state of the heatmap */
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
	/**
	 * Spinner Type for working state
	 * @default dots
	 */
	private _spinnerType!: string;

	get spinnerType() {
		return this._spinnerType;
	}

	set spinnerType(value: string) {
		if (this._spinnerType !== value) {
			this._spinnerType = value;
			// reflect to attribute
			if (value == null) {
				this.removeAttribute("spinner-type");
			} else {
				this.setAttribute("spinner-type", this._spinnerType);
			}
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

	cellRenderer!: (value: number, column: number, row: number) => string;

	// tooltipRenderer ================================================================================================

	tooltipRenderer!: (value: number, column: number, row: number) => string;

	// private props
	private _minColorParsed!: string;
	private _maxColorParsed!: string;
	private _ready!: boolean;

	// elements
	private readonly _heatmapContEl!: HTMLDivElement;
	private readonly _heatmapWrapperEl!: HTMLDivElement;
	private readonly _heatmapGridEl!: HTMLDivElement;
	private readonly _spinnerContEl!: HTMLDivElement;
	private readonly _spinnerEl!: PandaSpinner;
	private readonly _spinnerTextEl!: HTMLDivElement;
	private readonly _noDataContEl!: HTMLDivElement;
	private readonly _legendContEl!: HTMLDivElement;
	private readonly _legendGradientEl!: HTMLDivElement;
	private readonly _legendLabelsEl!: HTMLDivElement;
	private readonly _cornerSpacerEl!: HTMLDivElement;
	private readonly _xAxisLabelsEl!: HTMLDivElement;
	private readonly _yAxisLabelsEl!: HTMLDivElement;

	// events
	private readonly _themeChangeEvent!: any;
	private readonly _gridClickEvent!: any;

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
		this._spinnerContEl.innerHTML = /*html*/`
			<div class="spinner-wrap" part="spinner-wrap">
				<div class="spinner" part="spinner">
					<panda-spinner></panda-spinner>
				</div>
				<div class="spinner-text" part="spinner-text"></div>
			</div>
		`;
		// get spinner element handle
		this._spinnerEl = this._spinnerContEl.querySelector("panda-spinner") as PandaSpinner;
		this._spinnerEl.spinner = this._spinnerType ?? "dots";
		this._spinnerTextEl = this._spinnerContEl.querySelector(".spinner-text") as HTMLDivElement;
		this._spinnerTextEl.textContent = "";

		// create no data element
		this._noDataContEl = document.createElement("div");
		this._noDataContEl.className = "no-data-cont";
		this._noDataContEl.part = "no-data-cont";
		this._noDataContEl.textContent = "";

		// create legend element
		this._legendContEl = document.createElement("div");
		this._legendContEl.className = "legend-cont";
		this._legendContEl.part = "legend-cont";
		this._legendContEl.innerHTML = /*html*/`
			<div class="legend" part="legend">
				<div class="legend-gradient" part="legend-gradient"></div>
				<div class="legend-labels" part="legend-labels"></div>
			</div>
		`;
		// get legend elements
		this._legendGradientEl = this._legendContEl.querySelector(".legend-gradient") as HTMLDivElement;
		this._legendLabelsEl = this._legendContEl.querySelector(".legend-labels") as HTMLDivElement;

		// create corner spacer element
		this._cornerSpacerEl = document.createElement("div");
		this._cornerSpacerEl.className = "corner-spacer";
		this._cornerSpacerEl.part = "corner-spacer";

		// create x axis labels element
		this._xAxisLabelsEl = document.createElement("div");
		this._xAxisLabelsEl.className = "x-axis-labels";
		this._xAxisLabelsEl.part = "x-axis-labels";
		this._xAxisLabelsEl.textContent = "";

		// create y axis labels element
		this._yAxisLabelsEl = document.createElement("div");
		this._yAxisLabelsEl.className = "y-axis-labels";
		this._yAxisLabelsEl.part = "y-axis-labels";
		this._yAxisLabelsEl.textContent = "";

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._data = [];
		this._orientation = PandaHeatmapOrientation.HORIZONTAL;
		this._xAxisLabels = [];
		this._yAxisLabels = [];
		this._xAxisLabelPosition = PandaHeatmapXAxisPosition.TOP;
		this._yAxisLabelPosition = PandaHeatmapYAxisPosition.LEFT;
		this._showValues = false;
		this._showLegend = false;
		this._showTooltip = false;
		this._working = false;
		this._spinnerType = "dots";
		this._minColorParsed = "";
		this._maxColorParsed = "";
		this._i18n = getI18nConfig();
		this._ready = false;

		// init events
		this._gridClickEvent = this._onGridClick.bind(this);
		this._themeChangeEvent = this._onThemeChange.bind(this);

		// get template element handles
		if (this.shadowRoot) {
			// get elements handle
			this._heatmapContEl = this.shadowRoot.querySelector(".heatmap-container") as HTMLDivElement;
			this._heatmapWrapperEl = this.shadowRoot.querySelector(".heatmap-wrapper") as HTMLDivElement;
			this._heatmapGridEl = this.shadowRoot.querySelector(".heatmap-grid") as HTMLDivElement;

			// add event listeners
			this._heatmapGridEl.addEventListener("click", this._gridClickEvent);
			document.addEventListener("panda-theme-change", this._themeChangeEvent);
		}
	}

	connectedCallback() {
		this._updateColors();
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
				this._updateColors();
				break;
			case "max-color":
				this._maxColor = _newValue;
				this._updateColors();
				break;
			case "spinner-type":
				this._spinnerType = _newValue || "dots";
				break;
			case "show-values":
				this._showValues = this._parseBooleanAttribute(_newValue);
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
		this._updateComponent();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	private _updateComponent() {
		if (this._ready) {
			// add or remove spinner
			if (this._working) {
				this._heatmapContEl.appendChild(this._spinnerContEl);
				this._spinnerTextEl.textContent = this._i18n.loadingText || "Loading...";
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

			// check if X Axis Labels need to be rendered
			if (this._xAxisLabels.length > 0) {
				this._heatmapWrapperEl.appendChild(this._xAxisLabelsEl);
			} else {
				this._xAxisLabelsEl.remove();
			}

			// check if Y Axis Labels need to be rendered
			if (this._yAxisLabels.length > 0) {
				this._heatmapWrapperEl.appendChild(this._yAxisLabelsEl);
			} else {
				this._yAxisLabelsEl.remove();
			}

			// render X and Y Axis Labels
			this._renderAxisLabels();

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
			const cellWidth = this._parseCssVariable("--panda-heatmap-cell-width", "1fr");
			const cellHeight = this._parseCssVariable("--panda-heatmap-cell-height", "1fr");

			// update corner spacer styles
			const cornerSpacerStyles: string[] = [];
			const xAxisLabelsStyle: string[] = [];
			const yAxisLabelsStyle: string[] = [];

			if (this._xAxisLabelPosition.toLocaleLowerCase() === PandaHeatmapXAxisPosition.BOTTOM) {
				// move corner spacer to bottom
				cornerSpacerStyles.push("grid-row: 3;");
				// move x-axis labels to bottom
				xAxisLabelsStyle.push("grid-row: 3;");
			}
			if (this._yAxisLabelPosition.toLocaleLowerCase() === PandaHeatmapYAxisPosition.RIGHT) {
				// move corner spacer to right
				cornerSpacerStyles.push("grid-column: 3;");
				// move y-axis labels to right
				yAxisLabelsStyle.push("grid-column: 3;");
			}
			this._cornerSpacerEl.style.cssText = cornerSpacerStyles.join(" ");

			// update x-axis labels styles
			if (this._xAxisLabels.length > 0) {
				// Create x-axis dynamic style based on cell width and number of columns
				xAxisLabelsStyle.push(`grid-template-columns: repeat(${gridCols}, ${cellWidth});`);
				if (this._yAxisLabels.length > 0) {
					xAxisLabelsStyle.push("grid-column: 2;");
				}
				this._xAxisLabelsEl.style.cssText = xAxisLabelsStyle.join(" ");
			}
			
			// update y-axis labels styles
			if (this._yAxisLabels.length > 0) {
				// Create y-axis dynamic style based on cell height and number of rows
				yAxisLabelsStyle.push(`grid-template-rows: repeat(${gridRows}, ${cellHeight});`);
				if (this._xAxisLabels.length > 0) {
					yAxisLabelsStyle.push("grid-row: 2;");
				}
				this._yAxisLabelsEl.style.cssText = yAxisLabelsStyle.join(" ");
			}
			
			// update legend
			if (this._showLegend) {
				// update legend gradient
				this._legendGradientEl.setAttribute("style", `background: linear-gradient(to right, ${this._minColorParsed}, ${this._maxColorParsed});`);
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
				`grid-template-columns: repeat(${gridCols}, ${cellWidth});`,
				`grid-template-rows: repeat(${gridRows}, ${cellHeight});`
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
						let parsedValue = "";
						if (this._showValues) {
							// check if cell renderer function is defined
							if (this.cellRenderer && typeof this.cellRenderer === "function") {
								parsedValue = this.cellRenderer(value, col, row);
							} else {
								parsedValue = value.toString();
							}
						}

						// show tooltip if enabled
						let tooltipValue = "";
						if (this._showTooltip) {
							// check if tooltip renderer function is defined
							if (this.tooltipRenderer && typeof this.tooltipRenderer === "function") {
								tooltipValue = this.tooltipRenderer(value, col, row);
							} else {
								tooltipValue = value.toString();
							}
						}

						// determine text color for readability
						const textColor = getTextColor(color);
						// append cell html
						cellsHtml += /*html*/`
							<div
								class="heatmap-cell"
								part="heatmap-cell"
								style="background-color: ${color}; color: ${textColor};"
								${this._showTooltip ? `title="${tooltipValue}"` : ""}
								data-row="${row}"
								data-column="${col}"
								data-value="${value}"
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
						let parsedValue = "";
						if (this._showValues) {
							// check if cell renderer function is defined
							if (this.cellRenderer && typeof this.cellRenderer === "function") {
								parsedValue = this.cellRenderer(value, col, row);
							} else {
								parsedValue = value.toString();
							}
						}

						// show tooltip if enabled
						let tooltipValue = "";
						if (this._showTooltip) {
							// check if tooltip renderer function is defined
							if (this.tooltipRenderer && typeof this.tooltipRenderer === "function") {
								tooltipValue = this.tooltipRenderer(value, col, row);
							} else {
								tooltipValue = value.toString();
							}
						}

						// determine text color for readability
						const textColor = getTextColor(color);
						// append cell html
						cellsHtml += /*html*/`
							<div
								class="heatmap-cell"
								part="heatmap-cell"
								style="background-color: ${color}; color: ${textColor};"
								${this._showTooltip ? `title="${tooltipValue}"` : ""}
								data-row="${row}"
								data-column="${col}"
								data-value="${value}"
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

	private _renderAxisLabels(): void {
		const isVertical = this._orientation === PandaHeatmapOrientation.VERTICAL;
		const rows = this._data.length;
		const cols = this._data[0]?.length || 0;
		const gridCols = isVertical ? rows : cols;
		const gridRows = isVertical ? cols : rows;

		if (this._xAxisLabels.length > 0) {
			let xAxisLabelsHtml = "";

			const xLabels = isVertical
				? this._yAxisLabels
				: this._xAxisLabels;

			for (let i = 0; i < gridCols; i++) {
				xAxisLabelsHtml += /*html*/`
					<div class="x-label" part="x-label">
						${xLabels[i] || ""}
					</div>
				`;
			}
			// update x axis labels inner HTML
			this._xAxisLabelsEl.innerHTML = xAxisLabelsHtml;
		}

		if (this._yAxisLabels.length > 0) {
			let yAxisLabelsHtml = "";

			const yLabels = isVertical
				? this._xAxisLabels
				: this._yAxisLabels;

			for (let i = 0; i < gridRows; i++) {
				yAxisLabelsHtml += /*html*/`
					<div class="y-label" part="y-label">
						${yLabels[i] || ""}
					</div>
				`;
			}
			// update y axis labels inner HTML
			this._yAxisLabelsEl.innerHTML = yAxisLabelsHtml;
		}
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

	/**
	 * Parses a CSS variable to a string with px unit.
	 * @param {String} variableName name of the CSS variable
	 * @param {String} fallback fallback value if the variable is not defined or invalid
	 * @returns {String}
	 */
	private _parseCssVariable(variableName: string, fallback: string): string {
		const computedStyles = getComputedStyle(this);
		const variableString = computedStyles.getPropertyValue(variableName).trim();
		const variableValue = Number.parseInt(variableString);
		// check if variableValue is a valid number
		if (isNaN(variableValue)) {
			return fallback;
		} else {
			return `${variableValue}px`;
		}
	}

	private _updateColors(): void {
		if (this.shadowRoot) {
			const computedStyles = getComputedStyle(this);
			// check if minColor is not defined
			if (this._minColor == null || this._minColor === "") {
				// check if min-color token is defined in styles
				const minColor = computedStyles.getPropertyValue("--panda-heatmap-min-color");

				this._minColorParsed = minColor === ""
					? computedStyles.getPropertyValue("--panda-form-background-color")
					: minColor;
			} else {
				this._minColorParsed = this._minColor;
			}

			// check if maxColor is not defined
			if (this._maxColor == null || this._maxColor === "") {
				// check if max-color token is defined in styles
				const maxColor = computedStyles.getPropertyValue("--panda-heatmap-max-color");

				const maxColorFromTheme = this._getColorFromTheme();
				this._maxColorParsed = maxColor === ""
					? computedStyles.getPropertyValue(maxColorFromTheme)
					: maxColor;
			} else {
				this._maxColorParsed = this._maxColor;
			}
		}
	}

	/** Updates the minimum and maximum values based on the current data. */
	private _updateMinMaxValues(): void {
		if (this._data && this._data.length > 0) {
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

			// if no valid values found, set defaults
			if (min === Infinity) {
				min = 0;
			}
			if (max === -Infinity) {
				max = 0;
			}
			this._minValue = min;
			this._maxValue = max;
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onGridClick(event: MouseEvent): void {
		const cellEl = (event.target as HTMLElement).closest(".heatmap-cell") as HTMLDivElement;

		if (cellEl) {
			const row = cellEl.dataset.row;
			const column = cellEl.dataset.column;
			const value = cellEl.dataset.value;

			// dispatch custom event
			this.dispatchEvent(new CustomEvent("select", {
				detail: {
					row: Number(row),
					column: Number(column),
					value: value
				},
				bubbles: true,
				composed: true
			}));
		}
	}

	// Theme change event handler
	private _onThemeChange(): void {
		this._updateColors();
		this._updateComponent();
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
