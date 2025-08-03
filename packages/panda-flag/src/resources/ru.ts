// Russian Federation

export const flagRu = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#fafafa" width="256" height="85" />
			<rect fill="#2525d8" width="256" height="171" y="85" />
			<rect fill="#f43737" width="256" height="86" y="171" />
		`
		: /*svg*/`
			<rect fill="#fafafa" width="256" height="64" />
			<rect fill="#2525d8" width="256" height="128" y="64" />
			<rect fill="#f43737" width="256" height="64" y="128" />
		`;
}