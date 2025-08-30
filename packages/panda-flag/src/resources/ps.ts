// Palestine
export const flagPs = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#ffffff" y="0" width="256" height="256"/>
			<rect fill="#029146" y="171" width="256" height="85"/>
			<rect fill="#000000" width="256" height="85"/>
			<polygon fill="#e52d36" points="128,128 0,256 0,0 "/>
		`
		: /*svg*/`
			<rect fill="#FFFFFF" width="256" height="192"/>
			<rect y="128.25" fill="#099146" width="256" height="63.75"/>
			<rect fill="#010101" width="256" height="63.75"/>
			<polygon fill="#E52F36" points="96,96 0,192 0,0 "/>
		`;
}