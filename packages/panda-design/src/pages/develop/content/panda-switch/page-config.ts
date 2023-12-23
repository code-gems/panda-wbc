// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-switch";
export const pageName = "Switch";
export const pageUri = `/develop?content=${pageId}`;
export const keywords = ["switch", "toggle", "control", "button"];
export const description = ["Showcase of a panda-switch element."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Component States", contextId: ContentSectionName.COMPONENT_STATES },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
