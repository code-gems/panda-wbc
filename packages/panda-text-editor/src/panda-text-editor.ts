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
	@query("#editor")
	editorEl!: Element;

	@property({ type: Object })
	content!: Element;

	@property({ type: Object })
	selection!: Selection | null;

	@property({ type: Array })
	_selectedTags!: string[];

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.content = document.createElement("div");
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
			const template = this.children[0];
			if (template.tagName === "TEMPLATE") {
				const templateContent = template.innerHTML.trim();
				if (templateContent.length > 0) {
					this.content.innerHTML = templateContent;
				}
			}
		}
		// change editor default behavior
		document.execCommand("defaultParagraphSeparator", false, "p");
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
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
					<article
						id="editor"
						class="editor"
						part="editor"
						?contenteditable="${!this.readonly}"
						?spellcheck="${this.spellcheck}"
						@input="${() => this._onSelectionChanged()}"
						@mouseup="${() => this._onSelectionChanged()}"
						@mousedown="${() => this._onSelectionChanged()}"
						@keydown="${() => this._onSelectionChanged()}"
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
					.map((tag) => tag.replace(/<|>/g, ""));
			}
		}
		console.log("%c _getSelectionTags", "font-size: 24px; color: green;", tags);
		this._selectedTags = tags;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	/**
	 * Update editor text selection
	 */
	private _onSelectionChanged() {
		console.log("%c content", "font-size: 24px; color: green;", this.content);
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
