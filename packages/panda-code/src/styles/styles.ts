export const styles = /*css*/`
	:host {
		display: block;
		width: 100%;
	}

	.syntax {
		padding: var(--panda-code-padding, var(--panda-gap-m, 10px));
		margin: 0;
		overflow-x: auto;
		
		line-height: 1.5;
		color: var(--panda-code-text-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-code-font-size-m, var(--panda-font-size-m, 14px));
		font-family: var(--panda-code-font-family, "Consolas", "Monaco", "Courier New", monospace);
		
		border-radius: var(--panda-code-border-radius, var(--panda-border-radius-m, 10px));
		background: var(--panda-code-background, #282c34);
	}

	slot {
		display: none;
	}

	code {
		display: flex;
		flex-flow: column;
		font-family: inherit;
		counter-reset: row-counter;
	}

	.row {
		position: relative;
		display: inline-block;
		width: 100%;
		height: var(--panda-code-row-height, 1.5em);
		padding-left: 2em;

		border-bottom: 1px dashed hsl(0deg 0% 100% / 10%);
		box-sizing: border-box;
	}

	.row::before {
		position: absolute;
		top: 0;
		min-width: 1em;
		margin-left: -2em;
		
		text-align: right;
		counter-increment: row-counter;
		content: counter(row-counter) ". ";
	}

	.row:hover {
		background-color: hsla(210, 50%, 50%, 0.1);
	}

	.line-highlight {
		display: inline-block;
		width: 100%;
		height: 100%;

		background: hsl(157deg 90% 54% / 20%);
		box-sizing: border-box;
	}
	
	.keyword {
		color: #c678dd;
		font-weight: bold;
	}

	.type {
		color: #e5c07b;
	}

	.builtin {
		color: #56b6c2;
	}

	.string {
		color: #98c379;
	}

	.number {
		color: #d19a66;
	}

	.comment {
		color: #5c6370;
		font-style: italic;
	}

	.operator {
		color: #56b6c2;
	}

	.identifier {
		color: #e06c75;
	}

	.attribute {
		color: #d19a66;
	}

	.plain {
		color: #abb2bf;
	}
`;
