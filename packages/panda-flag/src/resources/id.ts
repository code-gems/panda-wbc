// Indonesia

export const flagId = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#f43737" width="256" height="128" />
			<rect fill="#F0F0F0" y="128" width="256" height="128" />
		`
		: /*svg*/`
			<rect fill="#f43737" width="256" height="96" />
			<rect fill="#F0F0F0" y="96" width="256" height="96" />
		`;
}