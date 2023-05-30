// types
import { PageCategory } from "panda-design-typings";

interface RGBColor {
	red: number;
	green: number;
	blue: number;
}

interface ColorVariants {
	v50: string;
	v100: string;
	v200: string;
	v300: string;
	v400: string;
	v500: string;
	v600: string;
	v700: string;
	v800: string;
	v900: string;
}

// styles
import { styles } from "./styles/styles";

// web parts
import "../../web-parts/main-nav/main-nav";

// components

// utils & config
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../utils/page-library";

@customElement("themes-page")
@page({
	pageId: "themes",
	pageName: "Themes",
	pageUri: "/themes",
	icon: "theme",
	parent: true,
	category: PageCategory.THEMES,
	keywords: ["theme", "color", "colors", "css", "variables", "theming", "ux", "ui"],
	description: ["Themes description"],
	contextMenu: [],
	template: html`<themes-page></themes-page>`
})
export class ThemesPage extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {

		// Define a base color as an RGB value
		const baseColor = [255, 0, 128];

		// Define the number of color variants to generate
		const numVariants = 5;

		// Define the range of hue values to use for the variants
		const hueRange = 60;

		// Calculate the base hue value from the base color
		const baseHue = this.rgbToHue(baseColor);
		console.log("%c baseHue", "font-size: 24px; color: green;", baseHue);

		// Generate an array of variant hues
		const variantHues = this.generateVariantHues(baseHue, numVariants, hueRange);
		console.log("%c variantHues", "font-size: 24px; color: green;", variantHues);

		// Generate an array of variant colors based on the hues
		const variantColors = variantHues.map((hue) => this.hueToRgb(hue));
		console.log("%c variantColors 1", "font-size: 24px; color: green;", variantColors[0], this.colorYIQ(variantColors[0]));
		console.log("%c variantColors 2", "font-size: 24px; color: green;", variantColors[1], this.colorYIQ(variantColors[1]));
		console.log("%c variantColors 3", "font-size: 24px; color: green;", variantColors[2], this.colorYIQ(variantColors[2]));
		console.log("%c variantColors 4", "font-size: 24px; color: green;", variantColors[3], this.colorYIQ(variantColors[3]));
		console.log("%c variantColors 5", "font-size: 24px; color: green;", variantColors[4], this.colorYIQ(variantColors[4]));


		this.style.setProperty("--dragon-background", this.rgbToHex(baseColor));
		this.style.setProperty("--dragon-background-100", this.rgbToHex(variantColors[0]));
		this.style.setProperty("--dragon-background-300", this.rgbToHex(variantColors[1]));
		this.style.setProperty("--dragon-background-500", this.rgbToHex(variantColors[2]));
		this.style.setProperty("--dragon-background-700", this.rgbToHex(variantColors[3]));
		this.style.setProperty("--dragon-background-900", this.rgbToHex(variantColors[4]));
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<main-nav></main-nav>
			THEMES

			<div class="color-showcase">
				<div class="row">
					<div class="col-10 bg-color">
						--dragon-background
					</div>
				</div>
				<div class="row">
					<div class="col-1">
						--dragon-background-50
					</div>
					<div class="col-1 bg-100">
						--dragon-background-100
					</div>
					<div class="col-1">
						--dragon-background-200
					</div>
					<div class="col-1 bg-300">
						--dragon-background-300
					</div>
					<div class="col-1">
						--dragon-background-400
					</div>
					<div class="col-1 bg-500">
						--dragon-background-500
					</div>
					<div class="col-1">
						--dragon-background-600
					</div>
					<div class="col-1 bg-700">
						--dragon-background-700
					</div>
					<div class="col-1">
						--dragon-background-800
					</div>
					<div class="col-1 bg-900">
						--dragon-background-900
					</div>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	// Color contrast - from Bootstrap 4 utilities
	colorYIQ(rgb: any): string {
		const [r, g, b] = rgb;

		const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

		if (yiq >= 150) {
			return "#111";
		} else {
			return "#fff";
		}
	}

	// Convert an RGB color to a hue value
	rgbToHue(rgb: any): number {
		const [r, g, b] = rgb;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const diff = max - min;
		let hue = 0;
		if (diff === 0) {
			hue = 0;
		} else if (max === r) {
			hue = ((g - b) / diff) % 6;
		} else if (max === g) {
			hue = (b - r) / diff + 2;
		} else if (max === b) {
			hue = (r - g) / diff + 4;
		}
		hue *= 60;
		if (hue < 0) {
			hue += 360;
		}
		return hue;
	}

	// Generate an array of variant hues based on a base hue
	generateVariantHues(baseHue: any, numVariants: any, hueRange: any) {
		const variantHues = [];
		const step = hueRange / (numVariants - 1);
		for (let i = 0; i < numVariants; i++) {
			const hue = (baseHue - hueRange / 2) + i * step;
			variantHues.push(hue);
		}
		return variantHues;
	}

	hue2rgb(t1: number, t2: number, t3: number) {
		if (t3 < 0) t3 += 1;
		if (t3 > 1) t3 -= 1;
		if (t3 < 1 / 6) return t1 + (t2 - t1) * 6 * t3;
		if (t3 < 1 / 2) return t2;
		if (t3 < 2 / 3) return t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		return t1;
	}

	rgbToHex(rgb: any) {
		const r = rgb[0].toString(16).padStart(2, '0');
		const g = rgb[1].toString(16).padStart(2, '0');
		const b = rgb[2].toString(16).padStart(2, '0');
		return '#' + r + g + b;
	}

	// Convert a hue value to an RGB color
	hueToRgb(hue: number) {
		const saturation = 0.7;
		const lightness = 0.5;
		const chroma = saturation * lightness;
		const hue2 = hue / 60;
		const x = chroma * (1 - Math.abs(hue2 % 2 - 1));

		let r = 0;
		let g = 0;
		let b = 0;

		if (hue2 >= 0 && hue2 < 1) {
			r = chroma;
			g = x;
		} else if (hue2 >= 1 && hue2 < 2) {
			r = x;
			g = chroma;
		} else if (hue2 >= 2 && hue2 < 3) {
			g = chroma;
			b = x;
		} else if (hue2 >= 3 && hue2 < 4) {
			g = x;
			b = chroma;
		} else if (hue2 >= 4 && hue2 < 5) {
			r = x;
			b = chroma;
		} else if (hue2 >= 5 && hue2 < 6) {
			r = chroma;
			b = x;
		}
		const m = lightness - chroma / 2;
		r += m;
		g += m;
		b += m;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}

	private _convertRGBtoHSL(color: RGBColor) {
		const {
			red,
			green,
			blue,
		} = color;
		const _red = red / 255;
		const _green = green / 255;
		const _blue = blue / 255;
		const _light = Math.max(_red, _green, _blue);
		const _saturation = _light - Math.min(_red, _green, _blue);
		const _hue = _saturation
			? _light === _red
				? (_green - _blue) / _saturation
				: _light === _green
					? 2 + (_blue - _red) / _saturation
					: 4 + (_red - _green) / _saturation
			: 0;
		return [
			60 * _hue < 0
				? 60 * _hue + 360
				: 60 * _hue,
			100 * (_saturation
				? (_light <= 0.5
					? _saturation / (2 * _light - _saturation)
					: _saturation / (2 - (2 * _light - _saturation)))
				: 0),
			(100 * (2 * _light - _saturation)) / 2,
		];
	}

	private _generateColorVariants(baseColor: RGBColor): ColorVariants {
		const colorVariants: ColorVariants = {
			v50: "#fff",
			v100: "#fff",
			v200: "#fff",
			v300: "#fff",
			v400: "#fff",
			v500: "#fff",
			v600: "#fff",
			v700: "#fff",
			v800: "#fff",
			v900: "#fff",
		};



		return colorVariants;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...

}
