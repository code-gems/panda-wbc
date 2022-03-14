// style
import { styles } from "./styles/styles";

// components
// ...

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-overlay")
export class PandaOverlay extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Boolean, attribute: true })
	opened!: boolean;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.opened = false;
	}

	protected firstUpdated(_changedProperties: PropertyValues): void {
		console.log("%c _onOverlayClose", "font-size: 24px; color: green;");

	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<div
				class="panda-overlay-cont"
				@click="${() => this._onOverlayClose()}"
			>
				<div
					id="panda-overlay"
					class="panda-overlay"
					part="overlay"
				>
					<slot>
					</slot>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onOverlayClose() {
		console.log("%c _onOverlayClose", "font-size: 24px; color: green;");
	}
}
