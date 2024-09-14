// Belgium
import { html, TemplateResult } from "lit";

export const flagBe = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#0d0d0d" width="85" height="256" />
				<rect fill="#fad01f" width="171" height="256" x="85" />
				<rect fill="#f43737" width="86" height="256" x="171" />
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#0d0d0d" width="85" height="192" />
				<rect fill="#fad01f" width="171" height="192" x="85" />
				<rect fill="#f43737" width="86" height="192" x="171" />
			</svg>
		`;
}