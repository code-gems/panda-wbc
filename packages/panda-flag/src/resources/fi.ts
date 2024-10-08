// Finland
import { html, TemplateResult } from "lit";

export const flagFi = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#ffffff" width="256" height="256"/>
				<rect x="76" fill="#0057b7" width="56" height="256"/>
				<rect y="100" fill="#0057b7" width="256" height="56"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#ffffff" width="256" height="192"/>
				<rect x="80" fill="#0057b7" width="48" height="192"/>
				<rect y="72" fill="#0057b7" width="256" height="48"/>
			</svg>
		`;
}