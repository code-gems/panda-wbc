// utils
import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}

	.actions {
		display: flex;
		gap: var(--panda-gap-4);
		margin-top: var(--panda-gap-8);
	}

	panda-button.fit {
		width: fit-content;
	}
	
	panda-chip.list {
		--panda-chip-border-radius-l: var(--panda-border-radius-s);
		--panda-chip-font-size-l: var(--panda-font-size-s);
		--panda-chip-font-family-l: var(--panda-font-family-semibold);
	}
`;