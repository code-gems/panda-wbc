import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		background-color: var(--panda-date-picker-bg-color, var(--panda-bg-color, hsl(0deg 0% 100%)));
	}

	.calendar-cont {
		padding: 10px;
	}

	.calendar-cont .header {
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));

	}

	.calendar-cont .header-label {
		flex-grow: 1;

		display: block;
		overflow: hidden;
		line-height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));

		color: var(--panda-txt-color);
		font-size: var(--panda-font-size-l);
		font-family: var(--panda-font-family);
		text-align: center;
		text-shadow: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		transition: all 200ms ease-in-out;
		user-select: none;

		border-bottom: 1px solid var(--panda-bg-color-100);
	}

	.calendar-cont .header-label:hover {
		color: var(--panda-primary);
	}

	.btn-icon {
		display: flex;
		width: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 200ms ease-in-out;

		color: var(--panda-date-picker-button-color, var(--panda-button-color, hsl(0deg 0% 29%)));
		background: var(--panda-date-picker-button-background, var(--panda-button-background, hsl(0deg 0% 100%)));
	}

	.btn-icon:hover {
		background: var(--panda-date-picker-button-background-hover, var(--panda-button-background-hover, hsl(0deg 0% 95%)));
	}

	.calendar {
		display: grid;
		grid-template-columns: repeat(7, var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px)));
		gap: 10px;
		user-select: none;
	}

	.calendar .day {
		display: flex;
		width: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		justify-content: center;
		align-items: center;

		border: 1px solid transparent;
		box-sizing: border-box;
	}

	.calendar .day.btn {
		cursor: pointer;
		transition: all 200ms ease-in-out;
	}

	.calendar .day.btn:hover {
		background: var(--panda-date-picker-button-background-hover, var(--panda-button-background-hover, hsl(0deg 0% 95%)));
	}

	.calendar .day.selected {
		color: var(--panda-date-picker-date-selected-color, var(--panda-primary-color, hsl(0deg 0% 100%)));
		background-color: var(--panda-date-picker-date-selected-background, var(--panda-primary-background, hsl(196deg 100% 47%)));
	}

	.calendar .day.selected:hover {
		color: var(--panda-date-picker-date-selected-color-hover, var(--panda-primary-color-hover, hsl(0deg 0% 100%)));
		background-color: var(--panda-date-picker-date-selected-background-hover, var(--panda-primary-background-hover, hsl(196deg 100% 51%)));
	}

	.calendar .day.today {
		animation: 1s infinite pulse;
	}

	@keyframes pulse {
		0%   { border-color: var(--panda-date-picker-date-today-background, var(--panda-primary-background, hsl(196deg 100% 47%))); }
		50%  { border-color: var(--panda-date-picker-date-today-color, var(--panda-primary-color, hsl(0deg 0% 100%))); }
		100% { border-color: var(--panda-date-picker-date-today-background, var(--panda-primary-background, hsl(196deg 100% 47%))); }
	}
`;