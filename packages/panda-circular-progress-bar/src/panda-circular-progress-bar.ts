// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-circular-progress-bar")
export class PandaCircularProgressBar extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Number })
	value!: number;

	@property({ type: Number, attribute: "gradient-angle" })
	gradientAngle: number = 0;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div class="progress-cont" part="progress-cont">
				<div class="progress" part="progress">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						version="1.1"
						width="100"
						height="100"
						viewBox="0 0 100 100"
					>
						<defs>
							<linearGradient
								id="gradient"
								gradientTransform="rotate(${this.gradientAngle} 0.5 0.5)"
							>
								<stop offset="0%" stop-color="var(--panda-gradient-color-1)" stop-opacity="1" />
								<stop offset="100%" stop-color="var(--panda-gradient-color-2)" stop-opacity="1" />
							</linearGradient>
						</defs>
						<circle
							cx="50"
							cy="50"
							r="40"

						/>
					</svg>
				</div>
				<div class="content">
					<slot></slot>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================


	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-circular-progress-bar": PandaCircularProgressBar;
	}
}