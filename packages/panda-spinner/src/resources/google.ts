import { html } from "lit"

export const google = html`
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		viewBox="0 0 50 50"
	>
		<circle
			class="stroke-only"
			cx="25"
			cy="25"
			r="20"
			fill="none"
			stroke-width="5"
			stroke-linecap="round"
		>
			<animate
				attributeName="stroke-dasharray"
				dur="1.5s"
				values="1,150;90,150;90,150"
				repeatCount="indefinite"
			>
			</animate>
			<animate
				attributeName="stroke-dashoffset"
				dur="1.5s"
				values="0;-35;-124"
				repeatCount="indefinite"
			>
			</animate>
			<animateTransform
				attributeType="xml"
				attributeName="transform"
				type="rotate"
				from="0 25 25"
				to="360 25 25"
				dur="2s"
				repeatCount="indefinite"
			>
			</animateTransform>
			</circle>
	</svg>
`;