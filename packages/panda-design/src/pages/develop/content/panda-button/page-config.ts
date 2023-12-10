// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-button";
export const pageName = "Button";
export const pageUri = `/develop?content=${pageId}`;
export const keywords = ["button", "cta", "action", "interface", "form"];
export const description = ["Showcase of a panda-button element."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
