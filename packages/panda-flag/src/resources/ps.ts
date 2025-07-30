// Palestine

export const flagPs = (square: boolean): string => {
	return square
		? /*svg*/`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#ffffff" y="0" width="256" height="256"/>
				<rect fill="#029146" y="171" width="256" height="85"/>
				<rect fill="#000000" width="256" height="85"/>
				<polygon fill="#e52d36" points="128,128 0,256 0,0 "/>
			</svg>
		`
		: /*svg*/`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#ffffff" y="0" width="256" height="256"/>
				<rect fill="#029146" y="171" width="256" height="85"/>
				<rect fill="#000000" width="256" height="85"/>
				<polygon fill="#e52d36" points="128,128 0,256 0,0 "/>
			</svg>
		`;
}