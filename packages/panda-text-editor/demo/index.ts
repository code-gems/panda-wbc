// types
import { PandaTextEditorOptions } from "../index";

// components
import "@panda-wbc/panda-theme";
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

			.btn {
				display: inline-block;
				min-width: 50px;
				height: 50px;
				line-height: 50px;
				padding: 0px 20px;
				
				color: black;
				font-size: 14px;
				font-weight: bold;
				text-align: center;
				cursor: pointer;
				transition: all 400ms ease-in-out;

				box-shadow: 0px 1px 2px var(--panda-shadow-color-10opc);
			}

			.btn:hover {
				background-color: var(--panda-shadow-color-10opc);
			}
		`;
	}

	_editorOptions: PandaTextEditorOptions;
	_customStyle: string;

	constructor() {
		super();
		this._editorOptions = {
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
						toolRenderer: (selection) => {
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

		this._customStyle = `
			.custom-tool {
				display: flex;
				justify-content: center;
				align-items: center;
				min-width: var(--panda-button-height-m, 40px);
				height: var(--panda-button-height-m, 40px);
		
				transition: all 200ms ease-in-out;
				user-select: none;
				cursor: pointer;
		
				border-radius: 5px;
			}
			.custom-tool:hover {
				background-color: var(--panda-shadow-color-10opc, hsl(0deg 0% 0% / 10%));
			}
			.custom-tool.active {
				--panda-icon-fill-color: var(--panda-primary-color);
				background-color: var(--panda-shadow-color-10opc, hsl(0deg 0% 0% / 10%));
			}
		
		`;
	}

	protected render() {
		return html`
			<panda-theme></panda-theme>
			<p>Panda Text Editor DemoPage</p>

<!--
			<panda-text-editor
				.readonly="${false}"
				.busy="${false}"
				.options="${this._editorOptions}"
				.spellcheck="${false}"
			>
				<template>
					<h2>Welcome to Panda Text Editor</h2>
					<p>
						The best custom <strong>element</strong> based rich text editor!
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec urna convallis, dignissim ex ac, mattis ex. Quisque vel tortor non nisl pretium ornare. Sed suscipit lacus feugiat nisl scelerisque vehicula. Integer convallis tempor purus, at vulputate velit ornare quis. In hendrerit in erat quis efficitur. Pellentesque condimentum felis id tellus scelerisque, eu dapibus ipsum scelerisque. Maecenas tristique metus vel cursus consequat. Ut tincidunt enim a bibendum mattis. Suspendisse id sagittis enim. Cras suscipit maximus odio, ut viverra nibh interdum in. Fusce volutpat, risus cursus posuere ultrices, nisl sapien fringilla leo, id laoreet nulla dolor quis risus. Mauris aliquam suscipit mauris vitae varius. Suspendisse tincidunt, nunc sit amet efficitur euismod, erat est viverra urna, in elementum eros lorem non elit. Vivamus tempor ligula ipsum, sed dignissim tellus blandit id. Integer ut elit sit amet purus laoreet laoreet ut vel lacus. Pellentesque in lobortis turpis, vel convallis nibh.
					</p>
					<p>
						Aenean orci dolor, aliquet a tortor nec, laoreet molestie ex. Duis at urna at ligula finibus finibus. Nam blandit vehicula aliquam. Suspendisse pretium metus sit amet lacus porta, vitae porta enim consectetur. Aenean vitae dui efficitur ligula viverra elementum. Aliquam sagittis, tortor vel mollis lobortis, turpis augue sollicitudin erat, nec mattis mi orci nec felis. Sed vel quam libero. Nam pharetra finibus mi at bibendum. Fusce tristique dictum volutpat. Vestibulum vestibulum, est id placerat sodales, lectus erat sollicitudin orci, sed dignissim sapien sapien at arcu.
					</p>
				</template>
			</panda-text-editor>
-->
			<div class="btn">
				CANCEL
			</div>
			<div class="btn">
				OK
			</div>

			<hr />
			
			<panda-text-editor
				.readonly="${false}"
				.busy="${false}"
				.options="${this._editorOptions}"
				.spellcheck="${false}"
				.customStyle="${this._customStyle}"
				@on-input="${(e: any) => this._onInput(e.detail)}"
			>
				<template placeholder>
					<b>This is just a placeholder</b>
					<p>
						Enter your text here...
					</p>
				</template>
				<template>
					<h2>Welcome to Panda Text Editor</h2>
					<p>
						The best custom <strong>element</strong> based rich text editor!
					</p>
				</template>
			</panda-text-editor>
			
		`;
	}



	private _onInput(e: any) {
		console.log("%c _onInput", "font-size: 24px; color: green;", e);
	}

}
window.customElements.define("demo-page", DemoPage);
