// Switzerland

export const flagCh = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#D32A2A" width="256" height="256"/>
			<rect x="108" y="64" fill="#FFFFFF" width="40" height="128"/>
			<rect x="64" y="108" fill="#FFFFFF" width="128" height="40"/>
		`
		: /*svg*/`
			<rect fill="#D32A2A" width="256" height="192"/>
			<rect x="108" y="32" fill="#FFFFFF" width="40" height="128"/>
			<rect x="64" y="76" fill="#FFFFFF" width="128" height="40"/>
		`;
}