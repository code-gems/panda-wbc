// Japan
import { html, TemplateResult } from "lit";

export const flagJp = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#fafafa" width="256" height="256" />
				<circle fill="#f43737" cx="128" cy="128" r="50"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#fafafa" width="256" height="192" />
				<circle fill="#f43737" cx="128" cy="96" r="50"/>
			</svg>
		`;
}
