// types
import { Store, PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";
import { uiComponents } from "../../styles/styles";

// web parts
import "@panda-wbc/panda-particle-banner";
import "../../web-parts/app-side-bar/app-side-bar";
import "../../web-parts/main-nav/main-nav";
import { pandaLogo } from "../../web-parts/panda-logo";

// utils
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PageLibrary, page } from "../../utils/page-library";
import { reduxify } from "../../redux/store";
import { PandaParticleBannerConfig, ParticleShape } from "@panda-wbc/panda-particle-banner";

@customElement("home-page")
@page({
	pageId: "home",
	pageName: "Home",
	pageUri: "/home",
	icon: "home",
	parent: true,
	category: PageCategory.HOME,
	keywords: [],
	description: [],
	contextMenu: [],
	template: html`<home-page></home-page>`
})
@reduxify()
class HomePage extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			uiComponents.banner,
			uiComponents.appLayout,
			uiComponents.modifiers,
		];
	}

	@property({ type: String })
	private _pageId!: string;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	stateChanged(state: Store) {
		console.log("%c [HOME PAGE] stateChanged", "font-size: 24px; color: green;", state);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="app">
				<div class="side-bar">
					<app-side-bar></app-side-bar>
				</div>
				<div class="body">
					${this._renderPageTemplate()}
				</div>
			</div>
		`;
	}

	private _renderMainPage() {
		// const bannerConfig: PandaParticleBannerConfig = {
		// 	particleCount: 180,
		// 	mouseOffset: true,
		// 	mouseOffsetXSensitivity: 10,
		// 	mouseOffsetYSensitivity: 10,

		// 	speedXMin: -0.1,
		// 	speedXMax: 0.1,
		// 	speedYMin: -0.1,
		// 	speedYMax: 0.1,

		// 	sizeMin: 5,
		// 	sizeMax: 100,

		// 	blur: true,
		// 	blurMin: 5,
		// 	blurMax: 10,
		// };

		const bannerConfig: PandaParticleBannerConfig = {
			// smudge: true,
			showFps: true,
			// background: {
			// 	color: "#fff"
			// },
			particleGroup: [
				{
					particleCount: 100,
					particleShape: ParticleShape.RECT,
					particleLineWidth: 20,
					drawParticle: (ctx, particle) => {
						const { x, y, color, size } = particle;

						ctx.moveTo(x, y);
						ctx.lineTo(x + (size / 2), y - (size / 2));

						ctx.lineJoin = "round";
						ctx.lineCap = "round";

						ctx.strokeStyle = color;
						ctx.stroke();
					},

					colors: ["#ff4778" , "#6f36bc", "#36174D"],
					colorHueVariation: 10,
					colorOpacityVariation: 30,
					// walls: true,
					// connect: true,
					// connectionDistance: 50,

					sizeMin: 200,
					sizeMax: 1000,

					minSpeedX: -0.2,
					maxSpeedX: 0.2,
					minSpeedY: -0.2,
					maxSpeedY: 0.2,

					blur: true,
					blurMin: 1,
					blurMax: 3,

					// getBlur: (particle, metadata, index) => {
					// 	let blur = particle.blur;
					// 	const clientX = metadata.mouse.clientX ?? 0;
					// 	const clientY = metadata.mouse.clientY ?? 0;
					// 	// const dist = Math.floor(Math.sqrt(Math.pow((particle.x - clientX), 2) + Math.pow((particle.y - clientY), 2)));
					// 	const distX = Math.floor(Math.sqrt(Math.pow((particle.x - clientX), 2)));
					// 	const distY = Math.floor(Math.sqrt(Math.pow((particle.y - clientY), 2)));

					// 	// console.log("%c getBlur -> clientX", "font-size: 24px; color: green;", metadata.mouse.clientX);
					// 	console.log("%c getBlur -> dist X/Y", "font-size: 24px; color: green;", distX, distY);
					// 	return 0; //particle.blur;
					// },		
				}
			],	
		}

		return html`
			<div class="body-wrap scroll">
				<panda-particle-banner
					.config="${bannerConfig}"
				>
					${pandaLogo}
					some text here
				</panda-particle-banner>
			</div>
		`;
	}

	private _renderPageTemplate() {
		if (this._pageId) {
			const selectedPage = new PageLibrary().getPageById(this._pageId);
			return selectedPage?.template;
		} else {
			return this._renderMainPage();
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}