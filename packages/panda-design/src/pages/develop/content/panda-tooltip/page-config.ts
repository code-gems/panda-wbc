// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-tooltip";
export const pageName = "Tooltip";
export const pageUri = `/develop?content=${pageId}`;
export const keywords = ["tooltip", "tips", "title", "help"];
export const description = ["Showcase of a panda-tooltip component."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
