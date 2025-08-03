// Belgium

export const flagBe = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#0d0d0d" width="85" height="256" />
			<rect fill="#fad01f" width="171" height="256" x="85" />
			<rect fill="#f43737" width="86" height="256" x="171" />
		`
		: /*svg*/`
			<rect fill="#0d0d0d" width="85" height="192" />
			<rect fill="#fad01f" width="171" height="192" x="85" />
			<rect fill="#f43737" width="86" height="192" x="171" />
		`;
}