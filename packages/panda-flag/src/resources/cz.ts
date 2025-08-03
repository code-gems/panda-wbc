// Czechia / Czech Republic

export const flagCz = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F0F0F0" width="256" height="256"/>
			<rect fill="#E7422B" width="256" height="128" y="128"/>
			<polygon fill="#1851A4" points="128,128 0,256 0,0 "/>
		`
		: /*svg*/`
			<rect fill="#F0F0F0" width="256" height="192"/>
			<rect fill="#E7422B" width="256" height="96" y="96"/>
			<polygon fill="#1851A4" points="96,96 0,192 0,0 "/>
		`;
}