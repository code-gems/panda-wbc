import { css } from "lit";

export const styles = css`
	:host {
		pointer-events: auto;
	}

	.overlay-cont {
		position: fixed;
		display: block;
		width: 100%;
		height: 100%;
		inset: 0px;
		z-index: 9998;
	}

	.overlay {
		position: absolute;
		display: flex;
		flex-flow: column;
		opacity: 0;
		z-index: 9999;
	}

	.overlay.show {
		opacity: 1;
	}

	.overlay-footer {
		display: flex;
		flex-flow: row nowrap;
	}

	.dropdown {
		display: flex;
		flex-flow: column;
		height: 100%;
		max-height: 60vh;
		padding: var(--panda-padding-s, 5px);
		transition: opacity 200ms ease-in-out;

		border: 1px solid var(--panda-dropdown-border-color, hsl(0deg 0% 80%));
		border-radius: var(--panda-dropdown-border-radius, 5px);
		background-color: var(--panda-dropdown-background-color, hsl(0deg 0% 100%));
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc);
		box-sizing: border-box;
	}

	.dropdown .dropdown-wrap {
		display: flex;
		flex-flow: column;
		overflow: auto;
	}

	.dropdown .item {
		display: flex;
		flex-flow: row;
		align-items: center;
		padding: var(--panda-dropdown-item-padding, 10px 5px);
		
		color: var(--panda-dropdown-item-text-color, hsl(0deg 0% 10%));
		font-size: var(--panda-dropdown-item-font-size, 14px);
		font-family: var(--panda-dropdown-item-font-family, "Poppins");
		text-shadow: var(--panda-dropdown-item-text-shadow, none);
		user-select: none;
		cursor: pointer;

		transition: all 200ms ease-in-out;

		border-radius: var(--panda-dropdown-item-border-radius, 5px);
		background-color: var(--panda-dropdown-item-background-color, transparent);
		box-sizing: border-box;
	}

	.dropdown .item:hover {
		color: var(--panda-dropdown-item-text-color-hover, hsl(196deg 100% 47%));
		background-color: var(--panda-dropdown-item-background-color-hover, hsl(209deg 78% 46% / 10%));
	}

	.dropdown .item.active {
		color: var(--panda-dropdown-item-text-color-active, hsl(0deg 0% 100%));
		background-color: var(--panda-dropdown-item-background-color-active, hsl(209deg 78% 46% / 10%));
	}

	.dropdown .item.selected {
		color: var(--panda-dropdown-item-text-color-selected, hsl(0deg 0% 100%));
		background-color: var(--panda-dropdown-item-background-color-selected, hsl(196deg 100% 47%));
	}

	.dropdown .item.disabled {
		cursor: not-allowed;
		color: var(--panda-dropdown-item-text-color-disabled, hsl(210deg 5% 35%));
		background-color: var(--panda-dropdown-item-background-color-disabled, hsl(0deg 0% 95%));
	}

	.dropdown .item.active.disabled {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)) inset;
	}
`;