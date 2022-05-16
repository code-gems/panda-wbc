import { TemplateResult } from "lit";

export interface PandaTextEditorOptions {
	toolbarPosition?: "top" | "bottom";
	hideToolbar?: boolean;
	toolbar?: PandaTextEditorToolbarConfig[];
}

export interface EmlFileConfig {
	sendFrom?: string;
	sendTo?: string;
	subject?: string;
	fileName?: string;
}

export interface PandaTextEditorToolbarConfig {
	formatBlock?: {
		normalText?: boolean;
		h1?: boolean;
		h2?: boolean;
		h3?: boolean;
		h4?: boolean;
		h5?: boolean;
		h6?: boolean;
		p?: boolean;
		pre?: boolean;
	};

	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;

	alignLeft?: boolean;
	alignCenter?: boolean;
	alignRight?: boolean;
	alignJustify?: boolean;

	numberedList?: boolean;
	bulletedList?: boolean;

	indentIncrease?: boolean;
	indentDecrease?: boolean;

	blockquote?: boolean;
	code?: boolean;
	removeFormat?: boolean;

	copy?: boolean;
	paste?: boolean;
	cut?: boolean;
	undo?: boolean;
	redo?: boolean;

	downloadEml?: boolean | EmlFileConfig;
	downloadHtml?: boolean;

	customTool?: {
		toolRenderer: (selection: Selection | null) => TemplateResult | any;
	}
}

export const enum EDITOR_COMMAND {
	FORMAT_BLOCK = "formatBlock",

	FORMAT_BOLD = "bold",
	FORMAT_ITALIC = "italic",
	FORMAT_UNDERLINE = "underline",
	FORMAT_STRIKETHROUGH = "strikethrough",
	FORMAT_REMOVE = "removeFormat",

	ALIGN_LEFT = "justifyLeft",
	ALIGN_CENTER = "justifyCenter",
	ALIGN_RIGHT = "justifyRight",
	ALIGN_JUSTIFY = "justifyFull",

	LIST_NUMBERED = "insertOrderedList",
	LIST_BULLETED = "insertUnorderedList",

	INDENT_INCREASE = "indent",
	INDENT_DECREASE = "outdent",

	COPY = "copy",
	PASTE = "paste",
	CUT = "cut",
	UNDO = "undo",
	REDO = "redo",

	BLOCKQUOTE = "blockquote",
	CODE = "pre",

	// misc
	DOWNLOAD_EML = "DOWNLOAD_EML",
	DOWNLOAD_HTML = "DOWNLOAD_HTML",
	CUSTOM_TOOL = "CUSTOM_TOOL",
}