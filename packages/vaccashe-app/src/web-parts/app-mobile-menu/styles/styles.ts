import { css } from "lit";

export const styles = css`
	:host {
		display: none;
		width: 100%;
	}
	
	.menu {
		display: none;
		flex-flow: column;
		gap: var(--panda-gap-m);
		width: 100%;
		
		border-bottom: 1px solid var(--panda-border-color);
		background-color: var(--panda-background-color);
	}

	.menu.show {
		display: flex;
	}

	.menu > .item {
		padding: var(--panda-padding-xxs) 0;
		cursor: pointer;
	}

	.menu > .item:hover,
	.menu > .item.active {
		color: var(--panda-primary-color);
	}

	@media (max-width: 768px) {
		:host {
			display: flex;
		}
	}
`;