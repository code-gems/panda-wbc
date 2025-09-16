export const styles = /*css*/`
	:host {
		display: flex;
	}

	.accent-color {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-theme-accent-color-item-size, var(--panda-component-size-m, 30px));
		height: var(--panda-theme-accent-color-item-size, var(--panda-component-size-m, 30px));
		padding: var(--panda-theme-accent-color-item-padding, var(--panda-padding-m, 10px));
		cursor: pointer;

		border-radius: var(--panda-theme-accent-color-border-radius, 50%);
		box-sizing: border-box;
	}

	.accent-color.selected {
		box-shadow: var(--panda-theme-accent-color-item-outline, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}

	.primary-color,
	.secondary-color {
		position: absolute;
		display: block;
		inset: 1px;
		z-index: 0;

		transition: transform 0.4s ease-in-out;
		border-radius: var(--panda-theme-accent-color-item-border-radius, 50%);
		box-sizing: border-box;
	}
	
	.secondary-color {
		clip-path: polygon(100% 0, 0 100%, 100% 100%);
		z-index: 1;
	}

	.accent-color:hover .secondary-color {
		transform: rotate(25deg);
	}

	.hidden { display: none; }

	.selected-icon {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		inset: 0;
		z-index: 2;
		opacity: 0;

		--panda-icon-size: var(--panda-theme-accent-color-item-icon-size, var(--panda-icon-size-m, 16px));
		--panda-icon-color: var(--panda-theme-accent-color-item-icon-color, hsl(0deg 0% 100%));
	}

	.selected-icon.show { opacity: 1; }
`;