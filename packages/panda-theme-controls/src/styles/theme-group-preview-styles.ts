export const styles = /*css*/`
	:host {
		display: block;
		width: 100%;
	}
	
	.theme-preview {
		display: block;
		width: 100%;
		line-height: 0;
	}

	/* ============================================================================================================= */
	/* SVG COMPONENTS ============================================================================================== */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */
	
	/* LIGHT THEME */
	.light .background { fill: var(--panda-theme-preview-background-color, hsl(0deg 0% 95%)); }

	.light .app-background {
		fill: var(--panda-theme-preview-app-background-color, hsl(0deg 0% 100%));
		stroke: var(--panda-theme-preview-app-border-color, hsl(0deg 0% 80%));
	}

	.light .button { fill: var(--panda-theme-preview-button-color, hsl(0deg 0% 82%)); }

	.light .button.primary { fill: var(--panda-theme-preview-button-primary-color, hsl(209deg 78% 46%)); }

	.light .sidebar-background { fill: var(--panda-theme-preview-sidebar-background-color, hsl(0deg 3% 22%)); }

	.light .sidebar-item { fill: var(--panda-theme-preview-sidebar-item-color, hsl(0deg 3% 32%)); }

	.light .sidebar-item.selected { fill: var(--panda-theme-preview-sidebar-item-color-selected, hsl(0deg 3% 42%)); }

	.light .content {
		fill: var(--panda-theme-preview-content-color, hsl(0deg 0% 92%));
		stroke: var(--panda-theme-preview-content-border-color, hsl(0deg 0% 86%));
	}

	.light .top-bar-background-color { fill: var(--panda-theme-preview-top-bar-background-color, hsl(0deg 0% 92%)); }
	.light .top-bar-button-red { fill: var(--panda-theme-preview-top-bar-button-red, hsl(14deg 82% 53%)); }
	.light .top-bar-button-yellow { fill: var(--panda-theme-preview-top-bar-button-yellow, hsl(50deg 99% 56%)); }
	.light .top-bar-button-green { fill: var(--panda-theme-preview-top-bar-button-green, hsl(101deg 48% 51%)); }

	/* DARK THEME */
	.dark .background { fill: var(--panda-theme-preview-background-color-dark, hsl(274deg 30% 15%)); }

	.dark .app-background {
		fill: var(--panda-theme-preview-app-background-color-dark, hsl(274deg 30% 20%));
		stroke: var(--panda-theme-preview-app-border-color-dark, hsl(274deg 30% 30%));
	}

	.dark .button { fill: var(--panda-theme-preview-button-color-dark, hsl(274deg 30% 40%)); }

	.dark .button.primary { fill: var(--panda-theme-preview-button-primary-color-dark, hsl(344deg 100% 64%)); }

	.dark .sidebar-background { fill: var(--panda-theme-preview-sidebar-background-color-dark, hsl(274deg 30% 12%)); }

	.dark .sidebar-item { fill: var(--panda-theme-preview-sidebar-item-color-dark, hsl(274deg 30% 32%)); }

	.dark .sidebar-item.selected { fill: var(--panda-theme-preview-sidebar-item-color-selected-dark, hsl(274deg 30% 42%)); }

	.dark .content {
		fill: var(--panda-theme-preview-content-color-dark, hsl(274deg 30% 33%));
		stroke: var(--panda-theme-preview-content-border-color-dark, hsl(275deg 31% 15%));
	}

	.dark .top-bar-background-color { fill: var(--panda-theme-preview-top-bar-background-color-dark, hsl(274deg 30% 35%)); }
	.dark .top-bar-button-red { fill: var(--panda-theme-preview-top-bar-button-red-dark, hsl(14deg 82% 53%)); }
	.dark .top-bar-button-yellow { fill: var(--panda-theme-preview-top-bar-button-yellow-dark, hsl(50deg 99% 56%)); }
	.dark .top-bar-button-green { fill: var(--panda-theme-preview-top-bar-button-green-dark, hsl(101deg 48% 51%)); }
`;