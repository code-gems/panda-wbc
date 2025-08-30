// Hungary

export const flagHu = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#f43737" width="256" height="85" />
			<rect fill="#fafafa" width="256" height="171" y="85" />
			<rect fill="#028e46" width="256" height="86" y="171" />
		`
		: /*svg*/`
			<rect fill="#f43737" width="256" height="64" />
			<rect fill="#fafafa" width="256" height="128" y="64" />
			<rect fill="#028e46" width="256" height="64" y="128" />
		`;
}