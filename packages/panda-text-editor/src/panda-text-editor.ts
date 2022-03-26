// types
import { PandaTextEditorOptions } from "../index";

// styles
import { styles } from "./styles/styles";

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
		return styles;
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

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.content = document.createElement("div");

		// set default editor options
		this.options = {
			toolbarPosition: "top",
			hideToolbar: false,
			toolbar: {
				// format
				format: {
					h1: true,
				},
				bold: true,
				italic: true,
				underline: true,
				strikethrough: true,
				removeFormat: true,

				// alignment
				alignLeft: true,
				alignCenter: true,
				alignRight: true,

				// misc
			}
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
		document.execCommand("defaultParagraphSeparator", false, "p");
		document.addEventListener("selectionchange", () => {
			this._onSelectionChanged();
		});
		window.addEventListener("selectionchange", () => {
			this._onSelectionChanged();
		});
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
			<div class="editor-cont">
				${this._renderToolbar()}
				<article
					id="editor"
					class="editor"
					part="editor"
					?contenteditable="${!this.readonly}"
					?spellcheck="${this.spellcheck}"
					
				>
					${this.content}
				</article>
				${spinnerHtml}
			</div>
		`;
	}

	private _renderToolbar() {
		const toolbarHtml: TemplateResult[] = [];

		if (this.options?.toolbar?.bold) {
			const optionsHtml: TemplateResult[] = [];

			optionsHtml.push(html`
				<option
					@change="${(e: Event) => this._onFormatText((e.target as HTMLSelectElement).value)}"
				>
					Header 1
				</option>
			`);

			toolbarHtml.push(html`
				<select

				>
					${optionsHtml}
				</select>
				<span class="separator"></span>
			`);
		}

		if (this.options?.toolbar?.bold) {
			toolbarHtml.push(html`
				<div
					class="btn"
					part="btn"
					@click="${() => this._execCommand("bold")}"
				>
					<panda-icon icon="format-bold"></panda-icon>
				</div>
			`);
		}

		if (this.options?.toolbar?.italic) {
			toolbarHtml.push(html`
				<div
					class="btn"
					part="btn"
					@click="${() => this._execCommand("italic")}"
				>
					<panda-icon icon="format-italic"></panda-icon>
				</div>
			`);
		}

		if (this.options?.toolbar?.underline) {
			toolbarHtml.push(html`
				<div
					class="btn"
					part="btn"
					@click="${() => this._execCommand("underline")}"
				>
					<panda-icon icon="format-underline"></panda-icon>
				</div>
			`);
		}

		if (this.options?.toolbar?.strikethrough) {
			toolbarHtml.push(html`
				<div
					class="btn"
					part="btn"
					@click="${() => this._execCommand("strikethrough")}"
				>
					<panda-icon icon="format-strikethrough"></panda-icon>
				</div>
			`);
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

	private _execCommand(command: string, value?: string) {
		console.log("%c _onExecCommand", "font-size: 24px; color: green;", command, value);
		document.execCommand(command, true, value);
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
	}

	private _onFormatText(option: string) {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-text-editor": PandaTextEditor;
	}
}
