// Togo

export const flagTg = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#4A6F34" width="256" height="256"/>
			<rect y="154" fill="#FFDA45" width="256" height="51"/>
			<rect y="51" fill="#FFDA45" width="256" height="51"/>
			<rect fill="#D81F2A" width="154" height="154"/>
			<polygon fill="#F1F0F0" points="76.999,22.445 88.663,58.346 126.42,58.346 95.875,80.543 107.539,116.445 76.999,94.258 
				46.459,116.445 58.125,80.543 27.579,58.346 65.335,58.346 "/>
		`
		: /*svg*/`
			<rect fill="#4A6F34" width="256" height="192"/>
			<rect y="115.5" fill="#FFDA45" width="256" height="38.25"/>
			<rect y="38.25" fill="#FFDA45" width="256" height="38.25"/>
			<rect fill="#D81F2A" width="115.5" height="115.5"/>
			<polygon fill="#F1F0F0" points="57.75,16.833 66.498,43.76 94.815,43.76 71.906,60.407 80.654,87.334 57.75,70.693 34.845,87.334 
				43.594,60.407 20.684,43.76 49.001,43.76 "/>
		`;
}