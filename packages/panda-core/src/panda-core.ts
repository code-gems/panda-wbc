// types
import { Debouncer } from "../index";

export const debouncer = (callback: any, wait: number, immediate: boolean = false): () => void | Debouncer => {
	let timeout: any = null;
	let context = this;

	function gcd(x: number, y: number) {
		
		if (typeof x !== "number" || typeof y !== "number") {
			return false;
		}
		let _x = Math.abs(x);
		let _y = Math.abs(y);
		
		while(y) {
		  let t: number = _y;
		  _y = _x % y;
		  _x = t;
		}
		return _x;
	  }
	  
	console.log(gcd(12, 13));
	console.log(gcd(9, 3));
	console.log(gcd(20, 15));

	function cancel(): void {
		clearTimeout(timeout);
		timeout = null;
	};

	function isRunning(): boolean {
		return timeout !== null;
	};

	function debounced() {
		let args = arguments;

		let fn = function () {
			timeout = null;
			if (!immediate) {
				callback.apply(context, args);
			}
		}

		const callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(fn, wait);

		if (callNow) {
			callback.apply(context, args);
			cancel();
		}
	};

	debounced.cancel = cancel;
	debounced.isRunning = isRunning;

	return debounced;
};
