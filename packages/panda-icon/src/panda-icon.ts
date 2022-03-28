// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// icons
import { folderIcon } from "./resources/folder";
import { calendarIcon } from "./resources/calendar";
import { formatBoldIcon } from "./resources/format-bold";
import { formatUnderlineIcon } from "./resources/format-underline";
import { formatItalicIcon } from "./resources/format-italic";
import { formatStrikethroughIcon } from "./resources/format-strikethrough";
import { formatAlignLeftIcon } from "./resources/format-align-left";
import { formatAlignCenterIcon } from "./resources/format-align-center";
import { formatAlignRightIcon } from "./resources/format-align-right";
import { formatAlignJustifyIcon } from "./resources/format-align-justify";
import { formatBlockquoteIcon } from "./resources/format-quote";
import { formatIndentDecreaseIcon } from "./resources/format-indent-decrease";
import { formatIndentIncreaseIcon } from "./resources/format-indent-increase";
import { formatListNumberedIcon } from "./resources/format-list-numbered";
import { formatListBulletedIcon } from "./resources/format-list-bulleted";
import { undoIcon } from "./resources/undo";
import { redoIcon } from "./resources/redo";
import { codeIcon } from "./resources/code";
import { expandMoreIcon } from "./resources/expand-more";
import { expandLessIcon } from "./resources/expand-less";

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
			calendar: calendarIcon,
			folder: folderIcon,

			// text editor icons
			["format-bold"]: formatBoldIcon,
			["format-italic"]: formatItalicIcon,
			["format-underline"]: formatUnderlineIcon,
			["format-strikethrough"]: formatStrikethroughIcon,
			["format-align-left"]: formatAlignLeftIcon,
			["format-align-center"]: formatAlignCenterIcon,
			["format-align-right"]: formatAlignRightIcon,
			["format-align-justify"]: formatAlignJustifyIcon,
			["format-blockquote"]: formatBlockquoteIcon,
			["format-indent-increase"]: formatIndentIncreaseIcon,
			["format-indent-decrease"]: formatIndentDecreaseIcon,
			["format-list-numbered"]: formatListNumberedIcon,
			["format-list-bulleted"]: formatListBulletedIcon,
			undo: undoIcon,
			redo: redoIcon,
			code: codeIcon,
			["expand-more"]: expandMoreIcon,
			["expand-less"]: expandLessIcon,
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
			return html``;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-icon": PandaIcon;
	}
}
