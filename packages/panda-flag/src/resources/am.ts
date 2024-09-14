// Armenia
import { html, TemplateResult } from "lit";

export const flagAm = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#d90012" width="256" height="85" />
				<rect fill="#0033a0" width="256" height="171" y="85" />
				<rect fill="#f2a800" width="256" height="86" y="171" />
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#d90012" width="256" height="64" />
				<rect fill="#0033a0" width="256" height="128" y="64" />
				<rect fill="#f2a800" width="256" height="64" y="128" />
			</svg>
		`;
}