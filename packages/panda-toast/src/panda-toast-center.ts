// types
import { PandaToast, ToastPosition } from "../index";
import { PandaToastElement } from "./panda-toast";

export class PandaToastCenter {
	static instance: any;

	private _toastQueue: PandaToast[] = [];

	private _checkQueueTimer: number | null = null;

	private _toastEl: PandaToastElement | null = null;

	// events
	private _closeToastEvent = this._onCloseToast.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		if (!PandaToastCenter.instance) {
			PandaToastCenter.instance = this;
		}
		return PandaToastCenter.instance;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public createToast(toast: PandaToast): void {
		this._toastQueue.push(toast);
		console.log("%c createToast", "font-size: 24px; color: green;", toast);

		// start 
		if (this._checkQueueTimer === null) {
			console.log("%c add check queue timer", "font-size: 24px; color: green;");
			this._checkQueueTimer = setInterval(this._checkQueue.bind(this), 500);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _checkQueue(): void {
		console.log("%c _checkQueue", "font-size: 24px; color: green;", this._toastEl === null && this._toastQueue.length);
		if (this._toastEl === null && this._toastQueue.length) {
			const _toast = this._toastQueue[0];
			this._showToast(_toast);
		}
	}

	private _showToast(toast: PandaToast): void {
		console.log("%c _showToast", "font-size: 24px; color: green;", toast);
		this._toastEl = document.createElement("panda-toast");
		this._toastEl.theme = toast.theme ?? "";
		this._toastEl.icon = toast.icon ?? "";
		this._toastEl.header = toast.header ?? "";
		this._toastEl.message = toast.message ?? "";
		this._toastEl.closable = toast.closable ?? false;
		// add event listeners
		this._toastEl.addEventListener("close", this._closeToastEvent);
		// add styles
		this._toastEl.style.position = "fixed";
		// apply position
		if (toast.position) {
			this._toastEl.classList.add(toast.position);
		}

		// append toast to document
		document.body.appendChild(this._toastEl);
	}

	private _hideToast(): void {
		if (this._toastEl !== null) {
			console.log("%c _hideToast", "font-size: 24px; color: green;");
			
			// remove event listeners
			this._toastEl.removeEventListener("close", this._closeToastEvent);
			// remove element
			document.body.removeChild(this._toastEl);
			this._toastEl = null;
			this._toastQueue.shift();
			// this._checkQueue();
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseToast(): void {
		console.log("%c _onCloseToast", "font-size: 24px; color: red;");
		this._hideToast();
	}
}

export const pandaToastCenter = new PandaToastCenter();
