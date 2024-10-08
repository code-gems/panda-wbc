// Qatar
import { html, TemplateResult } from "lit";

export const flagQa = (square: boolean): TemplateResult => {
	return square
		? html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
			>
				<rect fill="#940325" width="256" height="256"/>
				<polygon fill="#fafafa" points="0,0 0,256 117.47,256 70.86,234.61 117.47,213.23 70.86,192.05 117.47,170.67 70.86,149.39 117.47,128.11 70.86,106.83 117.47,85.55 70.86,64.16 117.47,42.99 70.86,21.6 117.47,0 "/>
			</svg>
		`
		: html`
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 192"
			>
				<rect fill="#940325" width="256" height="192"/>
				<polygon fill="#fafafa" points="0,0 0,192 113.44,192 83.65,168.81 113.44,150.11 83.65,131.5 113.44,112.89 83.65,94.28 113.44,75.68 83.65,56.98 113.44,38.46 83.65,19.76 113.44,0 "/>
			</svg>
		`;
}