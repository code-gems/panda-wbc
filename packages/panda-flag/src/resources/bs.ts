// Bahamas

export const flagBs = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#338AF3" width="256" height="256" />
			<rect fill="#FEDA46" y="85.5" width="256" height="85"/>
			<polygon fill="#000000" points="128,128 0,256 0,0 "/>
		`
		: /*svg*/`
			<rect fill="#338AF3" width="256" height="192" />
			<rect fill="#FEDA46" y="64.25" width="256" height="63.75"/>
			<polygon points="100,96.125 0,192.125 0,0.125 "/>
		`;
}
