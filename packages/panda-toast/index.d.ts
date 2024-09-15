export const enum ToastPosition {
	TOP_LEFT = "top-left",
	TOP_CENTER = "top-center",
	TOP_RIGHT = "top-right",
	BOTTOM_LEFT = "bottom-left",
	BOTTOM_CENTER = "bottom-center",
	BOTTOM_RIGHT = "bottom-right",
}

export interface PandaToast {
	message: string;
	theme?: string;
	icon?: string;
	header?: string;
	closable?: boolean;
	interval?: number;
	position?: ToastPosition;
}

export * from "./src/panda-toast-center";