import { css } from "lit";

export const styles = css`
	:host {
		
	}

	.flag-list {
		display: flex;
		flex-flow: column;
		width: 100%;
	}

	.flag-list .list-item {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: var(--panda-padding-m);
	}

	.flag-list .list-item .flag {
		padding: var(--panda-padding-l);
	}

	.flag-list .list-item .name {

	}

	.flag-list .list-item {

	}

	.flag-list {}
`;