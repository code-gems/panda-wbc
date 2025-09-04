// Antigua and Barbuda
export const flagAg = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect y="102.4" fill="#2057A7" width="256" height="51.198"/>
			<rect y="153.598" fill="#F1F0F0" width="256" height="102.402"/>
			<rect fill="#010101" width="256" height="102.4"/>
			<polygon fill="#FEDA46" points="183.652,102.4 72.348,102.4 95.088,91.703 82.979,69.681 107.671,74.403 110.801,49.458 128,67.806 
				145.2,49.458 148.328,74.403 173.021,69.681 160.913,91.704 "/>
			<polygon fill="#B52028" points="256,256 0,256 0,0 128,256 256,0 "/>
		`
		: /*svg*/`
			<rect y="76.8" fill="#2057A7" width="256" height="38.398"/>
			<rect y="115.198" fill="#F1F0F0" width="256" height="76.802"/>
			<rect fill="#010101" width="256" height="76.8"/>
			<polygon fill="#FEDA46" points="169.739,76.8 86.261,76.8 103.316,68.777 94.234,52.261 112.753,55.802 115.101,37.094 128,50.854 
				140.9,37.094 143.246,55.802 161.766,52.261 152.685,68.778 "/>
			<polygon fill="#B52028" points="256,192 0,192 0,0 128,192 256,0 "/>
		`;
}