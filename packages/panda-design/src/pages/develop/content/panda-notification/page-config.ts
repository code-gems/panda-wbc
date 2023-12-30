// types
import { ContextMenuItem, ContentSectionName } from "panda-design-typings";

export const pageId = "panda-notification";
export const pageName = "Notification";
export const pageUri = `/develop?page=${pageId}`;
export const keywords = ["notification", "toast", "callout", "call-out", "message", "information"];
export const description = ["Showcase of a panda-notification element."];

export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: ContentSectionName.OVERVIEW },
	{ name: "Installation", contextId: ContentSectionName.INSTALLATION },
	{ name: "Usage", contextId: ContentSectionName.USAGE },
	{ name: "Features", contextId: ContentSectionName.FEATURES },
	{ name: "Theming", contextId: ContentSectionName.THEMING },
	{ name: "Customization", contextId: ContentSectionName.CUSTOMIZATION },
];
