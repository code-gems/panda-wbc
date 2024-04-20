// types
import { PandaClickToCopyEvent } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state, queryAssignedNodes } from "lit/decorators.js";

@customElement("panda-click-to-copy")
export class PandaClickToCopy extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	content: string | null = null;
	
	@property({ type: Boolean, attribute: "copy-as-html", reflect: true })
	copyAsHtml: boolean = false;

	@state()
	private _content: string = "";

	@queryAssignedNodes()
	private _contentSlot!: HTMLSlotElement[];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div
				class="content"
				@click="${this.copyToClipboard}"
			>
				<div class="div"></div>
				<slot></slot>
			</div>
		`;
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public copyToClipboard(): void {
		this._getContent();
		this._copyToClipboard();
		this._triggerCopyEvent();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getContent(): void {
		// check if content is provided
		if (this.content !== undefined && this.content !== null) {
			this._content = this.content;
		} else {
			const _textContentArray: string[] = [];
			// extract text content from slot nodes
			this._contentSlot.forEach((node) => {
				if (this.copyAsHtml) {
					_textContentArray.push(node.outerHTML);
				} else {
					let _text = node.textContent?.trim() ?? "";
					// remove tab and new line characters
					if (node.tagName === "BR") {
						_textContentArray.push(" ");
					}
					// remove multiple spaces, tabs and new line chars and replace with one space
					_text = _text.trim().split(/[\s,\t,\n]+/).join(" ");

					_textContentArray.push(_text);
				}
			});
			this._content = _textContentArray.join(" ").trim();
		}
	}

	private _triggerCopyEvent(): void {
		const event: PandaClickToCopyEvent = new CustomEvent("on-copy", {
			detail: {
				content: this._content
			}
		});
		this.dispatchEvent(event);
	}

	private _copyToClipboard(): void {
		navigator.clipboard.writeText(this._content);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-click-to-copy": PandaClickToCopy;
	}
}