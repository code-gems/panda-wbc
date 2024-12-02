import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}


	.sample {
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
	}

	.sample .header {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m);
	}

	.sample .header .tabs {
		display: flex;
		flex-flow: row nowrap;
		flex-shrink: 0;
		height: var(--panda-component-size-l);
	}

	.sample .header .tab {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		height: var(--panda-component-size-l);

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		text-align: center;
		transition: border-color 400ms ease-in-out;

		border-bottom: 2px solid transparent;
		background-color: var(--panda-background-color-300);
		box-sizing: border-box;
	}
	
	.sample .header .tab .active {
		border-bottom: 2px solid var(--panda-primary-color);
		background-color: var(--panda-background-color-100);
	}

	.sample .spacer {
		flex-grow: 1;
	}

	.sample .btn {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;

		background-color: var(--panda-background-color-300);
		--panda-icon-color: var(--panda-text-color);
		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}

	.sample .btn:hover {
		background-color: var(--panda-background-color-100);
		box-shadow: var(--panda-elevation-m);
	}

	.sample .body {
		display: flex;
		flex-grow: 1;
		flex-flow: row nowrap;
	}

	.sample .body .tab-body {
		display: flex;
		flex-grow: 1;

	}

	.sample .body .tab-body .logs-cont {
		display: flex;
		flex-shrink: 0;
	}

	.sample .body .tab-body .logs-cont .logs {

	}
`;