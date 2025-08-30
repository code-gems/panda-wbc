// Sweden

export const flagSe = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#0057b7" width="256" height="256"/>
			<rect x="72" fill="#fad01f" width="48" height="256"/>
			<rect y="104" fill="#fad01f" width="256" height="48"/>
		`
		: /*svg*/`
			<rect fill="#0057b7" width="256" height="192"/>
			<rect x="60" fill="#fad01f" width="40" height="192"/>
			<rect y="76" fill="#fad01f" width="256" height="40"/>
		`;
}