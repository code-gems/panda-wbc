// types
import { PandaClickToCopyEvent } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
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

	@state()
	private _copied: boolean = false;

	@queryAssignedNodes()
	private _contentSlot!: HTMLSlotElement[];

	// timer
	private _animationTimer!: number;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	updated(_changedProperties: PropertyValues): void {
		if (_changedProperties.has("_copied") && this._copied) {
			this._animationTimer = setTimeout(() => {
				this._copied = false;
			}, 2000);
		}
	}

	disconnectedCallback(): void {
		// clean up
		if (this._animationTimer) {
			clearTimeout(this._animationTimer);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const icon = this._copied ? "check" : "copy";
		const done = this._copied ? "done" : "";
		return html`
			<div
				class="content"
				@click="${this.copyToClipboard}"
			>
				<div class="btn-copy ${done}">
					<panda-icon icon="${icon}"></panda-icon>
				</div>
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
					_text = _text.trim().split(/\s+/).join(" ");

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
		this._copied = true;
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