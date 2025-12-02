export const styles = /*css*/`
	:host {
		pointer-events: auto;
	}

	.overlay {
		position: fixed;
		display: block;
		width: 100%;
		height: 100%;
		inset: 0px;
		z-index: 9998;
	}

	.dropdown {
		position: absolute;
		display: flex;
		flex-flow: column;
		max-height: 60vh;
		padding: var(--panda-select-dropdown-padding, var(--panda-padding-s, 5px));

		border-width: var(--panda-select-dropdown-border-width, var(--panda-dropdown-border-width, 1px));
		border-style: var(--panda-select-dropdown-border-style, var(--panda-dropdown-border-style, solid));
		border-color: var(--panda-select-dropdown-border-color, var(--panda-dropdown-border-color, hsl(0deg 0% 80%)));

		border-radius: var(--panda-select-dropdown-border-radius, var(--panda-dropdown-border-radius, 5px));
		background-color: var(--panda-select-dropdown-background-color, var(--panda-dropdown-background-color, hsl(0deg 0% 100%)));
		box-shadow: var(--panda-select-dropdown-elevation, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
		box-sizing: border-box;
		z-index: 9999;
	}

	.header {
		display: flex;
		flex-flow: column;
		gap: var(--panda-select-dropdown-header-gap, var(--panda-gap-m, 10px));
		padding: var(--panda-select-dropdown-header-padding, var(--panda-gap-m, 10px));
	}

	.filter {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-select-dropdown-filter-padding, 0px);
	}

	.buttons {
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		padding: var(--panda-select-dropdown-buttons-padding, 0px);
	}

	.list {
		display: flex;
		flex-flow: column;
		overflow: auto;
		gap: var(--panda-select-dropdown-list-gap, 0px);
		padding: var(--panda-select-dropdown-list-padding, 0px);
		outline: none;
	}

	.list-group {
		display: flex;
		flex-flow: column;
		gap: var(--panda-select-dropdown-list-group-gap, 0px);
		padding-top: var(--panda-select-dropdown-list-group-padding-top, var(--panda-padding-s, 5px));
		padding-bottom: var(--panda-select-dropdown-list-group-padding-bottom, var(--panda-padding-s, 5px));
		
		border-bottom-width: var(--panda-select-dropdown-list-group-border-bottom-width, 1px);
		border-bottom-style: var(--panda-select-dropdown-list-group-border-bottom-style, solid);
		border-bottom-color: var(--panda-select-dropdown-list-group-border-bottom-color, var(--panda-border-color, hsl(0deg 0% 80%)));
		box-sizing: border-box;
	}
	
	.list-group:first-child {
		padding-top: 0px;
	}

	.list-group:last-child {
		padding-bottom: 0px;
		border: none;
	}

	.list-group .group-header {
		display: flex;
		align-items: center;
		min-height: var(--panda-select-dropdown-list-group-header-height-size-m, 30px);
		padding-top: var(--panda-select-dropdown-list-group-header-padding-top, 8px);
		padding-bottom: var(--panda-select-dropdown-list-group-header-padding-bottom, 8px);
		padding-left: var(--panda-select-dropdown-list-group-header-padding-left, 10px);
		padding-right: var(--panda-select-dropdown-list-group-header-padding-right, 10px);
	
		color: var(--panda-select-dropdown-list-group-header-text-color, var(--panda-label-color, hsl(210deg 5% 40%)));
		font-size: var(--panda-select-dropdown-list-group-header-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-dropdown-list-group-header-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-dropdown-list-group-header-text-shadow, var(--panda-text-shadow, none));
		user-select: none;

		border-radius: var(--panda-select-dropdown-list-group-header-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-select-dropdown-list-group-header-background-color, var(--panda-background-color-100, hsl(0deg 0% 98%)));
		box-sizing: border-box;
	}
	
	.list .item {
		display: flex;
		flex-flow: row;
		align-items: center;
		outline: none;

		transition: var(--panda-select-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-width: var(--panda-select-dropdown-item-border-width, 1px);
		border-style: var(--panda-select-dropdown-item-border-style, solid);
		border-color: var(--panda-select-dropdown-item-border-color, transparent);
		border-radius: var(--panda-select-dropdown-item-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-select-dropdown-item-background-color, transparent);
		box-sizing: border-box;
	}

	.list .item .checkbox {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-select-dropdown-item-checkbox-size, 30px);
		height: 100%;
		/* CHECKBOX STYLES */
		--panda-checkbox-size-m: var(--panda-select-dropdown-item-checkbox-size, 30px);
	}

	.list .item .label {
		display: flex;
		flex-grow: 1;
		align-items: center;
		padding-top: var(--panda-select-dropdown-item-padding-top, 8px);
		padding-bottom: var(--panda-select-dropdown-item-padding-bottom, 8px);
		padding-left: var(--panda-select-dropdown-item-padding-left, 10px);
		padding-right: var(--panda-select-dropdown-item-padding-right, 10px);
		min-height: var(--panda-select-dropdown-item-height-size-m, 30px);
		
		color: var(--panda-select-dropdown-item-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-select-dropdown-item-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-dropdown-item-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-dropdown-item-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
		transition: var(--panda-select-transition, all 0.3s ease-in-out);

		box-sizing: border-box;
	}

	.callout {
		display: flex;
		align-items: center;
		gap: var(--panda-select-dropdown-callout-gap, var(--panda-gap-s, 5px));
		padding: var(--panda-select-dropdown-callout-padding, var(--panda-padding-m, 10px));
		
		border-width: var(--panda-select-dropdown-callout-border-width, 1px);
		border-style: var(--panda-select-dropdown-callout-border-style, solid);
		border-color: var(--panda-select-dropdown-callout-border-color, var(--panda-border-color, hsl(0deg 0% 80%)));
		
		border-radius: var(--panda-select-dropdown-callout-border-radius, var(--panda-border-radius-m, 10px));
		background-color: var(--panda-select-dropdown-callout-background-color, var(--panda-background-color-100, hsl(0deg 0% 98%)));
		box-sizing: border-box;
	}

	.callout .icon {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		--panda-icon-size: var(--panda-select-dropdown-callout-icon-size, var(--panda-icon-size-m, 20px));
		--panda-icon-color: var(--panda-select-dropdown-callout-icon-color, var(--panda-text-color, hsl(210deg 5% 25%)));
	}

	.callout .message {
		color: var(--panda-select-dropdown-callout-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-select-dropdown-callout-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-dropdown-callout-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-dropdown-callout-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	/* ===================================================================== */
	/* HOVER =============================================================== */
	/* ===================================================================== */

	.list .item:not(.disabled):hover {
		border-color: var(--panda-select-dropdown-item-border-color-hover, var(--panda-primary-color, hsl(209deg 78% 46%)));
		background-color: var(--panda-select-dropdown-item-background-color-hover, var(--panda-primary-color-10opc, hsl(209deg 78% 46% / 10%)));
	}

	.list .item:not(.disabled):hover .label {
		color: var(--panda-select-dropdown-item-text-color-hover, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	/* ===================================================================== */
	/* ACTIVE ============================================================== */
	/* ===================================================================== */

	.list .item:not(.disabled).active {
		border-color: var(--panda-select-dropdown-item-border-color-active, var(--panda-primary-color, hsl(209deg 78% 46%)));
		background-color: var(--panda-select-dropdown-item-background-color-active, var(--panda-primary-color-10opc, hsl(209deg 78% 46% / 10%)));
	}

	.list .item:not(.disabled).active .label {
		color: var(--panda-select-dropdown-item-text-color-active, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	/* ===================================================================== */
	/* SELECTED ============================================================ */
	/* ===================================================================== */

	.list .item:not(.disabled).selected {
		border-color: var(--panda-select-dropdown-item-border-color-selected, var(--panda-primary-color, hsl(209deg 78% 46%)));
		background-color: var(--panda-select-dropdown-item-background-color-selected, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}
	
	.list .item:not(.disabled).selected .label {
		color: var(--panda-select-dropdown-item-text-color-selected, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
	}

	.list .item .checkbox {
		--panda-icon-color: var(--panda-select-dropdown-item-checkbox-color-selected, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
	}

	/* ===================================================================== */
	/* SELECTED - ACTIVE =================================================== */
	/* ===================================================================== */

	.list .item:not(.disabled).selected.active {
		border-style: var(--panda-select-dropdown-item-border-style-selected-active, dashed);
		border-color: var(--panda-select-dropdown-item-border-color-selected-active, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
		background-color: var(--panda-select-dropdown-item-background-color-selected-active, var(--panda-primary-color, hsl(209deg 78% 46%)));
	}

	.list .item:not(.disabled).selected.active .label {
		color: var(--panda-select-dropdown-item-text-color-selected-active, var(--panda-primary-text-color, hsl(0deg 0% 100%)));
	}

	/* ===================================================================== */
	/* DISABLED ============================================================ */
	/* ===================================================================== */

	.list .item.disabled {
		cursor: not-allowed;
		border-style: var(--panda-select-dropdown-item-border-style-disabled, solid);
		border-color: var(--panda-select-dropdown-item-border-color-disabled, transparent);
		background-color: var(--panda-select-dropdown-item-background-color-disabled, var(--panda-background-color-500, hsl(0deg 0% 92%)));
	}

	.list .item.disabled .label {
		color: var(--panda-select-dropdown-item-text-color-disabled, var(--panda-text-color-disabled, hsl(210deg 5% 60%)));
		text-decoration: var(--panda-select-dropdown-item-text-decoration-disabled, line-through);
	}
`;