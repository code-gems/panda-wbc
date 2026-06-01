export const styles = /*css*/`
	:host {
		/* position sticky is necessary for the border gradient effect */
		position: sticky;
		display: inline-block;
		width: 100%;
		outline: none;
		-webkit-font-smoothing: antialiased;
	}

	.card {
		position: relative;
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		height: 100%;
		gap: var(--panda-card-gap, var(--panda-gap-m, .5rem));
		padding: var(--panda-card-padding, var(--panda-gap-m, .5rem));

		border-width: var(--panda-card-border-width, var(--panda-border-width, 1px));
		border-style: var(--panda-card-border-style, var(--panda-border-style, solid));
		border-color: var(--panda-card-border-color, var(--panda-border-color, hsl(207deg 1% 85%)));
		border-radius: var(--panda-card-border-radius, var(--panda-border-radius-m, .5rem));

		background: var(--panda-card-background, hsl(0deg 0% 100%));
		background-clip: padding-box;
		box-shadow: var(--panda-card-elevation, var(--panda-elevation-m, 0px 2px 4px hsl(0deg 0% 0% / 20%)));
		box-sizing: border-box;
	}

	.card::before {
		position: absolute;
		content: "";
		inset: 0;
		margin: calc(-1 * var(--panda-card-border-width, 1px));

		transition: var(--panda-card-border-transition, all 0.3s ease-in-out);

		border-radius: inherit;
		background: var(--panda-card-border-gradient, transparent);
		z-index: -1;
	}

	.card.horizontal {
		flex-flow: row nowrap;
	}

	.card-body {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--panda-card-gap, var(--panda-gap-m, .5rem));
	}

	/* ============================================================================================================= */
	/* MEDIA SLOT ================================================================================================== */
	/* ============================================================================================================= */

	slot[name="media"] {
		display: none;
		flex-shrink: 0;
		width: calc(100% + (2 * var(--panda-card-padding, var(--panda-gap-m, .5rem))));
		height: auto;
		object-fit: var(--panda-card-media-object-fit, cover);
		aspect-ratio: var(--panda-card-media-aspect-ratio, 4 / 3);
		overflow: hidden;
		
		margin-top: calc(-1 * var(--panda-card-padding, var(--panda-gap-m, .5rem)));
		margin-left: calc(-1 * var(--panda-card-padding, var(--panda-gap-m, .5rem)));
		margin-right: calc(-1 * var(--panda-card-padding, var(--panda-gap-m, .5rem)));

		border-width: var(--panda-card-media-border-width, 0px);
		border-style: var(--panda-card-media-border-style, solid);
		border-color: var(--panda-card-media-border-color, transparent);
		border-radius: var(--panda-card-media-border-radius, var(--panda-border-radius-m, .5rem));
		box-sizing: border-box;
	}

	.has-media slot[name="media"] {
		display: flex;
	}

	/* ============================================================================================================= */
	/* HEADER SLOT ================================================================================================= */
	/* ============================================================================================================= */

	.header {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-card-header-gap, var(--panda-gap-m, .5rem));
	}

	slot[name="header"] {
		display: flex;
		flex-flow: column;
		flex-grow: 1;
		gap: var(--panda-card-header-gap, var(--panda-gap-m, .5rem));
	}
	
	slot[name="header-prefix"] {
		flex-shrink: 0;
	}

	slot[name="header-suffix"] {
		flex-shrink: 0;
	}

	slot[name="title"] {
		color: var(--panda-card-title-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-card-title-font-size, var(--panda-font-size-l, 1.25rem));
		font-family: var(--panda-card-title-font-family, var(--panda-font-family-bold, "Poppins-Bold"));
		font-weight: var(--panda-card-title-font-weight, var(--panda-font-weight-bold, 700));
	}

	slot[name="subtitle"] {
		color: var(--panda-card-subtitle-color, var(--panda-label-color, hsl(209deg 12% 67%)));
		font-size: var(--panda-card-subtitle-font-size, var(--panda-font-size-s, .875rem));
		font-family: var(--panda-card-subtitle-font-family, var(--panda-font-family, "Poppins"));
		font-weight: var(--panda-card-subtitle-font-weight, var(--panda-font-weight-medium, 500));
	}

	/* ============================================================================================================= */
	/* CONTENT SLOT ================================================================================================= */
	/* ============================================================================================================= */

	.content slot {
		display: block;

		color: var(--panda-card-content-color, var(--panda-text-color, hsl(210deg 5% 25%)));
		font-size: var(--panda-card-content-font-size, var(--panda-font-size-m, 1rem));
		font-family: var(--panda-card-content-font-family, var(--panda-font-family, "Poppins"));
	}

	/* ============================================================================================================= */
	/* FOOTER SLOT ================================================================================================= */
	/* ============================================================================================================= */

	slot[name="footer"] {
		display: flex;
		flex-flow: row nowrap;
		gap: var(--panda-card-footer-gap, var(--panda-gap-m, .5rem));
	}

`;
