// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-sortable-list";
export const pageName = "Sortable List";
export const pageUri = `/develop?page=${pageId}`;
export const keywords = ["sortable", "list", "ordering"];
export const description = ["Showcase of a panda-sortable-list element."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
