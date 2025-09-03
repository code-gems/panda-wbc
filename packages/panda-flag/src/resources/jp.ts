// Japan

export const flagJp = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F0F0F0" width="256" height="256" />
			<circle fill="#f43737" cx="128" cy="128" r="50"/>
		`
		: /*svg*/`
			<rect fill="#F0F0F0" width="256" height="192" />
			<circle fill="#f43737" cx="128" cy="96" r="50"/>
		`;
}
