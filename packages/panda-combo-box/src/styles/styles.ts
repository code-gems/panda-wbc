import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: 40px;
	}
`;

export const modifiers = css`
	.txt-color-label { color: var(--panda-label-color); }
	.hidden { visibility: hidden; }

	.scroll::-webkit-scrollbar { width: 5px; }
	.scroll::-webkit-scrollbar-track { background-color: var(--panda-bg-color, hsl(0deg 0% 100%)); }
	.scroll::-webkit-scrollbar-thumb { background-color: var(--panda-bg-color-100, hsl(0deg 0% 95%)); }
	.scroll::-webkit-scrollbar-thumb:hover { background-color: var(--panda-bg-color-200, hsl(0deg 0% 90%)); }
`;
