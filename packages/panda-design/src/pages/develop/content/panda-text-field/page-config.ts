// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-text-field";
export const pageName = "Text Field";
export const pageUri = `/develop?content=${pageId}`;
export const keywords = ["text", "text box", "text field", "input"];
export const description = ["Showcase of a panda-text-field element."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
