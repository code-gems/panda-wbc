// types
import { ContextMenuItem } from "panda-design-typings";

export const pageId = "panda-pagination";
export const pageName = "Pagination";
export const pageUri = `/components?page=${pageId}`;
export const keywords = ["pagination"];
export const description = ["Showcase of a panda-pagination element."];
export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: "overview" },
	{ name: "Installation", contextId: "installation" },
	{ name: "Usage", contextId: "usage" },
	{ name: "Component States", contextId: "component-states" },
	{ name: "Features", contextId: "features" },
	{ name: "Themes", contextId: "themes" },
	{ name: "Customization", contextId: "customization" },
];
