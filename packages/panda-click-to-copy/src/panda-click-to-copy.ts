// types
import { PandaClickToCopyEvent, PandaClickToCopyTooltipPosition } from "../index";

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

	@property({ type: Boolean, attribute: "hide-icon", reflect: true })
	hideIcon: boolean = false;

	@property({ type: Boolean, attribute: "hide-caption", reflect: true })
	hideCaption: boolean = false;

	@property({ type: String, attribute: "copy-caption", reflect: true })
	copyCaption: string = "COPY";

	@property({ type: String, attribute: "done-caption", reflect: true })
	doneCaption: string = "DONE";

	@property({ type: String, reflect: true })
	position: PandaClickToCopyTooltipPosition = PandaClickToCopyTooltipPosition.RIGHT;

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
		const _showTooltip = this._copied
		 	? "show-tooltip"
			: "";

		return html`
			<div
				class="content ${_showTooltip}"
				part="content ${_showTooltip}"
				@click="${this.copyToClipboard}"
			>
				<slot></slot>
				${this._renderTooltip()}
			</div>
		`;
	}

	private _renderTooltip(): TemplateResult {
		if (this.hideIcon && this.hideCaption) {
			return html``;
		}
		let _iconHtml: TemplateResult = html``;
		let _captionHtml: TemplateResult = html``;

		const _done = this._copied
			? "done"
			: "";

		if (!this.hideIcon) {
			const _icon = this._copied
				? "check"
				: "copy";

			_iconHtml = html`
				<div class="icon" part="icon">
					<panda-icon icon="${_icon}"></panda-icon>
				</div>
			`;
		}

		if (!this.hideCaption) {
			const _caption = this._copied
				? this.doneCaption
				: this.copyCaption;

			_captionHtml = html`
				<div
					class="caption"
					class="caption"
				>
					${_caption}
				</div>
			`;
		}

		// apply tooltip position
		let _position: string = "";
		switch (this.position) {
			case PandaClickToCopyTooltipPosition.TOP:
				_position = "top";
				break;
			case PandaClickToCopyTooltipPosition.LEFT:
				_position = "left";
				break;
			case PandaClickToCopyTooltipPosition.BOTTOM:
				_position = "bottom";
				break;
			case PandaClickToCopyTooltipPosition.RIGHT:
			default:
				_position = "right";
				break;
		}

		return html`
			<div
				class="tooltip ${_done} ${_position}"
				part="tooltip ${_done} ${_position}"
			>
				${_iconHtml}
				${_captionHtml}
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
		if (this.copyAsHtml) {
			const clipboardItem = new ClipboardItem({
				"text/plain": new Blob([this._content], { type: "text/plain" }),
				"text/html": new Blob([this._content], { type: "text/html" }),
			});
			navigator.clipboard.write([clipboardItem]);
		} else {
			navigator.clipboard.writeText(this._content);
		}
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