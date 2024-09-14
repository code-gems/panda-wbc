// Ukraine
import { html, TemplateResult } from "lit";

export const flagUa = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#0057b7" width="256" height="128" />
				<rect fill="#fad01f" y="128" width="256" height="128" />
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#0057b7" width="256" height="96" />
				<rect fill="#fad01f" y="96" width="256" height="96" />
			</svg>
		`;
}