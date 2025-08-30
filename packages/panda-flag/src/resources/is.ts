// Iceland
export const flagIs = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#03539C" width="256" height="256"/>
			<rect x="70" fill="#f0f0f0" width="68" height="256"/>
			<rect y="94" fill="#f0f0f0" width="256" height="68"/>
			<rect x="84" fill="#E41A30" width="40" height="256"/>
			<rect y="108" fill="#E41A30" width="256" height="40"/>
		`
		: /*svg*/`
			<rect fill="#03539C" width="256" height="192"/>
			<rect x="80" fill="#f0f0f0" width="48" height="192"/>
			<rect y="72" fill="#f0f0f0" width="256" height="48"/>
			<rect x="89" fill="#E41A30" width="30" height="192"/>
			<rect y="81" fill="#E41A30" width="256" height="30"/>
		`;
}