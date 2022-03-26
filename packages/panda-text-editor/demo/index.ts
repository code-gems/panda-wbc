// types
import { PandaTextEditorOptions } from "../index";

// components
import "../src/panda-text-editor";

// utils
import { LitElement, html, css } from "lit";

class DemoPage extends LitElement {
	// css styles
	static get styles() {
		return css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}
		`;
	}

	_editorOptions: PandaTextEditorOptions;

	constructor() {
		super();
		this._editorOptions = {
			toolbarPosition: "top",
			toolbar: {
				bold: true,
				italic: true,
				underline: true,
				strikethrough: true
			}
		};
	}

	protected render() {
		return html`
			<p>Panda Text Editor DemoPage</p>


			<panda-text-editor
				.readonly="${false}"
				.busy="${false}"
				.options="${this._editorOptions}"
				.spellcheck="${false}"
			>
				<template>
					<h2>Welcome to Panda Text Editor</h2>
					<p>
						The best custom element based rich text editor!
					</p>
				</template>
			</panda-text-editor>

			<hr />
			
			<panda-text-editor
				.readonly="${false}"
				.busy="${true}"
				.options="${this._editorOptions}"
				.spellcheck="${false}"
			>
			</panda-text-editor>
			
		`;
	}


}
window.customElements.define("demo-page", DemoPage);
