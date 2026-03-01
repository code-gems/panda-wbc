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

	.dark { display: none; }
	.system { display: none; }

	/* ============================================================================================================= */
	/* SVG COMPONENTS ============================================================================================== */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */
	
	/* LIGHT THEME */
	.light .background { fill: var(--panda-theme-preview-background-color, hsl(0deg 0% 95%)); }
	.light .app-background {
		fill: var(--panda-theme-preview-app-background-color, hsl(0deg 0% 92%));
		stroke: var(--panda-theme-preview-app-border-color, hsl(0deg 0% 80%));
	}

	.light .tab { fill: var(--panda-theme-preview-tab-color, hsl(0deg 0% 92%)); }
	.light .tab.selected { fill: var(--panda-theme-preview-tab-color-selected, hsl(0deg 0% 82%)); }
	.light .tab.primary { fill: var(--panda-theme-preview-tab-color-primary, hsl(209deg 78% 46%)); }
	.light .tabs-background { fill: var(--panda-theme-preview-tabs-background-color, hsl(0deg 0% 100%)); }

	.light .sidebar-item { fill: var(--panda-theme-preview-sidebar-item-color, hsl(0deg 3% 32%)); }
	.light .sidebar-item.selected { fill: var(--panda-theme-preview-sidebar-item-color-selected, hsl(0deg 3% 42%)); }
	.light .sidebar-background { fill: var(--panda-theme-preview-sidebar-background-color, hsl(0deg 3% 22%)); }

	.light .content {
		fill: var(--panda-theme-preview-content-color, hsl(0deg 0% 100%));
		stroke: var(--panda-theme-preview-content-border-color, hsl(0deg 0% 92%));
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

	.dark .tab { fill: var(--panda-theme-preview-tab-color-dark, hsl(274deg 30% 35%)); }
	.dark .tab.selected { fill: var(--panda-theme-preview-tab-color-selected-dark, hsl(274deg 30% 40%)); }
	.dark .tab.primary { fill: var(--panda-theme-preview-tab-color-primary-dark, hsl(344deg 100% 64%)); }
	.dark .tabs-background { fill: var(--panda-theme-preview-tabs-background-color-dark, hsl(274deg 30% 25%)); }
	
	.dark .sidebar-item { fill: var(--panda-theme-preview-sidebar-item-color-dark, hsl(274deg 30% 32%)); }
	.dark .sidebar-item.selected { fill: var(--panda-theme-preview-sidebar-item-color-selected-dark, hsl(274deg 30% 42%)); }
	.dark .sidebar-background { fill: var(--panda-theme-preview-sidebar-background-color-dark, hsl(274deg 30% 12%)); }
	
	.dark .content {
		fill: var(--panda-theme-preview-content-color-dark, hsl(274deg 30% 30%));
		stroke: var(--panda-theme-preview-content-border-color-dark, hsl(275deg 31% 12%));
	}
	
	.dark .top-bar-background-color { fill: var(--panda-theme-preview-top-bar-background-color-dark, hsl(274deg 30% 35%)); }
	.dark .top-bar-button-red { fill: var(--panda-theme-preview-top-bar-button-red-dark, hsl(14deg 82% 53%)); }
	.dark .top-bar-button-yellow { fill: var(--panda-theme-preview-top-bar-button-yellow-dark, hsl(50deg 99% 56%)); }
	.dark .top-bar-button-green { fill: var(--panda-theme-preview-top-bar-button-green-dark, hsl(101deg 48% 51%)); }

	:host([theme="dark"]) .light { display: none; }
	:host([theme="dark"]) .dark { display: block; }
	
	:host([theme="system"]) .dark { display: none; }
	:host([theme="system"]) .system { display: block; }
`;