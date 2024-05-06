// types
import { PandaParticleBannerConfig, ParticleShape } from "@panda-wbc/panda-particle-banner";

export const bannerConfig1: PandaParticleBannerConfig = {
	particleGroup: [{
		particleCount: 70,
		walls: true,
		colors: ["#ff4778" , "#6f36bc", "#36174D"],

		minSpeedX: -0.2,
		maxSpeedX: 0.2,
		minSpeedY: -0.2,
		maxSpeedY: 0.2,

		blur: true,
		blurMax: 1,
		connect: true,
		connectionLineDash: [3, 3],
		connectionLineColor: "#36174D",
		getConnectionLineOpacity: (distance) => {
			const alphaMax = 128;
			const alpha = alphaMax - Math.round((distance * alphaMax) / 100);
			return alpha;
		},
	}]
};

export const bannerConfig2 = (): PandaParticleBannerConfig => {
	const root = document.documentElement;
	const style = getComputedStyle(root);
	const primaryColor = style.getPropertyValue("--panda-primary-color");
	const secondaryColor = style.getPropertyValue("--panda-secondary-color");
	const tertiaryColor = style.getPropertyValue("--panda-tertiary-color");

	console.log("%c colors", "font-size: 24px; color: red;", primaryColor, secondaryColor, tertiaryColor);
	return {
		showFps: true,
		particleGroup: [
			{
				particleCount: 100,
				walls: true,
				particleLineWidth: 20,
				drawParticle: (ctx, particle) => {
					const { x, y, color, size } = particle;
	
					ctx.moveTo(x, y);
					ctx.lineTo(x + (size / 2), y - (size / 2));
	
					ctx.lineJoin = "round";
					ctx.lineCap = "round";
	
					ctx.strokeStyle = color;
					ctx.stroke();
				},
	
				colors: [primaryColor, secondaryColor, tertiaryColor],
				colorHueVariation: 10,
				colorOpacityVariation: 30,
	
				sizeMin: 200,
				sizeMax: 400,
	
				minSpeedX: -0.1,
				maxSpeedX: 0.1,
				minSpeedY: -0.1,
				maxSpeedY: 0.1,
	
				blur: true,
				blurMin: 1,
				blurMax: 3,
			}
		],	
	};
};

export const bannerConfig3: PandaParticleBannerConfig = {
	showFps: true,
	// smudge: true,
	particleGroup: [
		{
			asyncParticleCreation: true,
			particleCreationInterval: 400,
			destroyParticles: true,

			particleCount: 100,
			particleShape: ParticleShape.RECT_FILLED,

			getPosition: (bannerRect) => {
				console.log("%c getPosition()", "font-size: 24px; color: green;", bannerRect);
				// center of the banner
				return {
					x: bannerRect.width / 2,
					y: bannerRect.height / 2,
				};
			},

			colors: ["white"],
			colorHueVariation: 10,
			colorOpacityVariation: 60,

			sizeMin: 3,
			sizeMax: 1,

			minSpeedX: -0.01,
			maxSpeedX: 0.01,
			minSpeedY: -0.01,
			maxSpeedY: 0.01,
			minDeltaSpeedX: 0.001,
			maxDeltaSpeedX: 0.01,
			deltaSpeedLimitX: 5,
			minDeltaSpeedY: 0.001,
			maxDeltaSpeedY: 0.01,
			deltaSpeedLimitY: 5,

			// blur: true,
			// blurMin: 0,
			// blurMax: 1,
		},
		// {
		// 	particleCount: 10,
		// 	particleShape: ParticleShape.CIRCLE,

		// 	minSpeedX: -1,
		// 	maxSpeedX: 1,
		// 	minSpeedY: -1,
		// 	maxSpeedY: 1,

		// 	// connect: true,

		// 	colors: ["red"],

		// 	sizeMin: 10,
		// 	sizeMax: 10,

		// }
	],	
};