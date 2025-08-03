// Denmark

export const flagDk = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#D32A2A" width="256" height="256"/>
			<rect x="76" fill="#FAFAFA" width="40" height="256"/>
			<rect y="108" fill="#FAFAFA" width="256" height="40"/>
		`
		: /*svg*/`
			<rect fill="#D32A2A" width="256" height="192"/>
			<rect x="64" fill="#FAFAFA" width="32" height="192"/>
			<rect y="80" fill="#FAFAFA" width="256" height="32"/>
		`;
}