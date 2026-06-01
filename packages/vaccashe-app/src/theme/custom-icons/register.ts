// icon library
import { pandaIconLibrary } from "@panda-wbc/panda-icon/lib/panda-icon-library";

pandaIconLibrary.registerIcons([
	{
		name: "leaf",
		template: `
			<g
				class="no-fill stroke"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
				<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
			</g>
		`,
	},
	{
		name: "flame",
		template: `
			<g
				class="no-fill stroke"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path>
			</g>
		`,
	},
	{
		name: "dumbbell",
		template: `
			<g
				class="no-fill stroke"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
				<path d="m2.5 21.5 1.4-1.4" />
				<path d="m20.1 3.9 1.4-1.4" />
				<path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
				<path d="m9.6 14.4 4.8-4.8" />
			</g>
		`,
	}
]);