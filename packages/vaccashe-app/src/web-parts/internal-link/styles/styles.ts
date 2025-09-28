import { css } from "lit";

export const styles = css`
	:host {
		display: inline;
	}
	
	.link {
		position: relative;
		display: inline;

		color: var(--panda-header-text-color);
		text-decoration: none;
		text-shadow: var(--panda-header-text-shadow);
		transition: all 200ms ease;
	}

	.link:hover {
		color: var(--panda-header-text-color-hover);
	}

	.link::before {
		position: absolute;
		display: block;
		content: "#";
		top: 50%;
		left: -1.8em;

		opacity: 0;
		color: var(--panda-header-text-color);
		transform: translate(-50%, -50%);
		transition: all 200ms ease;
		user-select: none;
		pointer-events: none;

		z-index: 1;
	}

	.link:hover::before {
		opacity: 1;
		left: -0.8em;
		color: var(--panda-header-text-color-hover);
	}

	/* THEMES */

	:host([theme~="h2"]) .link {
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}

	:host([theme~="h3"]) .link {
		font-size: 1.17em;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}
`;