// Ireland

export const flagIe = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#FAFAFA" width="256" height="256"/>
			<rect fill="#15965F" width="86" height="256" />
			<rect fill="#EE9601" width="86" height="256" x="171"/>
		`
		: /*svg*/`
			<rect fill="#FAFAFA" width="256" height="192"/>
			<rect fill="#15965F" width="86" height="192"/>
			<rect fill="#EE9601" width="86" height="192" x="171"/>
		`;
}