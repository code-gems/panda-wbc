// types
import { ContextMenuItem } from "panda-design-typings";

export const pageId = "base-colors";
export const pageName = "Base Colors";
export const pageUri = `/themes?content=${pageId}`;
export const keywords = ["base", "colors", "theme", "black", "white", "background"];
export const description = ["Base colors description"];
export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: "overview" },
	{ name: "Background Colors", contextId: "background-colors" },
	{ name: "Black & White", contextId: "black-and-white" },
];
