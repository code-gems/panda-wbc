// Estonia
export const flagEe = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#42ADE2" width="256" height="256" />
			<rect fill="#33373B" width="256" height="171" y="85" />
			<rect fill="#f0f0f0" width="256" height="86" y="171" />
		`
		: /*svg*/`
			<rect fill="#42ADE2" width="256" height="192" />
			<rect fill="#33373B" width="256" height="128" y="64" />
			<rect fill="#f0f0f0" width="256" height="64" y="128" />
		`;
}