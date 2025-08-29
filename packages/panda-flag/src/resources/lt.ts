// Lithuania
export const flagLt = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#FCBE1F" width="256" height="256" />
			<rect fill="#109D59" width="256" height="171" y="85" />
			<rect fill="#DC4437" width="256" height="86" y="171" />
		`
		: /*svg*/`
			<rect fill="#FCBE1F" width="256" height="192" />
			<rect fill="#109D59" width="256" height="128" y="64" />
			<rect fill="#DC4437" width="256" height="64" y="128" />
		`;
}