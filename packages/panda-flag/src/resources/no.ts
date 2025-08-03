// Norway

export const flagNo = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#D80027" width="256" height="256"/>
			<rect x="70" fill="#ffffff" width="68" height="256"/>
			<rect y="94" fill="#ffffff" width="256" height="68"/>
			<rect x="84" fill="#0052B4" width="40" height="256"/>
			<rect y="108" fill="#0052B4" width="256" height="40"/>
		`
		: /*svg*/`
			<rect fill="#D80027" width="256" height="192"/>
			<rect x="80" fill="#ffffff" width="48" height="192"/>
			<rect y="72" fill="#ffffff" width="256" height="48"/>
			<rect x="89" fill="#0052B4" width="30" height="192"/>
			<rect y="81" fill="#0052B4" width="256" height="30"/>
		`;
}