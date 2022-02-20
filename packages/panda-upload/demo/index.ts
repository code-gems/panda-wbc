// types
import { PandaUploadButtonFileSelectedEvent } from "../index";

// components
import "../src/panda-upload";

// utils
import { LitElement, html, css } from "lit";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	protected render() {
		return html`
			Panda Upload Button
			<hr />
			<panda-upload-button
				.maxFiles="${1}"
				@file-selected="${(e: PandaUploadButtonFileSelectedEvent) => this._onUploadButtonFileSelected(e)}"
			>
				UPLOAD FILES
			</panda-upload-button>
		`;
	}

	private _onUploadButtonFileSelected(e: PandaUploadButtonFileSelectedEvent) {
		console.log("%c _onUploadButtonFileSelected", "font-size: 24px; color: green;", e.detail);
	}
}
window.customElements.define("demo-page", DemoPage);
