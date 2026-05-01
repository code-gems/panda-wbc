import { ComponentEventDetails, ComponentPropertyDetails } from "panda-design-typings";

// demo props
export const componentProperties: ComponentPropertyDetails[] = [
	{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component." },
	{ name: "icon", type: "String", defaultValue: "-", description: "Custom icon to be shown on the component." },
	{ name: "hideIcon", type: "Boolean", defaultValue: "false", description: "Hide callout icon." },
	{ name: "closable", type: "Boolean", defaultValue: "false", description: "Adds close button to the callout's header and makes it closable." },
	{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
];

export const componentEvents: ComponentEventDetails[] = [
	{ name: "@on-close", returnType: "Event", description: "Triggered when user tries to close callout." }
];