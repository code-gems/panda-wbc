export const styles = /*css*/`
	:host {
		display: inline-block;
		height: var(--panda-button-height-size-m, 40px);
		user-select: none;
		outline: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.button {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		height: 100%;
		padding: 0px 16px;

		outline: none;
		cursor: pointer;

		
		border-radius: 10px;
		border: solid 1px transparent;
		background: #E4E4E4;
		background-clip: padding-box;
		box-shadow: 0px 1px 0px #ECECEC inset,
			0px -1px 0px #DDDDDD inset,
			0px 1px 2px hsl(0deg 0% 0% / 10%);
		box-sizing: border-box;
	}
	
	.button::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: -1px;

		border-radius: inherit;
		background: linear-gradient(to bottom, #D0D0D0, #BDBDBD);
		z-index: -1;
	}
`;