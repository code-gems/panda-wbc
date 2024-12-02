// types
import {
	PandaParticle,
	PandaParticleBannerConfig,
	PandaParticleBannerMetadata,
	PandaParticleColor,
	ParticleGroup,
	ParticleShape,
} from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { getHslColorString, getRandomInt, minMax, validateColorHue, parseColorString, limitCheck } from "./utils/utils";
import { debounce } from "@panda-wbc/panda-utils";

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

	// state props
	private _pause: boolean = false;

	private _config: PandaParticleBannerConfig = {
		particleGroup: [],
	};

	private _ctx!: CanvasRenderingContext2D;

	private _particleGroups: PandaParticle[][] = [];

	private _stopAnimation: boolean = false;

	private _oldFrameTimestamp: number = 0;

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

	private _sensitivityX: number = 100; // default mouse distance sensitivity [px]

	private _sensitivityY: number = 100; // default mouse distance sensitivity [px]

	private _firstRun: boolean = true;

	@state()
	private _fps!: number;
	
	// events
	private readonly _documentMouseMoveEvent = this._onMouseMove.bind(this);

	// timers
	private _asyncParticleGeneratorTimer!: number;

	// debouncers
	private readonly _resizeBannerDebouncer = debounce(this._onResize.bind(this), 500);

	// resize observer
	private _resizeObserver!: ResizeObserver;

	// elements
	@query("#canvas")
	private readonly _canvasEl!: HTMLCanvasElement;

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
		this._initParticles();
		// start animation
		this._animate();
	}

	protected updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("config") && this.config !== undefined) {
			this._config = {
				particleGroup: [],
				...this.config,
			};
			this._initParticles();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clean up
		this._stopAnimation = true;
		(this._config as any) = null;
		(this._ctx as any) = null;
		// clear timers
		if (this._asyncParticleGeneratorTimer) {
			clearInterval(this._asyncParticleGeneratorTimer);
		}
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
			<div
				class="banner"
				part="banner"
				@click="${this._onTogglePause}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
					<defs>
						<filter id="goo">
							<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
							<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
						</filter>
					</defs>
				</svg>
				<canvas id="canvas" part="canvas"></canvas>
				<div class="content" part="content">
					<slot></slot>
				</div>
				${this._renderFps()}
			</div>
		`;
	}

	private _renderFps(): TemplateResult | void {
		if (this._config.showFps) {
			return html`
				<div id="fps" class="fps">FPS: ${this._fps}</div>
			`;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _initParticles(): void {
		setTimeout(() => {
			// reset particle groups
			this._particleGroups = [];
			this._metadata.particleGroups = [];

			// check if async particle creation mode is on
			// parse all banner configs and generate particle groups
			this._config.particleGroup.forEach((config, index) => {
				if (config?.asyncParticleCreation) {
					this._asyncParticleGenerator(config, index);
				} else {
					const { particleCount } = config;
					const particles: PandaParticle[] = [];
					const particleGenerator = this._generateParticle(config);

					for (let i = 0; i < particleCount; i++) {
						// generate particle
						particles.push(particleGenerator.next().value);
					}
					// add particle group
					this._particleGroups.push(particles);
					// update banner metadata
					this._metadata.particleGroups = this._particleGroups;
				}
			});
		}, 0);
	}

	private _asyncParticleGenerator(particleGroup: ParticleGroup, index: number): void {
		const {
			particleCount,
			particleCreationInterval = 500,
		} = particleGroup;
		const particleGenerator = this._generateParticle(particleGroup);
		let allParticlesCount: number = 0;

		this._asyncParticleGeneratorTimer = setInterval(() => {
			// stop interval when reached particle count
			if (allParticlesCount > particleCount || this._stopAnimation) {
				clearInterval(this._asyncParticleGeneratorTimer);
			} else {
				// generate particle
				const particle: PandaParticle = particleGenerator.next().value;
				// add particle to the group
				if (this._particleGroups[index]) {
					this._particleGroups[index].push(particle);
				} else {
					this._particleGroups[index] = [];
					this._particleGroups[index].push(particle);
				}
				// this._metadata.particleGroups[index].push(particle);
				allParticlesCount++;
			}
		}, particleCreationInterval);
	}

	private *_generateParticle(particleGroup: ParticleGroup): Generator<PandaParticle> {
		const {
			// color options
			colors = [],
			colorHueVariation = 0,
			colorSaturationVariation = 0,
			colorLightnessVariation = 0,
			colorOpacityVariation = 0,

			getPosition,

			sizeMin = 3,
			sizeMax = 5,

			minSpeedX = -1,
			maxSpeedX = 1,
			minDeltaSpeedX = 0,
			maxDeltaSpeedX = 0,
			minSpeedY = -1,
			maxSpeedY = 1,
			minDeltaSpeedY = 0,
			maxDeltaSpeedY = 0,

			blurMin = 1,
			blurMax = 3,
		} = particleGroup;
		let colorIndex = 0;
		const colorCount = colors.length;
		console.log("%c [GENERATOR] colors", "font-size: 24px; color: red;", colors);

		while (true) {
			// particle style ==================================
			// generate size
			const size = getRandomInt(sizeMax, sizeMin, 0);
			// generate color
			let _color: PandaParticleColor = parseColorString(colors[colorIndex]);

			// randomize color hue
			if (colorHueVariation) {
				// randomize color hue
				const hueMin = _color.hue - colorHueVariation;
				const hueMax = _color.hue + colorHueVariation;
				const variation = getRandomInt(hueMax, hueMin, 0);
				_color = { ..._color, hue: validateColorHue(variation) };
			}

			// randomize saturation
			if (colorSaturationVariation) {
				const saturationMin = minMax(_color.saturation - colorSaturationVariation, 0, 100);
				const saturationMax = minMax(_color.saturation + colorSaturationVariation, saturationMin, 100);
				const variation = getRandomInt(saturationMax, saturationMin, 0);
				_color = { ..._color, saturation: variation };
			}

			// randomize lightness
			if (colorLightnessVariation) {
				const lightnessMin = minMax(_color.lightness - colorLightnessVariation, 0, 100);
				const lightnessMax = minMax(_color.lightness + colorLightnessVariation, lightnessMin, 100);
				const variation = getRandomInt(lightnessMax, lightnessMin, 0);
				_color = { ..._color, lightness: variation };
			}

			// randomize alpha channel
			if (colorOpacityVariation) {
				const alphaMin = minMax(_color.alpha - colorOpacityVariation, 0, 100);
				const alphaMax = minMax(_color.alpha + colorOpacityVariation, alphaMin, 100);
				const variation = getRandomInt(alphaMax, alphaMin, 0);
				_color = { ..._color, alpha: variation };
			}
			// convert color data to string
			const color: string = getHslColorString(_color);
			// change color index
			colorIndex = (colorIndex + 1) % colorCount;

			// generate blur
			let blur = 0;
			if (particleGroup.blur) {
				blur = getRandomInt(blurMax, blurMin);
			}

			// particle behavior ===============================
			// generate speed values
			let speedX = getRandomInt(maxSpeedX, minSpeedX, 10);
			let speedY = getRandomInt(maxSpeedY, minSpeedY, 10);

			// check if there are "dead" particles
			if (speedX === 0 && speedY === 0) {
				speedX = maxSpeedX;
			}
			// generate speed deltas
			let deltaSpeedX = getRandomInt(maxDeltaSpeedX, minDeltaSpeedX, 10);
			let deltaSpeedY = getRandomInt(maxDeltaSpeedY, minDeltaSpeedY, 10);

			// generate position
			let x = 0;
			let y = 0;

			if (getPosition && typeof getPosition === "function") {
				({ x, y } = getPosition(this._bannerRect));
			} else {
				x = getRandomInt(this._canvasEl.width);
				y = getRandomInt(this._canvasEl.height);
			}

			yield {
				x,
				y,
				size,
				speedX,
				deltaSpeedX,
				speedY,
				deltaSpeedY,
				color,
				blur,
			};
		}
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

	private _onResize() {
		// ignore resize for the first time
		if (!this._firstRun) {
			// update banner size
			this._resizeBanner();
			// initialize particles
			this._initParticles();
		} else {
			this._firstRun = false;
		}
	}

	private _draw(frameTimestamp: number) {
		if (!this._ctx || this._pause) {
			return;
		}

		// clean up canvas
		if (!this._config.smudge) {
			this._ctx.clearRect(0, 0, this._canvasEl.width, this._canvasEl.height);
		}

		// fill up background color
		if (!this._config.smudge && this._config.background?.color) {
			this._ctx.fillStyle = this._config.background.color;
			this._ctx.fillRect(0, 0, this._canvasEl.width, this._canvasEl.height);
		}

		// draw all particle groups
		this._particleGroups.forEach((particleList, particleIndex) => {
			// find config related to particle group
			const groupConfig = this._config.particleGroup[particleIndex];
			// get group behavior props from config
			const {
				walls = false,
				collisions = false,
				destroyParticles = false,
				pauseOnClick = false,
				// particle
				particleShape = ParticleShape.CIRCLE_FILLED,
				particleLineDash,
				particleLineWidth,
				drawParticle,
				// connection
				connect = false,
				connectionDistance = 100,
				connectionLineColor = "#000",
				connectionLineWidth,
				connectionLineDash,
				getConnectionLineBlur,
				getConnectionLineOpacity,
				getConnectionLineColor,
				getConnectionLineDashOffset,

				// blur
				getBlur,
				// shadow
				shadowBlur,
				shadowColor,

				interactive = false,
				sensitivityX = 1,
				sensitivityY = 1,

				adaptiveDelta = true,
				deltaSpeedLimitX = null,
				deltaSpeedLimitY = null,

			} = groupConfig;

			// check if animation is paused
			if (!pauseOnClick || pauseOnClick && !this._pause) {
				// init mouse offset
				let _offsetX = 0;
				let _offsetY = 0;
				// assign mouse offset if interactive
				if (!walls && interactive) {
					_offsetX = this._offsetX * sensitivityX;
					_offsetY = this._offsetY * sensitivityY;
				}

				// render particles
				particleList.forEach((particle, index) => {
					let {
						x,
						y,
						size,
						color,
						speedX,
						deltaSpeedX,
						speedY,
						deltaSpeedY,
						blur,
					} = particle;

					if (adaptiveDelta) {
						if (particle.speedX > 0) {
							particle.speedX = limitCheck(particle.speedX + deltaSpeedX, deltaSpeedLimitX);
						} else if (particle.speedX < 0) {
							particle.speedX = limitCheck(particle.speedX - deltaSpeedX, deltaSpeedLimitX);
						}
						if (particle.speedY > 0) {
							particle.speedY = limitCheck(particle.speedY + deltaSpeedY, deltaSpeedLimitY);
						} else if (particle.speedY < 0) {
							particle.speedY = limitCheck(particle.speedY - deltaSpeedY, deltaSpeedLimitY);
						}
					} else {
						particle.speedX = limitCheck(particle.speedX + deltaSpeedX, deltaSpeedLimitX);
						particle.speedY = limitCheck(particle.speedY + deltaSpeedY, deltaSpeedLimitY);
					}

					// update position X
					let _protrudeX: boolean = false;
					x += speedX;
					if (walls) {
						// check the walls
						if (
							x + size >= this._canvasEl.width && speedX > 0 ||
							x - size <= 0 && speedX < 0
						) {
							particle.speedX = particle.speedX * -1; // bounce of the wall, flip the speed value
						}

					} else {
						// check if particle moved out of the view
						if (x - size > this._canvasEl.width + _offsetX && speedX > 0) {
							x = -size + _offsetX;
							_protrudeX = true;
						}
						if (x + size < 0 + _offsetX && speedX < 0) {
							x = this._canvasEl.width + size + _offsetX;
							_protrudeX = true;
						}
					}

					// update position Y
					let _protrudeY: boolean = false;
					y += speedY;
					if (walls) {
						if (
							y + size >= this._canvasEl.height && speedY > 0 ||
							y - size <= 0 && speedY < 0
						) {
							particle.speedY = particle.speedY * -1; // bounce of the wall, flip the speed value
						}
					} else {
						// check if particle moved out of the view
						if (y - size > this._canvasEl.height + _offsetY && speedY > 0) {
							y = -size + _offsetY;
							_protrudeY = true;
						}
						if (y + size < 0 + _offsetY && speedY < 0) {
							y = this._canvasEl.height + size + _offsetY;
							_protrudeY = true;
						}
					}

					// destroy particle
					if (destroyParticles && (_protrudeX || _protrudeY)) {
						particleList.splice(index, 1);
						const particleGenerator = this._generateParticle(groupConfig);
						const particle: PandaParticle = particleGenerator.next().value;
						particleList.push(particle);
					}

					for (let i = index + 1; i < particleList.length; i++) {
						const particleB = particleList[i];

						// calculate a distance to other particles
						const dist = Math.floor(Math.sqrt(Math.pow((particleB.x - x), 2) + Math.pow((particleB.y - y), 2)));

						// render connection line
						if (connect && dist <= connectionDistance) {
							let _connectionLineColor = connectionLineColor;
							let _connectionLineBlur = 0;
							let _connectionLineOpacity = 100;

							this._ctx.beginPath();
							// reset blur
							this._ctx.filter = "blur(0px)";

							// check if blur function is declared
							if (getConnectionLineBlur !== undefined && typeof getConnectionLineBlur === "function") {
								_connectionLineBlur = Number(getConnectionLineBlur(dist));
								// set connection line blur
								this._ctx.filter = `blur(${_connectionLineBlur}px)`;
							}

							// check if color function is declared
							if (getConnectionLineColor !== undefined && typeof getConnectionLineColor === "function") {
								_connectionLineColor = getConnectionLineColor(dist);
							}

							// check if opacity/alpha function is declared
							if (getConnectionLineOpacity !== undefined && typeof getConnectionLineOpacity === "function") {
								_connectionLineOpacity = Number(getConnectionLineOpacity(dist));
								// parse current connection line color
								let _color = parseColorString(_connectionLineColor);
								// modify opacity
								_color = { ..._color, alpha: _connectionLineOpacity };
								// convert back connection line color
								_connectionLineColor = getHslColorString(_color);
							}

							// check if line dash offset function is declared
							if (getConnectionLineDashOffset !== undefined && typeof getConnectionLineDashOffset === "function") {
								const lineDashOffset = getConnectionLineDashOffset(dist);
								this._ctx.lineDashOffset = lineDashOffset;
							}

							// set connection line dash style
							if (connectionLineDash) {
								this._ctx.setLineDash(connectionLineDash);
							}

							if (connectionLineWidth) {
								this._ctx.lineWidth = connectionLineWidth;
							} else {
								this._ctx.lineWidth = 1;
							}

							this._ctx.moveTo(x - _offsetX, y - _offsetY);
							this._ctx.lineTo(particleB.x - _offsetX, particleB.y - _offsetY);
							this._ctx.strokeStyle = _connectionLineColor;
							this._ctx.stroke();
							this._ctx.closePath();
						}
					}

					// draw particle
					this._ctx.beginPath();
					// reset previous blur
					this._ctx.filter = `blur(0px)`;
					if (groupConfig.blur) {
						if (getBlur !== undefined && typeof getBlur === "function") {
							blur = getBlur(particle, this._metadata, index);
						}
						this._ctx.filter = `blur(${blur}px)`;
					}

					// reset line dash and line width before drawing particle
					const resetLine = () => {
						// check if particle line dash is declared
						if (particleLineDash) {
							this._ctx.setLineDash(particleLineDash);
						} else {
							// reset line dash
							this._ctx.setLineDash([]);
						}
						// check if particle line width is declared
						if (particleLineWidth) {
							this._ctx.lineWidth = particleLineWidth;
						} else {
							this._ctx.lineWidth = 1;
						}
					}

					if (drawParticle && typeof drawParticle === "function") {
						resetLine();
						// draw particle
						drawParticle(this._ctx, particle);
					} else if (particleShape === ParticleShape.CIRCLE) {
						resetLine();
						// draw circle
						this._ctx.arc(
							x - _offsetX,
							y - _offsetY,
							size,
							0,
							Math.PI * 2,
							false
						);
						this._ctx.strokeStyle = color;
						this._ctx.stroke();

					} else if (particleShape === ParticleShape.CIRCLE_FILLED) {
						// draw circle
						this._ctx.arc(
							x - _offsetX,
							y - _offsetY,
							size,
							0,
							Math.PI * 2,
							false
						);
						this._ctx.fillStyle = color;
						this._ctx.fill();

					} else if (particleShape === ParticleShape.RECT) {
						resetLine();
						// draw rect
						this._ctx.rect(
							x - _offsetX - (size / 2),
							y - _offsetY - (size / 2),
							size,
							size
						);
						this._ctx.strokeStyle = color;
						this._ctx.stroke();

					} else if (particleShape === ParticleShape.RECT_FILLED) {
						// draw rect
						this._ctx.rect(
							x - _offsetX - (size / 2),
							y - _offsetY - (size / 2),
							size,
							size
						);
						this._ctx.fillStyle = color;
						this._ctx.fill();

					} else if (particleShape === ParticleShape.TRIANGLE) {
						resetLine();
						// draw triangle
						this._ctx.moveTo(x - _offsetX, y - _offsetY + (size / 2));
						this._ctx.lineTo(x - _offsetX + (size / 2), y - _offsetY - (size / 2));
						this._ctx.lineTo(x - _offsetX - (size / 2), y - _offsetY - (size / 2));
						this._ctx.lineTo(x - _offsetX, y - _offsetY + (size / 2));
						this._ctx.lineTo(x - _offsetX + (size / 2), y - _offsetY - (size / 2));
						this._ctx.lineJoin = "round";
						this._ctx.lineCap = "round";
						this._ctx.strokeStyle = color;
						this._ctx.stroke();

					} else if (particleShape === ParticleShape.TRIANGLE_FILLED) {
						// draw triangle
						this._ctx.moveTo(x - _offsetX, y - _offsetY + (size / 2));
						this._ctx.lineTo(x - _offsetX + (size / 2), y - _offsetY - (size / 2));
						this._ctx.lineTo(x - _offsetX - (size / 2), y - _offsetY - (size / 2));
						this._ctx.fillStyle = color;
						this._ctx.fill();
					}

					// update new position
					particle.x = x;
					particle.y = y;
				});

				// apply shadow props
				if (
					shadowColor !== undefined && shadowColor !== null ||
					shadowBlur !== undefined && shadowBlur !== null
				) {
					this._ctx.shadowColor = shadowColor ?? "black";
					this._ctx.shadowBlur = shadowBlur ?? 1;
				} else {
					// reset shadow
					this._ctx.shadowColor = "transparent";
					this._ctx.shadowBlur = 0;
				}
			}
		});

		// check show fps feature
		if (this._config.showFps) {
			// calculate fps
			this._fps = Math.round(1 / ((performance.now() - this._oldFrameTimestamp) / 1000));
			this._oldFrameTimestamp = frameTimestamp;
		}
		
		this._ctx.filter = `url(#goo)`;
		this._ctx.closePath();
		this._ctx.drawImage(this._canvasEl, 0, 0);

		// draw another frame
		if (!this._stopAnimation) {
			window.requestAnimationFrame(this._draw.bind(this));
		}
	}

	private _animate(): void {
		this._oldFrameTimestamp = performance.now();
		window.requestAnimationFrame(this._draw.bind(this));
	}

	/**
	 * Validate banner config
	 */
	private _validateConfig() {
		// parse banner config
		this._config = {
			particleGroup: [],
			...this.config,
		};

		console.warn("%c ✨ [PANDA PARTICLE BANNER]", "font-size: 16px;", this._config);

		// validate all config groups
		this._config.particleGroup.forEach((config) => {
			// deconstruct banner config
			const {
				// particle
				particleCount,
				particleShape = ParticleShape.CIRCLE_FILLED,
				particleLineDash,
				drawParticle,

				// behavior
				walls,
				interactive,
				sensitivityX = 1,
				sensitivityY = 1,

				// blur
				blur,
				blurMin = 0,
				blurMax = 5,
				getBlur,

				// connection lines
				connectionLineDash,
				connectionLineColor = null,
				getConnectionLineBlur,
				getConnectionLineColor,
				getConnectionLineOpacity,
				getConnectionLineDashOffset,
			} = config;

			const warn = (message: string): void => {
				if (this.verbose) {
					console.warn("%c ✨ [PANDA PARTICLE BANNER]", "font-size: 16px;", message);
				}
			}

			if (particleLineDash !== undefined && particleLineDash !== null && !Array.isArray(particleLineDash)) {
				warn("Property 'particleLineDash' has to be an array eg. 'particleLineDash: [5, 5]'");
			}

			if (particleLineDash !== undefined && particleLineDash !== null) {
				if (
					particleShape === ParticleShape.CIRCLE_FILLED ||
					particleShape === ParticleShape.RECT_FILLED ||
					particleShape === ParticleShape.TRIANGLE_FILLED
				) {
					warn("Property 'particleLineDash' only works with 'particleShape' like: 'circle', 'rect', 'triangle'");
				}
			}

			if (walls && interactive) {
				warn("'walls' and 'interactive' are features incompatible. 'interactive' behavior will be disabled.");
			}

			if (isNaN(sensitivityX as number)) {
				warn("'sensitivityX' has to be a number! Fallback to default value (1).");
			}

			if (isNaN(sensitivityY as number)) {
				warn("'sensitivityY' has to be a number! Fallback to default value (1).");
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

			if (drawParticle !== undefined && typeof drawParticle !== "function") {
				warn("'drawParticle' callback has to be a function.");
			}

			if (getBlur !== undefined && !blur) {
				warn("'getBlur' callback is present but 'blur' feature is disabled. Add 'blur: true' to your banner config.");
			}

			if (getConnectionLineBlur !== undefined && typeof getConnectionLineBlur !== "function") {
				warn("'getConnectionLineBlur' callback has to be a function that returns a number.");
			}

			if (getConnectionLineColor !== undefined && typeof getConnectionLineColor !== "function") {
				warn("'getConnectionLineColor' callback has to be a function that returns a color string.");
			}

			if (connectionLineColor !== null && getConnectionLineColor !== undefined) {
				warn("'getConnectionLineColor' callback is present, 'connectionLineColor' string will be overridden by callback value.");
			}

			if (getConnectionLineDashOffset !== undefined && typeof getConnectionLineDashOffset !== "function") {
				warn("'getConnectionLineDashOffset' callback has to be a function that returns a number.");
			}

			if (connectionLineDash === undefined && getConnectionLineDashOffset !== undefined) {
				warn("'getConnectionLineDashOffset' callback is present but 'connectionLineDash' is not declared. 'getConnectionLineDashOffset' will not take effect. Add 'connectionLineDash: [5, 5]' to banner config.")
			}
		});
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onTogglePause(): void {
		this._pause = !this._pause;
		if (!this._pause) {
			window.requestAnimationFrame(this._draw.bind(this));
		}
	}

	private _onMouseMove(e: MouseEvent) {
		if (this._bannerRect) {
			const bannerTop: number = this._metadata.bannerRect?.top ?? 0;
			const bannerLeft: number = this._metadata.bannerRect?.left ?? 0;
			const bannerRight: number = this._metadata.bannerRect?.right ?? 0;
			const bannerBottom: number = this._metadata.bannerRect?.bottom ?? 0;
			this._metadata.mouse.clientY = minMax(e.clientY - bannerTop, 0, bannerBottom);
			this._metadata.mouse.clientX = minMax(e.clientX - bannerLeft, 0, bannerRight);
			this._offsetX = Math.round(((e.clientX - this._bannerRect.left) * this._sensitivityX) / (this._canvasEl.width)) - (this._sensitivityX / 2);
			this._offsetY = Math.round(((e.clientY - this._bannerRect.top) * this._sensitivityY) / this._canvasEl.height) - (this._sensitivityY / 2);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-particle-banner": PandaParticleBanner;
	}
}
