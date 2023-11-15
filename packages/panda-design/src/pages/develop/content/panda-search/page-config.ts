// types
import { html } from "lit";
import { ContextMenuItem } from "panda-design-typings";

export const pageId = "panda-search";
export const pageName = "Search";
export const pageUri = `/develop?content=${pageId}`;
export const pageTemplate = html`<${pageId}-content-page></${pageId}-content-page>`;
export const keywords = ["search", "box", "find", "input", "text", "field"];
export const description = ["Showcase of a panda-search element."];
export const contextMenu: ContextMenuItem[] = [
	{ name: "Overview", contextId: "overview" },
	{ name: "Installation", contextId: "installation" },
	{ name: "Usage", contextId: "usage" },
	{ name: "Component States", contextId: "component-states" },
	{ name: "Features", contextId: "features" },
	{ name: "Themes", contextId: "themes" },
	{ name: "Customization", contextId: "customization" },
];
