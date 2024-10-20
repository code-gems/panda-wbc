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

	.layout .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
		overflow: hidden;

		border-radius: var(--panda-border-radius-m);
		background: url(/transparent.png);
		box-shadow: var(--panda-elevation-m);

		--panda-icon-width: var(--panda-icon-size-hero);
		--panda-icon-height: var(--panda-icon-size-hero);
	}

	.layout .icon .label {}
	
	.layout .details {}

	.layout .footer {}
	.layout .footer .tag {}
`;