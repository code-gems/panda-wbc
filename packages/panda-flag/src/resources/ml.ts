// Mali

export const flagMl = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#FFDF00" width="256" height="256" />
			<rect fill="#00AB4D" width="86" height="256" />
			<rect fill="#DA1A33" width="86" height="256" x="171" />
		`
		: /*svg*/`
			<rect fill="#FFDF00" width="256" height="192" />
			<rect fill="#00AB4D" width="86" height="192" />
			<rect fill="#DA1A33" width="86" height="192" x="171" />
		`;
}