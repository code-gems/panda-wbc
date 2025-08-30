// India
export const flagIn = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#F1F0F0" width="256" height="256"/>
			<rect fill="#F8981E" width="256" height="72.348"/>
			<rect y="183.652" fill="#6DA543" width="256" height="72.348"/>
			<g>
				<circle fill="#2057A7" cx="128" cy="128" r="44.522"/>
				<circle fill="#F1F0F0" cx="128" cy="128" r="27.827"/>
				<polygon fill="#2057A7" points="128,93.663 136.585,113.132 157.737,110.832 145.168,128 157.737,145.168 136.585,142.868 
					128,162.337 119.415,142.868 98.264,145.168 110.832,128 98.264,110.832 119.415,113.132"/>
			</g>
		`
		: /*svg*/`
			<rect fill="#F1F0F0" width="256" height="192"/>
			<rect fill="#F8981E" width="256" height="54.261"/>
			<rect y="137.739" fill="#6DA543" width="256" height="54.261"/>
			<g>
				<circle fill="#2057A7" cx="128" cy="96" r="32.5"/>
				<circle fill="#F1F0F0" cx="128" cy="96" r="20.313"/>
				<polygon fill="#2057A7" points="128,70.934 134.267,85.146 149.708,83.468 140.532,96 149.708,108.532 134.267,106.854 
					128,121.065 121.733,106.854 106.293,108.532 115.467,96 106.293,83.468 121.733,85.146"/>
			</g>
		`;
}