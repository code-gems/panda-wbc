import { css } from "lit";

export const styles = css`
	:host {
		display: flex;
		width: var(--panda-full-page-width, 100dvw);
		height: var(--panda-full-page-height, 100dvh);
		overflow: hidden;
	}

	.page-cont {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	::slotted(panda-full-page-content) {
		position: absolute;

		transition: top 400ms ease-in-out;
		background-color: red;
	}
`;

export const contentStyles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
		transition: top 400ms ease-in-out;
	}
`;