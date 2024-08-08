// utils
import { css } from "lit";

export const styles = css`
	:host {
		display: inline;
		color: var(--panda-text-color, hsl(0deg 0% 15%));
		text-shadow: var(--panda-text-shadow, none);
		font-size: var(--panda-font-size-m, 14px);
		font-family: var(--panda-font-family, "Poppins");
	}
`;