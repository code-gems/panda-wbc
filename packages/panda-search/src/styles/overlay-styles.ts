import { css } from "lit";

export const styles = css`
	:host {
		pointer-events: auto;
	}

	.overlay-cont {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		top: 0px;
		right: 0px;
		bottom: 0px;
		left: 0px;
		z-index: 9999;
	}

	.overlay {
		position: absolute;
		display: flex;
		flex-flow: column;
		opacity: 0;
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
		padding: var(--panda-padding-s, 5px);
		box-sizing: border-box;
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
		border-bottom: 1px dashed var(--panda-dropdown-item-border-color, hsl(0deg 0% 92%));
		background-color: var(--panda-dropdown-item-background-color, transparent);
		box-sizing: border-box;
	}

	.dropdown .item:last-child {
		border-bottom: none;
	}

	.dropdown .item:not(.inactive):hover {
		color: var(--panda-dropdown-item-text-color-hover, hsl(196deg 100% 47%));
		background-color: var(--panda-dropdown-item-background-color-hover, hsl(0deg 0% 97%));
	}

	.dropdown .item:not(.inactive).active {
		color: var(--panda-dropdown-item-text-color-active, hsl(0deg 0% 100%));
		background-color: var(--panda-dropdown-item-background-color-active, hsl(196deg 100% 47%));
	}

	.dropdown > .dropdown-header,
	.dropdown > .dropdown-footer {
		padding: var(--panda-padding-s, 5px);
		box-sizing: border-box;
	}
`;