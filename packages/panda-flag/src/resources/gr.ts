// Greece

export const flagGr = (square: boolean): string => {
	return square
		? /*svg*/`
			<rect width="256" height="256" fill="#0d5eaf"/>
			<rect x="143" y="28.45" width="113" height="28.42" fill="#F0F0F0"/>
			<rect x="143" y="85.34" width="113" height="28.42" fill="#F0F0F0"/>
			<rect y="142.24" width="256" height="28.42" fill="#F0F0F0"/>
			<rect y="199.14" width="256" height="28.42" fill="#F0F0F0"/>
			<rect y="56.92" width="142.67" height="28.42" fill="#F0F0F0"/>
			<rect x="56.92" width="28.42" height="142.25" fill="#F0F0F0"/>
		`
		: /*svg*/`
			<rect width="256" height="192" fill="#0d5eaf"/>
			<rect x="107" y="21.34" width="149" height="21.31" fill="#F0F0F0"/>
			<rect x="107" y="64.01" width="149" height="21.31" fill="#F0F0F0"/>
			<rect y="106.68" width="256" height="21.31" fill="#F0F0F0"/>
			<rect y="149.35" width="256" height="21.31" fill="#F0F0F0"/>
			<rect y="42.69" width="107" height="21.31" fill="#F0F0F0"/>
			<rect x="42.69" width="21.31" height="106.69" fill="#F0F0F0"/>
		`;
}