import { css } from "lit";

export const styles = css`
	:host {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--panda-gap-m);
		width: 100%;
		height: var(--app-navigation-size);
		padding-inline: 1rem;

		border-bottom: 1px solid var(--panda-border-color);
		background-color: var(--panda-background-color-70opc);
		box-shadow: 0px -5px 10px var(--panda-background-color) inset;
		box-sizing: border-box;
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
	}

	.container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: 100%;
		max-width: var(--app-max-width);
		margin: 0;
		margin-inline: auto;
	}

	.logo {
		width: 300px;
		cursor: pointer;
	}

	.grow { flex-grow: 1; }
	
	.mobile { display: none; }
`;

export const navigation = css`
	.menu {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		gap: var(--panda-gap-8);
	}

	.menu > .item {
		position: relative;
		padding: var(--panda-padding-xxs) 0;
		cursor: pointer;

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-s);
		font-family: var(--panda-font-family-bold);
		text-transform: uppercase;
		letter-spacing: .2em;

		transition: color 0.3s ease;
		transition-timing-function: cubic-bezier(.4, 0, .2, 1);
	}

	.menu > .item:hover,
	.menu > .item.active {
		color: var(--panda-primary-color);
	}

	@media (max-width: 768px) {

		.mobile {
			display: flex;
		}

		.menu {
			display: none;
		}
	}
`;
