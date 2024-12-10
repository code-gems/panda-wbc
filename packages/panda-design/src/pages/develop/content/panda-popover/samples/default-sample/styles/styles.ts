import { css } from "lit";

export const styles = css`
	.sample {
		display: block;
		width: 100%;
		height: 100%;
	}
`;

export const popoverStyle = css`
	a {
		color: red;
		animation: fade-in 2s;
	}

	@keyframes fade-in {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
`;