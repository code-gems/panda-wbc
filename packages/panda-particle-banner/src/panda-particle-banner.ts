// types
import { MousePosition, PandaParticle, PandaParticleBannerConfig, PandaParticleBannerMetadata } from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { getDefaultBannerConfig, getRandomInt, minMax } from "./utils/utils";
import { debounce } from "@panda-wbc/panda-core";

@customElement("panda-particle-banner")
class PandaParticleBanner extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Object })
	config: any = {};

	@property({ type: Boolean, attribute: true, reflect: true })
	verbose: boolean = false;

	// private props
	private _config: PandaParticleBannerConfig = getDefaultBannerConfig();

	private _ctx!: CanvasRenderingContext2D;

	private _particles: PandaParticle[] = [];

	private _stopAnimation: boolean = false;

	private _animationTimer!: number;

	private _offsetX: number = 0;

	private _offsetY: number = 0;

	private _metadata: PandaParticleBannerMetadata = {
		mouse: {
			clientX: null,
			clientY: null,
		},
		particles: [],
		bannerRect: null,
	};

	// events
	private _documentMouseMoveEvent = this._onMouseMove.bind(this);
	// debouncers
	private _resizeBannerDebouncer = debounce(this._resizeBanner.bind(this), 500);
	// resize observer
	private _resizeObserver!: ResizeObserver;

	// elements
	@query("#canvas")
	private _canvasEl!: HTMLCanvasElement;
	
	private _bannerRect!: DOMRect;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		// add events
		document.addEventListener("mousemove", this._documentMouseMoveEvent);
	}

	protected firstUpdated(): void {
		// add resize observer
		this._resizeObserver = new ResizeObserver(() => {
			// delay resize
			this._resizeBannerDebouncer();	
		});
		this._resizeObserver.observe(this, { box: "content-box" });
		
		// validate banner config
		this._validateConfig();
		// get canvas context
		this._ctx = this._canvasEl.getContext("2d") as CanvasRenderingContext2D;
		// update banner size
		this._resizeBanner();
		// initialize particles
		this._initBanner();
		// start animation
		this._animate();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clean up
		clearInterval(this._animationTimer);
		// remove events
		document.removeEventListener("mousemove", this._documentMouseMoveEvent);
		// remove observers
		this._resizeObserver.unobserve(this);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="banner" part="banner">
				<canvas id="canvas" part="canvas"></canvas>
				<div class="content" part="content">
					<slot></slot>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _initBanner(): void {
		setTimeout(() => {
			const {
				particleCount,
	
				sizeMin = 3,
				sizeMax = 10,
	
				speedXMin = -3,
				speedXMax = 3,
				speedYMin = -3,
				speedYMax = 3,
	
				blurMin = 0,
				blurMax = 5,
			} = this._config;
	
			for (let i = 0; i < particleCount; i++) {
				// particle style ==================================
				// generate size
				const size = getRandomInt(sizeMax, sizeMin);
				// generate color
				const color = `hsl(${Math.random() * 40 + 190}deg 70% 80% / 70%)`;
				// generate blur
				let blur = 0;
				if (this._config.blur) {
					blur = getRandomInt(blurMax, blurMin);
				}
	
				// particle behavior ===============================
				// generate speed values
				let speedX = getRandomInt(speedXMax, speedXMin);
				let speedY = getRandomInt(speedYMax, speedYMin);
	
				// check if there are "dead" particles
				if (speedX === 0 && speedY === 0) {
					speedX = speedXMax;
					speedY = speedYMax;
				}
	
				// generate position
				// const x = this._canvasEl.width / 2; // getRandomInt(this._canvasEl.width);
				const x = getRandomInt(this._canvasEl.width);
				// const y = this._canvasEl.height / 2; // getRandomInt(this._canvasEl.height);
				const y = getRandomInt(this._canvasEl.height);
	
				// add particle
				this._particles.push({
					x,
					y,
					size,
					speedX,
					speedY,
					color,
					blur,
				});
			}
			this._metadata.particles = this._particles;
		}, 0);
	}

	private _resizeBanner(): void {
		setTimeout(() => {
			this._bannerRect = this.getBoundingClientRect();
			this._canvasEl.width = this._bannerRect.width;
			this._canvasEl.height = this._bannerRect.height;
			// update banner metadata
			this._metadata.bannerRect = this._bannerRect;
		}, 0);
	}

	private _draw() {
		this._ctx.clearRect(0, 0, this._canvasEl.width, this._canvasEl.height);

		this._particles.forEach((particle, index) => {
			let {
				x,
				y,
				size,
				color,
				speedX,
				speedY,
				blur,
			} = particle;

			// particle.speedX += 1;
			// particle.speedY += 1;

			// update position X
			x += speedX;
			if (this._config.walls) {
				// check the walls
				if (
					x + size >= this._canvasEl.width && speedX > 0 ||
					x - size <= 0 && speedX < 0
				) {
					particle.speedX = particle.speedX * -1; // flip the speed value
				}

			} else {
				// check if particle moved out of the view
				if (x - size > this._canvasEl.width + this._offsetX && speedX > 0) {
					x = -size + this._offsetX;
				}
				if (x + size < 0 + this._offsetX && speedX < 0) {
					x = this._canvasEl.width + size + this._offsetX;
				}
			}

			// update position Y
			y = y + speedY;
			if (this._config.walls) {
				if (
					y + size >= this._canvasEl.height && speedY > 0 ||
					y - size <= 0 && speedY < 0
				) {
					particle.speedY = particle.speedY * -1; // flip the speed value
				}
			} else {
				// check if particle moved out of the view
				if (y - size > this._canvasEl.height + this._offsetY && speedY > 0) {
					y = -size + this._offsetY;
				}
				if (y + size < 0 + this._offsetY && speedY < 0) {
					y = this._canvasEl.height + size + this._offsetY;
				}
			}

			for (let i = index + 1; i < this._particles.length; i++) {
				const particleA = particle;
				const particleB = this._particles[i];

				// calculate a distance to other particles
				const dist = Math.floor(Math.sqrt(Math.pow((particleB.x - particleA.x), 2) + Math.pow((particleB.y - particleA.y), 2)));
				const connectionDistance: number = Number(this._config.connectionDistance) || 100;

				if (this._config.connect && dist <= connectionDistance) {
					this._ctx.beginPath();
					this._ctx.moveTo(x, y);
					this._ctx.lineTo(particleB.x, particleB.y);
					this._ctx.filter = `blur(0px)`;
					this._ctx.strokeStyle = "#c1c1c1";
					this._ctx.stroke();
					this._ctx.closePath();
				}
			}

			// update new position
			particle.x = x;
			particle.y = y;

			// apply position offset
			if (this._config.mouseOffset) {
				x = x - this._offsetX;
				y = y - this._offsetY;
			}

			this._ctx.beginPath();
			this._ctx.arc(
				x,
				y,
				size,
				0,
				Math.PI * 2,
				false
			);

			if (this._config.blur) {
				if (this._config.getBlur !== undefined && typeof this._config.getBlur === "function") {
					blur = this._config.getBlur(particle, index, this._metadata);
				}
				this._ctx.filter = `blur(${blur}px)`;
			}

			this._ctx.fillStyle = color;
			this._ctx.fill();
			this._ctx.closePath();
		});
	}

	private _animate(): void {
		this._animationTimer = setInterval(() => {
			if (!this._stopAnimation) {
				this._draw();
			}
		}, 50);
	}

	/**
	 * Validate banner config
	 */
	private _validateConfig() {
		// deconstruct banner config
		this._config = {
			...getDefaultBannerConfig(),
			...this.config,
		};
		const {
			particleCount,
			walls,
			mouseOffset,
			mouseOffsetXSensitivity,
			mouseOffsetYSensitivity,
			blur,
			blurMin,
			blurMax,
			getBlur,
		} = this._config;

		const warn = (message: string): void => {
			if (this.verbose) {
				console.warn("%c ✨ [PANDA PARTICLE BANNER]", "font-size: 16px;", message);			
			}
		}

		if (walls && mouseOffset) {
			warn("'walls' and 'mouseOffset' are incompatible. 'mouseOffset' behavior will be disabled.");			
		}

		if (isNaN(mouseOffsetXSensitivity as number)) {
			warn("'mouseOffsetXSensitivity' has to be a number! Fallback to default value (100).");
		}

		if (isNaN(mouseOffsetYSensitivity as number)) {
			warn("'mouseOffsetYSensitivity' has to be a number! Fallback to default value (100).");
		}

		if (particleCount > 500) {
			warn("Consider reducing particle count to improve FPS.");			
		}

		if (blur && particleCount > 300) {
			warn("Features like 'blur' reduce FPS. Consider reducing particle count to improve FPS.");			
		}

		if (isNaN(blurMin as number)) {
			warn("'blurMin' has to be a number! Fallback to default value (0).");
		}

		if (isNaN(blurMax as number)) {
			warn("'blurMax' has to be a number! Fallback to default value (5).");
		}

		if (getBlur !== undefined && typeof getBlur !== "function") {
			warn("'getBlur' callback has to be a function that returns a number.");
		}

		if (getBlur !== undefined && !blur) {
			warn("'getBlur' callback is present but 'blur' feature is disabled. Add 'blur: true' to your banner config.");
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onMouseMove(e: MouseEvent) {
		const bannerTop: number = this._metadata.bannerRect?.top ?? 0;
		const bannerLeft: number = this._metadata.bannerRect?.left ?? 0;
		const bannerRight: number = this._metadata.bannerRect?.right ?? 0;
		const bannerBottom: number = this._metadata.bannerRect?.bottom ?? 0;
		this._metadata.mouse.clientY = minMax(e.clientY - bannerTop, 0, bannerBottom);
		this._metadata.mouse.clientX = minMax(e.clientX - bannerLeft, 0, bannerRight);

		if (this.config.mouseOffset && !this.config.walls) {
			const sensitivityX: number = Number(this.config.mouseOffsetXSensitivity) || 100;
			const sensitivityY: number = Number(this.config.mouseOffsetYSensitivity) || 100;
			this._offsetX = Math.round(((e.clientX - this._bannerRect.left) * sensitivityX) / (this._canvasEl.width)) - (sensitivityX / 2);
			this._offsetY = Math.round(((e.clientY - this._bannerRect.top) * sensitivityY) / this._canvasEl.height) - (sensitivityY / 2);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-particle-banner": PandaParticleBanner;
	}
}
