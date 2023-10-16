// types
import { PandaParticleBannerConfig } from "../../index";

export const getDefaultBannerConfig = (): PandaParticleBannerConfig => {
	return {
		particleCount: 100,
	
		// particle behavior ===================================
		walls: false,
		collisions: false,

		// mouse offset
		mouseOffset: false,
		mouseOffsetXSensitivity: 100,
		mouseOffsetYSensitivity: 100,

		// connect
		connect: false,
		connectionDistance: 100,
		connectionLineColor: "#c1c1c1",
		
		// speed
		speedXMin: -3,
		speedXMax: 3,
		speedYMin: -3,
		speedYMax: 3,

		// particle style ======================================
		// blur
		blur: false,
		blurMin: 0,
		blurMax: 5,

		// color
		color: "hsl(190deg 50% 50% / 70%)",
		colorList: [],
		colorOpacity: 100,
		colorVariation: 0,
		colorSaturationVariation: 50,
		colorBrightnessVariation: 50,
		colorOpacityVariation: 100,
	};
};

/**
 * Get random number between min and max value. Min value is set to 0 by default.
 * @param {Number} max - upper number limit
 * @param {Number} min - lower number limit, 0 by default
 * @returns Random integer between lower and upper number limit
 */
export const getRandomInt = (max: number, min: number = 0): number => {
	return min + Math.floor(Math.random() * (max + 1 - min));
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
