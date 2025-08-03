// Germany

export const flagDe = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#0d0d0d" width="256" height="85" />
			<rect fill="#f43737" width="256" height="171" y="85" />
			<rect fill="#fad01f" width="256" height="86" y="171" />
		`
		: /*svg*/`
			<rect fill="#0d0d0d" width="256" height="64" />
			<rect fill="#f43737" width="256" height="128" y="64" />
			<rect fill="#fad01f" width="256" height="64" y="128" />
		`;
}
