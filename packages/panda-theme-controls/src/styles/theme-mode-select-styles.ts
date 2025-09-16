export const styles = /*css*/`
	:host {
		display: flex;
		-webkit-font-smoothing: antialiased;
	}

	.theme-select {
		display: flex;
		flex-flow: row wrap;
		gap: var(--panda-theme-mode-select-gap, 10px);
		background-color: var(--panda-theme-mode-select-background-color, hsl(0deg 0% 100%));
	}

	.theme-select > .theme-item {
		display: flex;
		flex-flow: column;
		width: var(--panda-theme-mode-select-item-width, 200px);
		padding: var(--panda-theme-mode-select-item-padding, 0px);
		
		transition: var(--panda-theme-item-transition, all 400ms ease-in-out);
		cursor: pointer;

		border-style: var(--panda-theme-mode-select-item-border-style, solid);
		border-width: var(--panda-theme-mode-select-item-border-width, 1px);
		border-color: var(--panda-theme-mode-select-item-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-radius: var(--panda-theme-mode-select-item-border-radius, var(--panda-border-radius-m, 5px));

		background-color: var(--panda-theme-mode-select-item-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-theme-mode-select-item-box-shadow, none);
		box-sizing: border-box;
	}
	
	.theme-select > .theme-item:hover {
		border-style: var(--panda-theme-mode-select-item-border-style-hover, solid);
		border-width: var(--panda-theme-mode-select-item-border-width-hover, 1px);
		border-color: var(--panda-theme-mode-select-item-border-color-hover, var(--panda-border-color-hover, hsl(207deg 1% 80%)));
		background-color: var(--panda-theme-mode-select-item-background-color-hover, hsl(0deg 0% 100%));
		box-shadow: var(--panda-theme-mode-select-item-box-shadow-hover, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
	}

	.theme-select > .theme-item.selected {
		border-style: var(--panda-theme-mode-select-item-border-style-selected, solid);
		border-width: var(--panda-theme-mode-select-item-border-width-selected, 1px);
		border-color: var(--panda-theme-mode-select-item-border-color-selected, var(--panda-primary-color, hsl(209deg 78% 46%)));
		box-shadow: var(--panda-theme-mode-select-item-box-shadow-selected, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}

	.theme-select > .theme-item > .header {
		display: flex;
		flex-flow: row nowrap;
		padding: var(--panda-theme-mode-select-item-header-padding, 10px);
		gap: var(--panda-theme-mode-select-item-header-gap, var(--panda-padding-m, 10px));

		border-bottom-style: var(--panda-theme-mode-select-item-header-border-style, solid);
		border-bottom-width: var(--panda-theme-mode-select-item-header-border-width, 1px);
		border-bottom-color: var(--panda-theme-mode-select-item-header-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-radius: var(--panda-theme-mode-select-item-header-border-radius, var(--panda-border-radius-m, 5px) var(--panda-border-radius-m, 5px) 0px 0px);
		background-color: var(--panda-theme-mode-select-item-header-background-color, hsl(0deg 0% 96%));
		box-sizing: border-box;
	}

	.theme-select > .theme-item > .header > .icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--panda-theme-mode-select-item-header-icon-size, var(--panda-icon-size-m, 20px));
		height: 100%;
	}

	.theme-select > .theme-item > .header > .title {
		display: flex;
		align-items: center;
		flex-grow: 1;
		
		color: var(--panda-theme-mode-select-item-header-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-family: var(--panda-theme-mode-select-item-header-font-family, var(--panda-font-family, "Poppins"));
		font-style: var(--panda-theme-mode-select-item-header-font-style, normal);
		font-size: var(--panda-theme-mode-select-item-header-font-size, var(--panda-font-size-m, 16px));
		line-height: var(--panda-theme-mode-select-item-header-line-height, 1.2em);
		user-select: none;
	}

	.theme-select > .theme-item > .body {
		padding: var(--panda-theme-mode-select-item-preview-padding, 10px);
		box-sizing: border-box;
	}

	.theme-select > .theme-item > .body > .preview {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		overflow: hidden;

		border-width: var(--panda-theme-mode-select-item-preview-border-width, 1px);
		border-style: var(--panda-theme-mode-select-item-preview-border-style, solid);
		border-color: var(--panda-theme-mode-select-item-preview-border-color, var(--panda-border-color, hsl(209deg 78% 46%)));
		border-radius: var(--panda-theme-mode-select-item-preview-border-radius, 5px);
		box-sizing: border-box;
	}

	.theme-select > .theme-item > .footer {
		display: flex;
		flex-flow: column;
	}

	.theme-select > .theme-item > .footer > .header {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		padding: var(--panda-theme-mode-select-item-footer-padding, 10px);
		gap: var(--panda-theme-mode-select-item-footer-header-gap, var(--panda-padding-m, 10px));

		border-top-style: var(--panda-theme-mode-select-item-footer-border-style, solid);
		border-top-width: var(--panda-theme-mode-select-item-footer-border-width, 1px);
		border-top-color: var(--panda-theme-mode-select-item-footer-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		background-color: var(--panda-theme-mode-select-item-footer-background-color, hsl(0deg 0% 96%));

		border-bottom-style: var(--panda-theme-mode-select-item-footer-border-style, solid);
		border-bottom-width: var(--panda-theme-mode-select-item-footer-border-width, 1px);
		border-bottom-color: var(--panda-theme-mode-select-item-footer-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		background-color: var(--panda-theme-mode-select-item-footer-background-color, hsl(0deg 0% 96%));
		box-sizing: border-box;
	}

	.theme-select > .theme-item > .footer > .header > .title {
		flex-grow: 1;
		display: flex;
		align-items: center;

		color: var(--panda-theme-mode-select-item-footer-header-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-theme-mode-select-item-footer-header-font-size, 14px);
		font-family: var(--panda-theme-mode-select-item-footer-header-font-family, "Poppins");
		text-shadow: var(--panda-theme-mode-select-item-footer-header-text-shadow, none);
		line-height: var(--panda-theme-mode-select-item-footer-header-line-height, 1.2em);
		user-select: none;
	}

	.theme-select > .theme-item > .footer > .header > .icon {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
		transition: var(--panda-theme-item-transition, all 400ms ease-in-out);

		--panda-icon-size: var(--panda-theme-mode-select-item-icon-size, 20px);
		--panda-icon-color: var(--panda-theme-mode-select-item-icon-color, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}
	
	.theme-select > .theme-item.selected > .footer > .header > .icon {
		opacity: 1;
	}

	.theme-select > .theme-item > .footer > .description {
		padding: var(--panda-theme-mode-select-item-footer-description-padding, var(--panda-padding-m, 10px));

		color: var(--panda-theme-mode-select-item-footer-description-color, var(--panda-label-color, hsl(210deg 5% 45%)));
		font-size: var(--panda-theme-mode-select-item-footer-description-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-theme-mode-select-item-footer-description-font-family, var(--panda-label-font-family, "Poppins"));
	}
`;
