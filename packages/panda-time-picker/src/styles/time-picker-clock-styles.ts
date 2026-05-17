export const styles = /*css*/`
	:host {
		display: inline-block;
	}

	.form {
		display: flex;
		flex-flow: column;
		gap: var(--panda-gap-6);
		width: fit-content;
		padding: var(--panda-gap-m);
		
		background-color: var(--panda-time-picker-clock-form-background-color, var(--panda-form-background-color, hsl(0deg 0% 100%)));
		box-sizing: border-box;
	}

	.form .header,
	.form .body {
		display: flex;
		justify-content: center;
	}

	.clock-cont {
		position: relative;
		display: block;
		width: 250px;
		height: 250px;
		
		border-radius: 50%;
		background-color: var(--panda-time-picker-clock-face-color, hsl(0deg 0% 92%));
		box-shadow: var(--panda-time-picker-clock-elevation, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
	}

	.clock {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.clock-scale {
		stroke: var(--panda-time-picker-clock-scale-color, hsl(0deg 0% 60%));
		stroke-width: 3px;
		stroke-linecap: square;
	}

	.clock-scale-dot {
		fill: var(--panda-time-picker-clock-scale-dot-color, hsl(0deg 0% 70%));
	}

	.clock-scale-label {
		position: absolute;
		transform: translate(-50%, -50%);

		color: var(--panda-time-picker-clock-scale-label-color, hsl(0deg 0% 60%));
		font-size: var(--panda-time-picker-clock-scale-label-font-size, 14px);
		font-family: var(--panda-time-picker-clock-scale-label-font-family, var(--panda-font-family, "Poppins"));
		user-select: none;
		z-index: 0;
	}

	.clock-center {
		fill: var(--panda-time-picker-clock-center-color, hsl(209deg 78% 46%));
	}

	.clock-center-dot {
		fill: var(--panda-time-picker-clock-center-dot-color, hsl(0deg 0% 100%));
	}

	/* HOUR */
	.hour-hand-group {
		opacity: 0.3;
		transform-origin: 125px 125px;
		transition: opacity 0.2s ease-out;
		will-change: opacity;
	}

	.hour-view .hour-hand-group {
		opacity: 1;
	}

	.hour-hand {
		stroke: var(--panda-time-picker-clock-hour-hand-color, hsl(0deg 0% 50%));
		stroke-width: var(--panda-time-picker-clock-hour-hand-width, 8px);
		stroke-linecap: round;
		transition: stroke 0.2s ease-out;
		will-change: stroke;
	}

	.hour-view .hour-hand {
		stroke: var(--panda-time-picker-clock-hour-hand-active-color, hsl(209deg 78% 46%));
	}

	/* MINUTE */
	.minute-hand-group {
		opacity: 0.3;
		transform-origin: 125px 125px;
		transition: opacity 0.2s ease-out;
		will-change: opacity;
	}

	.minute-view .minute-hand-group {
		opacity: 1;
	}

	.minute-hand {
		stroke: var(--panda-time-picker-clock-minute-hand-color, hsl(0deg 0% 50%));
		stroke-width: var(--panda-time-picker-clock-minute-hand-width, 4px);
		stroke-linecap: round;
		transition: stroke 0.2s ease-out;
		will-change: stroke;
	}

	.minute-view .minute-hand {
		stroke: var(--panda-time-picker-clock-minute-hand-active-color, hsl(209deg 78% 46%));
	}

	/* SECOND */
	.second-hand-group {
		opacity: 0.3;
		transform-origin: 125px 125px;
		transition: opacity 0.2s ease-out;
		will-change: opacity;
	}

	.second-view .second-hand-group {
		opacity: 1;
	}

	.second-hand {
		stroke: var(--panda-time-picker-clock-second-hand-color, hsl(0deg 0% 50%));
		stroke-linecap: round;
		transition: stroke 0.2s ease-out;
		will-change: stroke;
	}

	.second-view .second-hand {
		stroke: var(--panda-time-picker-clock-second-hand-active-color, hsl(209deg 78% 46%));
	}














	.time-display-cont {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
	}

	.time-display {
		flex-shrink: 0;
		min-width: 3ch;
		padding: var(--panda-time-picker-clock-time-display-padding, var(--panda-gap-s, 5px));

		font-size: var(--panda-time-picker-clock-time-display-font-size, 42px);
		font-family: var(--panda-time-picker-clock-time-display-font-family, var(--panda-font-family-bold, "Poppins Bold"));
		text-align: center;
		cursor: pointer;

		border-width: var(--panda-time-picker-clock-time-display-border-width, var(--panda-border-width, 1px));
		border-color: var(--panda-time-picker-clock-time-display-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-style: var(--panda-time-picker-clock-time-display-border-style, solid);
		border-radius: var(--panda-time-picker-clock-time-display-border-radius, var(--panda-border-radius-m, 10px));
		background-color: var(--panda-time-picker-clock-time-display-background-color, hsl(0deg 0% 92%));
		box-sizing: border-box;
	}

	.hour-view .time-display-hour {
		background-color: var(--panda-time-picker-clock-time-display-background-color, hsl(209deg 78% 56%));
	}

	.minute-view .time-display-minute {
		background-color: var(--panda-time-picker-clock-time-display-background-color, hsl(209deg 78% 56%));
	}

	.second-view .time-display-second {
		background-color: var(--panda-time-picker-clock-time-display-background-color, hsl(209deg 78% 56%));
	}




	.time-display-cont .period-toggle {
		display: flex;
		flex-flow: column;
		margin-left: var(--panda-time-picker-clock-period-toggle-padding, var(--panda-gap-s, 5px));

		font-size: var(--panda-time-picker-clock-period-toggle-font-size, 20px);
		font-family: var(--panda-time-picker-clock-period-toggle-font-family, var(--panda-font-family-bold, "Poppins Bold"));
		cursor: pointer;

		border-width: var(--panda-time-picker-clock-period-toggle-border-width, var(--panda-border-width, 1px));
		border-color: var(--panda-time-picker-clock-period-toggle-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-style: var(--panda-time-picker-clock-period-toggle-border-style, solid);
		border-radius: var(--panda-time-picker-clock-period-toggle-border-radius, var(--panda-border-radius-m, 10px));
		box-sizing: border-box;
		background-color: var(--panda-time-picker-clock-period-toggle-background-color, hsl(0deg 0% 92%));
	}

	.time-display-cont .separator {
		font-size: var(--panda-time-picker-clock-input-font-size, 42px);
		font-family: var(--panda-time-picker-clock-input-font-family, var(--panda-font-family-bold, "Poppins Bold"));
	}

	.time-display-cont .period-toggle .period-am,
	.time-display-cont .period-toggle .period-pm {
		padding-inline: var(--panda-time-picker-clock-period-button-padding-inline, var(--panda-gap-s, 5px));
	}

	.am .period-am,
	.pm .period-pm {
		color: var(--panda-time-picker-clock-period-am-color, hsl(120deg 100% 20%));
		background-color: var(--panda-time-picker-clock-period-am-background-color, hsl(120deg 100% 80%));
	}

	.hidden {
		display: none;
	}
`;