// Mauritius

export const flagMu = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#ED4C5C" width="256" height="256" />
			<rect fill="#2A5F9E" y="192" width="256" height="64" />
			<rect fill="#FFCE31" y="128" width="256" height="64" />
			<rect fill="#699635" y="64" width="256" height="64" />
		`
		: /*svg*/`
			<rect fill="#ED4C5C" width="256" height="192" />
			<rect fill="#2A5F9E" y="144" width="256" height="48" />
			<rect fill="#FFCE31" y="96" width="256" height="48" />
			<rect fill="#699635" y="48" width="256" height="48" />
		`;
}