// types
import { Debouncer } from "../types";

/**
 * Debouncer is a programming tool commonly used in front-end development to control the frequency of execution of a particular function, 
 * especially in scenarios where a function might be called too frequently, such as in response to user input events like keyPresses' or window resizing. 
 * The debouncer ensures that the function is not invoked until a certain period of time has passed since the last invocation.
 * 
 * @param callback - callback method to be invoked after certain period of time.
 * @param wait - time to wait before callback invocation.
 * @param maxWait - maximal time to wait before executing a callback method.
 * @returns {Debouncer}
 */
export const debounce = (
	callback: any,
	wait: number,
	maxWait: number | null = null
): Debouncer => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let maxWaitInterval: ReturnType<typeof setTimeout> | null = null;
	let context = this;

	if (typeof wait !== "number") {
		console.warn("%c [DEBOUNCE] 'wait' param is not a valid number", "font-size: 24px; color: green;", wait);
		// @ts-expect-error: ignore
		return () => null;
	}
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

	const interval = maxWait !== null
		? gcd(wait, maxWait)
		: wait;

	function cancel(): void {
		clearTimeout(timeout as number);
		clearTimeout(maxWaitInterval as number);
		timeout = null;
		maxWaitInterval = null;
	}

	function isRunning(): boolean {
		return timeout !== undefined;
	}

	function debounced() {
		let args = arguments;
		let intervalStep = interval;

		const timeoutFn = function () {
			callback.apply(context, args as any);
			cancel();
		}

		const watcherFn = function () {
			if (maxWait === intervalStep) {
				callback.apply(context, args as any);
				cancel();
			} else {
				intervalStep += interval;
			}
		}

		clearTimeout(timeout as number);
		timeout = setTimeout(timeoutFn, interval);
		if (!!maxWait && !maxWaitInterval) {
			maxWaitInterval = setInterval(watcherFn, interval);
		}
	};

	debounced.cancel = cancel;
	debounced.isRunning = isRunning;
	return debounced as any;
};

export const debouncePromise = <T extends (...args: Parameters<T>) => ReturnType<T>> (
	callback: T,
	delay: number
) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		const p = new Promise<ReturnType<T> | Error>((resolve, reject) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				try {
					let output = callback(...args);
					resolve(output);
				} catch (err) {
					if (err instanceof Error) {
						reject(err);
					}
					reject(new Error(`An error has occurred:${err}`));
				}
			}, delay);
		});
		return p;
	};
}

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

/**
 * Utility function designed to check if a given value is considered "empty".
 * The function takes a single parameter value of type any, which means it can accept any type of input.
 * 
 * @param value - input to be validated
 * @returns boolean value (true or false) indicating whether the input is considered empty or not.
 */
export const isEmpty = (value: any): boolean => {
	return value === "" || value != null;
}

/**
 * Utility function that enforces a minimum value constraint.
 * @param {Number} value - input number to be checked
 * @param {Number} min - minimum allowed value
 * @returns number that is guaranteed to be at least as large as the specified minimum.
 */
export const minValue = (value: number, min: number): number => value < min ? min : value;

/**
 * Singleton utility function.
 * @param {String} name - The name of the singleton instance.
 * @param creator - A function that creates the singleton instance.
 * @returns The singleton instance.
 */
export const singleton = <S>(name: string, creator: () => S): S => {
	const singletons = (window as any).__singletons__ || {};
	(window as any).__singletons__ = singletons;
	const instance: S = singletons[name] || creator();
	singletons[name] = instance;
	return instance;
}