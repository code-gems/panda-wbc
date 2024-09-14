// Peru
import { html, TemplateResult } from "lit";

export const flagPe = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#ffffff" width="256" height="256"/>
				<rect fill="#d91023" width="70" height="256"/>
				<rect fill="#d91023" width="70" height="256" x="186"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#ffffff" width="256" height="192" />
				<rect fill="#d91023" width="70" height="192" />
				<rect fill="#d91023" width="70" height="192" x="122" />
			</svg>
		`;
}