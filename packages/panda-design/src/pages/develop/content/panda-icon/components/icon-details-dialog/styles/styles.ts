// utils
import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 720px;
		height: 400px;
	}

	.layout {
		display: flex;
		flex-flow: column;
		gap: var(--panda-padding-m);
	}

	.layout .body {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m);
	}

	.layout .icon {}

	.layout .icon .label {}
	
	.layout .details {}

	.layout .footer {}
	.layout .footer .tag {}
`;