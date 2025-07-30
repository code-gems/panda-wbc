// Panama

export const flagPa = (square: boolean): string => {
	return square
		? /*svg*/`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#ffffff" width="256" height="256"/>
				<rect fill="#0079c1" y="128" width="128" height="128"/>
				<polygon fill="#0079c0" points="45.46 93.06 64 79.54 82.54 93.06 75.41 71.25 94 57.8 71.05 57.84 64 36 56.95 57.84 34 57.8 52.59 71.25 45.46 93.06"/>
				<rect fill="#e31837" x="128" width="128" height="128"/>
				<polygon fill="#e31837" points="173.46 221.06 192 207.54 210.54 221.06 203.41 199.25 222 185.8 199.05 185.84 192 164 184.95 185.84 162 185.8 180.59 199.25 173.46 221.06"/>
			</svg>
		`
		: /*svg*/`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#ffffff" width="256" height="192"/>
				<rect fill="#0079c1" y="96" width="128" height="96"/>
				<polygon fill="#0079c0" points="45.46 77.31 64 63.78 82.54 77.31 75.41 55.5 94 42.04 71.05 42.09 64 20.25 56.95 42.09 34 42.04 52.59 55.5 45.46 77.31"/>
				<rect fill="#e31837" x="128" width="128" height="96"/>
				<polygon fill="#e31837" points="173.46 173.31 192 159.78 210.54 173.31 203.41 151.5 222 138.04 199.05 138.09 192 116.25 184.95 138.09 162 138.04 180.59 151.5 173.46 173.31"/>
			</svg>
		`;
}