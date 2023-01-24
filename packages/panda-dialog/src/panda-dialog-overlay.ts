// types

// styles
import { styles } from "./styles/overlay-styles";

// utils
import { LitElement, html, TemplateResult, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-dialog-overlay")
export class PandaDialogOverlay extends LitElement {
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


	connectedCallback(): void {
		super.connectedCallback();
		
		console.log("%c [OVERLAY] TEMPLATE", "font-size: 24px; color: green;", this.template);

	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("template") && this.template) {
			console.log("%c [OVERLAY] updated -> template", "font-size: 24px; color: green;", this.template.innerHTML);
			this.applyContent();
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		return html`
			<div
				class="dialog-overlay"
				part="dialog-overlay"
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

	private _onPreventDefault(e: MouseEvent) {
		console.log("%c [OVERLAY] _onPreventDefault", "font-size: 24px; color: green;");
		e.stopPropagation();
		e.preventDefault();
		return;
	}

	private _onCloseOverlay() {
		console.log("%c [OVERLAY] _onCloseOverlay", "font-size: 24px; color: green;");
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog-overlay": PandaDialogOverlay;
	}
}
