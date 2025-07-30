// Armenia

export const flagAm = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#d90012" width="256" height="85" />
			<rect fill="#0033a0" width="256" height="171" y="85" />
			<rect fill="#f2a800" width="256" height="86" y="171" />
		`
		: /*svg*/`
			<rect fill="#d90012" width="256" height="64" />
			<rect fill="#0033a0" width="256" height="128" y="64" />
			<rect fill="#f2a800" width="256" height="64" y="128" />
		`;
}