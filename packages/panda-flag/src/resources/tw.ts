// Taiwan

export const flagTw = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect fill="#f43737" width="256" height="256" />
			<rect fill="#2525d8" width="156" height="156" />
			<g>
				<path fill="#F0F0F0" d="M78,18L48,129.96L129.96,48L18,78l111.96,30L48,26.04L78,138l30-111.96L26.04,108L138,78L26.04,48L108,129.96 L78,18"/>
				<circle fill="#F0F0F0" stroke="#2525d8" stroke-width="8" cx="78" cy="78" r="33.75"/>
			</g>
		`
		: /*svg*/`
			<rect fill="#f43737" width="256" height="192" />
			<rect fill="#2525d8" width="128" height="100" />
			<g>
				<path fill="#F0F0F0" d="M63,13L45.5,78.31L93.31,30.5L28,48l65.31,17.5L45.5,17.69L63,83l17.5-65.31L32.69,65.5L98,48L32.69,30.5 L80.5,78.31L63,13"/>
				<circle fill="#F0F0F0" stroke="#2525d8" stroke-width="4" cx="63" cy="48" r="19"/>
			</g>
		`;
}
