// Peru

export const flagPe = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F0F0F0" width="256" height="256"/>
			<rect fill="#d91023" width="85.3" height="256"/>
			<rect fill="#d91023" width="85.3" height="256" x="170.67"/>
		`
		: /*svg*/`
			<rect fill="#F0F0F0" width="256" height="192" />
			<rect fill="#d91023" width="85.3" height="192" />
			<rect fill="#d91023" width="85.3" height="192" x="170.67" />
		`;
}