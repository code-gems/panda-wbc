
export const minValue = (value: number, min: number): number => value < min ? min : value;

export const maxValue = (value: number, max: number): number => value > max ? max : value;

/**
 * Get offset top of an element
 * @param el - element 
 * @returns {Number} offset top value for given element 
 */
export const getParentOffsetTop = (el: HTMLElement): number => {
	if (el.offsetParent) {
		console.log("%c offset top ->", "font-size: 24px; color: green;", el.offsetParent, (el.offsetParent as any).offsetTop);
		return (el.offsetParent as any).offsetTop + getParentOffsetTop(el.offsetParent as HTMLElement);
	} else {
		return 0;
	}
};

/**
 * Get offset left of an element
 * @param el - element 
 * @returns {Number} offset left value for given element 
 */
export const getParentOffsetLeft = (el: HTMLElement): number => {
	if (el.offsetParent) {
		console.log("%c offset left ->", "font-size: 24px; color: green;", el.offsetParent, (el.offsetParent as any).offsetLeft);
		return (el.offsetParent as any).offsetLeft + getParentOffsetLeft(el.offsetParent as HTMLElement);
	} else {
		return 0;
	}
};
