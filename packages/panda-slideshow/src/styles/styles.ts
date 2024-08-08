import { css } from "lit";

export const styles = css`
	:host {
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.slideshow-cont {
		display: block;
		width: 100%;
		height: 100%;
		padding: var(--panda-slideshow-padding, 10px);
		
		background-color: blue;
		box-sizing: border-box;
	}

	.slideshow {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		min-height: var(--panda-slideshow-slide-height, 250px);
		
		box-sizing: border-box;
		background-color: green;
	}

	::slotted(panda-slideshow-slide) {
		position: absolute;
		width: var(--panda-slideshow-slide-width, 300px);
		height: 100%;

		background-color: red;
	}
`;

export const slideStyles = css`
	:host {
		display: flex;
		justify-content: center;
		align-content: center;
	}

`;
