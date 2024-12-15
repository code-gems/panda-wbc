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
		padding: var(--panda-padding-m);

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-100);
		box-shadow: var(--panda-elevation-s);
		box-sizing: border-box;

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
		gap: var(--panda-padding-m);
	}

	.sample .header .tab {
		display: flex;
		flex-shrink: 0;
		height: var(--panda-component-size-l);

		text-align: center;
		transition: all 400ms ease-in-out;
		cursor: pointer;

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-500);
		box-shadow: var(--panda-elevation-s);
	}
	
	.sample .header .tab:hover {
		box-shadow: var(--panda-elevation-m);
	}

	.sample .header .tab.active {
		color: var(--panda-tertiary-text-color);
		background-color: var(--panda-tertiary-color);
	}

	.sample .header .tab.active .icon {
		--panda-icon-color: var(--panda-tertiary-text-color);
	}

	.sample .header .tab.active .label {
		color: var(--panda-tertiary-text-color);
	}

	.sample .header .tab .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-l);
		height: var(--panda-component-size-l);

		--panda-icon-color: var(--panda-text-color);
		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}

	.sample .header .tab .label {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		padding-right: var(--panda-padding-l);

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family);
		user-select: none;

		box-sizing: border-box;
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