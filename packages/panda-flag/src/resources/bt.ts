// Bhutan
export const flagBt = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#fafafa" width="256" height="256" />
			<rect fill="#f43737" y="128" width="256" height="128" />
		`
		: /*svg*/`
			<rect fill="#fafafa" width="256" height="192" />
			<rect fill="#f43737" y="96" width="256" height="96" />
		`;
}