// types
// ...

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

// icons
import { addIcon } from "./resources/add";
import { arrowBackIcon } from "./resources/arrow-back";
import { arrowDownwardIcon } from "./resources/arrow-downward";
import { arrowForwardIcon } from "./resources/arrow-forward";
import { arrowUpwardIcon } from "./resources/arrow-upward";
import { calendarIcon } from "./resources/calendar";
import { checkIcon } from "./resources/check";
import { chevronDownIcon } from "./resources/chevron-down";
import { chevronLeftIcon } from "./resources/chevron-left";
import { chevronRightIcon } from "./resources/chevron-right";
import { chevronUpIcon } from "./resources/chevron-up";
import { closeIcon } from "./resources/close";
import { cloudIcon } from "./resources/cloud";
import { cloudOutlineIcon } from "./resources/cloud-outline";
import { codeIcon } from "./resources/code";
import { copyIcon } from "./resources/copy";
import { creditCardIcon } from "./resources/credit-card";
import { cutIcon } from "./resources/cut";
import { editIcon } from "./resources/edit";
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
import { menuIcon } from "./resources/menu";
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
	private _iconList!: { [iconName: string]: TemplateResult; }

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this._iconList = {
			// time
			calendar: calendarIcon,

			// files
			folder: folderIcon,
			
			// arrows & chevrons
			"arrow-back": arrowBackIcon,
			"arrow-downward": arrowDownwardIcon,
			"arrow-forward": arrowForwardIcon,
			"arrow-upward": arrowUpwardIcon,
			"chevron-down": chevronDownIcon,
			"chevron-left": chevronLeftIcon,
			"chevron-right": chevronRightIcon,
			"chevron-up": chevronUpIcon,
			
			// text editor icons
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
			
			// social media
			heart: heartIcon,
			"heart-outline": heartOutlineIcon,

			// e-commerce
			"credit-card": creditCardIcon,

			// cloud
			cloud: cloudIcon,
			"cloud-outline": cloudOutlineIcon,

			// misc
			add: addIcon,
			check: checkIcon,
			close: closeIcon,
			menu: menuIcon,
		};
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`
			<div class="icon" part="icon">
				${this._renderIcon()}
			</div>
		`;
	}

	private _renderIcon() {
		if (this._iconList[this.icon]) {
			return this._iconList[this.icon];
		} else {
			return html``;
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public getIconList(): string[] {
		return Object.keys(this._iconList);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-icon": PandaIcon;
	}
}
