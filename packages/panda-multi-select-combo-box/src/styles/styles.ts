export const styles = /*css*/`
	:host {
		display: inline-block;
		width: 100%;
		outline: none;
		-webkit-font-smoothing: antialiased;
	}

	.label {
		display: block;
		overflow: hidden;
		line-height: var(--panda-select-label-line-height, var(--panda-label-line-height, 1.6em));
		color: var(--panda-select-label-color, var(--panda-label-color, hsl(0deg 0% 50%)));
		font-size: var(--panda-select-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-select-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-select-label-text-shadow, var(--panda-label-text-shadow, none));
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	.help-text {
		line-height: var(--panda-select-help-text-line-height, var(--panda-text-line-height, 1.6em));
		color: var(--panda-select-help-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-select-help-text-font-size, var(--panda-font-size-m, 16px));
		font-family: var(--panda-select-help-text-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-help-text-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	.error-message {
		line-height: var(--panda-select-error-message-line-height, var(--panda-text-line-height, 1.6em));
		color: var(--panda-select-error-message-color, var(--panda-action-color-alert, hsl(14deg 77% 62%)));
		font-size: var(--panda-select-error-message-font-size, var(--panda-font-size-m, 16px));
		font-family: var(--panda-select-error-message-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-select-error-message-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-select-border-radius-size-m, 10px);
		background-color: var(--panda-select-background-color-working, hsl(0deg 0% 100%));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-select-spinner-color, hsl(191deg 19% 23%));
		--panda-spinner-size: var(--panda-select-spinner-size-m, var(--panda-icon-size-m, 20px));
	}

	.select {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-select-height-size-m, var(--panda-component-size-m, 40px));
		outline: none;

		transition: all 0.3s ease-in-out;
		cursor: pointer;

		border-radius: var(--panda-select-border-radius-size-m, var(--panda-border-radius-m, 5px));
		border-width: var(--panda-select-border-width, 1px);
		border-style: var(--panda-select-border-style, solid);
		border-color: var(--panda-select-border-color, hsl(207deg 1% 85%));
		background-color: var(--panda-select-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-select-elevation, none);
		box-sizing: border-box;
		/* ICON STYLE */
		--panda-icon-color: var(--panda-select-icon-color, hsl(191deg 19% 23%));
		--panda-icon-size: var(--panda-select-slot-icon-size-m, var(--panda-icon-size-m, 20px));
	}

	.select .items-cont {
		position: relative;
		display: block;
		overflow: hidden;
		flex-grow: 1;
		padding-left: var(--panda-select-items-cont-padding-left-size-m, 5px);
		padding-right: var(--panda-select-items-cont-padding-right-size-m, 5px);
		box-sizing: border-box;
	}

	.select .items-cont.with-prefix {
		padding-left: var(--panda-select-slot-gap-size-m, 0px);
	}

	.select .items-cont.with-suffix {
		padding-right: var(--panda-select-slot-gap-size-m, 0px);
	}

	.select.with-message {
		margin-bottom: var(--panda-select-with-message-gap-size-m, var(--panda-padding-m, 10px));
	}

	.items {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		height: 100%;
		gap: var(--panda-select-items-gap-size-m, 5px);
		padding: var(--panda-select-items-padding-size-m, 2px);
		box-sizing: border-box;
		z-index: 1;
	}

	.item {
		user-select: none;
		color: var(--panda-select-text-color, var(--panda-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-select-font-size-size-m, var(--panda-font-size-m, 16px));
		font-family: var(--panda-select-font-family-size-m, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-select-font-weight-size-m, var(--panda-font-weight, 500));
		text-shadow: var(--panda-select-text-shadow-size-m, none);
	}

	.item.single-item {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-left: var(--panda-select-single-item-padding-left, 5px);
	}

	.item.chip {
		display: inline-flex;
		flex-flow: row nowrap;
		flex-shrink: 1;
		align-items: center;
		max-width: 100%;
		height: var(--panda-select-chip-height-size-m, 24px);

		transition: var(--panda-select-chip-transition, all 0.3s ease-in-out);

		border-radius: var(--panda-select-chip-border-radius-size-m, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-select-chip-background-color, hsl(210deg 5% 95%));
		box-sizing: border-box;
	}

	.item.chip .label {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0px var(--panda-select-chip-padding-right-size-m, 5px);
		overflow: hidden;
		
		color: var(--panda-select-chip-text-color, var(--panda-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-select-chip-font-size-m, var(--panda-font-size-m, 16px));
		font-family: var(--panda-select-chip-font-family-size-m, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-select-chip-font-weight-size-m, var(--panda-font-weight, 500));
		text-shadow: var(--panda-select-chip-text-shadow-size-m, none);
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
		box-sizing: border-box;
	}

	.item.chip .remove-button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-select-chip-height-size-m, 24px);
		height: 100%;
		min-height: var(--panda-select-chip-height-size-m, 24px);

		transition: var(--panda-select-chip-remove-button-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-radius: var(--panda-select-chip-remove-button-border-radius-size-m, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-select-chip-remove-button-background-color, transparent);
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-select-chip-remove-button-icon-color-hover, var(--panda-input-icon-color-hover, hsl(188deg 5% 75%)));
		--panda-icon-size: var(--panda-select-chip-remove-button-icon-size-m, 18px);
	}

	.item.chip .remove-button:hover {
		background-color: var(--panda-select-chip-remove-button-background-color-hover, hsl(0deg 0% 90%));
	}

	.icon,
	.clear-button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-select-icon-size-m, var(--panda-component-size-m, 40px));
		height: 100%;

		transition: transform 0.2s ease-in-out, background-color 0.3s ease-in-out;
		cursor: pointer;

		/* ICON STYLE */
		--panda-icon-color: var(--panda-select-icon-color, var(--panda-text-color, hsl(191deg 19% 23%)));
	}

	.icon.rotate {
		transform: rotate(180deg);
	}

	.clear-button {
		width: var(--panda-select-clear-button-size-m, 16px);
		z-index: 1;
	}

	.clear-button-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-select-clear-button-icon-padding-size-m, 0px);
		
		transition: var(--panda-select-clear-button-icon-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-radius: var(--panda-select-clear-button-icon-border-radius-size-m, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-select-clear-button-background-color, transparent);
		box-sizing: border-box;
		/* ICON STYLES */
		--panda-icon-color: var(--panda-select-clear-button-icon-color, var(--panda-select-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-select-clear-button-icon-size-m, var(--panda-icon-size-m, 20px));
	}

	.clear-button-icon:hover {
		background-color: var(--panda-select-clear-button-icon-background-color-hover, hsl(0deg 0% 95%));
		--panda-icon-color: var(--panda-select-clear-button-icon-color-hover, var(--panda-input-icon-color-hover, hsl(188deg 5% 75%)));
	}

	/* PLACEHOLDER STYLES */
	.placeholder {
		position: absolute;
		inset: 0;
		color: var(--panda-select-placeholder-color, var(--panda-placeholder-color, hsl(0deg 0% 80%)));
		font-size: var(--panda-select-placeholder-font-size-m, var(--panda-font-size-m, 14px));
		font-family: var(--panda-select-placeholder-font-family-size-m, "Poppins");
		font-weight: var(--panda-select-placeholder-font-weight-size-m, 500);
		text-shadow: var(--panda-select-placeholder-text-shadow-size-m, none);
		z-index: 0;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
	}

	::slotted([slot="prefix"]) {
		background-color: var(--panda-select-prefix-background-color, transparent);
	}

	::slotted([slot="suffix"]) {
		background-color: var(--panda-select-suffix-background-color, transparent);
	}

	::slotted(.icon) {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--panda-select-height-size-m, var(--panda-component-size-m, 40px));
		height: 100%;
		padding: 0px;
	}

	/* AUTO-EXPAND */
	.select.auto-expand {
		align-items: center;
		height: unset;
		min-height: var(--panda-select-height-size-m, var(--panda-component-size-m, 40px));
	}
	
	.select.auto-expand .items-cont {
		padding-top: var(--panda-select-items-padding-top-size-m, 5px);
		padding-bottom: var(--panda-select-items-padding-bottom-size-m, 5px);
	}

	.select.auto-expand .items-cont .items {
		flex-flow: row wrap;
	}

	.select.auto-expand .item.chip {
		height: unset;
		min-height: var(--panda-select-chip-height-size-m, 24px);
	}

	.select.auto-expand .item.chip .label {
		white-space: normal;
	}

	.select.auto-expand .single-item {
		white-space: normal;
	}

	/* HIDE DROPDOWN BUTTON */
	.select.hide-dropdown-button .icon {
		display: none;
	}

	.select.hide-dropdown-button .clear-button {
		width: var(--panda-select-icon-size-m, var(--panda-component-size-m, 40px));
	}

	/* ============================================================================================================= */
	/* COMPONENT STATE ============================================================================================= */
	/* ============================================================================================================= */

	/* HOVER */
	.select:not(.disabled):hover {
		border-color: var(--panda-select-border-color-hover, hsl(207deg 1% 85%));
		background-color: var(--panda-select-background-color-hover, hsl(0deg 0% 100%));
		box-shadow: var(--panda-select-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
	}

	.select.readonly:not(.disabled):hover .icon {
		--panda-icon-color: var(--panda-select-icon-color-hover, hsl(188deg 5% 75%));
	}

	/* READONLY */
	.select.readonly:not(.disabled) {
		cursor: auto;
		border-width: var(--panda-select-border-width-readonly, 1px);
		border-style: var(--panda-select-border-style-readonly, dashed);
		border-color: var(--panda-select-border-color-readonly, hsl(207deg 1% 85%));
		background-color: var(--panda-select-background-color-readonly, hsl(0deg 0% 100%));
		box-shadow: var(--panda-select-elevation-readonly, none);
	}

	.select.readonly:not(.disabled) .icon {
		cursor: not-allowed;
		--panda-icon-color: var(--panda-select-icon-color-readonly, hsl(188deg 5% 75%));
	}

	.select.readonly:not(.disabled) ::slotted([slot="prefix"]),
	.select.readonly:not(.disabled) ::slotted([slot="suffix"]) {
		color: var(--panda-select-text-color-readonly, hsl(191deg 19% 23%));
		text-shadow: var(--panda-select-text-shadow-readonly, none);
		background-color: var(--panda-select-slot-background-color-readonly, transparent);
		--panda-icon-color: var(--panda-select-icon-color-readonly, hsl(191deg 19% 23%));
	}

	/* FOCUSED */
	.select:not(.disabled):focus-visible,
	.select:not(.disabled):focus-visible:hover {
		color: var(--panda-select-text-color-focused, var(--panda-text-color, hsl(191deg 19% 23%)));
		text-shadow: var(--panda-select-text-shadow-focused, none);
		border-color: var(--panda-select-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-select-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-select-outline, var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%)));
	}

	/* MANDATORY */
	.select.mandatory:not(.disabled):not(.readonly) {
		border-width: var(--panda-select-border-width-mandatory, 1px);
		border-style: var(--panda-select-border-style-mandatory, solid);
		border-color: var(--panda-select-border-color-mandatory, hsl(29deg 100% 59%));
		background-color: var(--panda-select-background-color-mandatory, hsl(29deg 100% 59% / 10%));
		box-shadow: var(--panda-select-outline-mandatory, 0px 0px 2px 2px hsl(29deg 100% 59%));
		--panda-icon-color: var(--panda-select-icon-color-mandatory, hsl(29deg 100% 59%));
	}

	.select.mandatory:not(.disabled):not(.readonly) ::slotted([slot="prefix"]),
	.select.mandatory:not(.disabled):not(.readonly) ::slotted([slot="suffix"]) {
		background-color: var(--panda-input-slot-background-color-mandatory, transparent);
	}


	/* DISABLED */
	.select.disabled {
		cursor: not-allowed;
		border-color: var(--panda-select-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-select-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-select-elevation-disabled, none);
	}

	.select.disabled .icon {
		cursor: not-allowed;
		--panda-icon-color: var(--panda-select-icon-color-disabled, hsl(188deg 5% 75%));
	}

	.select.disabled .item.single-item {
		color: var(--panda-select-text-color-disabled, hsl(188deg 5% 60%));
		text-shadow: var(--panda-select-text-shadow-disabled, none);
	}

	.select.disabled .item.chip {
		background-color: var(--panda-select-chip-background-color-disabled, hsl(189deg 3% 89%));
	}

	.select.disabled .item.chip .label {
		color: var(--panda-select-chip-text-color-disabled, var(--panda-text-color-disabled, hsl(210deg 5% 60%)));
		text-shadow: var(--panda-select-chip-text-shadow-disabled, none);
	}

	.select.disabled ::slotted([slot="prefix"]),
	.select.disabled ::slotted([slot="suffix"]) {
		color: var(--panda-select-text-color-disabled, hsl(188deg 5% 60%));
		text-shadow: var(--panda-select-text-shadow-disabled, none);
		background-color: var(--panda-select-slot-background-color-disabled, transparent);
		--panda-icon-color: var(--panda-select-icon-color-disabled, hsl(188deg 5% 75%));
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* MANDATORY */
	:host([theme~="mandatory"]) .select:not(.disabled):not(.readonly) {
		border-width: var(--panda-select-border-width-mandatory, 1px);
		border-style: var(--panda-select-border-style-mandatory, solid);
		border-color: var(--panda-select-border-color-mandatory, hsl(29deg 100% 59%));
		border-color: var(--panda-select-border-color-mandatory, var(--panda-action-color-warn, hsl(29deg 100% 59%)));
		background-color: var(--panda-select-background-color-mandatory, hsl(29deg 100% 59% / 10%));
		box-shadow: var(--panda-select-outline-mandatory, 0px 0px 2px 2px hsl(29deg 100% 59%));
	}

	/* PLACEHOLDER STYLES */
	:host([theme~="mandatory"]) .select:not(.disabled):not(.readonly) .placeholder {
		color: var(--panda-select-placeholder-color-mandatory, hsl(29deg 100% 59%));
	}

	/* VALID */
	:host([theme~="valid"]) .select:not(.disabled):not(.readonly),
	:host([theme~="valid"]) .select:not(.disabled):not(.readonly):hover {
		color: var(--panda-select-color-valid, hsl(160deg 81% 43%));
		border-width: var(--panda-select-border-width-valid, 1px);
		border-style: var(--panda-select-border-style-valid, solid);
		border-color: var(--panda-select-border-color-valid, hsl(160deg 81% 43%));
		background-color: var(--panda-select-background-color-valid, hsl(160deg 81% 43% / 10%));
		box-shadow: var(--panda-select-outline-valid, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}
	
	/* INVALID */
	:host([theme~="invalid"]) .select:not(.disabled):not(.readonly),
	:host([theme~="invalid"]) .select:not(.disabled):not(.readonly):hover {
		color: var(--panda-select-color-invalid, hsl(14deg 77% 62%));
		border-width: var(--panda-select-border-width-invalid, 1px);
		border-style: var(--panda-select-border-style-invalid, solid);
		border-color: var(--panda-select-border-color-invalid, hsl(14deg 77% 62%));
		background-color: var(--panda-select-background-color-invalid, hsl(14deg 77% 62% / 10%));
		box-shadow: var(--panda-select-outline-invalid, 0px 0px 2px 2px hsl(14deg 77% 62%));
	}

	/* SIZE-S ====================================================================================================== */
	:host([theme~="size-s"]) .select {
		height: var(--panda-select-height-size-s, var(--panda-component-size-s, 32px));
		border-radius: var(--panda-select-border-radius-size-s, var(--panda-border-radius-s, 2px));
		/* ICON STYLE */
		--panda-icon-size: var(--panda-select-slot-icon-size-s, var(--panda-icon-size-s, 18px));
	}

	:host([theme~="size-s"]) .select .items-cont {
		padding-left: var(--panda-select-items-cont-padding-left-size-s, 5px);
		padding-right: var(--panda-select-items-cont-padding-right-size-s, 5px);
	}

	:host([theme~="size-s"]) .select .items-cont.with-prefix {
		padding-left: var(--panda-select-slot-gap-size-s, 0px);
	}

	:host([theme~="size-s"]) .select .items-cont.with-suffix {
		padding-right: var(--panda-select-slot-gap-size-s, 0px);
	}

	:host([theme~="size-s"]) .select.with-message {
		margin-bottom: var(--panda-select-with-message-gap-size-s, var(--panda-padding-s, 5px));
	}

	:host([theme~="size-s"]) .items {
		gap: var(--panda-select-items-gap-size-s, 5px);
		padding: var(--panda-select-items-padding-size-s, 2px);
	}

	:host([theme~="size-s"]) .item {
		font-size: var(--panda-select-font-size-size-s, var(--panda-font-size-s, 14px));
		font-family: var(--panda-select-font-family-size-s, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-select-font-weight-size-s, var(--panda-font-weight, 500));
		text-shadow: var(--panda-select-text-shadow-size-s, none);
	}

	:host([theme~="size-s"]) .item.chip {
		height: var(--panda-select-chip-height-size-s, 22px);
		border-radius: var(--panda-select-chip-border-radius-size-s, var(--panda-border-radius-s, 2px));
	}

	:host([theme~="size-s"]) .item.chip .label {
		padding: 0px var(--panda-select-chip-padding-right-size-s, 5px);
		font-size: var(--panda-select-chip-font-size-s, var(--panda-font-size-s, 14px));
	}

	:host([theme~="size-s"]) .item.chip .remove-button {
		width: var(--panda-select-chip-height-size-s, 22px);
		min-height: var(--panda-select-chip-height-size-s, 22px);
		border-radius: var(--panda-select-chip-remove-button-border-radius-size-s, var(--panda-border-radius-s, 2px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-select-chip-clear-button-icon-size-s, 14px);
	}

	:host([theme~="size-s"]) .icon {
		width: var(--panda-select-icon-size-s, var(--panda-component-size-s, 32px));
	}

	:host([theme~="size-s"]) .clear-button {
		width: var(--panda-select-clear-button-size-s, 12px);
	}

	:host([theme~="size-s"]) .hide-dropdown-button .clear-button {
		width: var(--panda-select-icon-size-s, var(--panda-component-size-s, 32px));
	}

	:host([theme~="size-s"]) .clear-button-icon {
		padding: var(--panda-select-clear-button-icon-padding-size-s, 0px);
		border-radius: var(--panda-select-clear-button-icon-border-radius-size-s, var(--panda-border-radius-s, 2px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-select-clear-button-icon-size-s, var(--panda-icon-size-s, 18px));
	}

	/* AUTO-EXPAND */
	:host([theme~="size-s"]) .select.auto-expand {
		height: unset;
		min-height: var(--panda-select-height-size-s, var(--panda-component-size-s, 32px));
	}

	:host([theme~="size-s"]) .select.auto-expand .items-cont {
		padding-top: var(--panda-select-items-padding-top-size-s, 2px);
		padding-bottom: var(--panda-select-items-padding-bottom-size-s, 2px);
	}

	:host([theme~="size-s"]) .select.auto-expand .item.chip {
		height: unset;
		min-height: var(--panda-select-chip-height-size-s, 22px);
	}

	/* SPINNER STYLES */
	:host([theme~="size-s"]) .spinner-cont {
		border-radius: var(--panda-select-border-radius-size-s, var(--panda-border-radius-s, 2px));
		--panda-spinner-size: var(--panda-select-spinner-size-s, var(--panda-icon-size-s, 18px));
	}
	
	/* PLACEHOLDER STYLES */
	:host([theme~="size-s"]) .placeholder {
		font-size: var(--panda-select-placeholder-font-size-s, 14px);
	}

	:host([theme~="size-s"])  ::slotted(.icon) {
		min-width: var(--panda-select-height-size-s, var(--panda-component-size-s, 32px));
	}

	/* SIZE-L ====================================================================================================== */
	:host([theme~="size-l"]) .select {
		height: var(--panda-select-height-size-l, var(--panda-component-size-l, 48px));
		border-radius: var(--panda-select-border-radius-size-l, var(--panda-border-radius-l, 10px));
		/* ICON STYLE */
		--panda-icon-size: var(--panda-select-slot-icon-size-l, var(--panda-icon-size-l, 24px));
	}

	:host([theme~="size-l"]) .select .items-cont {
		padding-left: var(--panda-select-items-cont-padding-left-size-l, 10px);
		padding-right: var(--panda-select-items-cont-padding-right-size-l, 10px);
	}

	:host([theme~="size-l"]) .select .items-cont.with-prefix {
		padding-left: var(--panda-select-slot-gap-size-l, 0px);
	}

	:host([theme~="size-l"]) .select .items-cont.with-suffix {
		padding-right: var(--panda-select-slot-gap-size-l, 0px);
	}

	:host([theme~="size-l"]) .select.with-message {
		margin-bottom: var(--panda-select-with-message-gap-size-l, var(--panda-padding-l, 15px));
	}

	:host([theme~="size-l"]) .items {
		gap: var(--panda-select-items-gap-size-l, 10px);
		padding: var(--panda-select-items-padding-size-l, 0px);
	}

	:host([theme~="size-l"]) .item {
		font-size: var(--panda-select-font-size-size-l, var(--panda-font-size-l, 16px));
		font-family: var(--panda-select-font-family-size-l, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-select-font-weight-size-l, var(--panda-font-weight, 500));
		text-shadow: var(--panda-select-text-shadow-size-l, none);
	}

	:host([theme~="size-l"]) .item.chip {
		height: var(--panda-select-chip-height-size-l, 36px);
		border-radius: var(--panda-select-chip-border-radius-size-l, var(--panda-border-radius-l, 10px));
	}

	:host([theme~="size-l"]) .item.chip .label {
		padding: 0px var(--panda-select-chip-padding-right-size-l, 10px);
		font-size: var(--panda-select-chip-font-size-l, var(--panda-font-size-l, 16px));
	}

	:host([theme~="size-l"]) .item.chip .remove-button {
		width: var(--panda-select-chip-height-size-l, 36px);
		min-height: var(--panda-select-chip-height-size-l, 36px);
		border-radius: var(--panda-select-chip-remove-button-border-radius-size-l, var(--panda-border-radius-l, 10px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-select-chip-clear-button-icon-size-l, 18px);
	}

	:host([theme~="size-l"]) .icon {
		width: var(--panda-select-icon-size-l, var(--panda-component-size-l, 48px));
	}

	:host([theme~="size-l"]) .clear-button {
		width: var(--panda-select-clear-button-size-l, 20px);
	}

	:host([theme~="size-l"]) .hide-dropdown-button .clear-button {
		width: var(--panda-select-icon-size-l, var(--panda-component-size-l, 48px));
	}

	:host([theme~="size-l"]) .clear-button-icon {
		padding: var(--panda-select-clear-button-icon-padding-size-l, 0px);
		border-radius: var(--panda-select-clear-button-icon-border-radius-size-l, var(--panda-border-radius-l, 10px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-select-clear-button-icon-size-l, var(--panda-icon-size-l, 24px));
	}

	/* AUTO-EXPAND */
	:host([theme~="size-l"]) .select.auto-expand {
		height: unset;
		min-height: var(--panda-select-height-size-l, var(--panda-component-size-l, 48px));
	}

	:host([theme~="size-l"]) .select.auto-expand .items-cont {
		padding-top: var(--panda-select-items-padding-top-size-l, 5px);
		padding-bottom: var(--panda-select-items-padding-bottom-size-l, 5px);
	}

	:host([theme~="size-l"]) .select.auto-expand .item.chip {
		height: unset;
		min-height: var(--panda-select-chip-height-size-l, 36px);
	}

	/* SPINNER STYLES */
	:host([theme~="size-l"]) .spinner-cont {
		border-radius: var(--panda-select-border-radius-size-l, var(--panda-border-radius-l, 10px));
		--panda-spinner-size: var(--panda-select-spinner-size-l, var(--panda-icon-size-l, 24px));
	}
	
	/* PLACEHOLDER STYLES */
	:host([theme~="size-l"]) .placeholder {
		font-size: var(--panda-select-placeholder-font-size-l, 16px);
	}

	:host([theme~="size-l"])  ::slotted(.icon) {
		min-width: var(--panda-select-height-size-l, var(--panda-component-size-l, 48px));
	}

	/* SIZE-XL ===================================================================================================== */
	:host([theme~="size-xl"]) .select {
		height: var(--panda-select-height-size-xl, var(--panda-component-size-xl, 56px));
		border-radius: var(--panda-select-border-radius-size-xl, var(--panda-border-radius-xl, 15px));
		/* ICON STYLE */
		--panda-icon-size: var(--panda-select-slot-icon-size-xl, var(--panda-icon-size-xl, 24px));
	}

	:host([theme~="size-xl"]) .select .items-cont {
		padding-left: var(--panda-select-items-cont-padding-left-size-xl, 10px);
		padding-right: var(--panda-select-items-cont-padding-right-size-xl, 10px);
	}

	:host([theme~="size-xl"]) .select .items-cont.with-prefix {
		padding-left: var(--panda-select-slot-gap-size-xl, 0px);
	}

	:host([theme~="size-xl"]) .select .items-cont.with-suffix {
		padding-right: var(--panda-select-slot-gap-size-xl, 0px);
	}

	:host([theme~="size-xl"]) .select.with-message {
		margin-bottom: var(--panda-select-with-message-gap-size-xl, var(--panda-padding-xl, 15px));
	}

	:host([theme~="size-xl"]) .items {
		gap: var(--panda-select-items-gap-size-xl, 10px);
		padding: var(--panda-select-items-padding-size-xl, 0px);
	}

	:host([theme~="size-xl"]) .item {
		font-size: var(--panda-select-font-size-size-xl, var(--panda-font-size-xl, 16px));
		font-family: var(--panda-select-font-family-size-xl, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-select-font-weight-size-xl, var(--panda-font-weight, 500));
		text-shadow: var(--panda-select-text-shadow-size-xl, none);
	}

	:host([theme~="size-xl"]) .item.chip {
		height: var(--panda-select-chip-height-size-xl, 36px);
		border-radius: var(--panda-select-chip-border-radius-size-xl, var(--panda-border-radius-xl, 10px));
	}

	:host([theme~="size-xl"]) .item.chip .label {
		padding: 0px var(--panda-select-chip-padding-right-size-xl, 10px);
		font-size: var(--panda-select-chip-font-size-xl, var(--panda-font-size-xl, 16px));
	}

	:host([theme~="size-xl"]) .item.chip .remove-button {
		width: var(--panda-select-chip-height-size-xl, 36px);
		min-height: var(--panda-select-chip-height-size-xl, 36px);
		border-radius: var(--panda-select-chip-remove-button-border-radius-size-xl, var(--panda-border-radius-xl, 10px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-select-chip-clear-button-icon-size-xl, 18px);
	}

	:host([theme~="size-xl"]) .icon {
		width: var(--panda-select-icon-size-xl, var(--panda-component-size-xl, 48px));
	}

	:host([theme~="size-xl"]) .clear-button {
		width: var(--panda-select-clear-button-size-xl, 24px);
	}

	:host([theme~="size-xl"]) .hide-dropdown-button .clear-button {
		width: var(--panda-select-icon-size-xl, var(--panda-component-size-xl, 48px));
	}

	:host([theme~="size-xl"]) .clear-button-icon {
		padding: var(--panda-select-clear-button-icon-padding-size-xl, 0px);
		border-radius: var(--panda-select-clear-button-icon-border-radius-size-xl, var(--panda-border-radius-xl, 10px));
		/* ICON STYLES */
		--panda-icon-size: var(--panda-select-clear-button-icon-size-xl, var(--panda-icon-size-xl, 24px));
	}

	/* AUTO-EXPAND */
	:host([theme~="size-xl"]) .select.auto-expand {
		height: unset;
		min-height: var(--panda-select-height-size-xl, var(--panda-component-size-xl, 56px));
	}

	:host([theme~="size-xl"]) .select.auto-expand .items-cont {
		padding-top: var(--panda-select-items-padding-top-size-xl, 5px);
		padding-bottom: var(--panda-select-items-padding-bottom-size-xl, 5px);
	}

	:host([theme~="size-xl"]) .select.auto-expand .item.chip {
		height: unset;
		min-height: var(--panda-select-chip-height-size-xl, 36px);
	}

	/* SPINNER STYLES */
	:host([theme~="size-xl"]) .spinner-cont {
		border-radius: var(--panda-select-border-radius-size-xl, var(--panda-border-radius-xl, 10px));
		--panda-spinner-size: var(--panda-select-spinner-size-xl, var(--panda-icon-size-xl, 24px));
	}
	
	/* PLACEHOLDER STYLES */
	:host([theme~="size-xl"]) .placeholder {
		font-size: var(--panda-select-placeholder-font-size-xl, 16px);
		--panda-text-slider-padding-left: 15px;
		--panda-text-slider-padding-right: 15px;
	}

	:host([theme~="size-xl"])  ::slotted(.icon) {
		min-width: var(--panda-select-height-size-xl, var(--panda-component-size-xl, 56px));
	}
`;
