import { css } from "lit";

export const styles = css`
	:host {
		
	}

	.console-log {
		display: flex;
		flex-flow: column;
		padding: var(--panda-padding-m);

		border-radius: var(--panda-border-radius-m);
		background-color: var(--panda-background-color-50);
		box-sizing: border-box;
	}

	.console-log .log {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-padding-m);
		padding: var(--panda-padding-m);
		
		border-bottom: 1px dashed var(--panda-border-color);
		box-sizing: border-box;
	}
	
	.console-log .log .message {
		flex-grow: 1;
	}
	
	.console-log .log .timestamp {
		flex-shrink: 0;
	}
`;