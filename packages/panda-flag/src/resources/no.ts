// Norway
import { html, TemplateResult } from "lit";

export const flagNo = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#D32A2A" width="256" height="256"/>
				<rect x="70" fill="#ffffff" width="68" height="256"/>
				<rect y="94" fill="#ffffff" width="256" height="68"/>
				<rect x="84" fill="#1d1d75" width="40" height="256"/>
				<rect y="108" fill="#1d1d75" width="256" height="40"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#D32A2A" width="256" height="192"/>
				<rect x="80" fill="#ffffff" width="48" height="192"/>
				<rect y="72" fill="#ffffff" width="256" height="48"/>
				<rect x="89" fill="#1d1d75" width="30" height="192"/>
				<rect y="81" fill="#1d1d75" width="256" height="30"/>
			</svg>
		`;
}