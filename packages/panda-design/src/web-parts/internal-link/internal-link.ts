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

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		console.log("%c [INTERNAL LINK] parent", "font-size: 24px; color: red;", this.parentElement?.parentElement);
		this._getTarget();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<a
				class="link"
				href="#${this.target}"
			>
				<slot></slot>
			</a>
		`;
	}

	private _getTarget() {
		if (this.target === "") {
			let _target = "";
			let attr = this.parentElement?.attributes.getNamedItem("data-content-section-name");
			console.log("%c 1 attr", "font-size: 24px; color: red;", attr);

			if (!attr) {
				attr = this.parentElement?.parentElement?.attributes.getNamedItem("data-content-section-name");
				console.log("%c 2 attr", "font-size: 24px; color: red;", attr);
			}

			_target = attr?.value || "";
			this.target = _target;
			console.log("%c [INTERNAL LINK] target", "font-size: 24px; color: red;", attr, _target);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"internal-link": InternalLink;
	}
}