// types
// ...

// styles
import { styles } from "./styles/overlay-styles";

// utils
import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-tooltip-overlay")
export class PandaTooltipOverlay extends LitElement {
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: Element })
	template!: Element | null;

	@query("#content")
	private _contentEl!: Element;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("template") && this.template) {
			this.applyContent();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		return html`
			<div
				class="tooltip-overlay"
				part="tooltip-overlay"
				@click="${this._onCloseOverlay}"
			>
				<div
					id="content"
					class="content"
					part="content"
					@click="${this._onPreventDefault}"
				>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply template content to dialog overlay */
	private applyContent() {
		if (this.template !== null) {
			this._contentEl.innerHTML = this.template.innerHTML;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPreventDefault(e: MouseEvent): void {
		e.stopPropagation();
		e.preventDefault();
		return;
	}

	private _onCloseOverlay() {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-tooltip-overlay": PandaTooltipOverlay;
	}
}
