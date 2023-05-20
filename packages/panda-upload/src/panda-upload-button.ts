// types
// ...

// styles
import { commonStyles, uploadButtonStyles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("panda-upload-button")
export class PandaUploadButton extends LitElement {
	// css styles
	static get styles() {
		return [
			commonStyles,
			uploadButtonStyles
		];
	}

	@property({ type: Array })
	acceptedFileTypes: string[] = [];

	@property({ type: Number })
	maxFiles: number = 1;

	@property({ type: Boolean, attribute: true })
	disabled: boolean = false;

	@property({ type: Boolean, attribute: true })
	busy: boolean = false;

	@property({ type: String, attribute: true })
	spinner: string = "dots";

	// view props
	private _inputFileEl!: HTMLInputElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	firstUpdated() {
		this._inputFileEl = this.shadowRoot?.getElementById("file-upload") as HTMLInputElement;

		// handle multiple files upload
		if (this.maxFiles !== 1) {
			this._inputFileEl.setAttribute("multiple", "");
		}

		if (this.acceptedFileTypes?.length) {
			const accept = this.acceptedFileTypes.join(" ");
			this._inputFileEl.setAttribute("accept", accept);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
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
			<div class="button ${this.disabled ? "disabled" : ""}" part="button">
				<slot name="prefix" part="prefix"></slot>
				<label class="content" part="content">
					<slot></slot>
					<input
						id="file-upload"
						part="input-file"
						type="file"
						name="file-upload"
						@change="${() => this._onSelectFile()}"
					/>
				</label>
				<slot name="suffix" part="suffix"></slot>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSelectFile() {
		if (this.disabled) {
			return;
		}

		const selectedFiles: File[] = Array.from(this._inputFileEl.files as any);
		let files: File[] = [];
		if (this.maxFiles !== null && !isNaN(this.maxFiles)) {
			files = selectedFiles.slice(0, this.maxFiles);
		} else {
			files = selectedFiles;
		}

		const event = new CustomEvent("file-selected", {
			detail: {
				files
			}
		});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-upload-button": PandaUploadButton;
	}
}
