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
			flex-grow: 1;
			flex-shrink: 0;
			height: 1000px;

			background-color: var(--panda-background-color);
		}

		.app .footer {
			flex-shrink: 0;
		}
			
		.container {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			width: 100%;
			max-width: var(--app-max-width);
			margin: 0;
			margin-inline: auto;
			box-sizing: border-box;
		}

		.gap-2 { gap: var(--panda-gap-2); }
		.gap-3 { gap: var(--panda-gap-3); }
		.gap-4 { gap: var(--panda-gap-4); }
		.gap-5 { gap: var(--panda-gap-5); }
		.gap-6 { gap: var(--panda-gap-6); }
		.gap-7 { gap: var(--panda-gap-7); }
		.gap-8 { gap: var(--panda-gap-8); }
		.gap-9 { gap: var(--panda-gap-9); }
		.gap-10 { gap: var(--panda-gap-10); }
		.gap-11 { gap: var(--panda-gap-11); }
		.gap-12 { gap: var(--panda-gap-12); }
		.gap-13 { gap: var(--panda-gap-13); }
		.gap-14 { gap: var(--panda-gap-14); }
		.gap-15 { gap: var(--panda-gap-15); }
		.gap-16 { gap: var(--panda-gap-16); }
		.gap-17 { gap: var(--panda-gap-17); }
		.gap-18 { gap: var(--panda-gap-18); }
		.gap-19 { gap: var(--panda-gap-19); }
		.gap-20 { gap: var(--panda-gap-20); }
		.gap-21 { gap: var(--panda-gap-21); }
		.gap-22 { gap: var(--panda-gap-22); }
		.gap-23 { gap: var(--panda-gap-23); }
		.gap-24 { gap: var(--panda-gap-24); }

		.py { padding-block: var(--panda-gap); }
		.py-2 { padding-block: var(--panda-gap-2); }
		.py-3 { padding-block: var(--panda-gap-3); }
		.py-4 { padding-block: var(--panda-gap-4); }
		.py-5 { padding-block: var(--panda-gap-5); }
		.py-6 { padding-block: var(--panda-gap-6); }
		.py-7 { padding-block: var(--panda-gap-7); }
		.py-8 { padding-block: var(--panda-gap-8); }
		.py-9 { padding-block: var(--panda-gap-9); }
		.py-10 { padding-block: var(--panda-gap-10); }
		.py-11 { padding-block: var(--panda-gap-11); }
		.py-12 { padding-block: var(--panda-gap-12); }
		.py-13 { padding-block: var(--panda-gap-13); }
		.py-14 { padding-block: var(--panda-gap-14); }
		.py-15 { padding-block: var(--panda-gap-15); }
		.py-16 { padding-block: var(--panda-gap-16); }
		.py-17 { padding-block: var(--panda-gap-17); }
		.py-18 { padding-block: var(--panda-gap-18); }
		.py-19 { padding-block: var(--panda-gap-19); }
		.py-20 { padding-block: var(--panda-gap-20); }
		.py-21 { padding-block: var(--panda-gap-21); }
		.py-22 { padding-block: var(--panda-gap-22); }
		.py-23 { padding-block: var(--panda-gap-23); }
		.py-24 { padding-block: var(--panda-gap-24); }

		.px { padding-inline: var(--panda-gap); }
		.px-2 { padding-inline: var(--panda-gap-2); }
		.px-3 { padding-inline: var(--panda-gap-3); }
		.px-4 { padding-inline: var(--panda-gap-4); }
		.px-5 { padding-inline: var(--panda-gap-5); }
		.px-6 { padding-inline: var(--panda-gap-6); }
		.px-7 { padding-inline: var(--panda-gap-7); }
		.px-8 { padding-inline: var(--panda-gap-8); }
		.px-9 { padding-inline: var(--panda-gap-9); }
		.px-10 { padding-inline: var(--panda-gap-10); }
		.px-11 { padding-inline: var(--panda-gap-11); }
		.px-12 { padding-inline: var(--panda-gap-12); }
		.px-13 { padding-inline: var(--panda-gap-13); }
		.px-14 { padding-inline: var(--panda-gap-14); }
		.px-15 { padding-inline: var(--panda-gap-15); }
		.px-16 { padding-inline: var(--panda-gap-16); }
		.px-17 { padding-inline: var(--panda-gap-17); }
		.px-18 { padding-inline: var(--panda-gap-18); }
		.px-19 { padding-inline: var(--panda-gap-19); }
		.px-20 { padding-inline: var(--panda-gap-20); }
		.px-21 { padding-inline: var(--panda-gap-21); }
		.px-22 { padding-inline: var(--panda-gap-22); }
		.px-23 { padding-inline: var(--panda-gap-23); }
		.px-24 { padding-inline: var(--panda-gap-24); }

		@media (min-width: 48rem) {
			.md\\:py { padding-block: var(--panda-gap); }
			.md\\:py-2 { padding-block: var(--panda-gap-2); }
			.md\\:py-3 { padding-block: var(--panda-gap-3); }
			.md\\:py-4 { padding-block: var(--panda-gap-4); }
			.md\\:py-5 { padding-block: var(--panda-gap-5); }
			.md\\:py-6 { padding-block: var(--panda-gap-6); }
			.md\\:py-7 { padding-block: var(--panda-gap-7); }
			.md\\:py-8 { padding-block: var(--panda-gap-8); }
			.md\\:py-9 { padding-block: var(--panda-gap-9); }
			.md\\:py-10 { padding-block: var(--panda-gap-10); }
			.md\\:py-11 { padding-block: var(--panda-gap-11); }
			.md\\:py-12 { padding-block: var(--panda-gap-12); }
			.md\\:py-13 { padding-block: var(--panda-gap-13); }
			.md\\:py-14 { padding-block: var(--panda-gap-14); }
			.md\\:py-15 { padding-block: var(--panda-gap-15); }
			.md\\:py-16 { padding-block: var(--panda-gap-16); }
			.md\\:py-17 { padding-block: var(--panda-gap-17); }
			.md\\:py-18 { padding-block: var(--panda-gap-18); }
			.md\\:py-19 { padding-block: var(--panda-gap-19); }
			.md\\:py-20 { padding-block: var(--panda-gap-20); }
			.md\\:py-21 { padding-block: var(--panda-gap-21); }
			.md\\:py-22 { padding-block: var(--panda-gap-22); }
			.md\\:py-23 { padding-block: var(--panda-gap-23); }
			.md\\:py-24 { padding-block: var(--panda-gap-24); }
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
			min-width: 1rem;
			gap: var(--panda-gap);
		}

		.col-1 { grid-column: span 1 / auto; }
		.col-2 { grid-column: span 2 / auto; }
		.col-3 { grid-column: span 3 / auto; }
		.col-4 { grid-column: span 4 / auto; }
		.col-5 { grid-column: span 5 / auto; }
		.col-6 { grid-column: span 6 / auto; }
		.col-7 { grid-column: span 7 / auto; }
		.col-8 { grid-column: span 8 / auto; }
		.col-9 { grid-column: span 9 / auto; }
		.col-10 { grid-column: span 10 / auto; }
		.col-11 { grid-column: span 11 / auto; }
		.col-12 { grid-column: span 12 / auto; }

		.row > .content-center {
			justify-content: center;
			align-items: center;
		}

		@media (max-width: 40rem) {
			.sm\\:col-1 { grid-column: span 1 / auto; }
			.sm\\:col-2 { grid-column: span 2 / auto; }
			.sm\\:col-3 { grid-column: span 3 / auto; }
			.sm\\:col-4 { grid-column: span 4 / auto; }
			.sm\\:col-5 { grid-column: span 5 / auto; }
			.sm\\:col-6 { grid-column: span 6 / auto; }
			.sm\\:col-7 { grid-column: span 7 / auto; }
			.sm\\:col-8 { grid-column: span 8 / auto; }
			.sm\\:col-9 { grid-column: span 9 / auto; }
			.sm\\:col-10 { grid-column: span 10 / auto; }
			.sm\\:col-11 { grid-column: span 11 / auto; }
			.sm\\:col-12 { grid-column: span 12 / auto; }
		}

		@media (max-width: 48rem) {
			.md\\:col-1 { grid-column: span 1 / auto; }
			.md\\:col-2 { grid-column: span 2 / auto; }
			.md\\:col-3 { grid-column: span 3 / auto; }
			.md\\:col-4 { grid-column: span 4 / auto; }
			.md\\:col-5 { grid-column: span 5 / auto; }
			.md\\:col-6 { grid-column: span 6 / auto; }
			.md\\:col-7 { grid-column: span 7 / auto; }
			.md\\:col-8 { grid-column: span 8 / auto; }
			.md\\:col-9 { grid-column: span 9 / auto; }
			.md\\:col-10 { grid-column: span 10 / auto; }
			.md\\:col-11 { grid-column: span 11 / auto; }
			.md\\:col-12 { grid-column: span 12 / auto; }
		}

		@media (max-width: 64rem) {
			.lg\\:col-1 { grid-column: span 1 / auto; }
			.lg\\:col-2 { grid-column: span 2 / auto; }
			.lg\\:col-3 { grid-column: span 3 / auto; }
			.lg\\:col-4 { grid-column: span 4 / auto; }
			.lg\\:col-5 { grid-column: span 5 / auto; }
			.lg\\:col-6 { grid-column: span 6 / auto; }
			.lg\\:col-7 { grid-column: span 7 / auto; }
			.lg\\:col-8 { grid-column: span 8 / auto; }
			.lg\\:col-9 { grid-column: span 9 / auto; }
			.lg\\:col-10 { grid-column: span 10 / auto; }
			.lg\\:col-11 { grid-column: span 11 / auto; }
			.lg\\:col-12 { grid-column: span 12 / auto; }
		}

		@media (max-width: 80rem) {
			.xl\\:col-1 { grid-column: span 1 / auto; }
			.xl\\:col-2 { grid-column: span 2 / auto; }
			.xl\\:col-3 { grid-column: span 3 / auto; }
			.xl\\:col-4 { grid-column: span 4 / auto; }
			.xl\\:col-5 { grid-column: span 5 / auto; }
			.xl\\:col-6 { grid-column: span 6 / auto; }
			.xl\\:col-7 { grid-column: span 7 / auto; }
			.xl\\:col-8 { grid-column: span 8 / auto; }
			.xl\\:col-9 { grid-column: span 9 / auto; }
			.xl\\:col-10 { grid-column: span 10 / auto; }
			.xl\\:col-11 { grid-column: span 11 / auto; }
			.xl\\:col-12 { grid-column: span 12 / auto; }
		}
	`,

	typography: css`
		.eyebrow {
			display: inline-flex;
			gap: var(--panda-gap);

			color: var(--panda-primary-color);
			font-size: var(--panda-font-size-xs);
			font-weight: var(--panda-font-weight-semibold);
			text-transform: uppercase;
			line-height: var(--panda-line-height-xs);
			letter-spacing: .2em;
			align-items: center;
		}

		.header-xl {
			font-family: var(--panda-header-font-family);
			letter-spacing: .005em;
			font-size: clamp(3rem, 8vw, 7rem);
			line-height: .95;
		}

		.txt-primary { color: var(--panda-primary-color); }

		.text-l {
			font-size: var(--panda-font-size-l);
			line-height: var(--panda-line-height-l);
		}
	`,
	
	modifiers: css`
		.flex-justify-center { justify-content: center; }
		.flex-align-right { align-items: flex-end; }
		.flex-align-center { align-items: center; }
		.text-align-center { text-align: center; }

		.push-s { margin-top: var(--panda-gap-s); }
		.push-m { margin-top: var(--panda-gap-m); }
		.push-l { margin-top: var(--panda-gap-l); }

		.pull-s { margin-bottom: var(--panda-gap-s); }
		.pull-m { margin-bottom: var(--panda-gap-m); }
		.pull-l { margin-bottom: var(--panda-gap-l); }
	`,
};
