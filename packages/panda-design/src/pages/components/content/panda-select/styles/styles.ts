import { css } from "lit";

export const styles = css`
	.syntax-highlight {
		background: #282c34;
		color: #abb2bf;
		padding: 16px;
		border-radius: 8px;
		overflow-x: auto;
		font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
		font-size: 14px;
		line-height: 1.5;
		margin: 0;

	}

	code {
		display: flex;
		flex-flow: column;
		font-family: inherit;
		counter-reset: row-counter;
	}

	.row-number {
		position: relative;
		display: inline-block;
		width: 100%;
		height: 1.5em;
		padding-left: 2em;
		border-bottom: 1px dashed hsl(0deg 0% 100% / 10%);
		box-sizing: border-box;
	}

	.row-number::before {
		position: absolute;
		top: 0;
		min-width: 1em;
		margin-left: -2rem;
		
		text-align: right;
		counter-increment: row-counter;
		content: counter(row-counter) ". ";
	}

	.row-number:hover {
		background-color: hsla(210, 50%, 50%, 0.1);
	}


.syntax-highlight .keyword {
  color: #c678dd;
  font-weight: bold;
}

.syntax-highlight .type {
  color: #e5c07b;
}

.syntax-highlight .builtin {
  color: #56b6c2;
}

.syntax-highlight .string {
  color: #98c379;
}

.syntax-highlight .number {
  color: #d19a66;
}

.syntax-highlight .comment {
  color: #5c6370;
  font-style: italic;
}

.syntax-highlight .operator {
  color: #56b6c2;
}

.syntax-highlight .identifier {
  color: #e06c75;
}

.syntax-highlight .attribute {
  color: #d19a66;
}

.syntax-highlight .line-highlight {
	display: inline-block;
	background-color: hsl(157deg 90% 54% / 20%);
	width: 100%;
	box-sizing: border-box;
}

.syntax-highlight .plain {
  color: #abb2bf;
}
`;