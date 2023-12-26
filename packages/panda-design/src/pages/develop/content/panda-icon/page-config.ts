// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-icon";
export const pageName = "Icons";
export const pageUri = `/develop?page=${pageId}`;
export const keywords = ["icon"];
export const description = ["Icon description"];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Icon List", contextId: ContentSectionName.LIST },
];
