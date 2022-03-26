export interface PandaTextEditorOptions {
	toolbarPosition?: "top" | "bottom";
	hideToolbar?: boolean;
	toolbar?: PandaTextEditorToolbarConfig;
}

export interface PandaTextEditorToolbarConfig {
	format?: {
		h1?: boolean;
	};

	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;

	alignLeft?: boolean;
	alignCenter?: boolean;
	alignRight?: boolean;

	removeFormat?: boolean;
}