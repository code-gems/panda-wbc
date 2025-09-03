// Finland

export const flagFi = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F0F0F0" width="256" height="256"/>
			<rect x="76" fill="#0057b7" width="56" height="256"/>
			<rect y="100" fill="#0057b7" width="256" height="56"/>
		`
		: /*svg*/`
			<rect fill="#F0F0F0" width="256" height="192"/>
			<rect x="80" fill="#0057b7" width="48" height="192"/>
			<rect y="72" fill="#0057b7" width="256" height="48"/>
		`;
}