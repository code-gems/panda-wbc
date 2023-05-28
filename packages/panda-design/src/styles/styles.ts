import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		width: 100%;
		height: 100%;
	}
`;

export const uiComponents = {
	appLayout: css`
		.app {
			display: flex;
			flex-flow: row nowrap;
			width: 100%;
			height: 100%;
		}

		.app > .side-bar {
			position: relative;
			flex-shrink: 0;
		}

		.app > .submenu {
			display: flex;
			flex-flow: column;
			flex-shrink: 0;
			width: 280px;
			height: 100%;
			overflow: hidden;

			background-color: var(--panda-background-color-700);
		}

		.app > .submenu > .header {

		}

		.app > .submenu > .body {
			overflow: overlay;
		}

		.app > .body {
			flex-grow: 1;
			overflow: hidden;
			background-color: var(--panda-background-color-500);
		}
		
		.app > .body > .body-wrap {
			height: 100%;
			overflow: auto;
		}

		.content-page {
			display: flex;
			flex-flow: row nowrap;
			gap: 10px;
		}

		.content-page .content {
			flex-grow: 1;
		}

		.content-page .context-menu {
			display: block;
			width: 15vw;
			padding: 40px;
			flex-shrink: 0;
			box-sizing: border-box;
		}

		.content-list {
			display: flex;
			flex-flow: column;
			width: calc(15vw - 80px); /* context-menu width - 2x padding */
			padding: 10px;
			gap: 10px;

			border-radius: 10px;
			background-color: var(--panda-background-color-300);
			box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
			box-sizing: border-box;
		}

		.content-list.fixed {
			position: fixed;
			top: 40px;
		}

		.content-list .header {
			padding: 0px 20px;
			line-height: 40px;

			font-size: var(--panda-font-size-s);
			font-family: var(--panda-font-family);
			user-select: none;

			border-bottom: 1px dashed var(--panda-background-color-900);
			box-sizing: border-box;
		}

		.content-list .list {
			display: flex;
			flex-flow: column;
		}

		.content-list .list-item {
			display: flex;
			flex-flow: row nowrap;
			border-radius: 10px;
			cursor: pointer;

			transition: all 400ms ease-in-out;
		}

		.content-list .list .list-item .icon {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			width: 30px;
			height: 50px;

			--panda-icon-width: var(--panda-icon-size-xs);
			--panda-icon-height: var(--panda-icon-size-xs);
		}

		.content-list .list .list-item label {
			line-height: 50px;
			padding: 0px 10px 0px 5px;
			flex-grow: 1;

			color: var(--panda-text-color);
			font-size: var(--panda-font-size-s);
			font-family: var(--panda-font-family);
			user-select: none;
			cursor: pointer;
		}

		.content-list .list .list-item:hover {
			background-color: var(--panda-background-color-100);
			box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		}

		.section {
			padding: 40px;

			color: var(--panda-text-color);
			font-size: var(--panda-font-size-s);
			font-family: var(--panda-font-family);
			box-sizing: border-box;
		}
	`,

	menuList: css`
		.menu-list {
			display: flex;
			flex-flow: column;
			padding: 10px;
			gap: 10px;

			box-sizing: border-box;
		}
		
		.menu-list .list-item {
			display: flex;
			flex-flow: row nowrap;
			min-height: 50px;
			cursor: pointer;
			transition: all 400ms ease-in-out;

			border-radius: 10px;
			background-color: var(--panda-background-color-500);
			box-shadow: 0px 1px 2px var(--dragon-black-color-10opc);
		}

		.menu-list .list-item:hover {
			background-color: var(--panda-background-color-300);
			box-shadow: 0px 1px 2px var(--dragon-black-color-20opc);
		}

		.menu-list .list-item .icon {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-shrink: 0;
			width: 50px;
			height: 50px;
		}

		.menu-list .list-item label {
			line-height: 50px;
			padding: 0px 20px;
			flex-grow: 1;

			color: var(--panda-text-color);
			font-size: var(--panda-font-size-s);
			font-family: var(--panda-font-family);
			user-select: none;
			cursor: pointer;		
		}
	`,

	banner: css`
		.banner {
			display: block;
			width: 100%;
			min-height: 400px;
			padding: 40px;

			background-color: var(--panda-background-color-300);
			box-sizing: border-box;
		}

		.banner.small { min-height: 200px; }

		.banner .p {
			color: var(--panda-text-color);
			font-size: var(--panda-font-size-l);
			font-family: var(--panda-font-family);
		}
	`,

	table: css`
		.table {
			overflow: hidden;
		}

		.table .thead,
		.table .tbody,
		.table .tr {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: minmax(50px, 1fr);
		}

		.table .thead {
			font-family: var(--panda-font-family-bold);
			background-color: var(--panda-background-color-900);
		}

		.table .tr {
			transition: all 400ms ease-in-out;
			border-bottom: 1px dashed var(--panda-background-color-900);
		}

		.table .tr:hover {
			background-color: var(--panda-background-color-300);
		}
	
		.table .td {
			display: flex;
			padding: 0px 10px;
			align-items: center;
		}

		.table .td.align-center { justify-content: center; }
		
		.table .td.align-right { justify-content: flex-end; }

		.color-box {
			position: relative;
			background-image: url(./transparent.png);
			background-position: center;
			background-size: 20% 20%;
			background-color: var(--dragon-black-color-10opc);
		}

		.color-box .color {
			position: absolute;
			display: block;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}
	`,
	
	/** 12 column system */
	columnSystem: css`
		.row {
			display: grid;
			grid-template-columns: repeat(12, minmax(0, 1fr));
			grid-auto-rows: minmax(50px, 1fr);
			column-gap: 10px;
		}

		[class*=" col-"],
		[class^="col-"] {
			display: flex;
			flex-flow: column;
			gap: 5px;
		}

		.col-1 { grid-column: span 1 / auto; }
		.col-2 { grid-column: span 2 / auto; }
		.col-3 { grid-column: span 3 / auto; }
		.col-4 { grid-column: span 4 / auto; }
		.col-5 { grid-column: span 5 / auto; }
		.col-6,
		.col-half { grid-column: span 6 / auto; }
		.col-7 { grid-column: span 7 / auto; }
		.col-8 { grid-column: span 8 / auto; }
		.col-9 { grid-column: span 9 / auto; }
		.col-10 { grid-column: span 10 / auto; }
		.col-11 { grid-column: span 11 / auto; }
		.col-12,
		.col-full { grid-column: span 12 / auto; }
	`,
	
	// menuList: css`
	// 	.menu-list {
	// 		display: flex;
	// 		flex-flow: column;
	// 	}

	// 	.menu-list .menu-list-item {
	// 		padding: 0px 15px;
	// 		line-height: 48px;

	// 		cursor: pointer;
			
	// 		border-bottom: 1px dashed rgb(229, 229, 229);
	// 		box-sizing: border-box;
	// 	}

	// 	.menu-list .menu-list-item:hover {

	// 	}
	// `,

	modifiers: css`
		.scroll::-webkit-scrollbar { width: 5px; }
		.scroll::-webkit-scrollbar-track { background-color: var(--panda-bg-color, hsl(0deg 0% 100%)); }
		.scroll::-webkit-scrollbar-thumb { background-color: var(--panda-bg-color-100, hsl(0deg 0% 95%)); }
		.scroll::-webkit-scrollbar-thumb:hover { background-color: var(--panda-bg-color-200, hsl(0deg 0% 90%)); }
	`,
}