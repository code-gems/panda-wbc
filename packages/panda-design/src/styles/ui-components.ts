import { css } from "lit";

export const uiComponents = {
	columnSystem: css`
		.row {
			display: flex;
			flex-flow: row wrap;
		}

		.col-full {
			display: flex;
			flex-basis: 100%;
			flex-grow: 1;
		}
	`,
	
	menuList: css`
		.menu-list {
			display: flex;
			flex-flow: column;
		}

		.menu-list .menu-list-item {
			padding: 0px 15px;
			line-height: 48px;

			cursor: pointer;
			
			border-bottom: 1px dashed rgb(229, 229, 229);
			box-sizing: border-box;
		}

		.menu-list .menu-list-item:hover {

		}
	`,


}
