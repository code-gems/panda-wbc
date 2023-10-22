export interface PandaParticleBannerMetadata {
	mouse: MousePosition;
	bannerRect: DOMRect | null;
	particleGroups: PandaParticle[][];
}

export type MousePosition = {
	clientX: number | null;
	clientY: number | null;
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

export interface PandaParticleBannerConfig {
	particleCount: number;
	
	// particle behavior =======================================
	walls?: boolean; // default to false
	collisions?: boolean; // default to false

	// mouse offset
	interactive?: boolean; // default to false [incompatible with walls]
	mouseOffsetXSensitivity?: number; // default to 100
	mouseOffsetYSensitivity?: number; // default to 100

	// connect
	connect?: boolean; // default to false
	connectionDistance?: number; // default to 100
	connectionLineColor?: string; // default to #c1c1c1

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
	colorOpacity?: number; // value between 0 and 100 default to 100;
	colorVariation?: number; // value between 0 and 360 default to 0 (exact color)
	colorSaturationVariation?: number; // value between 0 and 100 default to 50;
	colorBrightnessVariation?: number; // value between 0 and 100 default to 50;
	colorOpacityVariation?: number; // value between 0 and 100 default to 0;
}
