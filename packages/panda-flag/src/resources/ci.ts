// Ivory Coast / Côte d'Ivoire

export const flagCi = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F0F0F0" width="256" height="256"/>
			<rect fill="#F67F00" width="86" height="256" />
			<rect fill="#009E61" width="86" height="256" x="171"/>
		`
		: /*svg*/`
			<rect fill="#F0F0F0" width="256" height="192"/>
			<rect fill="#F67F00" width="86" height="192"/>
			<rect fill="#009E61" width="86" height="192" x="171"/>
		`;
}