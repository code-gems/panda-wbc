// Tonga
export const flagTo = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#D80027" width="256" height="256"/>
			<rect fill="#F0F0F0" width="128" height="128"/>
			<polygon fill="#D80027" points="74.658,53.341 74.658,32 53.341,32 53.341,53.341 32,53.341 32,74.658 53.341,74.658 53.341,96 
				74.658,96 74.658,74.658 96,74.658 96,53.341 "/>
		`
		: /*svg*/`
			<rect fill="#D80027" width="256" height="192"/>
			<rect fill="#F0F0F0" width="128" height="96"/>
			<polygon fill="#D80027" points="73.333,37.667 73.333,17 52.667,17 52.667,37.667 32,37.667 32,58.333 52.667,58.333 52.667,79 
				73.333,79 73.333,58.333 94,58.333 94,37.667 "/>
		`;
}