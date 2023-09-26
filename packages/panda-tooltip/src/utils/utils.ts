export const minValue = (value: number, min: number): number => value < min ? min : value;

export const positionObserver = (element: HTMLElement, callback: (elementRect: DOMRect) => void) => {
    let elementRect = element.getBoundingClientRect();
	
	const timer = setInterval(() => {
		const newElementRect = element.getBoundingClientRect();
		console.log("%c COMPARE", "font-size: 24px; color: green;", newElementRect.top, elementRect.top);
		if (
			newElementRect.top !== elementRect.top ||
			newElementRect.left !== elementRect.left
		) {
			console.log("%c CALL CALLBACK!!!", "font-size: 24px; color: red;");
			elementRect = element.getBoundingClientRect();
			callback(elementRect);
		}
	}, 100);

	const cancel = () => {
		console.log("%c CANCEL OBSERVER!!!", "font-size: 24px; color: red;");
		clearInterval(timer);
	};

    return {
        cancel
    };
}