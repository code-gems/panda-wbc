// types
import { PopoverPosition } from "../../index";

export const positionObserver = (element: Element, callback: (elementRect: DOMRect) => void) => {
	let elementRect: DOMRect = element.getBoundingClientRect();
	const timer = setInterval(() => {
		const newElementRect = element.getBoundingClientRect();

		if (
			newElementRect.top !== elementRect.top ||
			newElementRect.left !== elementRect.left ||
			newElementRect.bottom !== elementRect.bottom ||
			newElementRect.right !== elementRect.right ||
			newElementRect.width !== elementRect.width ||
			newElementRect.height !== elementRect.height
		) {
			elementRect = element.getBoundingClientRect();
			callback(elementRect);
		}
	}, 50);

	const cancel = () => {
		clearInterval(timer);
	};

	return {
		cancel
	};
}

/**
 * Remove all position css classes from provided element.
 * @param {Element} element - element to reset
 */
export const resetPositionCss = (element: Element): void => {
	[
		PopoverPosition.TOP,
		PopoverPosition.BOTTOM,
		PopoverPosition.LEFT,
		PopoverPosition.RIGHT,
		PopoverPosition.TOP_LEFT,
		PopoverPosition.TOP_RIGHT,
		PopoverPosition.BOTTOM_LEFT,
		PopoverPosition.BOTTOM_RIGHT,
	].forEach((positionCss) => element.classList.remove(positionCss));
}

/**
 * Check if provided element is inside the viewport.
 * @param {Element} element - element to validate.
 * @returns {Boolean} true if inside the viewport / visible.
 */
export const isContextElementVisible = (elementRect: DOMRect): boolean => {
	return (
		elementRect.top >= 0 &&
		elementRect.left >= 0 &&
		elementRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		elementRect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}