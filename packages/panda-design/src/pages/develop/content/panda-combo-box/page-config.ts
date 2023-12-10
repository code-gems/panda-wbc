// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-combo-box";
export const pageName = "Combo-box";
export const pageUri = `/develop?content=${pageId}`;
export const keywords = ["combo-box"];
export const description = ["Showcase of a panda-combo-box component."];

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
