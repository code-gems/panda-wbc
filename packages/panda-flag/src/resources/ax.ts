// Aland Islands
export const flagAx = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#0064AC" width="256" height="256"/>
			<rect x="70" fill="#FFD302" width="68" height="256"/>
			<rect y="94" fill="#FFD302" width="256" height="68"/>
			<rect x="84" fill="#DA0F15" width="40" height="256"/>
			<rect y="108" fill="#DA0F15" width="256" height="40"/>
		`
		: /*svg*/`
			<rect fill="#0064AC" width="256" height="192"/>
			<rect x="80" fill="#FFD302" width="48" height="192"/>
			<rect y="72" fill="#FFD302" width="256" height="48"/>
			<rect x="89" fill="#DA0F15" width="30" height="192"/>
			<rect y="81" fill="#DA0F15" width="256" height="30"/>
		`;
}