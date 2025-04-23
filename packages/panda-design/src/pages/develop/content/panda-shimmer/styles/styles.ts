import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.shimmer-template {
		display: flex;
		flex-direction: row nowrap;
		gap: var(--panda-padding-m);
	}

	.shimmer-template .icon {
		display: flex;
		justify-content: center;
		width: 40px;
		height: 40px;
	}

	.shimmer-template .body {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
		gap: var(--panda-padding-m);
	}

`;