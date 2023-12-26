// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-flag";
export const pageName = "Flag";
export const pageUri = `/develop?page=${pageId}`;
export const keywords = ["flags", "country"];
export const description = ["Flag description"];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Validation", contextId: ContentSectionName.VALIDATION },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
