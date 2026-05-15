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

	.clock-scale {
		fill: var(--panda-time-picker-clock-scale-color, hsl(0deg 0% 70%));
		stroke: var(--panda-time-picker-clock-scale-color, hsl(0deg 0% 70%));
		stroke-width: 3px;
		stroke-linecap: round;
	}

	.clock-scale-dot {
		fill: var(--panda-time-picker-clock-scale-color, hsl(0deg 0% 70%));
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
		user-select: none;
		transition: opacity 0.2s ease-out;
		will-change: opacity;
	}

	.active .clock-value {
		opacity: 1;
	}

	/* HOUR */
	.hour-hand-group {
		display: none;
	}

	.active-hour .hour-hand-group {
		display: block;
	}

	.hour-hand {
		stroke: var(--panda-time-picker-clock-hour-hand-color, hsl(0deg 0% 50%));
		stroke-width: var(--panda-time-picker-clock-hour-hand-width, 4px);
		transition: x2 0.2s ease-out, y2 0.2s ease-out;
		will-change: x2, y2;
	}

	.active-hour .hour-hand {
		stroke: var(--panda-time-picker-clock-hour-hand-active-color, hsl(0deg 0% 70%));
	}

	/* MINUTE */
	.minute-hand-group {
		display: none;
	}

	.active-minute .minute-hand-group {
		display: block;
	}

	.minute-hand {
		stroke: var(--panda-time-picker-clock-minute-hand-color, hsl(0deg 0% 50%));
		stroke-width: var(--panda-time-picker-clock-minute-hand-width, 4px);
		transition: x2 0.2s ease-out, y2 0.2s ease-out;
		will-change: x2, y2;
	}

	.active-minute .minute-hand {
		stroke: var(--panda-time-picker-clock-minute-hand-active-color, hsl(0deg 0% 70%));
	}

	/* SECOND */
	.second-hand-group {
		display: none;
	}

	.active-second .second-hand-group {
		display: block;
	}

	.second-hand {
		stroke: var(--panda-time-picker-clock-second-hand-color, hsl(0deg 0% 50%));
		stroke-width: var(--panda-time-picker-clock-second-hand-width, 4px);
		transition: x2 0.4s ease-out;
		will-change: x2, y2;
	}

	.active-second .second-hand {
		stroke: var(--panda-time-picker-clock-second-hand-active-color, hsl(0deg 0% 70%));
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