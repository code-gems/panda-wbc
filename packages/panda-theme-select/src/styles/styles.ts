export const styles = /*css*/`
	:host {
		display: flex;
		-webkit-font-smoothing: antialiased;
	}

	.theme-select {
		display: flex;
		flex-flow: row wrap;
		gap: var(--panda-theme-select-gap, 10px);
		background-color: var(--panda-theme-select-background-color, hsl(0deg 0% 100%));
	}

	.theme-select > .theme-item {
		display: flex;
		flex-flow: column;
		padding: var(--panda-theme-select-item-padding, 10px);
		gap: var(--panda-theme-select-item-gap, 10px);
		
		transition: var(--panda-theme-item-transition, all 400ms ease-in-out);
		cursor: pointer;

		border-style: var(--panda-theme-select-item-border-style, solid);
		border-width: var(--panda-theme-select-item-border-width, 1px);
		border-color: var(--panda-theme-select-item-border-color, transparent);
		border-radius: var(--panda-theme-select-item-border-radius, 5px);
		box-sizing: border-box;
	}

	.theme-select > .theme-item:hover {
		border-style: var(--panda-theme-select-item-border-style-hover, solid);
		border-width: var(--panda-theme-select-item-border-width-hover, 1px);
		border-color: var(--panda-theme-select-item-border-color-hover, hsl(0deg 0% 85%));
	}

	.theme-select > .theme-item.selected {
		border-style: var(--panda-theme-select-item-border-style-hover, solid);
		border-width: var(--panda-theme-select-item-border-width-hover, 1px);
		border-color: var(--panda-theme-select-item-border-color-hover, hsl(209deg 78% 46%));
		box-shadow: var(--panda-theme-select-item-box-shadow-selected, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}

	.theme-select > .theme-item > .preview {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-theme-select-item-preview-width, 175px);
		overflow: hidden;

		border-width: var(--panda-theme-select-item-preview-border-width, 1px);
		border-style: var(--panda-theme-select-item-preview-border-style, solid);
		border-color: var(--panda-theme-select-item-preview-border-color, var(--panda-border-color, hsl(209deg 78% 46%)));
		border-radius: var(--panda-theme-select-item-preview-border-radius, 5px);
	}

	.theme-select > .theme-item > .footer {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-theme-select-footer-gap, 10px);
	}

	.theme-select > .theme-item > .footer > .label {
		flex-grow: 1;
		display: flex;
		align-items: center;

		line-height: var(--panda-theme-select-item-label-line-height, 1.2em);
		color: var(--panda-theme-select-item-label-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-theme-select-item-label-font-size, 14px);
		font-family: var(--panda-theme-select-item-label-font-family, "Poppins");
		text-shadow: var(--panda-theme-select-item-label-text-shadow, none);
		user-select: none;
	}

	.theme-select > .theme-item > .footer > .icon {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		opacity: 0;
		transition: var(--panda-theme-item-transition, all 400ms ease-in-out);

		--panda-icon-size: var(--panda-theme-select-item-icon-size, 20px);
		--panda-icon-color: var(--panda-theme-select-item-icon-color, hsl(209deg 78% 46%));
	}
	
	.theme-select > .theme-item.selected > .footer > .icon {
		opacity: 1;
	}

`;

export const previewStyles = /*css*/`
	:host {
		display: block;
		width: 100%;
	}
	
	.theme-preview {
		display: block;
		width: 100%;
		line-height: 0;
	}

	.dark { display: none; }
	.system { display: none; }

	/* ============================================================================================================= */
	/* SVG COMPONENTS ============================================================================================== */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */
	
	/* LIGHT THEME */
	.light .background { fill: var(--panda-theme-preview-background-color, hsl(0deg 0% 95%)); }

	.light .app-background { fill: var(--panda-theme-preview-app-background-color, hsl(0deg 0% 92%)); }

	.light .app-background-border { fill: var(--panda-theme-preview-app-background-border-color, hsl(0deg 0% 85%)); }

	.light .tabs-background { fill: var(--panda-theme-preview-tabs-background-color, hsl(0deg 0% 100%)); }

	.light .tab { fill: var(--panda-theme-preview-tab-color, hsl(0deg 0% 92%)); }

	.light .tab.selected { fill: var(--panda-theme-preview-tab-selected-color, hsl(0deg 0% 82%)); }

	.light .tab.primary { fill: var(--panda-theme-preview-tab-primary-color, hsl(209deg 78% 46%)); }

	.light .sidebar-background { fill: var(--panda-theme-preview-sidebar-background-color, hsl(0deg 3% 22%)); }

	.light .sidebar-item { fill: var(--panda-theme-preview-sidebar-item-color, hsl(0deg 3% 32%)); }

	.light .sidebar-item.selected { fill: var(--panda-theme-preview-sidebar-item-selected-color, hsl(0deg 3% 42%)); }

	.light .content { fill: var(--panda-theme-preview-content-color, hsl(0deg 0% 100%)); }

	.light .top-bar-background-color { fill: var(--panda-theme-preview-top-bar-background-color, hsl(0deg 0% 92%)); }

	/* DARK THEME */
	.dark .background { fill: var(--panda-theme-preview-background-color-dark, hsl(274deg 30% 15%)); }

	.dark .app-background { fill: var(--panda-theme-preview-app-background-color-dark, hsl(274deg 30% 20%)); }

	.dark .app-background-border { fill: var(--panda-theme-preview-app-background-border-color-dark, hsl(274deg 30% 30%)); }

	.dark .tabs-background { fill: var(--panda-theme-preview-tabs-background-color-dark, hsl(274deg 30% 25%)); }

	.dark .tab { fill: var(--panda-theme-preview-tab-color-dark, hsl(274deg 30% 35%)); }

	.dark .tab.selected { fill: var(--panda-theme-preview-tab-selected-color-dark, hsl(274deg 30% 40%)); }

	.dark .tab.primary { fill: var(--panda-theme-preview-tab-primary-color-dark, hsl(344deg 100% 64%)); }

	.dark .sidebar-background { fill: var(--panda-theme-preview-sidebar-background-color-dark, hsl(274deg 30% 12%)); }

	.dark .sidebar-item { fill: var(--panda-theme-preview-sidebar-item-color-dark, hsl(274deg 30% 32%)); }

	.dark .sidebar-item.selected { fill: var(--panda-theme-preview-sidebar-item-selected-color-dark, hsl(274deg 30% 42%)); }

	.dark .content { fill: var(--panda-theme-preview-content-color-dark, hsl(274deg 30% 30%)); }

	.dark .top-bar-background-color { fill: var(--panda-theme-preview-top-bar-background-color-dark, hsl(274deg 30% 35%)); }

	:host([theme="dark"]) .light { display: none; }
	:host([theme="dark"]) .dark { display: block; }
	
	:host([theme="system"]) .dark { display: none; }
	:host([theme="system"]) .system { display: block; }
`;
