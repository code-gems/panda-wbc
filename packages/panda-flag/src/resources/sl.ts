// Sierra Leone

export const flagSl= (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F0F0F0" width="256" height="256"/>
			<rect fill="#6DA544" width="256" height="86"/>
			<rect fill="#338AF3" width="256" height="86" y="171"/>
		`
		: /*svg*/`
			<rect fill="#F0F0F0" width="256" height="192"/>
			<rect fill="#6DA544" width="256" height="64"/>
			<rect fill="#338AF3" width="256" height="64" y="128"/>
		`;
}