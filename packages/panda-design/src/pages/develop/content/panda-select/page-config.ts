// types
import { ContextMenuItem } from "panda-design-typings";

export const pageId = "panda-select";
export const pageName = "Select";
export const pageUri = `/develop?content=${pageId}`;
export const keywords = ["select", "drop-down", "dropdown", "options"];
export const description = ["Showcase of a panda-select element."];
export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: "overview" },
	{ name: "Installation", contextId: "installation" },
	{ name: "Usage", contextId: "usage" },
	{ name: "Component States", contextId: "component-states" },
	{ name: "Features", contextId: "features" },
	{ name: "Themes", contextId: "themes" },
	{ name: "Customization", contextId: "customization" },
];
