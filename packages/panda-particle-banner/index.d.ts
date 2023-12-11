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
	speedDeltaX: number;
	speedY: number;
	speedDeltaY: number;
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
	walls?: boolean; // default to false
	collisions?: boolean; // default to false

	// mouse offset
	interactive?: boolean; // default to false [incompatible with walls]
	sensitivityX?: number; // default to 1
	sensitivityY?: number; // default to 1

	// connect
	connect?: boolean; // default to false
	connectionDistance?: number; // default to 100
	connectionLineColor?: string; // default to #c1c1c1
	connectionLineDash?: number[];
	connectionLineWidth?: number; // default to 1
	getConnectionLineBlur?: (distance: number) => number;
	getConnectionLineColor?: (distance: number) => string;
	getConnectionLineOpacity?: (distance: number) => number;
	getConnectionLineDashOffset?: (distance: number) => number;

	// speed
	minSpeedX?: number; // default to -3
	maxSpeedX?: number; // default to 3
	speedDeltaX?: number; // default to 0
	minSpeedY?: number; // default to -3
	maxSpeedY?: number; // default to 3
	speedDeltaY?: number; // default to 0
	
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
}

export interface PandaParticleBannerConfig {
	// particle group list
	particleGroup: ParticleGroup[]; 
	// background options
	background?: {
		color: string;
	}
}
