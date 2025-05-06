import { css } from "lit";

export const scrollbar = css`
	.scrollbar::-webkit-scrollbar {
		width: var(--panda-scrollbar-size);
		height: var(--panda-scrollbar-size);
	}
	
	.scrollbar::-webkit-scrollbar-track {
		border-radius: var(--panda-scrollbar-track-border-radius);
		background-color: var(--panda-scrollbar-track-background-color);
	}
	
	.scrollbar::-webkit-scrollbar-thumb {
		border-radius: var(--panda-scrollbar-thumb-border-radius);
		background-color: var(--panda-scrollbar-thumb-background-color);
	}
	
	.scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: var(--panda-scrollbar-thumb-background-color-hover);
	}
	
	.scrollbar::-webkit-scrollbar-corner {
		background-color: transparent;
	}

	/* SCROLLBAR - SMALL */

	.scrollbar-s::-webkit-scrollbar {
		width: var(--panda-scrollbar-size-s);
		height: var(--panda-scrollbar-size-s);
	}
	
	.scrollbar-s::-webkit-scrollbar-track {
		border-radius: var(--panda-scrollbar-track-border-radius);
		background-color: var(--panda-scrollbar-track-background-color);
	}
	
	.scrollbar-s::-webkit-scrollbar-thumb {
		border-radius: var(--panda-scrollbar-thumb-border-radius);
		background-color: var(--panda-scrollbar-thumb-background-color);
	}
	
	.scrollbar-s::-webkit-scrollbar-thumb:hover {
		background-color: var(--panda-scrollbar-thumb-background-color-hover);
	}
	
	.scrollbar-s::-webkit-scrollbar-corner {
		background-color: transparent;
	}
`;