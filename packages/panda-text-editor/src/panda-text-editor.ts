// types
import { PandaTextEditorOptions, EmlFileConfig, EDITOR_COMMAND } from "../index";

// styles
import { styles } from "./styles/styles";

// mixins
import { scrollbar } from "@panda-wbc/panda-mixins";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult, PropertyValueMap } from "lit";
import { property, customElement, query } from "lit/decorators.js";

@customElement("panda-text-editor")
export class PandaTextEditor extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			scrollbar
		];
	}

	@property({ type: String, attribute: false })
	content: string = "";

	@property({ type: Boolean, attribute: true })
	readonly: boolean = false;

	@property({ type: Boolean, attribute: true })
	busy: boolean = false;

	@property({ type: String, attribute: true })
	spinner: string = "";

	@property({ type: Object })
	options: PandaTextEditorOptions = {
		toolbarPosition: "top",
		hideToolbar: false,
		toolbar: [
			// text style
			{
				formatBlock: {
					h1: true,
					h2: true,
					pre: true,
				}
			},
			// format
			{
				bold: true,
				italic: true,
				underline: true,
				// strikethrough: true,
			},
			// alignment
			{
				alignLeft: true,
				alignCenter: true,
				alignRight: true,
				// alignJustify: true,
			},
			// remove format
			{
				removeFormat: true,
			}
		]
	};

	@property({ type: String, attribute: false })
	customStyle!: string;

	// view props
	@query("#editor")
	private _editorEl!: HTMLInputElement;

	@query("#placeholder")
	private _placeholderEl!: Element;

	@property({ type: Selection })
	selection!: Selection | null;

	@property({ type: Array })
	_selectedTags: string[] = [];

	private _focused: boolean = false;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.content = "";
	// set default editor options
		this.options
	}

	protected firstUpdated() {
		// look for a template to preset editor content
		if (this.children.length > 0) {
			Array.from(this.children).forEach((child) => {
				if (child.tagName === "TEMPLATE") {
					if (child.getAttribute("placeholder") !== null) {
						this._placeholderEl.innerHTML = child.innerHTML;
					} else {
						const templateContent = child.innerHTML.trim();
						if (templateContent.length > 0) {
							this._editorEl.innerHTML = templateContent;
						}
					}
				}
			});
		}
		// check if content is passed down to component via property
		if (this.content) {
			this._editorEl.innerHTML = this.content;
		}
		// change editor default behavior
		document.execCommand("defaultParagraphSeparator", false, "div");
		this.requestUpdate();

		// setInterval(() => {
		// 	console.log("%c ->", "font-size: 16px; color: orange;", this.selection?.getRangeAt(0));

		// 	// if (this?.selection?.type === "Range") {
		// 	// 	let parentNode = this.selection.anchorNode;
		// 	// 	if (parentNode) {
		// 	// 		console.log("%c parentNode", "font-size: 16px; color: orange;", parentNode);
		// 	// 	}
		// 	// }

		// }, 1000);
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		// check if custom style is defined
		if (_changedProperties.has("customStyle") && this.customStyle) {
			this._appendCustomStyle();
		}

		// check if content was updated from outside
		if (_changedProperties.has("content") && this.content !== null) {
			// don't update content if user is actively typing to prevent loop
			if (!this._focused) {
				this._editorEl.innerHTML = this.content || "";
			}
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		// check if we need to show placeholder content
		const showPlaceholder = !this._editorEl?.innerText?.length
			? "show"
			: "";
		console.log("%c showPlaceholder", "font-size: 24px; color: green;", showPlaceholder);
		const spinnerHtml: TemplateResult[] = [];
		if (this.busy) {
			spinnerHtml.push(html`
				<div
					class="spinner-cont"
					part="spinner-cont"
				>
					<panda-spinner
						part="spinner"
						spinner="${this.spinner}"
					>
					</panda-spinner>
				</div>
			`);
		}
		return html`
			<div class="text-editor">
				${this._renderToolbar()}
				<div class="editor-cont scroll">
					<div id="placeholder" class="${showPlaceholder}" part="placeholder"></div>
					<article
						id="editor"
						class="editor"
						part="editor"
						?contenteditable="${!this.readonly}"
						?spellcheck="${this.spellcheck}"
						@input="${(e: InputEvent) => this._onInput(e)}"
						@mouseup="${this._onSelectionChanged}"
						@mousemove="${this._onSelectionChanged}"
						@mousedown="${this._onSelectionChanged}"
						@keydown="${this._onSelectionChanged}"
						@focus="${this._onEditorFocus}"
						@blur="${this._onEditorBlur}"
					>
					</article>
				</div>
				${spinnerHtml}
			</div>
		`;
	}

	private _renderToolbar() {
		const toolbarHtml: TemplateResult[] = [];

		if (this.options?.toolbar?.length) {
			// generate toolbar template
			this.options.toolbar.forEach((toolbarConfig) => {
				const toolsHtml: TemplateResult[] = [];

				// format block
				if (toolbarConfig.formatBlock) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.FORMAT_BLOCK,
							"",
							false,
							Object.keys(toolbarConfig.formatBlock)
						)
					);
				}

				// format
				if (toolbarConfig.bold) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.FORMAT_BOLD,
							"format-bold",
							this._selectedTags.includes("b") || this._selectedTags.includes("strong")
						)
					);
				}
				if (toolbarConfig.italic) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.FORMAT_ITALIC,
							"format-italic",
							this._selectedTags.includes("i")
						)
					);
				}
				if (toolbarConfig.underline) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.FORMAT_UNDERLINE,
							"format-underline",
							this._selectedTags.includes("u")
						)
					);
				}
				if (toolbarConfig.strikethrough) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.FORMAT_STRIKETHROUGH,
							"format-strikethrough",
							this._selectedTags.includes("strike")
						)
					);
				}
				if (toolbarConfig.blockquote) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.BLOCKQUOTE,
							"format-blockquote",
							this._selectedTags.includes("blockquote"),
							["blockquote"]
						)
					);
				}
				if (toolbarConfig.code) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.CODE,
							"code",
							this._selectedTags.includes("pre"),
						)
					);
				}
				if (toolbarConfig.removeFormat) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.FORMAT_REMOVE,
							"format-clear",
							false
						)
					);
				}

				// alignment
				if (toolbarConfig.alignLeft) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_LEFT, "format-align-left", false));
				}
				if (toolbarConfig.alignCenter) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_CENTER, "format-align-center", false));
				}
				if (toolbarConfig.alignRight) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_RIGHT, "format-align-right", false));
				}
				if (toolbarConfig.alignJustify) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_JUSTIFY, "format-align-justify", false));
				}

				// list
				if (toolbarConfig.numberedList) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.LIST_NUMBERED,
							"format-list-numbered",
							this._selectedTags.includes("ol")
						)
					);
				}
				if (toolbarConfig.bulletedList) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.LIST_BULLETED,
							"format-list-bulleted",
							this._selectedTags.includes("ul")
						)
					);
				}

				// indentation
				if (toolbarConfig.indentDecrease) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.INDENT_DECREASE, "format-indent-decrease", false));
				}
				if (toolbarConfig.indentIncrease) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.INDENT_INCREASE, "format-indent-increase", false));
				}

				// history
				if (toolbarConfig.undo) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.UNDO, "undo", false));
				}
				if (toolbarConfig.redo) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.REDO, "redo", false));
				}

				// clipboard
				if (toolbarConfig.copy) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.COPY, "copy", false));
				}
				if (toolbarConfig.paste) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.PASTE, "paste", false));
				}
				if (toolbarConfig.cut) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.CUT, "cut", false));
				}

				// misc
				if (toolbarConfig.downloadEml) {
					// check if file config is provided
					const emlFileConfig: EmlFileConfig = typeof toolbarConfig.downloadEml !== "boolean"
						? toolbarConfig.downloadEml
						: {};

					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.DOWNLOAD_EML, "download-eml-file", false, emlFileConfig));
				}
				if (toolbarConfig.downloadHtml) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.DOWNLOAD_HTML, "download-html-file", false));
				}

				// custom tool
				if (toolbarConfig.customTool) {
					toolsHtml.push(toolbarConfig.customTool?.toolRenderer(this.selection))
				}

				toolbarHtml.push(html`
					<div class="btn-group" part="btn-group">
						${toolsHtml}
					</div>
				`);
			});
		}

		return html`
			<div
				class="toolbar"
				part="toolbar"
				@mousedown="${(e: MouseEvent) => e.preventDefault()}"
			>
				${toolbarHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _getToolTemplate(command: EDITOR_COMMAND, icon: string, active: boolean, options?: any | string[]): TemplateResult {
		switch (command) {
			case EDITOR_COMMAND.FORMAT_BLOCK:
				const optionsHtml: TemplateResult[] = [];
				if (options?.length) {

					options.forEach((option: string) => {
						optionsHtml.push(html`
							<option value="${option}">${option}</option>
						`);
					});
				}

				return html`
					<div
						class="toolbar-dropdown"
						part="toolbar-dropdown"
					>
						<select
							@change="${(e: any) => this._onFormatBlock(e.target.value)}"
						>
							${optionsHtml}
						</select>
					</div>
				`;
			case EDITOR_COMMAND.BLOCKQUOTE:
			case EDITOR_COMMAND.CODE:
				return html`
					<div
						class="btn ${active ? "active" : ""}"
						part="btn"
						@click="${() => this._execCommand("formatBlock", command)}"
					>
						<panda-icon icon="${icon}"></panda-icon>
					</div>
				`;
			case EDITOR_COMMAND.DOWNLOAD_EML:
				return html`
					<div
						class="btn"
						part="btn"
						@click="${() => this.downloadAsEml(options)}"
						title="Download as EML"
					>
						<panda-icon icon="${icon}"></panda-icon>
					</div>
				`;
			case EDITOR_COMMAND.DOWNLOAD_HTML:
				return html`
					<div
						class="btn"
						part="btn"
						@click="${() => this.downloadAsHtml()}"
						title="Download as HTML"
					>
						<panda-icon icon="${icon}"></panda-icon>
					</div>
				`;
			case EDITOR_COMMAND.PASTE:
				return html`
					<div
						class="btn"
						part="btn"
						@click="${() => this._paste()}"
					>
						<panda-icon icon="paste"></panda-icon>
					</div>
				`;
			default:
				return html`
					<div
						class="btn ${active ? "active" : ""}"
						part="btn"
						@click="${() => this._execCommand(command)}"
					>
						<panda-icon icon="${icon}"></panda-icon>
					</div>
				`;
		}
	}

	private _execCommand(command: string, value?: string) {
		console.log("%c _onExecCommand", "font-size: 24px; color: green;", command, value);
		document.execCommand(command, true, value);
	}

	private _paste() {
		navigator.clipboard.readText()
			.then(clipText => {
				// const el = document.activeElement;
				// if (el?.nodeName === 'INPUT') {
				const newCursorPos: number = (this._editorEl.selectionStart || 0) + clipText.length;
				this._editorEl.innerHTML = `
						${this._editorEl.innerHTML.substring(0, this._editorEl.selectionStart || 0)}
						${clipText}
						${this._editorEl.innerHTML.substring(this._editorEl.selectionEnd || 0)}
					`;
				this._editorEl.setSelectionRange(newCursorPos, newCursorPos);
				// }
			});
	}

	private _getSelectionTags() {
		let tags: string[] = [];

		const getNodeTag = (node: any) => {
			const tag = node?.tagName?.toLowerCase()?.trim();

			if (tag) {
				tags.push(tag);
			}
		};

		if (this.selection) {
			if (this.selection.type === "Range") {
				let parentNode = this.selection.anchorNode;
				if (parentNode) {
					while (parentNode !== null) {
						getNodeTag(parentNode);
						parentNode = parentNode?.parentNode;
					}
				}
				// Remove root tag
				tags.pop();
			} else {
				const content = this.selection?.toString() || "";
				tags = (content.match(/<[^>]+>/g) || [])
					.filter((tag) => !tag.startsWith("</"))
					.map((tag) => tag.replace(/[\<\>]/g, ""));
			}
		}
		console.log("%c _getSelectionTags", "font-size: 24px; color: green;", tags);
		this._selectedTags = tags;
	}

	private _appendCustomStyle() {
		const customStyle = document.createElement("style");
		customStyle.innerHTML = this.customStyle;
		customStyle.setAttribute("scope", "custom-style");
		this.shadowRoot?.appendChild(customStyle);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public downloadAsEml(options: EmlFileConfig) {
		const emlFileConfig: EmlFileConfig = {
			sendFrom: "",
			sendTo: "",
			subject: "",
			fileName: "email-draft",
			...options
		};
		const emailContent: string[] = [];

		emailContent.push("To: " + emlFileConfig.sendTo);
		emailContent.push("From: " + emlFileConfig.sendFrom);
		emailContent.push("Subject: " + emlFileConfig.subject);
		emailContent.push("X-Unsent: 1");
		emailContent.push("Content-Type: text/html");
		emailContent.push("");
		emailContent.push(this._editorEl.innerHTML);

		const url = window.URL.createObjectURL(
			new Blob([emailContent.join("\n")], { type: "text/plain" })
		);
		const downloadLinkEl = document.createElement("a");
		downloadLinkEl.href = url;
		downloadLinkEl.download = `${emlFileConfig.fileName}.eml`;
		downloadLinkEl.click();
	}

	public downloadAsHtml() {
		const url = window.URL.createObjectURL(
			new Blob([this._editorEl.innerHTML], { type: "text/html" })
		);
		const downloadLinkEl = document.createElement("a");
		downloadLinkEl.href = url;
		downloadLinkEl.download = "content.html";
		downloadLinkEl.click();
	}

	public copy() {
		this._execCommand("copy");
	}

	public updateContent(content: string) {
		this._editorEl.innerHTML = content || "";
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onEditorFocus() {
		this._focused = true;
	}
	
	private _onEditorBlur() {
		this._focused = false;
	}

	private _onInput(e: InputEvent) {
		const event = new CustomEvent("on-input", {
			detail: (e.target as any).getInnerHtml()
		});
		this.dispatchEvent(event);
		// trigger selection change
		this._onSelectionChanged();
	}

	/**
	 * Update editor text selection
	 */
	private _onSelectionChanged() {
		const selection = (this.shadowRoot as any)?.getSelection
			? (this.shadowRoot as any).getSelection()
			: null;

		this.selection = selection || document.getSelection() || window.getSelection();
		// update active tags
		this._getSelectionTags();
	}

	private _onFormatBlock(option: string) {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-editor": PandaTextEditor;
	}
}
