export const styles = /*css*/`
	.label {
		display: block;
		overflow: hidden;
		line-height: var(--panda-checkbox-group-label-line-height, var(--panda-label-line-height, 1.6em));
		color: var(--panda-checkbox-group-label-color, var(--panda-label-color, hsl(0deg 0% 50%)));
		font-size: var(--panda-checkbox-group-label-font-size, var(--panda-label-font-size, 12px));
		font-family: var(--panda-checkbox-group-label-font-family, var(--panda-label-font-family, "Poppins"));
		text-shadow: var(--panda-checkbox-group-label-text-shadow, var(--panda-label-text-shadow, none));
		text-overflow: ellipsis;
		white-space: nowrap;
		user-select: none;
	}

	slot {
		display: flex;
		flex-flow: column;
		gap: var(--panda-checkbox-group-gap, var(--panda-gap-s, 5px));
	}

	slot.horizontal {
		flex-flow: row;
		gap: var(--panda-checkbox-group-gap-horizontal, var(--panda-gap-m, 10px));
	}
`;