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
	config: any = null;

	@property({ type: Boolean, attribute: true, reflect: true })
	verbose: boolean = false;

	// private props
	private _config: PandaParticleBannerConfig[] = [];

	private _ctx!: CanvasRenderingContext2D;

	private _particleGroups: PandaParticle[][] = [];

	private _stopAnimation: boolean = false;

	private _animationTimer!: number;

	private _offsetX: number = 0;

	private _offsetY: number = 0;

	private _metadata: PandaParticleBannerMetadata = {
		mouse: {
			clientX: null,
			clientY: null,
		},
		particleGroups: [],
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
			// parse all banner configs and generate particle groups
			this._config.forEach((config) => {
				const {
					particleCount,

					sizeMin = 3,
					sizeMax = 10,

					minSpeedX = -3,
					maxSpeedX = 3,
					speedDeltaX = 0,
					minSpeedY = -3,
					maxSpeedY = 3,
					speedDeltaY = 0,

					blurMin = 0,
					blurMax = 5,
				} = config;

				const particles: PandaParticle[] = [];
				for (let i = 0; i < particleCount; i++) {
					// particle style ==================================
					// generate size
					const size = getRandomInt(sizeMax, sizeMin, 0);
					// generate color
					const color = `hsl(${Math.random() * 40 + 190}deg 70% 80% / 70%)`;
					// generate blur
					let blur = 0;
					if (config.blur) {
						blur = getRandomInt(blurMax, blurMin);
					}

					// particle behavior ===============================
					// generate speed values
					let speedX = getRandomInt(maxSpeedX, minSpeedX);
					let speedY = getRandomInt(maxSpeedY, minSpeedY);

					console.log("%c speed X/Y", "font-size: 24px; color: green;", speedX, speedY);

					// check if there are "dead" particles
					if (speedX === 0 && speedY === 0) {
						speedX = maxSpeedX;
						speedY = maxSpeedY;
					}

					// generate position
					// const x = this._canvasEl.width / 2; // getRandomInt(this._canvasEl.width);
					const x = getRandomInt(this._canvasEl.width);
					// const y = this._canvasEl.height / 2; // getRandomInt(this._canvasEl.height);
					const y = getRandomInt(this._canvasEl.height);

					// add particle
					particles.push({
						x,
						y,
						size,
						speedX,
						speedDeltaX,
						speedY,
						speedDeltaY,
						color,
						blur,
					});
				}
				// add particle group
				this._particleGroups.push(particles);
				// update banner metadata
				this._metadata.particleGroups = this._particleGroups;
			});
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
		// clean up canvas
		this._ctx.clearRect(0, 0, this._canvasEl.width, this._canvasEl.height);
		// fill up background color
		this._ctx.fillStyle = "white";
		this._ctx.fillRect(0, 0, this._canvasEl.width, this._canvasEl.height);

		// draw all particle groups
		this._particleGroups.forEach((particleGroup, groupIndex) => {
			// find config related to particle group
			const bannerConfig = this._config[groupIndex];
			// get group behavior props from config
			const {
				walls = false,
				collisions = false,
				connect = false,
				connectionDistance = 100,
				interactive = false,
			} = bannerConfig;

			particleGroup.forEach((particle, index) => {
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
				if (walls) {
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
				if (walls) {
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

				for (let i = index + 1; i < particleGroup.length; i++) {
					const particleA = particle;
					const particleB = particleGroup[i];

					// calculate a distance to other particles
					const dist = Math.floor(Math.sqrt(Math.pow((particleB.x - particleA.x), 2) + Math.pow((particleB.y - particleA.y), 2)));

					if (connect && dist <= connectionDistance) {
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
				if (interactive) {
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
				
				// reset previous blur
				this._ctx.filter = `blur(0px)`;
				if (bannerConfig.blur) {
					if (bannerConfig.getBlur !== undefined && typeof bannerConfig.getBlur === "function") {
						blur = bannerConfig.getBlur(particle, this._metadata, index);
					}
					this._ctx.filter = `blur(${blur}px)`;
				}

				this._ctx.fillStyle = color;
				this._ctx.fill();
				this._ctx.closePath();
			});
		});
	}

	private _animate(): void {
		this._animationTimer = setInterval(() => {
			if (!this._stopAnimation) {
				this._draw();
			}
		}, 26);
	}

	/**
	 * Validate banner config
	 */
	private _validateConfig() {
		// parse banner config
		if (Array.isArray(this.config)) {
			this.config.forEach((config) => {
				this._config.push({
					...getDefaultBannerConfig(),
					...config,
				});
			});
		} else {
			this._config.push({
				...getDefaultBannerConfig(),
				...this.config,
			});
		}
		console.warn("%c ✨ [PANDA PARTICLE BANNER]", "font-size: 16px;", this._config);

		// validate all config groups
		this._config.forEach((config) => {
			// deconstruct banner config
			const {
				particleCount,
				walls,
				interactive,
				mouseOffsetXSensitivity,
				mouseOffsetYSensitivity,
				blur,
				blurMin,
				blurMax,
				getBlur,
			} = config;

			const warn = (message: string): void => {
				if (this.verbose) {
					console.warn("%c ✨ [PANDA PARTICLE BANNER]", "font-size: 16px;", message);
				}
			}

			if (walls && interactive) {
				warn("'walls' and 'interactive' are incompatible. 'interactive' behavior will be disabled.");
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
		});
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
