// Ukraine

export const flagUa = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#0057b7" width="256" height="128" />
			<rect fill="#fad01f" y="128" width="256" height="128" />
		`
		: /*svg*/`
			<rect fill="#0057b7" width="256" height="96" />
			<rect fill="#fad01f" y="96" width="256" height="96" />
		`;
}