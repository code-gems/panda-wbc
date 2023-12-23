import { css } from "lit";

export const styles = css`
	.theme-switcher {
		display: flex;
		width: 100px;
		height: 100px;
		padding: 25px;

		box-sizing: border-box;
	}

	.theme-switcher .switcher-cont {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		overflow: hidden;

		transition: all 400ms ease-in-out;

		border-radius: 50%;
		background-color: var(--panda-background-color-500);
		box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		box-sizing: border-box;
	}

	.theme-switcher .switcher-cont:hover {
		background-color: var(--panda-background-color-300);
		box-shadow: 0px 1px 2px var(--panda-black-color-20opc);
	}

	.theme-switcher .switcher-cont .switcher {
		position: absolute;
		top: 0px;
		left: 0px;

		transition: top 400ms ease-in-out;
	}

	.theme-switcher .switcher-cont.flip .switcher {
		top: -50px;
	}

	.theme-switcher .switcher-cont .switcher .btn {
		display: flex;
		width: 50px;
		height: 50px;
		justify-content: center;
		align-items: center;

		cursor: pointer;
	}
`;