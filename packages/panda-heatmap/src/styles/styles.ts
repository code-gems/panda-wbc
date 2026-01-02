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

		border-radius: var(--panda-heatmap-border-radius-size, 10px);
		background-color: var(--panda-heatmap-background-color-working, hsl(0deg 0% 100%));
		/* SPINNER STYLE */
		--panda-spinner-color: var(--panda-heatmap-spinner-color, hsl(191deg 19% 23%));
		--panda-spinner-size: var(--panda-heatmap-spinner-size, 20px);
	}

	.heatmap-container {
		position: relative;
		display: inline-block;
		padding: var(--panda-heatmap-padding, var(--panda-padding-m, 10px));
		overflow: auto;
		
		border-radius: var(--panda-heatmap-border-radius, var(--panda-border-radius-m, 5px));
		background-color: var(--panda-heatmap-background-color, var(--panda-form-background-color, hsl(0deg 0% 100%)));
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

		font-size: var(--panda-heatmap-cell-font-size, var(--panda-font-size-m, 14px));
		font-family: var(--panda-heatmap-cell-font-family, var(--panda-font-family-bold, "Poppins-Bold"));
		transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
		cursor: default;
		user-select: none;

		border-radius: var(--panda-heatmap-cell-border-radius, var(--panda-border-radius-m, 5px));
		box-sizing: border-box;
	}

	.heatmap-cell:not(.empty):hover {
		transform: scale(1.15);
		box-shadow: var(--panda-heatmap-cell-elevation-hover, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
		z-index: 10;
	}

	.heatmap-cell.empty {
		background: transparent !important;
		pointer-events: none;
	}

	.legend {
		display: flex;
		flex-flow: column;
		align-items: flex-end;
		padding-top: var(--panda-heatmap-legend-padding-top, var(--panda-padding-m, 10px));
	}

	.legend-gradient {
		height: var(--panda-heatmap-legend-height, 20px);
		width: var(--panda-heatmap-legend-width, 60%);
		border-radius: var(--panda-heatmap-legend-border-radius, var(--panda-border-radius-m, 5px));
		box-shadow: var(--panda-elevation-s);
	}

	.legend-labels {
		display: flex;
		justify-content: space-between;
		width: var(--panda-heatmap-legend-width, 60%);
		padding-top: var(--panda-heatmap-legend-padding-top, var(--panda-padding-s, 5px));

		color: var(--panda-heatmap-label-color, var(--panda-label-color, hsl(191deg 19% 23%)));
		font-size: var(--panda-heatmap-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-heatmap-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-heatmap-label-text-shadow, var(--panda-label-text-shadow, none));
		user-select: none;
	}
`;
