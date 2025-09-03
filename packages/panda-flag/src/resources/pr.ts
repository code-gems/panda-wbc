// Puerto Rico
export const flagPr = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F1F0F0" width="256" height="256"/>
			<rect fill="#F04E58" width="256" height="51"/>
			<rect y="205" fill="#F04E58" width="256" height="51"/>
			<rect y="102.5" fill="#F04E58" width="256" height="51"/>
			<polygon fill="#1C5893" points="128,128 0,256 0,0 "/>
			<path fill="#F0F0F0" d="M29.998,159.5L51,144.8l21.002,14.7l-7.875-24.154l20.996-15.221H58.875L51,96.5l-7.875,23.625H16.877
				l20.996,15.221L29.998,159.5z"/>
		`
		: /*svg*/`
			<rect y="0" fill="#F0F0F0" width="256" height="192"/>
			<rect y="0" fill="#F04E58" width="256" height="38.25"/>
			<rect y="153.75" fill="#F04E58" width="256" height="38.25"/>
			<rect y="76.875" fill="#F04E58" width="256" height="38.25"/>
			<polygon fill="#1C5893" points="128,96 0,192 0,0 "/>
			<path fill="#F0F0F0" d="M25.33,127L46,112.532L66.67,127l-7.75-23.775L79.58,88.25H53.75L46,65l-7.75,23.25H12.42l20.66,14.974
				L25.33,127z"/>
		`;
}