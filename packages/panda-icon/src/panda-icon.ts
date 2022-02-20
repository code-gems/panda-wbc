// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// icons
import { folderIcon } from "./resources/folder";

@customElement("panda-icon")
export class PandaIcon extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	icon!: string;

	// view props
	private iconList!: { [iconName: string]: TemplateResult; }

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this.iconList = {
			folder: folderIcon
		};
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<div class="icon" part="icon">
				${this._renderIcon()}
			</div>
		`;
	}

	private _renderIcon() {
		if (this.iconList[this.icon]) {
			return this.iconList[this.icon];
		} else {
			return "";
		}
	}
}
