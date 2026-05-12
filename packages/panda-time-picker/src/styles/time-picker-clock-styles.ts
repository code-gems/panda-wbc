export const styles = /*css*/`
	:host {
		display: inline-block;
	}

	.clock-cont {
		position: relative;
		display: block;
		width: var(--panda-time-picker-clock-size, 250px);
		height: var(--panda-time-picker-clock-size, 250px);
	}

	.clock {
		width: 100%;
		height: 100%;
	}

	.clock-face {
		fill: var(--panda-time-picker-clock-face-color, hsl(0deg 0% 92%));
	}

	.clock-center {
		fill: var(--panda-time-picker-clock-center-color, hsl(0deg 0% 50%));
		transition: r 0.2s ease-out;
		will-change: r;
	}

	.active .clock-center {
		fill: var(--panda-time-picker-clock-center-active-color, hsl(0deg 0% 70%));
		r: 30px;
	}

	.clock-value {
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
		transform: translate(-48%, 24%);
		font-size: var(--panda-time-picker-clock-value-font-size, 24px);
		font-family: var(--panda-time-picker-clock-value-font-family, var(--panda-font-family, "Poppins"));
	}

	.active .clock-value {
		opacity: 1;
	}













	.input-field {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.input-field .time-input {
		flex-shrink: 0;
		min-width: 3ch;
		padding: var(--panda-time-picker-clock-input-padding, var(--panda-gap-s, 5px));

		font-size: var(--panda-time-picker-clock-input-font-size, 42px);
		font-family: var(--panda-time-picker-clock-input-font-family, var(--panda-font-family-bold, "Poppins Bold"));
		text-align: center;

		border-width: var(--panda-time-picker-clock-input-field-border-width, var(--panda-border-width, 1px));
		border-color: var(--panda-time-picker-clock-input-field-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-style: var(--panda-time-picker-clock-input-field-border-style, solid);
		border-radius: var(--panda-time-picker-clock-input-field-border-radius, var(--panda-border-radius-m, 10px));
		box-sizing: border-box;
	}

	.input-field .toggle-period {
		display: flex;
		flex-flow: column;
		margin-left: var(--panda-time-picker-clock-input-padding, var(--panda-gap-s, 5px));

		font-size: var(--panda-time-picker-clock-input-font-size, 20px);
		font-family: var(--panda-time-picker-clock-input-font-family, var(--panda-font-family-bold, "Poppins Bold"));

		border-width: var(--panda-time-picker-clock-input-field-border-width, var(--panda-border-width, 1px));
		border-color: var(--panda-time-picker-clock-input-field-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-style: var(--panda-time-picker-clock-input-field-border-style, solid);
		border-radius: var(--panda-time-picker-clock-input-field-border-radius, var(--panda-border-radius-m, 10px));
		box-sizing: border-box;
	}

	.input-field .separator {
		font-size: var(--panda-time-picker-clock-input-font-size, 42px);
		font-family: var(--panda-time-picker-clock-input-font-family, var(--panda-font-family-bold, "Poppins Bold"));
	}

	.input-field .toggle-period .period-am,
	.input-field .toggle-period .period-pm {
		padding: var(--panda-time-picker-clock-input-padding, var(--panda-gap-s, 5px));
	}
`;