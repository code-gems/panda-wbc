import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.events {
		display: flex;
		flex-flow: column;
		padding: var(--panda-padding-m);

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-50);
		box-sizing: border-box;
	}

	.event {
		display: flex;
		flex-flow: row nowrap;

		border-bottom: 1px dashed var(--panda-border-color);
		box-sizing: border-box;
	}

	.event:last-child {
		border-bottom: none;
	}

	.event .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m);

		--panda-icon-color: var(--panda-primary-color);
		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}

	.event .icon.warning { --panda-icon-color: var(--panda-action-color-warn); }
	.event .icon.error { --panda-icon-color: var(--panda-action-color-alert); }

	.event .details {
		display: flex;
		flex-flow: row nowrap;
		flex-grow: 1;
		gap: var(--panda-padding-m);
		padding: var(--panda-padding-m);
		box-sizing: border-box;
	}
	
	.event .details .message {
		flex-grow: 1;
	}
	
	.event .details .timestamp {
		flex-shrink: 0;
		padding: 2px var(--panda-padding-m);
		color: var(--panda-label-color);
		font-size: var(--panda-font-size-s);
		user-select: none;

		border-radius: var(--panda-border-radius-s);
		background-color: var(--panda-background-color);
		box-shadow: var(--panda-elevation-s);
	}
`;