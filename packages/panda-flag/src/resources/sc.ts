// Seychelles

export const flagSc = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#D62929" width="256" height="256"/>
			<polygon fill="#F0F0F0" points="256,86 256,256 0,256 "/>
			<polygon fill="#007B3E" points="256,171 256,256 0,256 "/>
			<polygon fill="#FDD856" points="0,256 171,0 0,0 "/>
			<polygon fill="#1F4283" points="0,256 0,0 86,0 "/>
		`
		: /*svg*/`
			<rect fill="#D62929" width="256" height="192"/>
			<polygon fill="#F0F0F0" points="256,64 256,192 0,192 "/>
			<polygon fill="#007B3E" points="256,128 256,192 0,192 "/>
			<polygon fill="#FDD856" points="0,192 171,0 0,0 "/>
			<polygon fill="#1F4283" points="0,192 0,0 86,0 "/>
		`;
}
