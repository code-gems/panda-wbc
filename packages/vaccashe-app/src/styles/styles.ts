import { css } from "lit";

/** vaccashe-app styles */
export const styles = css`
	:host {
		display: block;
		width: 100%;
	}
`;

export const uiComponents = {
	layout: css`
		header {
			position: sticky;
			display: block;
			top: 0;
			left: 0;
			z-index: 1000;
		}

		main {
			height: 2000px;
		}

		.app {
			display: flex;
			flex-flow: column;
			width: 100%;
			height: 100%;

			background-color: var(--panda-background-color);
		}

		.app .body {
			margin-top: var(--app-navigation-size);
			flex-grow: 1;
			flex-shrink: 0;
			height: 1000px;

			background-color: var(--panda-background-color);
		}

		.app .footer {
			flex-shrink: 0;
		}
	`,
	
	/** 12 column system */
	columnSystem: css`
		.rows {
			display: flex;
			flex-flow: column;
			gap: var(--panda-padding-m);
		}

		.row {
			display: grid;
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--panda-padding-m);
		}

		.row.underline {
			border-bottom: 1px dashed var(--panda-border-color);
		}

		[class*=" col-"],
		[class^="col-"] {
			display: flex;
			flex-flow: column;
			gap: 5px;
		}

		.col-1 { grid-column: span 1 / auto; }
		.col-2 { grid-column: span 2 / auto; }
		.col-3 { grid-column: span 3 / auto; }
		.col-4 { grid-column: span 4 / auto; }
		.col-5 { grid-column: span 5 / auto; }
		.col-6,
		.col-half { grid-column: span 6 / auto; }
		.col-7 { grid-column: span 7 / auto; }
		.col-8 { grid-column: span 8 / auto; }
		.col-9 { grid-column: span 9 / auto; }
		.col-10 { grid-column: span 10 / auto; }
		.col-11 { grid-column: span 11 / auto; }
		.col-12,
		.col-full { grid-column: span 12 / auto; }

		.row > .content-center {
			justify-content: center;
			align-items: center;
		}
	`,
	
	modifiers: css`
		.flex-justify-center { justify-content: center; }
		.flex-align-right { align-items: flex-end; }
		.flex-align-center { align-items: center; }
		.text-align-center { text-align: center; }

		.push-s { margin-top: 5px; }
		.push-m { margin-top: 10px; }
		.push-l { margin-top: 15px; }

		.pull-s { margin-bottom: 5px; }
		.pull-m { margin-bottom: 10px; }
		.pull-l { margin-bottom: 15px; }
	`,
}