// types
import { PandaParticleBannerConfig } from "../../index";

export const getDefaultBannerConfig = (): PandaParticleBannerConfig => {
	return {
		particleCount: 100,
	
		// particle behavior ===================================
		walls: false,
		collisions: false,

		// mouse offset
		interactive: false,
		mouseOffsetXSensitivity: 100,
		mouseOffsetYSensitivity: 100,

		// connect
		connect: false,
		connectionDistance: 100,
		connectionLineColor: "#c1c1c1",
		
		// speed
		minSpeedX: -3,
		maxSpeedX: 3,
		minSpeedY: -3,
		maxSpeedY: 3,

		// particle style ======================================
		// blur
		blur: false,
		blurMin: 0,
		blurMax: 5,

		// color
		colors: ["hsl(190deg 50% 50% / 70%)"],
		colorOpacity: 100,
		colorVariation: 0,
		colorSaturationVariation: 50,
		colorBrightnessVariation: 50,
		colorOpacityVariation: 0,
	};
};

/**
 * Get random number between min and max value. Min value is set to 0 by default.
 * @param {Number} max - upper number limit
 * @param {Number} min - lower number limit, 0 by default
 * @returns Random integer between lower and upper number limit
 */
export const getRandomInt = (max: number, min: number = 0, decimalPlaces: number = 2): number => {
	const round = (num: number) => {
		const p = Math.pow(10, decimalPlaces);
		return Math.round(num * p) / p;
	}
	
	const randomInt = min + (Math.random() * (max - min));
	return round(randomInt);
};

/**
 * Validate provided value against min and max limits.
 * @param {Number} value - value to validate
 * @param {Number} min - min value
 * @param {Number} max - max value
 * @returns value between min and max. 
 */
export const minMax = (value: number, min: number, max: number): number => {
	if (value < min) {
		return min;
	} else if (value > max) {
		return max;
	} else {
		return value;
	}
};
