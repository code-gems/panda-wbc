// Bolivia

export const flagBo = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#FFDA44" width="256" height="256"/>
			<rect fill="#D80027" width="256" height="85"/>
			<rect fill="#6DA544" width="256" height="85" y="171" />
		`
		: /*svg*/`
			<rect fill="#FFDA44" width="256" height="192"/>
			<rect fill="#D80027" width="256" height="64"/>
			<rect fill="#6DA544" width="256" height="64" y="128"/>
		`;
}