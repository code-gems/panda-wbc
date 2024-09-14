// Indonesia
import { html, TemplateResult } from "lit";

export const flagId = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#f43737" width="256" height="128" />
				<rect fill="#fafafa" y="128" width="256" height="128" />
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#f43737" width="256" height="96" />
				<rect fill="#fafafa" y="96" width="256" height="96" />
			</svg>
		`;
}