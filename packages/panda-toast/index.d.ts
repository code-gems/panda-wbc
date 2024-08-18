export const enum ToastPosition {
	TOP_LEFT = "TOP_LEFT",
	TOP_CENTER = "TOP_CENTER",
	TOP_RIGHT = "TOP_RIGHT",
	BOTTOM_LEFT = "BOTTOM_LEFT",
	BOTTOM_CENTER = "BOTTOM_CENTER",
	BOTTOM_RIGHT = "BOTTOM_RIGHT",
}

export interface PandaToast {
	id: string;
	title: string;
	massage: string;
	closable: boolean;
	interval: number;
	position: ToastPosition;
}