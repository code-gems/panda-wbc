import { html, TemplateResult } from "lit";

export const flagNl = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#f43737" width="256" height="85" />
				<rect fill="#fafafa" width="256" height="171" y="85" />
				<rect fill="#2525d8" width="256" height="86" y="171" />
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#f43737" width="256" height="64" />
				<rect fill="#fafafa" width="256" height="128" y="64" />
				<rect fill="#2525d8" width="256" height="64" y="128" />
			</svg>
		`;
}