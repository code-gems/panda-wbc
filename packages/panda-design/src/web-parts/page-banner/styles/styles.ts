import { css } from "lit";

export const styles = css`
	.banner {
		position: relative;
		display: flex;
		flex-shrink: 0;
		width: 100%;
		padding: var(--panda-padding-m);
		height: var(--pd-page-banner-size);

		background-color: var(--panda-background-color-300);
		box-sizing: border-box;
	}

	.banner panda-particle-banner {
		overflow: hidden;
		border-radius: var(--panda-border-radius-l);
	}

	.banner .header {
		position: absolute;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--panda-gap-m);
		bottom: 30px;
		left: 30px;
	}

	.banner .header .text {
		color: var(--panda-header-text-color);
		font-size: 3em;
		font-family: var(--panda-header-font-family);
		text-shadow: var(--panda-header-text-shadow);
		user-select: none;
		-webkit-font-smoothing: antialiased;		
	}
`;