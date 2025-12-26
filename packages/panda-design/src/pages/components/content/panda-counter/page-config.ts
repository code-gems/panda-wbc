// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-counter";
export const pageName = "Counter";
export const pageUri = `/components?page=${pageId}`;
export const keywords = ["counter", "numbers", "notional", "currency", "display", "animation", "animated"];
export const description = ["Showcase of a panda-counter component."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
