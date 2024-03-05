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
			flex-shrink: 0;
			width: 300px;
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

		.content-page-wrap {
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

		.content-page .content .content-section {
			position: relative;
			margin: 50px 0px;
			background-color: var(--panda-background-color-500);
			z-index: 1;
		}
		.content-page .content .content-section:hover {
			transform: skewY(0deg);
		}

		.content-page .content .content-section:nth-child(even) {
			background-color: var(--panda-background-color-300);
		}

		.content-page .content .content-section::before,
		.content-page .content .content-section::after {
			position: absolute;
			display: block;
			height: 50px;
			content: " ";
			left: 0;
			right: 0;

			transform: skewY(1.5deg);

			background-color: inherit;
			z-index: -1;
		}
		
		.content-page .content .content-section::before {
			top: 0;
			transform-origin: 100%;
		}

		.content-page .content .content-section::after {
			bottom: 0;
			transform-origin: 0%;
		}

		.content-page .context-menu {
			position: relative;
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
			padding: 5px 10px;
			line-height: 1.5em;

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
			width: 40px;
			height: 40px;

			--panda-icon-width: var(--panda-icon-size-s);
			--panda-icon-height: var(--panda-icon-size-s);
		}

		.content-list .list .list-item label {

			line-height: 1.5em;
			padding: 11px 4px;
			flex-grow: 1;
			overflow: hidden;

			color: var(--panda-text-color);
			font-size: var(--panda-font-size-m);
			font-family: var(--panda-font-family);
			text-overflow: ellipsis;
			user-select: none;
			cursor: pointer;
		}

		.content-list .list .list-item:hover {
			background-color: var(--panda-background-color-100);
			box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		}

		.btn-scroll-top {
			position: absolute;
			bottom: 0%;
			left: 50%;

			transition: all 400ms ease-in-out;
			background-color: var(--panda-background-color-300);
			box-shadow: 0px 1px 2px var(--panda-black-color-10opc);
		}

		.btn-scroll-top:hover {
			background-color: var(--panda-background-color-100);
		}

		.section {
			padding: 40px;

			color: var(--panda-text-color);
			font-size: var(--panda-font-size-m);
			font-family: var(--panda-font-family);
			text-align: justify;
			
			box-sizing: border-box;
		}

		.section.highlight {
			animation-name: highlight;
			animation-delay: 1s;
			animation-duration: 1s;
			animation-iteration-count: 2;
			animation-timing-function: linear;
		}

		.section h1,
		.section h2,
		.section h3,
		.section h4 {
			color: var(--panda-header-text-color);
			text-shadow: var(--panda-header-text-shadow);
		}

		@keyframes highlight {
			0% { background-color: var(--panda-highlight-color-0opc); }
			50% { background-color: var(--panda-highlight-color); }
			100% { background-color: var(--panda-highlight-color-0opc); }
		}
	`,

	banner: css`
		.banner {
			position: relative;
			display: block;
			width: 100%;
			height: 400px;
			min-height: 400px;
			padding: var(--panda-padding-xl);

			background-color: var(--panda-background-color-300);
			box-sizing: border-box;
		}

		.banner::before {
			position: absolute;
			display: block;
			width: 100%;
			height: 20%;
			content: " ";
			left: 0px;
			right: 0px;
			bottom: 0px;
			
			transform-origin: 100% 0;
			transform: skewY(-1.5deg);
			background-color: var(--panda-background-color);
			z-index: 1;
		}

		.banner.small {
			height: 200px;
			min-height: 200px;
		}

		.banner.particle-banner {
			padding: 0px;
		}

		.banner .p {
			color: var(--panda-text-color);
			font-size: var(--panda-font-size-l);
			font-family: var(--panda-font-family);
		}

		.banner .content {
			padding: 10px 20px;

			border-radius: 10px;
			border: 1px solid var(--panda-background-color-500);
			backdrop-filter: blur(3px);
			background-color: var(--panda-background-color-50opc);
			box-shadow: 0px 5px 10px var(--panda-black-color-10opc);
		}

		.banner .content h1 {
			margin: 0px;
		}
	`,

	form: css`
		.form {
			display: flex;
			flex-flow: column;
			width: 20vw;
			max-width: 400px;

			border-radius: 5px;
			border: 1px solid var(--panda-form-border-color);
			background-color: var(--panda-background-color-500);
			box-shadow: 0px 2px 4px var(--panda-black-color-20px);
		}
	
		.form .form-section {
			width: 100%;
			padding: 20px;

			box-sizing: border-box;
		}

		.form .form-section.bg-700 {
			border-bottom: 1px solid var(--panda-form-border-color);
			background-color: var(--panda-background-color-700);
		}

		.form .footer {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			padding: 10px 20px;

			border-top: 1px solid var(--panda-form-border-color);
			background-color: var(--panda-background-color-900);
		}

		.form label {
			color: var(--panda-label-color);
			font-size: var(--panda-label-font-size);
			font-family: var(--panda-label-font-family);
			text-shadow: var(--panda-label-text-shadow);
			user-select: none;
		}

		.form .row {
			margin-bottom: 8px;
		}

		.form p,
		.form h2 {
			user-select: none;
		}
	`,

	sample: css`
		.sample-cont {
			display: flex;
			flex-flow: row;
			justify-content: center;
			align-items: center;
			padding: 40px;
		}

		.sample-cont .sample {
			display: flex;
			justify-content: center;
			width: 100%;
			padding: 40px;

			border-radius: 10px;
			border: 1px solid var(--panda-background-color-900);
			background: radial-gradient(
				circle at 1px 1px,
				var(--panda-form-border-color) 0px,
				#0000 1px
			)
			0 0 / 16px 16px;
		}
	`,

	table: css`
		.table {
			overflow: hidden;
		}

		.table .thead {
			font-family: var(--panda-font-family-bold);
			background-color: var(--panda-background-color-900);
		}

		.table .tr {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: minmax(50px, 1fr);
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
			text-align: left;
		}

		.table .td.align-center { justify-content: center; }
		
		.table .td.align-right { justify-content: flex-end; }

		.color-box {
			position: relative;
			background-image: url(./transparent.png);
			background-position: center;
			background-size: 20% 20%;
			background-color: var(--panda-black-color-10opc);
		}

		.color-box .color {
			position: absolute;
			display: block;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}

		/* MODS */
		.table.table-properties .tr {
			grid-template-columns: 200px 170px 90px auto !important;
		}

		.table.table-properties.with-options .tr {
			grid-template-columns: 200px 170px 90px 170px auto !important;
		}

		.table.table-events {

		}

	`,
	
	/** 12 column system */
	columnSystem: css`
		.rows {
			display: flex;
			flex-flow: column;
			gap: var(--panda-padding-m);	
		}

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
	
	modifiers: css`
		.align-right { align-items: flex-end; }
		.align-center { align-items: center; }
		.txt-align-center { text-align: center; }
		.txt-color { color: var(--panda-primary-color); }

		.push-s { margin-top: 5px; }
		.push-m { margin-top: 10px; }
		.push-l { margin-top: 15px; }

		.pull-s { margin-bottom: 5px; }
		.pull-m { margin-bottom: 10px; }
		.pull-l { margin-bottom: 15px; }

		.width-10 { width: 10dvw; }
		.width-20 { width: 20dvw; }
		.width-30 { width: 30dvw; }
		.width-40 { width: 40dvw; }
		.width-50 { width: 50dvw; }
		.width-60 { width: 60dvw; }
		.width-70 { width: 70dvw; }
		.width-80 { width: 80dvw; }
		.width-90 { width: 90dvw; }
		.width-100 { width: 100dvw; }

		code {
			padding: 0px var(--panda-padding-s);
			line-height: 1.6em;

			border: 1px solid var(--panda-background-color-900);
			border-radius: var(--panda-border-radius-m);
			background-color: var(--panda-background-color-700);
		}
		
		.code {
			padding: 0px var(--panda-padding-m);
			line-height: 1.6em;

			color: var(--panda-action-color-info);
			font-style: italic;

			border-radius: var(--panda-border-radius-m);
			background-color: var(--panda-action-color-info-10opc);
		}

		.variable-type {
			padding: 0px var(--panda-padding-m);
			line-height: 1.6em;

			color: var(--panda-primary-color);
			font-style: italic;

			border-radius: var(--panda-border-radius-m);
			background-color: var(--panda-primary-color-10opc);
		}

		.property {
			padding: 0px var(--panda-padding-m);
			line-height: 1.6em;

			color: var(--panda-action-color-done);
			font-style: italic;

			border-radius: var(--panda-border-radius-m);
			background-color: var(--panda-action-color-done-10opc);
		}
	`,
}