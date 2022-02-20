import { html } from "lit"

export const dots = html`
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		viewBox="0 0 32 32"
	>
		<g>
			<circle cx="5" cy="16" stroke-width="0">
				<animate
					attributeName="fill-opacity"
					dur="1s"
					values=".5;.6;.8;1;.8;.6;.5;.5"
					repeatCount="indefinite"
				>
				</animate>
				<animate
					attributeName="r"
					dur="1s"
					values="2;2;3;4;5;4;3;2"
					repeatCount="indefinite"
				>
				</animate>
			</circle>
			<circle cx="16" cy="16" stroke-width="0">
				<animate
					attributeName="fill-opacity"
					dur="1s"
					values=".5;.5;.6;.8;1;.8;.6;.5"
					repeatCount="indefinite"
				>
				</animate>
				<animate
					attributeName="r"
					dur="1s"
					values="3;2;2;3;4;5;4;3"
					repeatCount="indefinite"
				>
				</animate>
			</circle>
			<circle cx="27" cy="16" stroke - width="0">
				<animate
					attributeName="fill-opacity"
					dur="1s"
					values=".6;.5;.5;.6;.8;1;.8;.6"
					repeatCount="indefinite"
				>
				</animate>
				<animate
					attributeName="r"
					dur="1s"
					values="4;3;2;2;3;4;5;4"
					repeatCount="indefinite"
				>
				</animate>
			</circle>
		</g>
	</svg>
`;