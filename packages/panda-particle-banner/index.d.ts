export interface PandaParticleBannerMetadata {
	mouse: MousePosition;
	bannerRect: DOMRect | null;
	particleGroups: PandaParticle[][];
}

export type MousePosition = {
	clientX: number | null;
	clientY: number | null;
}

export type PandaParticleColor = {
	hue: number;
	saturation: number;
	lightness: number;
	alpha: number;
}

export const enum ParticleShape {
	CIRCLE = "circle",
	CIRCLE_FILLED = "circle-filled",
	RECT = "rect",
	RECT_FILLED = "rect-filled",
	TRIANGLE = "triangle",
	TRIANGLE_FILLED = "triangle-filled",
}

export type PandaParticle = {
	x: number;
	y: number;
	size: number;
	speedX: number;
	deltaSpeedX: number;
	speedY: number;
	deltaSpeedY: number;
	
	color: string; // color value eg.: red, rgb(255, 0, 0), hsl(180deg 0% 0%)
	blur: number;
}

export interface ParticleGroup {
	particleCount: number;
	particleShape?: ParticleShape;
	particleLineDash?: number[];
	particleLineWidth?: number;
	particleList?: PandaParticle[];
	drawParticle?: (ctx: CanvasRenderingContext2D, particle: PandaParticle) => void;
	
	// particle behavior =======================================
	pauseOnClick?: boolean;
	asyncParticleCreation?: boolean; // default to false
	particleCreationInterval?: number; // default to 500 ms
	walls?: boolean; // default to false
	collisions?: boolean; // default to false
	/** Destroy particles that moved out of the viewport. [DEFAULT: false] */
	destroyParticles?: boolean; // default to false

	// mouse offset
	interactive?: boolean; // default to false [incompatible with walls]
	sensitivityX?: number; // default to 1
	sensitivityY?: number; // default to 1

	// connect
	connect?: boolean; // default to false
	/** Maximal distance between two particles when connector line.will be drawn. [DEFAULT: 100] [px] */
	connectionDistance?: number;
	/** default to #c1c1c1 */
	connectionLineColor?: string;
	connectionLineDash?: number[];
	connectionLineWidth?: number; // default to 1
	getConnectionLineBlur?: (distance: number) => number;
	getConnectionLineColor?: (distance: number) => string;
	getConnectionLineOpacity?: (distance: number) => number;
	getConnectionLineDashOffset?: (distance: number) => number;

	// position
	getPosition?: (bannerRect: DOMRect) => { x: number, y: number; }

	// speed
	minSpeedX?: number; // default to -3
	maxSpeedX?: number; // default to 3
	minDeltaSpeedX?: number; // default to 0
	maxDeltaSpeedX?: number; // default to 0
	deltaSpeedLimitX?: number; // default to null
	minSpeedY?: number; // default to -3
	maxSpeedY?: number; // default to 3
	minDeltaSpeedY?: number; // default to 0
	maxDeltaSpeedY?: number; // default to 0
	deltaSpeedLimitY?: number; // default to null
	/**
	 * Increase of speed value will adapt to existing speed direction. [DEFAULT: true]
	 */
	adaptiveDelta?: boolean;
	
	// particle style ==========================================

	// size
	sizeMin?: number; // default to 3
	sizeMax?: number; // default to 10

	// blur
	blur?: boolean; // default false
	
	blurMin?: number; // default to 0
	blurMax?: number; // default to 5
	getBlur?: (particle: PandaParticle, metadata: PandaParticleBannerMetadata, index: number) => number; // get dynamic blur value
	
	// color
	colors?: string[];
	colorHueVariation?: number; // value between 0 and 360 default to 0 (exact color)
	colorSaturationVariation?: number; // value between 0 and 100 default to 0;
	colorLightnessVariation?: number; // value between 0 and 100 default to 0;
	colorOpacityVariation?: number; // value between 0 and 100 default to 0;

	// shadow
	shadowColor?: string;
	shadowBlur?: number;
}

export interface PandaParticleBannerConfig {
	// particle group list
	particleGroup: ParticleGroup[];
	// features
	showFps?: boolean; // default to false
	smudge?: boolean; // default to false
	// background options
	background?: {
		color: string;
	};
}
