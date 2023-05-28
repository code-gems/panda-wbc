// types
import { PageCategory } from "panda-design-typings";

// components
import "@panda-wbc/panda-text-editor";

// utils & config
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-text-editor-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-text-editor-content-page></panda-text-editor-content-page>`
})
export class PandaTextEditorContentPage extends LitElement {
	//css styles
	// static get styles() {
	// 	return styles;
	// }

	private _editorOptions = {
		toolbarPosition: "top",
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
				strikethrough: true,
				removeFormat: true, // remove format
			},
			// alignment
			{
				alignLeft: true,
				alignCenter: true,
				alignRight: true,
				// alignJustify: true,
			},
			// list
			{
				numberedList: true,
				bulletedList: true,
			},
			// indentation
			{
				indentDecrease: true,
				indentIncrease: true
			},

			{
				blockquote: true,
				code: true
			},
			{
				copy: true,
				paste: true,
				cut: true,
				undo: true,
				redo: true
			},

			{
				downloadEml: {
					subject: "Love letter",
					fileName: "draft-email"
				},
				downloadHtml: true
			},
			{
				customTool: {
					toolRenderer: (selection: any) => {
						return html`
							<div class="custom-tool">
								<panda-icon icon="heart-outline"></panda-icon>
							</div>
						`;
					}
				}
			}
		]
	};

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================


	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			PANDA TEXT EDITOR DEMO PAGE

			<panda-text-editor
				.on-input="${(e: any) => this._onInput(e.detail)}"
			>
				<template placeholder>
					<h2>This is just a placeholder</h2>
					<p>Show it to user before they enter any content</p>
				<template>
			</panda-text-editor>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onInput(content: string) {
		console.log("%c _onInput", "font-size: 24px; color: green;", content);
	}
}