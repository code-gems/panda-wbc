import { css } from "lit";

export const styles = css`
	:host {
		display: inline;
	}
	
	.label {
		display: block;
		line-height: 1.6em;

		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-label-font-size, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	.group {
		position: relative;
		display: inline-flex;
		flex-flow: row nowrap;

		border: 1px solid var(--panda-border-color-disabled, hsl(0deg 0% 90%));
		border-radius: var(--panda-border-radius-m, 5px);
		background-color: var(--panda-button-group-background-color-disabled);
	}

	.group.working > panda-button-group-item {
		visibility: hidden;
	}
`;

export const itemStyles = css`
	:host {
		display: flex;
		flex-flow: row nowrap;
		flex-shrink: 0;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0;
		justify-content: center;
		align-items: center;

		background-color: var(--panda-input-background-color-disabled, hsl(0deg 0% 92%));
	}

	.item {
		position: relative;
		display: flex;
		flex-flow: row nowrap;

		transition: all 200ms ease-in-out;
		cursor: pointer;
		outline: none;

		border: 1px solid var(--panda-border-color, hsl(0deg 0% 85%));
		border-right: none;
		background-color: var(--panda-button-group-background-color);
		z-index: 0;
	}
	
	.item .label {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0px var(--panda-padding-m, 10px);
		min-height: var(--panda-component-size-m, 32px);

		color: var(--panda-button-group-text-color, hsl(210deg 5% 25%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family-bold, "Poppins");
		text-shadow: var(--panda-button-group-text-shadow, "none");
		user-select: none;

		transition: all 200ms ease-in-out;
	}
	
	.item .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-component-size-m, 32px);
		height: 100%;
	}

	/* COMPONENT STATE ===================================================== */
	
	/* HOVER */
	.item:not(.disabled):hover {
		color: var(--panda-button-group-text-color-disabled);
		background-color: var(--panda-button-group-background-color-disabled);
	}

	/* ACTIVE */
	.item.active:not(.disabled) {
		background-color: var(--panda-button-group-background-color-active);
	}

	.item.active:not(.disabled) .label {
		color: var(--panda-button-group-text-color-active);
	}

	/* SELECTED */
	.item.selected:not(.disabled) {
		background-color: var(--panda-button-group-background-color-selected);
		/* box-shadow: var(--panda-elevation-m); */
	}

	.item:not(.disabled):not(.working).selected::before {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		content: " ";

		box-shadow: var(--panda-elevation-m);
		z-index: -1;
	}

	.item.selected:not(.disabled) .label {
		color: var(--panda-button-group-text-color-selected);
		text-shadow: var(--panda-button-group-text-shadow-selected);
	}

	/* FOCUS */
	.item:focus-visible,
	.item.selected:focus-visible {
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(216deg 88% 60% / 40%));
		z-index: 1;
	}
	
	/* WORKING */
	.item.working {
		cursor: not-allowed;
		background-color: var(--panda-button-group-background-color-disabled);
	}

	/* DISABLED */
	.item.disabled {
		cursor: not-allowed;
		background-color: var(--panda-button-group-background-color-disabled);
	}
	
	.item.disabled .label {
		color: var(--panda-button-group-text-color-disabled);
	}

	/* PREFIX / SUFFIX ===================================================== */
	
	::slotted([slot~="prefix"]),
	::slotted([slot~="suffix"]) {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	::slotted(.prefix),
	::slotted(.suffix) {
		padding: var(--panda-input-padding, 0px 10px);
		
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		user-select: none;
		
		box-sizing: border-box;
	}

	/* PREFIX / SUFFIX ICON */

	::slotted([slot~="prefix-icon"]),
	::slotted([slot~="suffix-icon"]) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-height, 30px);
		height: 100%;
		flex-shrink: 0;

		--panda-icon-width: var(--panda-icon-size-s, 18px);
		--panda-icon-height: var(--panda-icon-size-s, 18px);
	}

	::slotted([slot~="prefix-icon"]) {
		margin-right: calc(var(--panda-padding-m, 10px) * -1);
	}

	::slotted([slot~="suffix-icon"]) {
		margin-left: calc(var(--panda-padding-m, 10px) * -1);
	}

	/* PREFIX / SUFFIX BADGE */

	slot[name="prefix-badge"],
	slot[name="suffix-badge"] {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	::slotted([slot~="prefix-badge"]),
	::slotted([slot~="suffix-badge"]) {
		min-width: var(--panda-component-size-s);
		padding: var(--panda-button-group-badge-padding, 3px 5px);
		
		color: var(--panda-button-group-badge-text-color, hsl(0deg 0% 100%));
		font-size: var(--panda-button-group-badge-font-size, var(--panda-font-size-s));
		font-family: var(--panda-button-group-badge-font-family, var(--panda-font-family));
		text-shadow: var(--panda-button-group-badge-text-shadow, 0px 1px 1px hsl(0deg 0% 0%));
		text-align: center;

		border-radius: var(--panda-button-group-badge-border-radius, 12px);
		background-color: var(--panda-button-group-badge-background-color, hsl(336deg 80% 49%));
		box-sizing: border-box;
	}

	::slotted([slot~="prefix-badge"]) {
		margin-left: var(--panda-padding-m, 10px);
	}

	::slotted([slot~="suffix-badge"]) {
		margin-right: var(--panda-padding-m, 10px);
	}

	::slotted([slot~="prefix-badge"].selected),
	::slotted([slot~="suffix-badge"].selected) {
		color: var(--panda-button-group-badge-text-color-selected, hsl(0deg 0% 60%));
		text-shadow: var(--panda-button-group-badge-text-shadow-selected, 0px 1px 1px hsl(0deg 0% 0%));
		background-color: var(--panda-button-group-badge-background-color-selected, hsl(0deg 0% 92%));
	}

	::slotted([slot~="prefix-badge"].disabled),
	::slotted([slot~="suffix-badge"].disabled) {
		color: var(--panda-button-group-badge-text-color-disabled, hsl(0deg 0% 60%));
		text-shadow: var(--panda-button-group-badge-text-shadow-disabled, "none");
		background-color: var(--panda-button-group-badge-background-color-disabled, hsl(0deg 0% 92%));
	}

	/* THEMES ============================================================== */

	/* FIRST-ITEM */
	:host([theme~="first-item"]) .item,
	:host([theme~="first-item"]) .spinner-cont {
		border-top-left-radius: var(--panda-border-radius-m, 5px);
		border-bottom-left-radius: var(--panda-border-radius-m, 5px);
	}

	/* LAST-ITEM */
	:host([theme~="last-item"]) .item,
	:host([theme~="last-item"]) .spinner-cont {
		border-top-right-radius: var(--panda-border-radius-m, 5px);
		border-bottom-right-radius: var(--panda-border-radius-m, 5px);
	}

	:host([theme~="last-item"]) .item {
		border-right: 1px solid var(--panda-border-color, hsl(0deg 0% 85%));
	}

	/* PRIMARY */


`;
