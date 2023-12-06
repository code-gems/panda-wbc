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

		background-color: rgba(255,0,0, 10%);
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
		position: relative;
		display: block;
	}

	.dropdown {
		display: flex;
		flex-flow: column;
		height: 100%;
		max-height: 60vh;
		padding: 5px;
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
		border-bottom: 1px dashed var(--panda-dropdown-item-border-color, hsl(0deg 0% 92%));
		background-color: var(--panda-dropdown-item-background-color, transparent);
		box-sizing: border-box;
	}

	.dropdown .item:last-child {
		border-bottom: none;
	}

	.dropdown .item:hover {
		color: var(--panda-dropdown-item-text-color-hover, hsl(196deg 100% 47%));
		background-color: var(--panda-dropdown-item-background-color-hover, hsl(0deg 0% 97%));
	}

	.dropdown .item.active {
		color: var(--panda-dropdown-item-text-color-active, hsl(0deg 0% 100%));
		background-color: var(--panda-dropdown-item-background-color-active, hsl(196deg 100% 47%));
	}

	.scroll::-webkit-scrollbar { width: 6px; height: 6px; }
	.scroll::-webkit-scrollbar-track { border-radius: 3px; background-color: var(--panda-background-color-100); }
	.scroll::-webkit-scrollbar-thumb { border-radius: 3px; background-color: var(--panda-background-color-900); }
	.scroll::-webkit-scrollbar-thumb:hover { background-color: var(--panda-background-color-700); }
	.scroll::-webkit-scrollbar-corner { background-color: transparent; }
`;