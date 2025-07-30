// Denmark

export const flagDk = (square: boolean): string => {
	return square
		? /*svg*/`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#D32A2A" width="256" height="256"/>
				<rect x="76" fill="#FFFFFF" width="40" height="256"/>
				<rect y="108" fill="#FFFFFF" width="256" height="40"/>
			</svg>
		`
		: /*svg*/`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#D32A2A" width="256" height="192"/>
				<rect x="64" fill="#FFFFFF" width="32" height="192"/>
				<rect y="80" fill="#FFFFFF" width="256" height="32"/>
			</svg>
		`;
}