export const enum PandaClickToCopyTooltipPosition {
	TOP = "top",
	RIGHT = "right",
	BOTTOM = "bottom",
	LEFT = "left",
}

type PandaClickToCopyEventDetails = {
	content: string;
}

export interface PandaClickToCopyEvent extends CustomEvent<PandaClickToCopyEventDetails> {}