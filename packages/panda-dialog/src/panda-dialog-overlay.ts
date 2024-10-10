// types
// ...

// styles
import { styles } from "./styles/overlay-styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// utils
import { LitElement, html, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("panda-dialog-overlay")
export class PandaDialogOverlay extends LitElement {
	//css styles
	static get styles() {
		return [styles, scrollbar];
	}
	
	@property({ type: Element })
	template!: Element | null;

	@property({ type: Boolean, attribute: "no-close-on-outside-click", reflect: true })
	noCloseOnOutsideClick: boolean = false;

	@property({ type: Boolean, attribute: "no-close-on-esc", reflect: true })
	noCloseOnEsc: boolean = false;

	private _preventClose: boolean = false;
	
	// events
	private readonly _closeDialogEvent = this._triggerCloseEvent.bind(this);

	// elements
	@query("#content")
	private readonly _contentEl!: Element;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// add events
		document.addEventListener("dragon-dialog-close", this._closeDialogEvent);
	}
	
	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove events
		document.removeEventListener("dragon-dialog-close", this._closeDialogEvent);
	}

	protected updated(_changedProperties: PropertyValues): void {
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
				class="dialog-overlay"
				part="dialog-overlay"
				@click="${this._onCloseOverlay}"
			>
				<div
					id="content"
					class="content scrollbar"
					part="content"
					@click="${this._onPreventClose}"
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

	private _triggerCloseEvent(): void {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPreventClose(): void {
		// stopping propagation or preventing event will cause input type="file" to not work...
		// hence this is the working solution
		this._preventClose = true;
	}

	private _onCloseOverlay(): void {
		if (this._preventClose) {
			this._preventClose = false;
		} else if (!this.noCloseOnOutsideClick) {
			this._triggerCloseEvent();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog-overlay": PandaDialogOverlay;
	}
}
