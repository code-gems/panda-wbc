import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		height: var(--panda-button-height-m);
	}

	.button {
		display: flex;
		flex-flow: row nowrap;

		border-radius: var(--panda-button-border-radius);
		background-color: var(--panda-primary-color);
	}
	
	slot {
		display: block;
		padding: 0px 15px;
		line-height: var(--panda-button-height-m);
		
		color: var(--panda-primary-text-color);
		font-size: var(--panda-font-size-m);
		font-family: var(--panda-font-family-bold);
	}

	slot[name="prefix"],
	slot[name="suffix"] {
		padding: 0px;
	}

	::slotted(panda-icon) {
		background: red;
	}
`; 