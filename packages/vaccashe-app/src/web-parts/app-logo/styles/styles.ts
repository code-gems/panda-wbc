import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
	}

	.fill-logo {
		fill: var(--app-logo-color, var(--panda-text-color));
	}
	
	.fill-text {
		fill: var(--app-logo-text-color, var(--panda-primary-color));
	}
`;