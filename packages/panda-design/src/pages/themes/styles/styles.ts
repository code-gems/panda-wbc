import { css } from "lit";

export const styles = css`
	:host {
		display: block;

		--dragon-background: rgb(255, 0, 0);
		--dragon-background-100: rgb(100, 150, 200);
		--dragon-background-300: red;
		--dragon-background-500: red;
	}

	.color-showcase {
		display: flex;
		flex-flow: row nowrap;

		font-size: 12px;
	}

	.row {
		display: grid;
		grid-template-rows: repeat(10, minmax(50px, 1fr));
		grid-template-columns: 180px;
	}

	.col-1 { grid-area: span 1; }
	.col-2 { grid-area: span 2; }
	.col-3 { grid-area: span 3; }
	.col-4 { grid-area: span 4; }
	.col-5 { grid-area: span 5; }
	.col-6 { grid-area: span 6; }
	.col-7 { grid-area: span 7; }
	.col-8 { grid-area: span 8; }
	.col-9 { grid-area: span 9; }
	.col-10 { grid-area: span 10; }

	.bg-color { background-color: var(--dragon-background); }
	.bg-100 { background-color: var(--dragon-background-100); }
	.bg-300 { background-color: var(--dragon-background-300); }
	.bg-500 { background-color: var(--dragon-background-500); }
	.bg-700 { background-color: var(--dragon-background-700); }
	.bg-900 { background-color: var(--dragon-background-900); }
`;