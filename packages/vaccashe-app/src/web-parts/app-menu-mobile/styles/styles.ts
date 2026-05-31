import { css } from "lit";

export const styles = css`
	:host {
		display: none;
		width: 100%;
	}
	
	.menu {
		display: none;
		flex-flow: column;
		gap: var(--panda-gap-2);
		padding: var(--panda-gap-4);
		width: 100%;
		
		border-bottom: 1px solid var(--panda-border-color);
		background-color: var(--panda-background-color);
	}

	.menu.show {
		display: flex;
	}

	.menu > .item {
		padding: var(--panda-gap-4);

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family);
		font-weight: 700;
		letter-spacing: .2em;
		text-transform: uppercase;
		cursor: pointer;
		
		border-radius: var(--panda-radius);
	}

	.menu > .item:hover,
	.menu > .item.active {
		background-color: var(--panda-background-color-900);
	}

	@media (max-width: 768px) {
		:host {
			display: flex;
		}
	}
`;