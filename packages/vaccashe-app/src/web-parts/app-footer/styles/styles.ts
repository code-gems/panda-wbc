// utils
import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	footer {
		display: flex;
		flex-direction: column;
		width: 100%;
		
		color: color-mix(in oklab, var(--panda-tertiary-text-color) 80%, transparent);
		background: var(--app-secondary-gradient);
	}

	.footer-cont {
		display: flex;
		flex-direction: column;
		gap: var(--panda-gap-l);
	}
	
	footer .container {
		display: flex;
		flex-flow: row nowrap;
		max-width: var(--app-max-width);
		margin: 0;
		margin-inline: auto;
	}

	footer .container.top {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--panda-gap-l);
		width: 100%;
		padding-block: 4rem;
		padding-inline: 1rem;
		box-sizing: border-box;
	}

	.footer-logo {
		display: flex;
		flex-flow: column;
		gap: var(--panda-gap-m);
		grid-column: 1 / span 2;
	}

	.footer-logo .text {
		max-width: 28rem;
		font-size: var(--panda-font-size-s);
		line-height: 1.625;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 2rem;
		padding-inline: var(--panda-gap-xl);
		padding-block: var(--panda-gap-l);
	}

	.border-top {
		border-top: 1px solid var(--panda-white-color-10opc);
	}

	.grow { flex-grow: 1; }

	.font-size-xs { font-size: var(--panda-font-size-xs); }

	.uppercase { text-transform: uppercase; }

	.tracking-wide {
		letter-spacing: .25em;
		text-indent: .25em;
	}
	
	.footer-logo .logo {
		--app-logo-color: var(--panda-tertiary-text-color);
		width: 300px;
	}

	.link {
		cursor: pointer;
		transition: color .2s ease;
	}

	.link:hover {
		color: var(--panda-primary-color);
	}

	@media (max-width: 768px) {
		footer .container.top {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			gap: 4rem;
			padding-block: 3rem;
			padding-inline: .8rem;
		}

		.footer-logo {
			grid-column: auto;
		}

		.container.bottom {
			flex-flow: column;
			gap: var(--panda-gap-xl);
		}
	}
`;

export const list = css`
	.list {
		display: flex;
		flex-direction: column;
		gap: var(--panda-gap-l);
	}

	.list .header {
		font-size: 20px;
		font-family: var(--panda-header-font-family);
	}

	.list .item {
		display: flex;
		align-items: center;
		gap: var(--panda-gap-m);
	}

	.list .item .icon {
		display: flex;
		align-items: center;
		justify-content: center;

		--panda-icon-color: var(--panda-primary-color);
	}

	.list .item .text {
		font-size: var(--panda-font-size-s);
	}
`;