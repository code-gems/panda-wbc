// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// icons
import { calendarIcon } from "./resources/calendar";
import { codeIcon } from "./resources/code";
import { copyIcon } from "./resources/copy";
import { cutIcon } from "./resources/cut";
import { editIcon } from "./resources/edit";
import { expandLessIcon } from "./resources/expand-less";
import { expandMoreIcon } from "./resources/expand-more";
import { folderIcon } from "./resources/folder";
import { formatAlignCenterIcon } from "./resources/format-align-center";
import { formatAlignJustifyIcon } from "./resources/format-align-justify";
import { formatAlignLeftIcon } from "./resources/format-align-left";
import { formatAlignRightIcon } from "./resources/format-align-right";
import { formatBlockquoteIcon } from "./resources/format-quote";
import { formatBoldIcon } from "./resources/format-bold";
import { formatClearIcon } from "./resources/format-clear";
import { formatIndentDecreaseIcon } from "./resources/format-indent-decrease";
import { formatIndentIncreaseIcon } from "./resources/format-indent-increase";
import { formatItalicIcon } from "./resources/format-italic";
import { formatListBulletedIcon } from "./resources/format-list-bulleted";
import { formatListNumberedIcon } from "./resources/format-list-numbered";
import { formatStrikethroughIcon } from "./resources/format-strikethrough";
import { formatUnderlineIcon } from "./resources/format-underline";
import { heartIcon } from "./resources/heart";
import { heartOutlineIcon } from "./resources/heart-outline";
import { pasteIcon } from "./resources/paste";
import { redoIcon } from "./resources/redo";
import { undoIcon } from "./resources/undo";

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
			"expand-less": expandLessIcon,
			"expand-more": expandMoreIcon,
			"format-align-center": formatAlignCenterIcon,
			"format-align-justify": formatAlignJustifyIcon,
			"format-align-left": formatAlignLeftIcon,
			"format-align-right": formatAlignRightIcon,
			"format-blockquote": formatBlockquoteIcon,
			"format-bold": formatBoldIcon,
			"format-indent-decrease": formatIndentDecreaseIcon,
			"format-indent-increase": formatIndentIncreaseIcon,
			"format-italic": formatItalicIcon,
			"format-list-bulleted": formatListBulletedIcon,
			"format-list-numbered": formatListNumberedIcon,
			"format-strikethrough": formatStrikethroughIcon,
			"format-underline": formatUnderlineIcon,
			"format-clear": formatClearIcon,
			code: codeIcon,
			edit: editIcon,
			redo: redoIcon,
			undo: undoIcon,
			cut: cutIcon,
			copy: copyIcon,
			paste: pasteIcon,
			heart: heartIcon,
			"heart-outline": heartOutlineIcon,
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
