// types
import { PandaToast } from "../index";
import { PandaToastElement } from "./panda-toast";

export class PandaToastCenter {

	private readonly _toastQueue: PandaToast[] = [];

	private _toastEl: PandaToastElement | null = null;

	// events
	private readonly _closeToastEvent = this._onCloseToast.bind(this);

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public createToast(toast: PandaToast): void {
		this._toastQueue.push(toast);
		this._checkQueue();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _checkQueue(): void {
		if (this._toastEl === null && this._toastQueue.length) {
			const _toast = this._toastQueue[0];
			this._showToast(_toast);
		}
	}

	private _showToast(toast: PandaToast): void {
		this._toastEl = document.createElement("panda-toast");
		this._toastEl.theme = toast.theme ?? "";
		this._toastEl.icon = toast.icon ?? "";
		this._toastEl.header = toast.header ?? "";
		this._toastEl.message = toast.message ?? "";
		this._toastEl.closable = toast.closable ?? false;
		this._toastEl.interval = toast.interval ?? 3000;
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

	private async _hideToast(): Promise<void> {
		if (this._toastEl !== null) {
			// remove event listeners
			this._toastEl.removeEventListener("close", this._closeToastEvent);
			// remove element
			document.body.removeChild(this._toastEl);
			this._toastEl = null;
			this._toastQueue.shift();
			await new Promise((r) => setTimeout(r, 200));
			this._checkQueue();
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCloseToast(): void {
		this._hideToast();
	}
}
