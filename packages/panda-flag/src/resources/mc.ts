// Monaco
import { html, TemplateResult } from "lit";

export const flagMc = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#de2323" width="256" height="128" />
				<rect fill="#fafafa" y="128" width="256" height="128" />
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#de2323" width="256" height="96" />
				<rect fill="#fafafa" y="96" width="256" height="96" />
			</svg>
		`;
}