// types
import { PandaTextEditorOptions, EDITOR_COMMAND } from "../index";

interface TagMap {
	[command: string]: string;
}

// styles
import { styles } from "./styles/styles";
// panda mixins
import { scroll } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

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
	@property({ type: Object, hasChanged: () => true })
	content!: Element;

	@property({ type: Object, hasChanged: () => true })
	selection!: Selection | null;

	@property({ type: Array })
	_selectedTags!: string[];

	// events
	private _selectionChangeEventBinding!: any;

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

		// add event listeners
		// this._selectionChangeEventBinding = this._onSelectionChanged.bind(this);
		// document.addEventListener("selectionchange", this._selectionChangeEventBinding);
		// window.addEventListener("selectionchange", this._selectionChangeEventBinding);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove event listeners
		// document.removeEventListener("selectionchange", this._selectionChangeEventBinding);
		// window.removeEventListener("selectionchange", this._selectionChangeEventBinding);
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
						@keypress="${() => this._onSelectionChanged()}"
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

				// format
				if (toolbarConfig.bold) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.FORMAT_BOLD, "format-bold"));
				}
				if (toolbarConfig.italic) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.FORMAT_ITALIC, "format-italic"));
				}
				if (toolbarConfig.underline) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.FORMAT_UNDERLINE, "format-underline"));
				}
				if (toolbarConfig.strikethrough) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.FORMAT_STRIKETHROUGH, "format-strikethrough"));
				}

				// alignment
				if (toolbarConfig.alignLeft) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_LEFT, "format-align-left"));
				}
				if (toolbarConfig.alignCenter) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_CENTER, "format-align-center"));
				}
				if (toolbarConfig.alignRight) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_RIGHT, "format-align-right"));
				}
				if (toolbarConfig.alignJustify) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.ALIGN_JUSTIFY, "format-align-justify"));
				}

				// indentation
				if (toolbarConfig.indentDecrease) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.INDENT_DECREASE, "format-indent-decrease"));
				}
				if (toolbarConfig.indentIncrease) {
					toolsHtml.push(this._getToolTemplate(EDITOR_COMMAND.INDENT_INCREASE, "format-indent-increase"));
				}


				toolbarHtml.push(html`
					<div class="btn-group" part="btn-group">
						${toolsHtml}
					</div>
				`);
			});


			// toolsHtml.push(html`
			// 	<option
			// 		@change="${(e: Event) => this._onFormatText((e.target as HTMLSelectElement).value)}"
			// 	>
			// 		Header 1
			// 	</option>
			// 	<option
			// 		@change="${(e: Event) => this._onFormatText((e.target as HTMLSelectElement).value)}"
			// 	>
			// 		Header 2
			// 	</option>
			// `);

			// toolbarHtml.push(html`
			// 	<select

			// 	>
			// 		${toolsHtml}
			// 	</select>
			// 	<span class="separator"></span>
			// `);
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

	/**
	 * Returns a HTML tag associated with editor command
	 * @param {String} command - Editor command
	 * @returns {String}
	 */
	private _commandToTagName(command: EDITOR_COMMAND): string {
		const tagMap: TagMap = {
			[EDITOR_COMMAND.FORMAT_BOLD]: "b",
			[EDITOR_COMMAND.FORMAT_BOLD]: "strong",
			[EDITOR_COMMAND.FORMAT_ITALIC]: "i",
			[EDITOR_COMMAND.FORMAT_UNDERLINE]: "u",
			[EDITOR_COMMAND.FORMAT_STRIKETHROUGH]: "s",
		};
		return tagMap[command] || "";
	}

	private _getToolTemplate(command: EDITOR_COMMAND, icon: string, values?: string[]): TemplateResult {
		if (command === EDITOR_COMMAND.FORMAT_BLOCK) {
			return html``;
		} else {
			// check if tool is already active
			const active = this._selectedTags.includes(this._commandToTagName(command))
				? "active"
				: "";

			return html`
				<div
					class="btn ${active}"
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
		const selection = (this.shadowRoot as any)?.getSelection
			? (this.shadowRoot as any).getSelection()
			: null;

		this.selection = selection || document.getSelection() || window.getSelection();
		// update active tags
		this._getSelectionTags();
	}

	private _onFormatText(option: string) {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-editor": PandaTextEditor;
	}
}
