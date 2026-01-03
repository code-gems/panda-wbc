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
		line-height: var(--panda-label-line-height, 1.5rem);
		color: var(--panda-label-color, hsl(0deg 0% 50%));
		font-size: var(--panda-font-size-s, 12px);
		font-family: var(--panda-label-font-family, "Poppins");
		text-shadow: var(--panda-label-text-shadow, none);
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	.footer {
		display: flex;
		flex-flow: row nowrap;
		justify-content: end;
		gap: var(--panda-input-footer-gap, 10px);
		width: 100%;
	}

	.footer .help-text {
		flex-grow: 1;
		margin-top: var(--panda-input-footer-gap, 10px);
		line-height: var(--panda-input-help-text-line-height, 1.2rem);
		color: var(--panda-input-help-text-color, hsl(191deg 19% 23%));
		font-size: var(--panda-input-help-text-font-size, 14px);
		font-family: var(--panda-input-help-text-font-family, "Poppins");
		text-shadow: var(--panda-input-help-text-text-shadow, none);
	}
	
	.footer .counter {
		flex-shrink: 0;
		height: 1.5rem;
		margin-top: var(--panda-input-footer-gap, 10px);
		
		line-height: var(--panda-input-counter-line-height, 1.5rem);
		color: var(--panda-input-counter-color, hsl(0deg 0% 50%));
		font-size: var(--panda-input-counter-font-size-s, 12px);
		font-family: var(--panda-input-counter-font-family, "Poppins");
		text-shadow: var(--panda-input-counter-text-shadow, none);
		transform-origin: center center;
		user-select: none;
	}

	.footer .counter.shake {
		color: var(--panda-input-counter-color-limit, hsl(14deg 77% 62%));
		animation: shake 500ms;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-input-border-radius-size-m, 10px);
		background-color: var(--panda-input-background-color-working, hsl(0deg 0% 100%));
		z-index: 2;

		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-input-spinner-color, hsl(191deg 19% 23%));
		--panda-spinner-size: var(--panda-input-spinner-size-m, var(--panda-icon-size-m, 20px));
	}

	.text-field {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-input-height-size-m, var(--panda-component-size-m, 40px));
		outline: none;

		transition: all 0.3s ease-in-out;

		border-radius: var(--panda-input-border-radius-size-m, var(--panda-border-radius-m, 5px));
		border-width: var(--panda-input-border-width, 1px);
		border-style: var(--panda-input-border-style, solid);
		border-color: var(--panda-input-border-color, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation, none);
		box-sizing: border-box;

		/* ICON STYLES */
		--panda-icon-color: var(--panda-input-icon-color, hsl(191deg 19% 23%));
		--panda-icon-size: var(--panda-input-slot-icon-size-m, 20px);
	}

	.text-field.shake {
		animation: shake-horizontal 500ms;
	}

	.input-wrap {
		position: relative;
		flex-grow: 1;
	}

	.input {
		position: relative;
		width: 100%;
		height: 100%;
		padding: var(--panda-input-padding, 0px 10px);
		outline: none;

		color: var(--panda-input-text-color, hsl(191deg 19% 23%));
		font-size: var(--panda-input-font-size-m, 14px);
		font-family: var(--panda-input-font-family-size-m, "Poppins");
		font-weight: var(--panda-input-font-weight-size-m, 500);
		text-shadow: var(--panda-input-text-shadow-size-m, none);

		transition: all 300ms ease-in-out, visibility 0ms linear;

		border: none;
		background-color: transparent;
		box-sizing: border-box;
		z-index: 1;
	}

	.input.with-prefix {
		padding-left: var(--panda-input-slot-gap-size-m, 0px);
	}

	.input.with-suffix {
		padding-right: var(--panda-input-slot-gap-size-m, 0px);
	}

	.input.with-clear-button {
		padding-right: var(--panda-input-clear-button-size-m, 0px);
	}

	/* PLACEHOLDER STYLES */
	.placeholder {
		position: absolute;
		inset: 0;

		color: var(--panda-input-placeholder-color, var(--panda-placeholder-color, hsl(0deg 0% 80%)));
		font-size: var(--panda-input-placeholder-font-size-m, var(--panda-font-size-m, 14px));
		font-family: var(--panda-input-placeholder-font-family-size-m, "Poppins");
		font-weight: var(--panda-input-placeholder-font-weight-size-m, 500);
		text-shadow: var(--panda-input-placeholder-text-shadow-size-m, none);
		z-index: 0;
	}

	.placeholder.with-prefix {
		--panda-text-slider-padding-left: var(--panda-input-slot-gap-size-m, 0px);
	}

	.placeholder.with-suffix {
		--panda-text-slider-padding-right: var(--panda-input-slot-gap-size-m, 0px);
	}

	.clear-button {
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		align-items: center;
		width: var(--panda-input-clear-button-size-m, var(--panda-component-size-m, 40px));
		height: 100%;
	}
	
	.clear-button .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panda-input-clear-button-icon-padding-m, 0px);
		
		transition: var(--panda-input-clear-button-icon-transition, all 0.3s ease-in-out);
		cursor: pointer;

		border-radius: var(--panda-input-clear-button-icon-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-input-clear-button-background-color, transparent);
		box-sizing: border-box;
		/* ICON STYLES */
		--panda-icon-color: var(--panda-input-clear-button-icon-color, var(--panda-input-icon-color, hsl(191deg 19% 23%)));
		--panda-icon-size: var(--panda-input-clear-button-icon-size-m, var(--panda-input-icon-size-m, 20px));
	}

	.clear-button:hover .icon {
		background-color: var(--panda-input-clear-button-background-color-hover, hsl(210deg 5% 90%));
		--panda-icon-color: var(--panda-input-clear-button-icon-color-hover, var(--panda-input-icon-color-hover, hsl(188deg 5% 75%)));
	}

	slot[name="prefix"],
	slot[name="suffix"] {
		flex-shrink: 0;
		flex-grow: 0;
	}

	::slotted([slot="prefix"]),
	::slotted([slot="suffix"]) {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		height: 100%;
		padding: var(--panda-input-slot-padding, 0px 10px);
		color: var(--panda-input-slot-text-color, hsl(191deg 19% 23%));
		background-color: var(--panda-input-slot-background-color, transparent);
	}

	::slotted([slot="prefix"]) {
		border-top-left-radius: var(--panda-input-border-radius-size-m, 10px);
		border-bottom-left-radius: var(--panda-input-border-radius-size-m, 10px);
	}

	::slotted([slot="suffix"]) {
		border-top-right-radius: var(--panda-input-border-radius-size-m, 10px);
		border-bottom-right-radius: var(--panda-input-border-radius-size-m, 10px);
	}

	::slotted(.icon) {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: var(--panda-input-height-size-m, 40px);
		height: 100%;
		padding: 0px;
		flex-shrink: 0;
	}

	/* ============================================================================================================= */
	/* COMPONENT STATE ============================================================================================= */
	/* ============================================================================================================= */

	/* HOVER */
	.text-field:not(.disabled):hover {
		border-color: var(--panda-input-border-color-hover, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color-hover, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation-hover, 0px 0px 5px hsl(0deg 0% 0% / 10%));
		--panda-icon-color: var(--panda-input-icon-color-hover, hsl(188deg 5% 75%));
	}

	.text-field:not(.disabled):hover .input {
		color: var(--panda-input-text-color-hover, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-hover, none);
	}

	.text-field:not(.disabled):hover ::slotted([slot="prefix"]),
	.text-field:not(.disabled):hover ::slotted([slot="suffix"]) {
		background-color: var(--panda-input-slot-background-color-hover, transparent);
	}

	/* READONLY */
	.text-field.readonly:not(.disabled) {
		border-width: var(--panda-input-border-width-readonly, 1px);
		border-style: var(--panda-input-border-style-readonly, dashed);
		border-color: var(--panda-input-border-color-readonly, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color-readonly, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation-readonly, none);
		--panda-icon-color: var(--panda-input-icon-color-readonly, hsl(191deg 19% 23%));
	}

	.text-field.readonly:not(.disabled) .input {
		color: var(--panda-input-text-color-readonly, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-readonly, none);
	}

	.text-field.readonly:not(.disabled) ::slotted([slot="prefix"]),
	.text-field.readonly:not(.disabled) ::slotted([slot="suffix"]) {
		color: var(--panda-input-text-color-readonly, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-readonly, none);
		background-color: var(--panda-input-slot-background-color-readonly, transparent);
	}

	/* FOCUSED */
	.text-field.focused:not(.disabled):not(.readonly),
	.text-field.focused:not(.disabled):not(.readonly):hover {
		border-color: var(--panda-input-border-color-focused, hsl(207deg 1% 85%));
		background-color: var(--panda-input-background-color-focused, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-outline, 0px 0px 4px 2px hsl(203deg 67% 85%));
		--panda-icon-color: var(--panda-input-icon-color-focused, hsl(188deg 5% 75%));
	}

	.text-field.focused:not(.disabled) {
		box-shadow: var(--panda-input-outline, 0px 0px 4px 2px hsl(203deg 67% 85%));
	}

	.text-field.focused:not(.disabled):not(.readonly) .input,
	.text-field.focused:not(.disabled):not(.readonly):hover .input {
		color: var(--panda-input-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-focused, none);
	}

	.text-field.focused:not(.disabled):not(.readonly) ::slotted([slot="prefix"]),
	.text-field.focused:not(.disabled):not(.readonly) ::slotted([slot="suffix"]) {
		color: var(--panda-input-text-color-focused, hsl(191deg 19% 23%));
		text-shadow: var(--panda-input-text-shadow-focused, none);
		background-color: var(--panda-input-slot-background-color-focused, transparent);
	}

	/* MANDATORY */
	.text-field.mandatory:not(.disabled):not(.readonly) {
		border-width: var(--panda-input-border-width-mandatory, 1px);
		border-style: var(--panda-input-border-style-mandatory, solid);
		border-color: var(--panda-input-border-color-mandatory, hsl(29deg 100% 59%));
		background-color: var(--panda-input-background-color-mandatory, hsl(29deg 100% 59% / 10%));
		box-shadow: var(--panda-input-outline-mandatory, 0px 0px 2px 2px hsl(29deg 100% 59%));
		--panda-icon-color: var(--panda-input-icon-color-mandatory, hsl(29deg 100% 59%));
	}

	.text-field.mandatory:not(.disabled):not(.readonly) ::slotted([slot="prefix"]),
	.text-field.mandatory:not(.disabled):not(.readonly) ::slotted([slot="suffix"]) {
		background-color: var(--panda-input-slot-background-color-mandatory, transparent);
	}

	/* WORKING */
	.text-field.working:not(.disabled) {
		cursor: not-allowed;
		border-color: var(--panda-input-border-color-working, hsl(212deg 1% 95%));
		background-color: var(--panda-input-background-color-working, hsl(0deg 0% 100%));
		box-shadow: var(--panda-input-elevation-working, none);
	}

	.text-field.working:not(.disabled) slot { visibility: hidden; }
	.text-field.working:not(.disabled) .input-wrap { visibility: hidden; }

	/* DISABLED */
	.text-field.disabled {
		cursor: not-allowed;
		border-color: var(--panda-input-border-color-disabled, hsl(189deg 3% 96%));
		background-color: var(--panda-input-background-color-disabled, hsl(189deg 3% 96%));
		box-shadow: var(--panda-input-elevation-disabled, none);
		--panda-icon-color: var(--panda-input-icon-color-disabled, hsl(188deg 5% 75%));
	}

	.text-field.disabled .input {
		color: var(--panda-input-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-input-text-shadow-disabled, none);
	}

	.text-field.disabled ::slotted([slot="prefix"]),
	.text-field.disabled ::slotted([slot="suffix"]) {
		color: var(--panda-input-text-color-disabled, hsl(188deg 5% 75%));
		text-shadow: var(--panda-input-text-shadow-disabled, none);
		background-color: var(--panda-input-slot-background-color-disabled, transparent);
	}

	/* ============================================================================================================= */
	/* THEMES ====================================================================================================== */
	/* ============================================================================================================= */

	/* MANDATORY */
	:host([theme~="mandatory"]) .text-field:not(.disabled):not(.readonly),
	:host([theme~="mandatory"]) .text-field:not(.disabled):not(.readonly):hover {
		border-width: var(--panda-input-border-width-mandatory, 1px);
		border-style: var(--panda-input-border-style-mandatory, solid);
		border-color: var(--panda-input-border-color-mandatory, hsl(29deg 100% 59%));
		background-color: var(--panda-input-background-color-mandatory, hsl(29deg 100% 59% / 10%));
		box-shadow: var(--panda-input-outline-mandatory, 0px 0px 2px 2px hsl(29deg 100% 59%));
	}
	
	/* VALID */
	:host([theme~="valid"]) .text-field:not(.disabled):not(.readonly),
	:host([theme~="valid"]) .text-field:not(.disabled):not(.readonly):hover {
		color: var(--panda-input-color-valid, hsl(160deg 81% 43%));
		border-width: var(--panda-input-border-width-valid, 1px);
		border-style: var(--panda-input-border-style-valid, solid);
		border-color: var(--panda-input-border-color-valid, hsl(160deg 81% 43%));
		background-color: var(--panda-input-background-color-valid, hsl(160deg 81% 43% / 10%));
		box-shadow: var(--panda-input-outline-valid, 0px 0px 2px 2px hsl(160deg 81% 43%));
	}
	
	/* INVALID */
	.text-field:not(.disabled):not(.readonly).invalid,
	.text-field:not(.disabled):not(.readonly).invalid:hover,
	:host([theme~="invalid"]) .text-field:not(.disabled):not(.readonly),
	:host([theme~="invalid"]) .text-field:not(.disabled):not(.readonly):hover {
		color: var(--panda-input-color-invalid, hsl(14deg 77% 62%));
		border-width: var(--panda-input-border-width-invalid, 1px);
		border-style: var(--panda-input-border-style-invalid, solid);
		border-color: var(--panda-input-border-color-invalid, hsl(14deg 77% 62%));
		background-color: var(--panda-input-background-color-invalid, hsl(14deg 77% 62% / 10%));
		box-shadow: var(--panda-input-outline-invalid, 0px 0px 2px 2px hsl(14deg 77% 62%));
	}

	/* SIZE-S ====================================================================================================== */
	:host([theme~="size-s"]) .text-field {
		height: var(--panda-input-height-size-s, 32px);
		border-radius: var(--panda-input-border-radius-size-s, 5px);
	}

	:host([theme~="size-s"]) .input {
		padding: var(--panda-input-padding-size-s, 0px 5px);
		font-size: var(--panda-input-font-size-s, 12px);
		font-family: var(--panda-input-font-family-size-s, "Poppins");
		font-weight: var(--panda-input-font-weight-size-s, 500);
	}

	:host([theme~="size-s"]) .input.with-prefix {
		padding-left: var(--panda-input-slot-gap-size-s, 0px);
	}

	:host([theme~="size-s"]) .input.with-suffix {
		padding-right: var(--panda-input-slot-gap-size-s, 0px);
	}

	:host([theme~="size-s"]) .clear-button {
		width: var(--panda-input-clear-button-size-s, var(--panda-component-size-s, 32px));
	}

	:host([theme~="size-s"]) .clear-button .icon {
		padding: var(--panda-input-clear-button-icon-padding-s, 0px);
		--panda-icon-size: var(--panda-input-clear-button-icon-size-s, var(--panda-input-icon-size-s, 16px));
	}

	/* SPINNER STYLES */
	:host([theme~="size-s"]) .spinner-cont {
		border-radius: var(--panda-input-border-radius-size-s, 5px);
		--panda-spinner-size: var(--panda-input-spinner-size-s, 16px);
	}

	:host([theme~="size-s"]) ::slotted([slot="prefix"]),
	:host([theme~="size-s"]) ::slotted([slot="suffix"]) {
		--panda-icon-size: var(--panda-input-icon-size-s, 16px);
	}

	:host([theme~="size-s"]) ::slotted([slot="prefix"]) {
		border-top-left-radius: var(--panda-input-border-radius-size-s, 5px);
		border-bottom-left-radius: var(--panda-input-border-radius-size-s, 5px);
	}

	:host([theme~="size-s"]) ::slotted([slot="suffix"]) {
		border-top-right-radius: var(--panda-input-border-radius-size-s, 5px);
		border-bottom-right-radius: var(--panda-input-border-radius-size-s, 5px);
	}

	:host([theme~="size-s"]) ::slotted(.icon) {
		min-width: var(--panda-input-height-size-s, 32px);
	}

	/* PLACEHOLDER STYLES */
	:host([theme~="size-s"]) .placeholder {
		font-size: var(--panda-input-placeholder-font-size-s, 16px);
		font-family: var(--panda-input-placeholder-font-family-size-s, "Poppins");
		font-weight: var(--panda-input-placeholder-font-weight-size-s, 500);
		text-shadow: var(--panda-input-placeholder-text-shadow-size-s, none);
	}

	:host([theme~="size-s"]) .placeholder.with-prefix {
		--panda-text-slider-padding-left: var(--panda-input-slot-gap-size-s, 0px);
	}

	:host([theme~="size-s"]) .placeholder.with-suffix {
		--panda-text-slider-padding-right: var(--panda-input-slot-gap-size-s, 0px);
	}

	/* SIZE-L ====================================================================================================== */
	:host([theme~="size-l"]) .text-field {
		height: var(--panda-input-height-size-l, 48px);
		border-radius: var(--panda-input-border-radius-size-l, 10px);
	}

	:host([theme~="size-l"]) .input {
		padding: var(--panda-input-padding-size-l, 0px 10px);
		font-size: var(--panda-input-font-size-l, 16px);
		font-family: var(--panda-input-font-family-size-l, "Poppins");
		font-weight: var(--panda-input-font-weight-size-l, 500);
	}

	:host([theme~="size-l"]) .input.with-prefix {
		padding-left: var(--panda-input-slot-gap-size-l, 0px);
	}

	:host([theme~="size-l"]) .input.with-suffix {
		padding-right: var(--panda-input-slot-gap-size-l, 0px);
	}

	:host([theme~="size-l"]) .clear-button {
		width: var(--panda-input-clear-button-size-l, var(--panda-component-size-l, 48px));
	}

	:host([theme~="size-l"]) .clear-button .icon {
		padding: var(--panda-input-clear-button-icon-padding-l, 0px);
		--panda-icon-size: var(--panda-input-clear-button-icon-size-l, var(--panda-input-icon-size-l, 32px));
	}

	/* SPINNER STYLES */
	:host([theme~="size-l"]) .spinner-cont {
		border-radius: var(--panda-input-border-radius-size-l, 10px);
		--panda-spinner-size: var(--panda-input-spinner-size-l, 24px);
	}

	:host([theme~="size-l"]) ::slotted([slot="prefix"]),
	:host([theme~="size-l"]) ::slotted([slot="suffix"]) {
		--panda-icon-size: var(--panda-input-icon-size-l, 24px);
	}

	:host([theme~="size-l"]) ::slotted([slot="prefix"]) {
		border-top-left-radius: var(--panda-input-border-radius-size-l, 10px);
		border-bottom-left-radius: var(--panda-input-border-radius-size-l, 10px);
	}

	:host([theme~="size-l"]) ::slotted([slot="suffix"]) {
		border-top-right-radius: var(--panda-input-border-radius-size-l, 10px);
		border-bottom-right-radius: var(--panda-input-border-radius-size-l, 10px);
	}

	:host([theme~="size-l"]) ::slotted(.icon) {
		min-width: var(--panda-input-height-size-l, 48px);
	}

	/* PLACEHOLDER STYLES */
	:host([theme~="size-l"]) .placeholder {
		font-size: var(--panda-input-placeholder-font-size-l, 16px);
		font-family: var(--panda-input-placeholder-font-family-size-l, "Poppins");
		font-weight: var(--panda-input-placeholder-font-weight-size-l, 500);
		text-shadow: var(--panda-input-placeholder-text-shadow-size-l, none);
	}

	:host([theme~="size-l"]) .placeholder.with-prefix {
		--panda-text-slider-padding-left: var(--panda-input-slot-gap-size-l, 0px);
	}

	:host([theme~="size-l"]) .placeholder.with-suffix {
		--panda-text-slider-padding-right: var(--panda-input-slot-gap-size-l, 0px);
	}

	/* SIZE-XL ===================================================================================================== */
	:host([theme~="size-xl"]) .text-field {
		height: var(--panda-input-height-size-xl, 56px);
		border-radius: var(--panda-input-border-radius-size-xl, 15px);
	}

	:host([theme~="size-xl"]) .input {
		padding: var(--panda-input-padding-size-xl, 0px 15px);
		font-size: var(--panda-input-font-size-xl, 18px);
		font-family: var(--panda-input-font-family-size-xl, "Poppins");
		font-weight: var(--panda-input-font-weight-size-xl, 500);
	}

	:host([theme~="size-xl"]) .input.with-prefix {
		padding-left: var(--panda-input-slot-gap-size-xl, 0px);
	}

	:host([theme~="size-xl"]) .input.with-suffix {
		padding-right: var(--panda-input-slot-gap-size-xl, 0px);
	}

	:host([theme~="size-xl"]) .clear-button {
		width: var(--panda-input-clear-button-size-xl, var(--panda-component-size-xl, 56px));
	}

	:host([theme~="size-xl"]) .clear-button .icon {
		padding: var(--panda-input-clear-button-icon-padding-xl, 0px);
		--panda-icon-size: var(--panda-input-clear-button-icon-size-xl, var(--panda-input-icon-size-xl, 48px));
	}

	/* SPINNER STYLES */
	:host([theme~="size-xl"]) .spinner-cont {
		border-radius: var(--panda-input-border-radius-size-xl, 15px);
		--panda-spinner-size: var(--panda-input-spinner-size-xl, 28px);
	}

	:host([theme~="size-xl"]) ::slotted([slot="prefix"]),
	:host([theme~="size-xl"]) ::slotted([slot="suffix"]) {
		--panda-icon-size: var(--panda-input-icon-size-xl, 28px);
	}

	:host([theme~="size-xl"]) ::slotted([slot="prefix"]) {
		border-top-left-radius: var(--panda-input-border-radius-size-xl, 15px);
		border-bottom-left-radius: var(--panda-input-border-radius-size-xl, 15px);
	}

	:host([theme~="size-xl"]) ::slotted([slot="suffix"]) {
		border-top-right-radius: var(--panda-input-border-radius-size-xl, 15px);
		border-bottom-right-radius: var(--panda-input-border-radius-size-xl, 15px);
	}

	:host([theme~="size-xl"]) ::slotted(.icon) {
		min-width: var(--panda-input-height-size-xl, 56px);
	}

	/* PLACEHOLDER STYLES */
	:host([theme~="size-xl"]) .placeholder {
		font-size: var(--panda-input-placeholder-font-size-xl, 18px);
		font-family: var(--panda-input-placeholder-font-family-size-xl, "Poppins");
		font-weight: var(--panda-input-placeholder-font-weight-size-xl, 500);
		text-shadow: var(--panda-input-placeholder-text-shadow-size-xl, none);
		--panda-text-slider-padding-left: 15px;
		--panda-text-slider-padding-right: 15px;
	}

	:host([theme~="size-xl"]) .placeholder.with-prefix {
		--panda-text-slider-padding-left: var(--panda-input-slot-gap-size-xl, 0px);
	}

	:host([theme~="size-xl"]) .placeholder.with-suffix {
		--panda-text-slider-padding-right: var(--panda-input-slot-gap-size-xl, 0px);
	}

	/* ============================================================================================================= */
	/* ANIMATIONS ================================================================================================== */
	/* ============================================================================================================= */

	@keyframes shake {
		0% { transform: rotate(0deg); }
		10% { transform: rotate(-5deg); }
		20% { transform: rotate(5deg); }
		30% { transform: rotate(-5deg); }
		40% { transform: rotate(5deg); }
		50% { transform: rotate(-5deg); }
		60% { transform: rotate(5deg); }
		70% { transform: rotate(-5deg); }
		80% { transform: rotate(5deg); }
		90% { transform: rotate(-5deg); }
		100% { transform: rotate(0deg); }
	}

	@keyframes shake-horizontal {
		10%, 90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%, 80% {
			transform: translate3d(2px, 0, 0);
		}
		30%, 50%, 70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%, 60% {
			transform: translate3d(4px, 0, 0);
		}
	}
`; 