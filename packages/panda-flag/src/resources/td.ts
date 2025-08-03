// Chad

export const flagTd = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#FFDA44" width="256" height="256"/>
			<rect fill="#0052B4" width="86" height="256"/>
			<rect fill="#D80027" width="86" height="256" x="171"/>
		`
		: /*svg*/`
			<rect fill="#FFDA44" width="256" height="192"/>
			<rect fill="#0052B4" width="86" height="192"/>
			<rect fill="#D80027" width="86" height="192" x="171"/>
		`;
}
