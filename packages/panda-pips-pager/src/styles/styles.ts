import { css } from "lit";

export const styles = css`
	:host {
		display: block;
		user-select: none;
	}

	.pagination {
		width: 100%;
		overflow: hidden;
	}
	
	.pips-cont {
		display: flex;
		flex-flow: row nowrap;
	}

	.pips-cont.vertical {
		flex-flow: column;
	}

	.pips-cont .pip {
		position: relative;
		display: block;
		flex-shrink: 0;
		width: var(--panda-pips-pager-size, 24px);
		height: var(--panda-pips-pager-size, 24px);
		cursor: pointer;
		
		border-radius: 50%;
		box-shadow: 0px 0px 0px 0px var(--panda-outline-color, hsl(209deg 78% 46% / 40%));
	}
	
	.pips-cont .pip::before {
		position: absolute;
		display: block;
		content: " ";
		top: 50%;
		left: 50%;
		width: var(--panda-pips-pager-size-inactive, 6px);
		height: var(--panda-pips-pager-size-inactive, 6px);

		transform: translate(-50%, -50%);
		transition: all 300ms ease-in-out;
		
		border-radius: 50%;
		background-color: var(
			--panda-pips-pager-background-color,
			var(--panda-label-color, hsl(0deg 0% 50%))
		);
	}

	.pips-cont .pip:hover::before {
		width: var(--panda-pips-pager-size-hover, 10px);
		height: var(--panda-pips-pager-size-hover, 10px);
	}

	.pips-cont .pip.active::before {
		width: var(--panda-pips-pager-size-active, 12px);
		height: var(--panda-pips-pager-size-active, 12px);
		background-color: var(--panda-primary-color);
		box-shadow: var(--panda-component-outline, 0px 0px 0px 2px hsl(209deg 78% 46% / 40%));
	}
`;
