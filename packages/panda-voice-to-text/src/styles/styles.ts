import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		width: var(--panda-component-size-m, 30px);
		height: var(--panda-component-size-m, 30px);
		user-select: none;
	}

	.toggle-btn {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		outline: none;
		cursor: pointer;

		border-radius: 50%;
		background-color: var(--panda-button-background-color);

		--panda-icon-width: var(--panda-icon-size-m);
		--panda-icon-height: var(--panda-icon-size-m);
	}

	.toggle-btn:focus-visible {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%));
	}

	.toggle-btn::not(.disabled):hover {
		background-color: var(--panda-button-background-color-hover);
	}

	.toggle-btn::not(.disabled):hover {
		cursor: not-allowed;
	}

	.toggle-btn.disabled {
		--panda-icon-color: var(--panda-icon-color-disabled, hsl(210deg 5% 55%));
	}

	.active {
		animation-name: blink;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-delay: 500ms;
	}

	@keyframes blink {
		0% { opacity: 1; }
		50% { opacity: 0.5; }
		100% { opacity: 1; }
	}
`;
