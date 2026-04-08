export const styles = /*css*/`
	:host {
		position: relative;
		display: inline;
		width: fit-content;
	}

	.spinner-cont {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		inset: 0px;
		justify-content: center;
		align-items: center;

		border-radius: var(--panda-heatmap-spinner-border-radius-size, var(--panda-border-radius-m, 10px));
		background-color: var(--panda-heatmap-spinner-background-color, hsl(0deg 0% 100%));
	}

	.spinner-cont .spinner-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--panda-heatmap-spinner-gap, var(--panda-gap-s, 5px));

		border-radius: var(--panda-heatmap-spinner-wrap-border-radius-size, var(--panda-border-radius-m, 10px));
		background-color: var(--panda-heatmap-spinner-wrap-background-color, var(--panda-background-color, hsl(0deg 0% 92%)));
		padding: var(--panda-heatmap-spinner-wrap-padding, var(--panda-padding-m, 10px));
		box-shadow: var(--panda-heatmap-spinner-wrap-box-shadow, var(--panda-elevation-s, 0px 1px 2px hsl(0deg 0% 0% / 20%)));
	}

	.spinner-cont .spinner-wrap .spinner {
		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-heatmap-spinner-color, var(--panda-icon-color, hsl(191deg 19% 23%)));
		--panda-spinner-size: var(--panda-heatmap-spinner-size, var(--panda-icon-size-m, 20px));
	}

	.spinner-cont .spinner-wrap .spinner-text {
		color: var(--panda-heatmap-spinner-text-color, var(--panda-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-heatmap-spinner-text-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-heatmap-spinner-text-font-family, var(--panda-font-family, "Poppins"));
		text-shadow: var(--panda-heatmap-spinner-text-shadow, var(--panda-text-shadow, none));
		user-select: none;
	}

	.heatmap-container {
		position: relative;
		display: inline-block;
		padding: var(--panda-heatmap-padding, var(--panda-padding-m, 10px));
		overflow: auto;
		
		border-radius: var(--panda-heatmap-border-radius, var(--panda-border-radius-m, 5px));
		border-width: var(--panda-heatmap-border-width, 1px);
		border-style: var(--panda-heatmap-border-style, solid);
		border-color: var(--panda-heatmap-border-color, var(--panda-border-color, hsl(191deg 19% 23%)));
		background-color: var(--panda-heatmap-background-color, var(--panda-form-background-color, hsl(0deg 0% 100%)));
		background-image: var(--panda-heatmap-background-image, none);
		background-size: var(--panda-heatmap-background-size, auto);
		background-position: var(--panda-heatmap-background-position, center);
		background-repeat: var(--panda-heatmap-background-repeat, no-repeat);
		box-shadow: var(--panda-heatmap-elevation, none);
		box-sizing: border-box;
	}

	.heatmap-wrapper {
		display: grid;
		gap: var(--panda-heatmap-cell-gap, var(--panda-gap-s, 5px));
	}

	.heatmap-wrapper.has-y-axis-labels {
		grid-template-columns: var(--panda-heatmap-y-axis-label-width, auto) 1fr;
	}

	.heatmap-wrapper.has-x-axis-labels {
		grid-template-rows: var(--panda-heatmap-x-axis-label-height, auto) 1fr;
	}

	.corner-spacer {
		grid-column: 1;
		grid-row: 1;
	}

	.x-axis-labels {
		display: grid;
		gap: var(--panda-heatmap-cell-gap, var(--panda-padding-xs, 2px));
		grid-row: 1;
	}

	.y-axis-labels {
		display: grid;
		gap: var(--panda-heatmap-cell-gap, var(--panda-padding-xs, 2px));
		grid-column: 1;
	}

	.x-label,
	.y-label {
		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--panda-heatmap-label-color, var(--panda-label-color,  hsl(191deg 19% 23%)));
		font-size: var(--panda-heatmap-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-heatmap-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-heatmap-label-text-shadow, var(--panda-label-text-shadow, none));
		user-select: none;
	}

	.y-label {
		justify-content: flex-end;
		padding-right: var(--panda-heatmap-y-label-padding, var(--panda-padding-m, 10px));
	}

	.heatmap-grid {
		display: grid;
		gap: var(--panda-heatmap-cell-gap, var(--panda-padding-xs, 2px));
	}

	.heatmap-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--panda-heatmap-cell-width, unset);
		height: var(--panda-heatmap-cell-height, unset);
		padding: var(--panda-heatmap-cell-padding, var(--panda-padding-s, 5px) var(--panda-padding-m, 10px));

		color: var(--panda-heatmap-cell-text-color, var(--panda-text-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-heatmap-cell-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-heatmap-cell-font-family, var(--panda-font-family-bold, "Poppins-Bold"));
		transition: var(--panda-heatmap-cell-transition, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out);
		cursor: var(--panda-heatmap-cell-cursor, default);
		user-select: none;

		border-radius: var(--panda-heatmap-cell-border-radius, var(--panda-border-radius-m, 5px));
		border-width: var(--panda-heatmap-cell-border-width, unset);
		border-style: var(--panda-heatmap-cell-border-style, unset);
		border-color: var(--panda-heatmap-cell-border-color, unset);
		box-shadow: var(--panda-heatmap-cell-elevation, none);
		box-sizing: border-box;
	}

	.heatmap-cell:not(.empty):hover {
		transform: var(--panda-heatmap-cell-transform-hover, none);
		border-width: var(--panda-heatmap-cell-border-width-hover, unset);
		border-style: var(--panda-heatmap-cell-border-style-hover, unset);
		border-color: var(--panda-heatmap-cell-border-color-hover, unset);
		box-shadow: var(--panda-heatmap-cell-elevation-hover, none);
		z-index: 10;
	}

	.heatmap-cell.empty {
		border-width: var(--panda-heatmap-cell-border-width-empty, unset);
		border-style: var(--panda-heatmap-cell-border-style-empty, unset);
		border-color: var(--panda-heatmap-cell-border-color-empty, unset);
		background-color: var(--panda-heatmap-cell-background-color-empty, transparent);
		box-shadow: var(--panda-heatmap-cell-elevation-empty, none);
		pointer-events: none;
	}

	.heatmap-cell.light {
		color: var(--panda-heatmap-text-color-light, var(--panda-heatmap-text-color-light, hsl(0deg 0% 100%)));
	}

	.heatmap-cell.dark {
		color: var(--panda-heatmap-text-color-dark, var(--panda-heatmap-text-color-dark, hsl(191deg 19% 23%)));
	}

	.legend {
		display: flex;
		flex-flow: column;
		align-items: flex-end;
		padding-top: var(--panda-heatmap-legend-padding-top, var(--panda-padding-m, 10px));
	}

	.legend-gradient {
		height: var(--panda-heatmap-legend-height, 10px);
		width: var(--panda-heatmap-legend-width, 80%);
		border-radius: var(--panda-heatmap-legend-border-radius, var(--panda-border-radius-m, 5px));
		border-width: var(--panda-heatmap-legend-border-width, 1px);
		border-style: var(--panda-heatmap-legend-border-style, solid);
		border-color: var(--panda-heatmap-legend-border-color, var(--panda-border-color, hsl(191deg 19% 23%)));
		box-shadow: var(--panda-heatmap-legend-elevation, var(--panda-elevation-s, 0px 1px 2px hsl(0deg 0% 0% / 20%)));
	}

	.legend-labels {
		display: flex;
		justify-content: space-between;
		width: var(--panda-heatmap-legend-width, 80%);
		padding-top: var(--panda-heatmap-legend-padding-top, var(--panda-padding-s, 5px));

		color: var(--panda-heatmap-label-color, var(--panda-label-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-heatmap-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-heatmap-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-heatmap-label-text-shadow, var(--panda-label-text-shadow, none));
		user-select: none;
	}
`;
