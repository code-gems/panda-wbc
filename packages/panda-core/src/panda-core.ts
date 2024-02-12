// types
import { Debouncer } from "../index";

/**
 * Debouncer is a programming tool commonly used in front-end development to control the frequency of execution of a particular function, 
 * especially in scenarios where a function might be called too frequently, such as in response to user input events like keyPresses' or window resizing. 
 * The debouncer ensures that the function is not invoked until a certain period of time has passed since the last invocation.
 * @param callback - callback method to be invoked after certain period of time.
 * @param wait - time to wait before callback invocation.
 * @param maxWait - maximal time to wait before executing a callback method.
 * @returns {Debouncer}
 */
export const debounce = (callback: any, wait: number, maxWait: number | null = null): () => void | null | Debouncer => {
	let timeout: any = null;
	let maxWaitInterval: any = null;
	let context = this;

	const start = performance.now();

	if (typeof wait !== "number") {
		console.warn("%c [DEBOUNCE] 'wait' param is not a valid number", "font-size: 24px; color: green;", wait);
		return () => null;
	}
	console.log("%c [DEBOUNCE] wait, maxDelay", "font-size: 24px; color: green;", wait, maxWait);

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

	let interval = maxWait !== null
		? gcd(wait, maxWait)
		: wait;
	console.log("%c [DEBOUNCE] interval", "font-size: 24px; color: green;", interval);

	function cancel(): void {
		console.log("%c [DEBOUNCE] CANCEL", "font-size: 24px; color: orange;");
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
			console.log("%c [DEBOUNCE] INVOKE CALLBACK", "font-size: 24px; color: orange;", Math.round(performance.now() - start), "ms");
			callback.apply(context, args);
			cancel();
		}

		const watcherFn = function () {
			if (maxWait === intervalStep) {
				console.log("%c [DEBOUNCE] INVOKE CALLBACK MAX", "font-size: 24px; color: orange;", Math.round(performance.now() - start), "ms");
				callback.apply(context, args);
				cancel();
			} else {
				console.log("%c [DEBOUNCE] TICK", "font-size: 24px; color: orange;");
				intervalStep += interval;
			}
		}

		clearTimeout(timeout);
		timeout = setTimeout(timeoutFn, interval);
		console.log("%c [DEBOUNCE] START DEBOUNCE", "font-size: 24px; color: green;", wait, maxWait);
		if (!!maxWait && !maxWaitInterval) {
			maxWaitInterval = setInterval(watcherFn, interval);
		}
	};

	debounced.cancel = cancel;
	debounced.isRunning = isRunning;
	return debounced;
};


/**
 * This function creates a random UUID by replacing certain characters in a predefined pattern.
 * The x characters are replaced with random hexadecimal digits, 
 * and the y character is replaced with a randomly chosen hexadecimal digit from the set [8, 9, A, or B] to conform to the UUID standard.
 * @returns [Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx]
 */
export const generateUuid = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
		const randomInt = Math.random() * 16 | 0;
		const value = char === 'x' ? randomInt : (randomInt & 0x3 | 0x8);
		return value.toString(16);
	});
};