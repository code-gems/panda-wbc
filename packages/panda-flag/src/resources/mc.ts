// Monaco

export const flagMc = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#de2323" width="256" height="128" />
			<rect fill="#F0F0F0" y="128" width="256" height="128" />
		`
		: /*svg*/`
			<rect fill="#de2323" width="256" height="96" />
			<rect fill="#F0F0F0" y="96" width="256" height="96" />
		`;
}