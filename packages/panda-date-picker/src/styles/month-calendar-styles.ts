import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
        background-color: var(--panda-date-picker-bg-color, var(--panda-bg-color, hsl(0deg 0% 100%)));
	}

	.calendar-cont {
		padding: 10px;
		border: 1px solid var(--panda-bg-color-100);
		box-sizing: border-box;
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

		border-bottom: 1px solid var(--panda-bg-color-100);
	}

	.calendar-cont .header-label:hover {
		color: var(--panda-primary-color);
	}

	.btn-icon {
		display: flex;
		width: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 200ms ease-in-out;

		color: var(--panda-date-picker-button-txt-color, var(--panda-button-txt-color, hsl(0deg 0% 29%)));
		background: var(--panda-date-picker-button-bg-color, var(--panda-button-bg-color, hsl(0deg 0% 100%)));
	}

	.btn-icon:hover {
		background: var(--panda-date-picker-button-bg-color-hover, var(--panda-button-bg-color-hover, hsl(0deg 0% 95%)));
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
	}

	.calendar .day.btn {
		cursor: pointer;
		transition: all 200ms ease-in-out;
	}

	.calendar .day.btn:hover {
		background: var(--panda-date-picker-button-bg-color-hover, var(--panda-button-bg-color-hover, hsl(0deg 0% 95%)));
	}

`;