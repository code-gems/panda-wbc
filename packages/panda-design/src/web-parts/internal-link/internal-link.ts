// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("internal-link")
class InternalLink extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	target: string = "";

	private _copyToClipboardTimer!: number;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		this._getTarget();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clear timers
		if (this._copyToClipboardTimer) {
			clearTimeout(this._copyToClipboardTimer);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<a
				class="link"
				href="#${this.target}"
				@click="${this._onInternalLinkClick}"
			>
				<slot></slot>
			</a>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getTarget() {
		if (this.target === "") {
			let _target = "";
			let attr = this.parentElement?.attributes.getNamedItem("data-content-section-name");

			// check if attribute exists on parent element
			// if not, drill one level more
			if (!attr) {
				attr = this.parentElement?.parentElement?.attributes.getNamedItem("data-content-section-name");
			}

			_target = attr?.value || "";
			this.target = _target;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInternalLinkClick(): void {
		this._copyToClipboardTimer = setTimeout(() => {
			navigator.clipboard.writeText(location.href)
		}, 200);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"internal-link": InternalLink;
	}
}