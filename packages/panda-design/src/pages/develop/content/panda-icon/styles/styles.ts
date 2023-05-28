import { css } from "lit"

export const styles = css`
	:host {
		display: block;
		padding: 40px;
	}

	.icon-list {
		display: flex;
		flex-flow: row wrap;
		gap: 10px;
		box-sizing: border-box;
	}

	.icon-list .list-header {
		display: block;
		flex-basis: 100%;


		font-size: var(--panda-font-size-l);
		font-family: var(--panda-font-family-bold);
	}

	.icon-list .list-item {
		display: flex;
		width: 90px;
		flex-flow: column;
		align-items: center;
		padding: 10px;
		border: 1px solid #e9e9e9;
		flex-shrink: 0;

		background-image: url(transparent.png);
	}

	.icon-list .list-item .icon {
		display: flex;
		height: 40px;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.icon-list .list-item .name {
		color: var(--panda-txt-color);	
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family);
		text-align: center;
	}

	.icon-list .list-item:hover .name {
		color: var(--panda-primary-txt-color);
	}
`;