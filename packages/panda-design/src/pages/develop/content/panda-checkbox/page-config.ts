// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-checkbox";
export const pageName = "Checkbox";
export const pageUri = `/develop?page=${pageId}`;
export const keywords = ["checkbox", "tick", "options"];
export const description = ["Showcase of a panda-checkbox component that allows the user to make a binary choice."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
