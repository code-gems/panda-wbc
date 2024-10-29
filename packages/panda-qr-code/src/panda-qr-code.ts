// types
import { ErrorCorrectionLevel } from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { getCodeSize } from "./utils/utils";

@customElement("panda-qr-code")
export class PandaQRCode extends LitElement {
	static get styles() {
		return styles;
	}

	@property()
	data!: string | null | undefined;

	// options

	// XOR [1,0,1,0,1]

	// state props

	private _ctx!: CanvasRenderingContext2D;

	/** QR Code version */
	@state()
	private _version: number = 4;

	/**
	 * Quiet zone helps scanner to distinguish between code and its surroundings.
	 */
	@state()
	private _quietZoneSize: number = 4;

	@state()
	private _moduleSize: number = 4; // size of a module in px

	/**
	 * Canvas size is a sum of quiet zone and code size based on version
	 * and multiplied by module size [px]
	 */
	@state()
	private _canvasSize: number = 0;

	@state()
	private _errorCorrectionLevel: ErrorCorrectionLevel = ErrorCorrectionLevel.LOW;

	// elements

	@query("#qr-code")
	private _canvasEl!: HTMLCanvasElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		this._ctx = this._canvasEl.getContext("2d") as CanvasRenderingContext2D;
		this._drawCode();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		return html`
			<canvas id="qr-code"></canvas>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _drawCode(): void {
		// calculate total canvas size
		this._canvasSize = getCodeSize(this._version) * this._moduleSize;
		this._canvasEl.width = this._canvasSize;
		this._canvasEl.height = this._canvasSize;

		// clean up
		this._ctx.fillStyle = "white";
		this._ctx.fillRect(0, 0, this._canvasEl.width, this._canvasEl.height);


		this._drawPositionPattern();
	}

	/** Position pattern allows scanner to find the code orientation */
	private _drawPositionPattern(): void {
		this._ctx.beginPath();
		this._ctx.strokeStyle = "red";
		this._ctx.lineWidth = 2;
		this._ctx.createConicGradient
		// this._ctx.fillStyle = "black";
		// top left
		this._ctx.roundRect(
			1, // x
			1, // y
			this._getSizePx(5), // width
			this._getSizePx(5), // height
			0, // [5, 5, 5, 5]
		);
		// this._ctx.stroke();
		
		// bottom left
		const _codeSize = (getCodeSize(this._version) - 5) * this._moduleSize;
		// this._ctx.beginPath();
		// this._ctx.fillStyle = "red";
		this._ctx.roundRect(
			1, // x
			_codeSize, // y
			this._getSizePx(5), // width
			this._getSizePx(5), // height
			0, // [5, 5, 5, 5]
		);
		// this._ctx.stroke();

		// top right
		this._ctx.roundRect(
			_codeSize, // x
			1, // y
			this._getSizePx(5), // width
			this._getSizePx(5), // height
			0, // [5, 5, 5, 5]
		);
		this._ctx.stroke();

	}

	/** Alignment pattern helps to correct distortion of the scanned surface */
	private _drawAlignmentPattern(): void {

	}

	/** Separator keeps separation between code and position pattern */
	private _drawSeparator(): void {

	}

	/** This pattern help scanner to determine width of a single module/data matrix */
	private _drawTimingPattern(): void {

	}

	/**
	 * For code version 7 and above we need to include 
	 * an 18-bit version information string
	 */
	private _drawVersionInfo(): void {

	}

	/** Get position including quiet zone offset */
	private _getPos(value: number): number {
		return this._quietZoneSize + value;
	}

	/** Get size in px based on module size */
	private _getSizePx(size: number): number {
		return size * this._moduleSize;
	}
}