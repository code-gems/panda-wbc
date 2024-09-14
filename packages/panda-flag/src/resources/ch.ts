// Switzerland
import { html, TemplateResult } from "lit";

export const flagCh = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#D32A2A" width="256" height="256"/>
				<rect x="108" y="64" fill="#FFFFFF" width="40" height="128"/>
				<rect x="64" y="108" fill="#FFFFFF" width="128" height="40"/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#D32A2A" width="256" height="192"/>
				<rect x="108" y="32" fill="#FFFFFF" width="40" height="128"/>
				<rect x="64" y="76" fill="#FFFFFF" width="128" height="40"/>
			</svg>
		`;
}