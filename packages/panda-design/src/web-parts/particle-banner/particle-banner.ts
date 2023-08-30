// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("particle-banner")
class ParticleBanner extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Array })
	particles: any[] = [];

	@property({ type: Number })
	particleCount: number = 50;

	// private props
	private _ctx!: CanvasRenderingContext2D | null;
	private _width!: number;	
	private _height!: number;	

	// elements
	@query("#canvas")
	private _canvasEl!: HTMLCanvasElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		this._ctx = this._canvasEl.getContext("2d");
		// update banner size
		this._resizeBanner();
		// initialize particles
		this._initBanner();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="banner">
				<canvas id="canvas"></canvas>
				<div class="content"><slot></slot></div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _initBanner(): void {
		for (let i = 0; i < this.particleCount; i++) {
			const radius = Math.random() * 3 + 1;
			const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
			const speedX = Math.random() * 3 - 1.5;
			const speedY = Math.random() * 3 - 1.5;

			// add particle
			this.particles.push({
				radius,
				speedX,
				speedY,
			});
		}
	}

	private _resizeBanner(): void {
		this._width = this._canvasEl.width;
		this._height = this._canvasEl.height;
	}

	private _draw() {
		if (this._ctx) {
			this._ctx.clearRect(0, 0, this._width, this._height);
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}
