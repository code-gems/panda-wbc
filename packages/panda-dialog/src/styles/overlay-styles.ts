export const styles = /*css*/`
	:host {
		display: block;
	}

	.dialog-overlay {
		position: fixed;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100dvw;
		height: 100dvh;
		inset: 0;
		pointer-events: auto;

		background-color: var(--panda-dialog-overlay-background-color, hsl(0deg 0% 94% / 50%));
		z-index: 100;
	}

	.content {
		display: flex;
		flex-flow: column;
		
		color: var(--panda-dialog-text-color, hsl(210deg 5% 25%));
		font-size: var(--panda-dialog-font-size, 14px);
		font-family: var(--panda-dialog-font-family, "Poppins");
		
		animation: show 300ms ease-out;

		border-width: var(--panda-dialog-border-width, 1px);
		border-style: var(--panda-dialog-border-style, solid);
		border-color: var(--panda-dialog-border-color, hsl(0deg 0% 85%));
		border-radius: var(--panda-dialog-border-radius, 5px);
		background-color: var(--panda-dialog-background-color, hsl(0deg 0% 100%));
		box-shadow: var(--panda-dialog-elevation, 0px 2px 4px hsl(0deg 0% 0% / 20%));
		box-sizing: border-box;
	}

	@keyframes show {
		from { transform: scale(0.8); }
		to { transform: scale(1); }
	}
`;
