// Palau
export const flagPw = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#41ACE1" width="256" height="256" />
			<path fill="#FEE62A" d="M167,128c0,38.669-31.33,70-70,70c-38.669,0-70-31.331-70-70s31.331-70,70-70C135.67,58,167,89.331,167,128z"/>
		`
		: /*svg*/`
			<rect fill="#41ACE1" width="256" height="192"/>
			<path fill="#FEE62A" d="M140.25,96c0,29.002-23.498,52.5-52.5,52.5s-52.5-23.498-52.5-52.5s23.498-52.5,52.5-52.5
				S140.25,66.998,140.25,96z"/>
		`;
}