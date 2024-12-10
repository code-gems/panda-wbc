export const positionObserver = (element: Element, callback: (elementRect: DOMRect) => void) => {
    let elementRect: DOMRect = element.getBoundingClientRect();
	
	const timer = setInterval(() => {
		const newElementRect: DOMRect = element.getBoundingClientRect();
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
	}, 100);

	const cancel = () => {
		clearInterval(timer);
	};

    return {
        cancel
    };
}