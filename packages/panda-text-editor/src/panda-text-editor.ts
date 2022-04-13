// types
import { PandaTextEditorOptions, EDITOR_COMMAND } from "../index";

// styles
import { styles } from "./styles/styles";

// mixins
import { scroll } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { property, customElement, query } from "lit/decorators.js";

@customElement("panda-text-editor")
export class PandaTextEditor extends LitElement {
	// css styles
	static get styles() {
		return [
			styles,
			scroll
		];
	}

	@property({ type: Boolean, attribute: true })
	readonly!: boolean;

	@property({ type: Boolean, attribute: true })
	busy!: boolean;

	@property({ type: String, attribute: true })
	spinner!: string;

	@property({ type: Object })
	options!: PandaTextEditorOptions;

	// view props

	@property({ type: Element })
	content!: Element;

	@query("#editor")
	private _editorEl!: HTMLInputElement;

	@query("#placeholder")
	private _placeholderEl!: Element;

	@property({ type: Selection })
	selection!: Selection | null;

	@property({ type: Array })
	_selectedTags!: string[];

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.content = document.createElement("p");
		this._selectedTags = [];

		// set default editor options
		this.options = {
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
	}

	protected firstUpdated() {
		// look for a template to preset editor content
		if (this.children.length > 0) {

			console.log("%c children", "font-size: 24px; color: green;", this.children);

			Array.from(this.children).forEach((child) => {
				if (child.tagName === "TEMPLATE") {
					console.log("%c child", "font-size: 24px; color: green;", child);
					console.log("%c attribute", "font-size: 24px; color: green;", child.getAttribute("placeholder") !== null);
					if (child.getAttribute("placeholder") !== null) {
						console.log("%c placeholder", "font-size: 24px; color: green;", child);
						this._placeholderEl.innerHTML = child.innerHTML;
					} else {
						console.log("%c template", "font-size: 24px; color: green;", child);
						const templateContent = child.innerHTML.trim();
						if (templateContent.length > 0) {
							this.content.innerHTML = templateContent;
						}
					}
				}
			});

		}
		// change editor default behavior
		document.execCommand("defaultParagraphSeparator", false, "p");
		this.requestUpdate();
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
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
						@input="${(e: any) => this._onSelectionChanged(e.target)}"
						@mouseup="${(e: any) => this._onSelectionChanged(e.target)}"
						@mousedown="${(e: any) => this._onSelectionChanged(e.target)}"
						@keydown="${(e: any) => this._onSelectionChanged(e.target)}"
					>
						${this.content}
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
				if (toolbarConfig.indentDecrease) {
					toolsHtml.push(
						this._getToolTemplate(
							EDITOR_COMMAND.LIST_NUMBERED,
							"format-list-numbered",
							this._selectedTags.includes("ol")
						)
					);
				}
				if (toolbarConfig.indentIncrease) {
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

				// misc
				if (toolbarConfig.downloadEml) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.DOWNLOAD_EML, "download-eml-file", false));
				}
				if (toolbarConfig.downloadHtml) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.DOWNLOAD_HTML, "download-html-file", false));
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
	// ======================================================================================================== HELPERS
	// ================================================================================================================

	private _getToolTemplate(command: EDITOR_COMMAND, icon: string, active: boolean, values?: string[]): TemplateResult {
		if (command === EDITOR_COMMAND.FORMAT_BLOCK) {
			const optionsHtml: TemplateResult[] = [];
			if (values?.length) {

				values.forEach((option) => {
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
		} else if (command === EDITOR_COMMAND.BLOCKQUOTE || command === EDITOR_COMMAND.CODE) {
			return html`
				<div
					class="btn ${active ? "active" : ""}"
					part="btn"
					@click="${() => this._execCommand("formatBlock", command)}"
				>
					<panda-icon icon="${icon}"></panda-icon>
				</div>
			`;
		} else if (command === EDITOR_COMMAND.DOWNLOAD_EML) {
			return html`
				<div
					class="btn"
					part="btn"
					@click="${() => this.downloadAsEml()}"
					title="Download as EML"
				>
					<panda-icon icon="${icon}"></panda-icon>
				</div>
			`;
		} else if (command === EDITOR_COMMAND.DOWNLOAD_HTML) {
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
		} else {
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

	// ================================================================================================================
	// ============================================================================================================ API
	// ================================================================================================================

	public downloadAsEml() {
		const emailContent: string[] = [];

		emailContent.push("To: ");
		emailContent.push("From: ");
		emailContent.push("Subject: Panda Text Editor - Content");
		emailContent.push("X-Unsent: 1");
		emailContent.push("Content-Type: text/html");
		emailContent.push("");
		emailContent.push(this.content.innerHTML);

		const url = window.URL.createObjectURL(
			new Blob([emailContent.join("\n")], { type: "text/plain" })
		);
		const downloadLinkEl = document.createElement("a");
		downloadLinkEl.href = url;
		downloadLinkEl.download = "email-draft.eml";
		downloadLinkEl.click();
	}

	public downloadAsHtml() {
		const url = window.URL.createObjectURL(
			new Blob([this.content.innerHTML], { type: "text/html" })
		);
		const downloadLinkEl = document.createElement("a");
		downloadLinkEl.href = url;
		downloadLinkEl.download = "content.html";
		downloadLinkEl.click();
	}

	public copy() {

	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	/**
	 * Update editor text selection
	 */
	private _onSelectionChanged(editorEl: HTMLInputElement) {
		console.log("%c content", "font-size: 24px; color: green;", this.content);
		console.log("%c innerText '", "font-size: 24px; color: green;", editorEl.innerText, "'", editorEl.innerText.length);
		console.log("%c innerHTML '", "font-size: 24px; color: green;", editorEl.innerHTML, "'");
		console.log("%c textContent '", "font-size: 24px; color: green;", editorEl.textContent, "'");


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
