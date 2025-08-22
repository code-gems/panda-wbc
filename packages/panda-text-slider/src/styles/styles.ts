export const styles = /*css*/`
	:host {
		display: block;
		width: 100%;
		height: var(--panda-text-slider-height, 100%);
		user-select: none;
		outline: none;
	}

	.slider-cont {
		position: relative;
		display: flex;
		align-items: center;
		height: 100%;
		overflow: hidden;
	}

	.slider-cont.hide {
		display: none;
	}

	.slide {
		position: absolute;
		display: block;
		width: 100%;
		padding-left: var(--panda-text-slider-padding-left, 10px);
		padding-right: var(--panda-text-slider-padding-right, 10px);
		overflow: hidden;
		
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		text-shadow: inherit;
		text-overflow: ellipsis;
		white-space: nowrap;

		animation-duration: var(--panda-text-slider-animation-duration, 400ms);
		animation-iteration-count: 1;
		animation-timing-function: var(--panda-text-slider-animation-timing-function, ease-in-out);
		animation-fill-mode: forwards;

		box-sizing: border-box;
	}

	.slide.show {
		opacity: 1;
		transform: translateY(0%);
	}

	.slide.hide {
		opacity: 0;
		transform: translateY(100%);
	}

	.slide.slide-in {
		animation-name: slideIn;
	}

	.slide.slide-out {
		animation-name: slideOut;
	}

	/* ANIMATIONS */
	@keyframes slideIn {
		0% {
			opacity: 0;
			transform: translateY(100%);
		}
		100% {
			opacity: 1;
			transform: translateY(0%);
		}
	}
	
	@keyframes slideOut {
		0% {
			opacity: 1;
			transform: translateY(0%);
		}
		100% {
			opacity: 0;
			transform: translateY(-100%);
		}
	}
`;