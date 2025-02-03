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
		gap: var(--panda-padding-m);
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

	.sample .header .spacer {
		flex-grow: 1;
	}

	.sample .header .caption {
		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--panda-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family-bold);
		user-select: none;
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
		position: relative;
		display: flex;
		flex-grow: 1;
		flex-flow: row nowrap;

		border: 1px solid var(--panda-border-color);
		border-radius: var(--panda-border-radius-m);
	}

	.sample .body .tab-body {
		display: flex;
		flex-grow: 1;
		border-radius: var(--panda-border-radius-m);
	}

	.sample .body .tab-body.code {
		position: absolute;
		display: none;
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.sample .body .tab-body.code.show {
		display: block;
	}

	.sample .body .code-wrap {
		height: 100%;
		padding: var(--panda-padding-m);
		background-color: var(--panda-background-color-100);
		box-sizing: border-box;
	}

	.sample .footer {
		display: flex;
		flex-shrink: 0;
	}

	.sample .footer .header {

	}

	::slotted([slot]) {
		display: block;
		width: 100%;
		height: 100%;
	}
`;