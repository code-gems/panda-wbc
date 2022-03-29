export interface PandaTextEditorOptions {
	toolbarPosition?: "top" | "bottom";
	hideToolbar?: boolean;
	toolbar?: PandaTextEditorToolbarConfig[];
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

	undo?: boolean;
	redo?: boolean;
}

export const enum EDITOR_COMMAND {
	FORMAT_BLOCK = "formatBlock",

	FORMAT_BOLD = "bold",
	FORMAT_ITALIC = "italic",
	FORMAT_UNDERLINE = "underline",
	FORMAT_STRIKETHROUGH = "strikethrough",

	ALIGN_LEFT = "justifyLeft",
	ALIGN_CENTER = "justifyCenter",
	ALIGN_RIGHT = "justifyRight",
	ALIGN_JUSTIFY = "justifyFull",

	LIST_NUMBERED = "insertOrderedList",
	LIST_BULLETED = "insertUnorderedList",

	INDENT_INCREASE = "indent",
	INDENT_DECREASE = "outdent",

	UNDO = "undo",
	REDO = "redo",

	BLOCKQUOTE = "blockquote",
	CODE = "pre",
}