import { css } from "lit";

export const styles = css`
	:host {
		
	}
	
	.control {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--panda-padding-m);
	}

	.flag-list {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		gap: var(--panda-padding-s);
	}

	.flag-list .list-item {
		display: flex;
		flex-flow: column;
		align-items: center;
		gap: var(--panda-padding-s);
		width: 120px;
		padding: var(--panda-padding-m);

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-50);
		box-shadow: var(--panda-elevation-s);
		box-sizing: border-box;
	}

	.flag-list .list-item .flag {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		width: 60px;
		padding: var(--panda-padding-l);

		background: url(./transparent.png);
		background-position: center;
		
		--panda-flag-width: 40px;
		--panda-flag-height: 40px;
	}

	.flag-list .list-item .name {

	}

	.flag-list .list-item .keywords {
		color: var(--panda-label-color);
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family);
		text-align: center;
	}

	.flag-list {}
`;