export const styles = /*css*/`
	:host {
		display: flex;
		width: var(--panda-theme-mode-switcher-size, var(--panda-component-size-m, 40px));
		height: var(--panda-theme-mode-switcher-size, var(--panda-component-size-m, 40px));
		box-sizing: border-box;
	}

	.switcher-cont {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-theme-mode-switcher-size, var(--panda-component-size-m, 40px));
		height: var(--panda-theme-mode-switcher-size, var(--panda-component-size-m, 40px));
		overflow: hidden;

		transition: all 400ms ease-in-out;

		border-radius: var(--panda-theme-mode-switcher-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-theme-mode-switcher-background-color, transparent);
		box-shadow: var(--panda-theme-mode-switcher-elevation, none);
		box-sizing: border-box;
	}

	.switcher-cont:hover {
		background-color: var(--panda-theme-mode-switcher-background-color-hover, transparent);
		box-shadow: var(--panda-theme-mode-switcher-elevation-hover, none);
	}

	.switcher-cont > .switcher {
		position: absolute;
		inset: 0px;

		transition: top 400ms ease-in-out;
	}

	.switcher-cont.flip > .switcher {
		top: -100%;
	}

	.switcher-cont > .switcher > .btn {
		display: flex;
		width: var(--panda-theme-mode-switcher-size, var(--panda-component-size-m, 40px));
		height: var(--panda-theme-mode-switcher-size, var(--panda-component-size-m, 40px));
		justify-content: center;
		align-items: center;

		cursor: pointer;
	}
`;