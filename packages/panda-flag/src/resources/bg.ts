// Bulgaria

export const flagBg = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#496E2D" width="256" height="256"/>
			<rect fill="#F0F0F0" width="256" height="85"/>
			<rect fill="#D80027" width="256" height="85" y="171" />
		`
		: /*svg*/`
			<rect fill="#496E2D" width="256" height="192"/>
			<rect fill="#F0F0F0" width="256" height="64"/>
			<rect fill="#D80027" width="256" height="64" y="128"/>
		`;
}