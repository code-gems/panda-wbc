// types
import { Debouncer } from "../index";

export const debouncer = (callback: any, wait: number, maxWait: number = 0): () => void | null | Debouncer => {
	let timeout: any = null;
	let maxWaitInterval: any = null;
	let context = this;

	if (typeof wait !== "number") {
		console.warn("%c [DEBOUNCER] 'wait' param is not a valid number", "font-size: 24px; color: green;", wait);
		return () => null;
	}
	console.log("%c [DEBOUNCER] wait, maxDelay", "font-size: 24px; color: green;", wait, maxWait);

	/** Greatest common divisor */
	function gcd(x: number, y: number): number {
		if (typeof x !== "number" || typeof y !== "number") {
			return 0;
		}
		let _x = Math.abs(x);
		let _y = Math.abs(y);

		while (_y) {
			let t: number = _y;
			_y = _x % y;
			_x = t;
		}
		return _x;
	}

	let interval = !!maxWait ? gcd(wait, maxWait) : wait;
	console.log("%c [DEBOUNCER] interval", "font-size: 24px; color: green;", interval);

	function cancel(): void {
		console.log("%c [DEBOUNCER] CANCEL", "font-size: 24px; color: orange;");
		clearTimeout(timeout);
		clearTimeout(maxWaitInterval);
		timeout = null;
		maxWaitInterval = null;
}

	function isRunning(): boolean {
		return timeout !== null;
	}

	function debounced() {
		let args = arguments;
		let intervalStep = interval;

		const timeoutFn = function () {
			console.log("%c [DEBOUNCER] INVOKE CALLBACK", "font-size: 24px; color: orange;");
			callback.apply(context, args);
			cancel();
		}

		const watcherFn = function () {
			if (maxWait === intervalStep) {
				console.log("%c [DEBOUNCER] INVOKE CALLBACK MAX", "font-size: 24px; color: orange;");
				callback.apply(context, args);
				cancel();
			} else {
				console.log("%c [DEBOUNCER] TICK", "font-size: 24px; color: orange;");
				intervalStep += interval;
			}
		}

		clearTimeout(timeout);
		timeout = setTimeout(timeoutFn, interval);
		console.log("%c [DEBOUNCER] START DEBOUNCER", "font-size: 24px; color: green;", wait, maxWait);
		if (!!maxWait && !maxWaitInterval) {
			maxWaitInterval = setInterval(watcherFn, interval);
		}
	};

	debounced.cancel = cancel;
	debounced.isRunning = isRunning;
	return debounced;
};
