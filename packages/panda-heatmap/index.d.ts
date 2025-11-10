import { PandaHeatmap } from "./src/panda-heatmap";
export type PandaHeatmap = typeof PandaHeatmap;

export const enum PandaHeatmapXAxisPosition {
	TOP = "top",
	BOTTOM = "bottom"
}

export const enum PandaHeatmapYAxisPosition {
	LEFT = "left",
	RIGHT = "right"
}

export const enum PandaHeatmapOrientation {
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical"
}

export type RGBAColor = {
	r: number;
	g: number;
	b: number;
	a: number;
}