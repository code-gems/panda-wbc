import { css } from "lit";

export const scroll = css`
	/* Firefox */
	.scroll {
		scrollbar-face-color: #4f5053; /* Firefox 63 compatibility */
		scrollbar-track-color: #e3e3e3; /* Firefox 63 compatibility */
		scrollbar-color: #4f5053 #e3e3e3;
		scrollbar-width: thin;
	}

	.scroll::-webkit-scrollbar {
		width: var(--panda-scrollbar-width);
	}
	
	.scroll::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	
	.scroll::-webkit-scrollbar-thumb {
		background-color: darkgrey;
	}
`;

export const callout = css`
	
`;