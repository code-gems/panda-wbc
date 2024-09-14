// Sweden
import { html, TemplateResult } from "lit";

export const flagSe = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#0057b7" width="256" height="256"/>
				<rect x="72" fill="#fad01f" width="48" height="256"/>
				<rect y="104" fill="#fad01f" width="256" height="48"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#0057b7" width="256" height="192"/>
				<rect x="60" fill="#fad01f" width="40" height="192"/>
				<rect y="76" fill="#fad01f" width="256" height="40"/>
			</svg>
		`;
}