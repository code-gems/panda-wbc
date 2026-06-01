import { css } from "lit";

export const styles = css`
	:host {

	}

	panda-card.gradient-border {
		--panda-card-border-width: 2px;
		--panda-card-border-color: transparent;
		--panda-card-border-gradient: linear-gradient(
			to bottom,
			hsl(209deg 78% 42%),
			hsl(187deg 100% 42%)
		);

		--panda-card-elevation: 0px 4px 8px hsl(187deg 100% 42% / 20%);
	}

	panda-card img {
		transition: transform 0.3s ease-in-out;
		transform: scale(1) rotate(0deg);
	}

	panda-card:hover img {
		transform: scale(1.05) rotate(1deg);
	}
`;