// types
import { PageCategory } from "panda-design-typings";

// components
import "@panda-wbc/panda-text-editor";

// utils & config
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { page } from "../../../../common/page-library";
import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

@customElement("panda-text-editor-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-text-editor-demo-page></panda-text-editor-demo-page>`
})
export class PandaTextEditorDemoPage extends LitElement {
	//css styles
	// static get styles() {
	// 	return styles;
	// }

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