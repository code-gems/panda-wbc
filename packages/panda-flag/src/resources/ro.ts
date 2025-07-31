// Romania

export const flagRo = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#FFDA44" width="256" height="256" />
			<rect fill="#0052B4" width="85" height="256" />
			<rect fill="#D80027" x="171" width="85" height="256" />
		`
		: /*svg*/`
			<rect fill="#FFDA44" width="256" height="192" />
			<rect fill="#0052B4" width="85" height="192" />
			<rect fill="#D80027" x="171" width="85" height="192" />
		`;
}