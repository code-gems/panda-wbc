export const styles = /*css*/`
	:host {
		display: block;
		width: 100%;
		height: var(--panda-sliding-placeholder-height, 100%);
		user-select: none;
		outline: none;
	}

	.placeholder-cont {
		position: relative;
		display: flex;
		align-items: center;
		height: 100%;
		overflow: hidden;
	}

	.placeholder-cont.hide {
		display: none;
	}

	.placeholder {
		position: absolute;
		display: block;
		width: 100%;
		padding: var(--panda-sliding-placeholder-padding, 10px);
		overflow: hidden;
		
		color: inherit;
		font-size: inherit;
		font-family: inherit;
		text-shadow: inherit;
		text-overflow: ellipsis;
		white-space: nowrap;

		animation-duration: var(--panda-sliding-placeholder-animation-duration, 400ms);
		animation-iteration-count: 1;
		animation-timing-function: var(--panda-sliding-placeholder-animation-timing-function, ease-in-out);
		animation-fill-mode: forwards;

		box-sizing: border-box;
	}

	.placeholder.show {
		opacity: 1;
		transform: translateY(0%);
	}

	.placeholder.hide {
		opacity: 0;
		transform: translateY(100%);
	}

	.placeholder.slide-in {
		animation-name: slideIn;
	}

	.placeholder.slide-out {
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