// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("code-sample")
class CodeSample extends LitElement {
	// css styles
	//css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	header!: string;

	@property({ type: Boolean, attribute: true, reflect: true })
	expanded: boolean = false;

	// elements
	@query("#code")
	private _codeEl!: HTMLSlotElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const expanded = this.expanded ? "expanded" : "";

		return html`
			<div class="code-sample">
				<div class="header">
					${this._renderHeader()}
				</div>
				<div class="body ${expanded}">
					<pre>
						<slot id="code"></slot>
					</pre>
					<div
						class="btn"
						@click="${this._onToggleExpand}"
					>
						Expand
					</div>
				</div>
			</div>
		`;
	}

	private _renderHeader(): TemplateResult {
		return html`
			<div class="icon">
				<panda-icon icon="code"><panda-icon>
			</div>
			<label>${this.header || "Code Sample"}</label>
			<div
				class="btn-copy"
				@click="${this._onCopySample}"
			>
				<panda-icon icon="copy"><panda-icon>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onCopySample() {
		const textContentList: string[] = this._codeEl.assignedNodes({ flatten: true }).map((node) => {
			return node.textContent
				? node.textContent.replace(/[ \t]/g, " ") // swap tabs with spaces
				: "";
		});
		// combine all text nodes
		const snippet = textContentList.join("");
		// copy snippet to clipboard
		navigator.clipboard.writeText(snippet);
	}

	private _onToggleExpand() {
		this.expanded = !this.expanded;
	}
}