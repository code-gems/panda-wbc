import { css } from "lit";

export const styles = css`
	:host {
		display: inline-block;
		background-color: var(--panda-date-picker-bg-color, var(--panda-bg-color, hsl(0deg 0% 100%)));
	}

	.calendar-cont {
		display: flex;
		flex-flow: row nowrap;
		padding: 10px;
		gap: 10px;
	}

	.calendar .header {
		display: flex;
		flex-flow: row nowrap;
		height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
	}

	.calendar-body {
		position: relative;
	}

	.calendar .header-label {
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
		transition: all 200ms ease-in-out;
		user-select: none;

		border-bottom: 1px solid var(--panda-bg-color-100, hsl(0deg 0% 95%));
		box-sizing: border-box;
	}

	.calendar .header-label:hover {
		color: var(--panda-primary);
	}

	.calendar .header-label.btn {
		cursor: pointer;
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

	.calendar-row {
		display: grid;
		grid-template-columns: repeat(7, var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px)));
		gap: var(--panda-month-calendar-row-gap , 10px);
		user-select: none;
	}

	.calendar-row.days-of-week {
		margin-left: calc(var(--panda-padding-m) * -1);
		margin-right: calc(var(--panda-padding-m) * -1);
		padding-left: var(--panda-padding-m);

		background-color: var(--panda-bg-color-100, hsl(0deg 0% 95%));
		box-sizing: border-box;
	}

	.calendar-row .day {
		position: relative;
		display: flex;
		width: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		height: var(--panda-date-picker-button-size, var(--panda-button-size-m, 40px));
		justify-content: center;
		align-items: center;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));

		border: 1px solid transparent;
		box-sizing: border-box;
	}

	.calendar-row .day.btn {
		cursor: pointer;
		transition: all 200ms ease-in-out;
	}

	.calendar-row .day.btn:hover {
		background: var(--panda-date-picker-button-background-hover, var(--panda-button-background-hover, hsl(0deg 0% 95%)));
	}

	.calendar-row .day.selected {
		color: var(--panda-date-picker-date-selected-color, var(--panda-primary-color, hsl(0deg 0% 100%)));
		background-color: var(--panda-date-picker-date-selected-background, var(--panda-primary-background, hsl(196deg 100% 47%)));
	}

	.calendar-row .day.selected:hover {
		color: var(--panda-date-picker-date-selected-color-hover, var(--panda-primary-color-hover, hsl(0deg 0% 100%)));
		background-color: var(--panda-date-picker-date-selected-background-hover, var(--panda-primary-background-hover, hsl(196deg 100% 51%)));
	}

	.calendar-row .day.inactive {
		color: var(--panda-date-picker-inactive-color, var(--panda-label-color, #ccc));
	}

	.calendar-row .day.today {
		animation: 1s infinite pulse;
	}

	.calendar-row .day.animate {
		animation: 1s infinite pulse-background;
	}

	.calendar-row .day.disabled {
		color: var(--panda-label-color);
		cursor: not-allowed;
		background: var(--panda-date-picker-button-background-disabled, var(--panda-button-background-disabled, hsl(0deg 0% 95%)));
	}
	
	.calendar-row .day.disabled:hover {
		color: var(--panda-label-color);
		background: var(--panda-date-picker-button-background-disabled, var(--panda-button-background-disabled, hsl(0deg 0% 95%)));
	}

	.calendar-row .day .highlight {
		position: absolute;
		width: 100%;
		padding: 1px 0px;
		bottom: 0px;
		line-height: 10px;
		overflow: hidden;
		
		color: var(--panda-date-picker-highlight-color, var(--panda-primary-color, hsl(0deg 0% 100%)));
		font-size: var(--panda-date-picker-highlight-font-size, var(--panda-font-size-xs, 10px));
		font-family: var(--panda-date-picker-highlight-font-family, var(--panda-font-family-xs, "Poppins"));
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;

		background-color: var(--panda-date-picker-highlight-background, var(--panda-primary-background, hsl(196deg 100% 47%)));
		z-index: 1;
	}

	.calendar-row .day.event:before {
		position: absolute;
		display: block;
		content: " ";
		width: 6px;
		height: 6px;
		top: 2px;
		right: 2px;

		border-radius: 50%;
		background-color: var(--panda-notification-background);
		z-index: 2;
	}
	.calendar-row .day.selected.event:before {
		background-color: var(--panda-notification-color);
	}
	.calendar-row .day.inactive.event:before {
		background-color: var(--panda-label-color, #ccc);
	}

	.tile-cont {
		position: absolute;
		display: grid;
		grid-template-columns: repeat(4, minmax(0px, 1fr));
		grid-template-rows: repeat(4, minmax(0px, 1fr));
		width: 100%;
		height: 100%;
		top: 0px;
		gap: var(--panda-padding-m, 10px);
		user-select: none;
		
		background-color: var(--panda-bg-color-90opc);
		z-index: 3;
	}

	.tile-cont .tile {
		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));

		border: 1px solid transparent;
		box-sizing: border-box;
	}

	.tile-cont .tile:hover {
		background: var(--panda-date-picker-button-background-hover, var(--panda-button-background-hover, hsl(0deg 0% 95%)));
	}

	.tile-cont .tile.btn {
		transition: all 200ms ease-in-out;
		cursor: pointer;
	}

	.tile-cont .tile.active {
		animation: 1s infinite pulse;
	}

	.tile-cont .tile.inactive {
		color: var(--panda-date-picker-inactive-color, var(--panda-label-color, #ccc));
	}

	.tile-cont .tile.disabled {
		color: var(--panda-button-color-disabled, var(--panda-txt-color));
		background-color: var(--panda-button-background-disabled, hsl(0deg 0% 95%));
	}

	.date-list-cont {
		display: flex;
		flex-flow: column;
		min-width: 120px;
		max-width: 200px;
	}

	.date-list-cont .date-list-header,
	.date-list-cont .date-list-item {
		display: block;
		padding: 0px 10px;
		height: var(--panda-button-size-m, 40px);
		line-height: var(--panda-button-size-m, 40px);
		overflow: hidden;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-overflow: ellipsis;
		text-shadow: none;
		user-select: none;
		white-space: nowrap;

		flex-shrink: 0;
		border-bottom: 1px solid var(--panda-bg-color-100, hsl(0deg 0% 95%));
		box-sizing: border-box;
	}

	.date-list-cont .date-list-header {
		font-size: var(--panda-font-size-l, 16px);
		text-align: center;
	}

	.date-list-cont .date-list {
		display: flex;
		flex-flow: column;
		max-height: calc(var(--panda-button-size, 40px) * 7 + 50px);
		overflow: auto;
	}

	.date-list-cont .date-list-item:hover {
		color: var(--panda-button-color-hover, var(--panda-txt-color));
		cursor: pointer;

		background-color: var(--panda-button-background-hover, hsl(0deg 0% 95%));
	}
	
	.events-cont {
		display: flex;
		flex-flow: column;
		min-width: 220px;
		max-width: 220px;
	}
	
	.events-cont .events-header {
		display: block;
		padding: 0px 10px;
		height: var(--panda-button-size-m, 40px);
		line-height: var(--panda-button-size-m, 40px);
		overflow: hidden;

		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
		text-overflow: ellipsis;
		text-shadow: none;
		user-select: none;
		white-space: nowrap;

		flex-shrink: 0;
		font-size: var(--panda-font-size-l, 16px);
		text-align: center;
		border-bottom: 1px solid var(--panda-bg-color-100, hsl(0deg 0% 95%));
		box-sizing: border-box;
	}
	
	.events-cont .events {
		display: flex;
		flex-flow: column;
		user-select: none;
		max-height: calc(var(--panda-button-size, 40px) * 7 + 50px);
		overflow: auto;
	}

	.events-cont .events .event {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		padding: 10px;

		transition: all 200ms ease-in-out;
		cursor: pointer;

		border-bottom: 1px solid var(--panda-bg-color-100, hsl(0deg 0% 95%));
		box-sizing: border-box;
	}

	.events-cont .events .event:hover {
		background-color: var(--panda-bg-color-100, hsl(0deg 0% 95%));
		border-bottom: 1px solid var(--panda-bg-color-200, hsl(0deg 0% 90%));
	}

	.events-cont .events .event .event-body {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
	}

	.events-cont .events .event .event-body .name {
		position: relative;
		padding-left: 20px;
		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
	}

	.events-cont .events .event .event-body .name:before {
		position: absolute;
		display: block;
		width: 8px;
		height: 8px;
		content: " ";
		top: 50%;
		left: 3px;
		transform: translateY(-50%);

		border-radius: 50%;
		background-color: var(--panda-notification-background, hsl(340deg 82% 59%));
	}

	.events-cont .events .event .event-body .date {
		color: var(--panda-label-color, #ccc);
		font-size: var(--panda-font-size-s, 12px);
	}

	.events-cont .events .event .event-body .description {
		color: var(--panda-txt-color, hsl(0deg 0% 29%));
		font-size: var(--panda-font-size-s, 12px);
	}

	@keyframes pulse {
		0%   { border-color: var(--panda-date-picker-date-today-background, var(--panda-primary-background, hsl(196deg 100% 47%))); }
		50%  { border-color: var(--panda-date-picker-date-today-color, var(--panda-primary-color, hsl(0deg 0% 100%))); }
		100% { border-color: var(--panda-date-picker-date-today-background, var(--panda-primary-background, hsl(196deg 100% 47%))); }
	}

	@keyframes pulse-background {
		0%   {
			color: var(--panda-bg-color, hsl(0deg 0% 100%));
			background-color: var(--panda-date-picker-date-today-background, var(--panda-primary-background, hsl(196deg 100% 47%)));
		}
		50%  {
			color: var(--panda-txt-color, hsl(0deg 0% 29%));
			background-color: var(--panda-date-picker-date-today-color, var(--panda-primary-color, hsl(0deg 0% 100%)));
		}
		100% {
			color: var(--panda-bg-color, hsl(0deg 0% 100%));
			background-color: var(--panda-date-picker-date-today-background, var(--panda-primary-background, hsl(196deg 100% 47%)));
		}
	}
`;