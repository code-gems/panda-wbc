// types
import { TokenDetails } from "panda-design-typings";

/** PROMPT
Read files:
packages\panda-multi-select-combo-box\src\styles\styles.ts
packages\panda-multi-select-combo-box\src\styles\overlay-styles.ts

Create a list of unique design tokens defined in these files.
Create a list of tokens in below structure:

export const designTokens = [
	{ tokenName: "--panda-select-dropdown-width", description: "Width of the dropdown overlay" },
	{ tokenName: "--panda-select-dropdown-max-height", description: "Maximum height of the dropdown overlay" },
];

update this file with the results:
packages\panda-design\src\pages\develop\content\panda-multi-select-combo-box\design-tokens.ts
*/

export const designTokens: TokenDetails[] = [
	// Label
	{ tokenName: "--panda-select-label-line-height", description: "Line height of the label text" },
	{ tokenName: "--panda-select-label-color", description: "Color of the label text" },
	{ tokenName: "--panda-select-label-font-size", description: "Font size of the label text" },
	{ tokenName: "--panda-select-label-font-family", description: "Font family of the label text" },
	{ tokenName: "--panda-select-label-text-shadow", description: "Text shadow of the label" },

	// Help Text
	{ tokenName: "--panda-select-help-text-line-height", description: "Line height of the help text" },
	{ tokenName: "--panda-select-help-text-color", description: "Color of the help text" },
	{ tokenName: "--panda-select-help-text-font-size", description: "Font size of the help text" },
	{ tokenName: "--panda-select-help-text-font-family", description: "Font family of the help text" },
	{ tokenName: "--panda-select-help-text-text-shadow", description: "Text shadow of the help text" },

	// Error Message
	{ tokenName: "--panda-select-error-message-line-height", description: "Line height of the error message" },
	{ tokenName: "--panda-select-error-message-color", description: "Color of the error message" },
	{ tokenName: "--panda-select-error-message-font-size", description: "Font size of the error message" },
	{ tokenName: "--panda-select-error-message-font-family", description: "Font family of the error message" },
	{ tokenName: "--panda-select-error-message-text-shadow", description: "Text shadow of the error message" },

	// Spinner
	{ tokenName: "--panda-select-background-color-working", description: "Background color when component is in working state" },
	{ tokenName: "--panda-select-spinner-color", description: "Color of the spinner" },
	{ tokenName: "--panda-select-spinner-size-m", description: "Size of the spinner (medium)" },
	{ tokenName: "--panda-select-spinner-size-s", description: "Size of the spinner (small)" },
	{ tokenName: "--panda-select-spinner-size-l", description: "Size of the spinner (large)" },
	{ tokenName: "--panda-select-spinner-size-xl", description: "Size of the spinner (extra large)" },

	// Select Container
	{ tokenName: "--panda-select-height-size-m", description: "Height of the select container (medium)" },
	{ tokenName: "--panda-select-height-size-s", description: "Height of the select container (small)" },
	{ tokenName: "--panda-select-height-size-l", description: "Height of the select container (large)" },
	{ tokenName: "--panda-select-height-size-xl", description: "Height of the select container (extra large)" },
	{ tokenName: "--panda-select-border-radius-size-m", description: "Border radius of the select container (medium)" },
	{ tokenName: "--panda-select-border-radius-size-s", description: "Border radius of the select container (small)" },
	{ tokenName: "--panda-select-border-radius-size-l", description: "Border radius of the select container (large)" },
	{ tokenName: "--panda-select-border-radius-size-xl", description: "Border radius of the select container (extra large)" },
	{ tokenName: "--panda-select-border-width", description: "Border width of the select container" },
	{ tokenName: "--panda-select-border-style", description: "Border style of the select container" },
	{ tokenName: "--panda-select-border-color", description: "Border color of the select container" },
	{ tokenName: "--panda-select-border-color-hover", description: "Border color of the select container on hover" },
	{ tokenName: "--panda-select-background-color", description: "Background color of the select container" },
	{ tokenName: "--panda-select-background-color-hover", description: "Background color of the select container on hover" },
	{ tokenName: "--panda-select-elevation", description: "Box shadow/elevation of the select container" },
	{ tokenName: "--panda-select-elevation-hover", description: "Box shadow/elevation of the select container on hover" },

	// Items Container
	{ tokenName: "--panda-select-items-cont-padding-left-size-m", description: "Left padding of items container (medium)" },
	{ tokenName: "--panda-select-items-cont-padding-left-size-s", description: "Left padding of items container (small)" },
	{ tokenName: "--panda-select-items-cont-padding-left-size-l", description: "Left padding of items container (large)" },
	{ tokenName: "--panda-select-items-cont-padding-left-size-xl", description: "Left padding of items container (extra large)" },
	{ tokenName: "--panda-select-items-cont-padding-right-size-m", description: "Right padding of items container (medium)" },
	{ tokenName: "--panda-select-items-cont-padding-right-size-s", description: "Right padding of items container (small)" },
	{ tokenName: "--panda-select-items-cont-padding-right-size-l", description: "Right padding of items container (large)" },
	{ tokenName: "--panda-select-items-cont-padding-right-size-xl", description: "Right padding of items container (extra large)" },
	{ tokenName: "--panda-select-slot-gap-size-m", description: "Gap for prefix/suffix slots (medium)" },
	{ tokenName: "--panda-select-slot-gap-size-s", description: "Gap for prefix/suffix slots (small)" },
	{ tokenName: "--panda-select-slot-gap-size-l", description: "Gap for prefix/suffix slots (large)" },
	{ tokenName: "--panda-select-slot-gap-size-xl", description: "Gap for prefix/suffix slots (extra large)" },
	{ tokenName: "--panda-select-with-message-gap-size-m", description: "Gap when message is present (medium)" },
	{ tokenName: "--panda-select-with-message-gap-size-s", description: "Gap when message is present (small)" },
	{ tokenName: "--panda-select-with-message-gap-size-l", description: "Gap when message is present (large)" },
	{ tokenName: "--panda-select-with-message-gap-size-xl", description: "Gap when message is present (extra large)" },

	// Items
	{ tokenName: "--panda-select-items-gap-size-m", description: "Gap between items (medium)" },
	{ tokenName: "--panda-select-items-gap-size-s", description: "Gap between items (small)" },
	{ tokenName: "--panda-select-items-gap-size-l", description: "Gap between items (large)" },
	{ tokenName: "--panda-select-items-gap-size-xl", description: "Gap between items (extra large)" },
	{ tokenName: "--panda-select-items-padding-size-m", description: "Padding around items (medium)" },
	{ tokenName: "--panda-select-items-padding-size-s", description: "Padding around items (small)" },
	{ tokenName: "--panda-select-items-padding-size-l", description: "Padding around items (large)" },
	{ tokenName: "--panda-select-items-padding-size-xl", description: "Padding around items (extra large)" },
	{ tokenName: "--panda-select-items-padding-top-size-m", description: "Top padding of items in auto-expand mode (medium)" },
	{ tokenName: "--panda-select-items-padding-top-size-s", description: "Top padding of items in auto-expand mode (small)" },
	{ tokenName: "--panda-select-items-padding-top-size-l", description: "Top padding of items in auto-expand mode (large)" },
	{ tokenName: "--panda-select-items-padding-top-size-xl", description: "Top padding of items in auto-expand mode (extra large)" },
	{ tokenName: "--panda-select-items-padding-bottom-size-m", description: "Bottom padding of items in auto-expand mode (medium)" },
	{ tokenName: "--panda-select-items-padding-bottom-size-s", description: "Bottom padding of items in auto-expand mode (small)" },
	{ tokenName: "--panda-select-items-padding-bottom-size-l", description: "Bottom padding of items in auto-expand mode (large)" },
	{ tokenName: "--panda-select-items-padding-bottom-size-xl", description: "Bottom padding of items in auto-expand mode (extra large)" },

	// Item Text
	{ tokenName: "--panda-select-text-color", description: "Text color of items" },
	{ tokenName: "--panda-select-text-color-focused", description: "Text color of items when focused" },
	{ tokenName: "--panda-select-text-color-readonly", description: "Text color of items when readonly" },
	{ tokenName: "--panda-select-text-color-disabled", description: "Text color of items when disabled" },
	{ tokenName: "--panda-select-font-size-size-m", description: "Font size of item text (medium)" },
	{ tokenName: "--panda-select-font-size-size-s", description: "Font size of item text (small)" },
	{ tokenName: "--panda-select-font-size-size-l", description: "Font size of item text (large)" },
	{ tokenName: "--panda-select-font-size-size-xl", description: "Font size of item text (extra large)" },
	{ tokenName: "--panda-select-font-family-size-m", description: "Font family of item text (medium)" },
	{ tokenName: "--panda-select-font-family-size-s", description: "Font family of item text (small)" },
	{ tokenName: "--panda-select-font-family-size-l", description: "Font family of item text (large)" },
	{ tokenName: "--panda-select-font-family-size-xl", description: "Font family of item text (extra large)" },
	{ tokenName: "--panda-select-font-weight-size-m", description: "Font weight of item text (medium)" },
	{ tokenName: "--panda-select-font-weight-size-s", description: "Font weight of item text (small)" },
	{ tokenName: "--panda-select-font-weight-size-l", description: "Font weight of item text (large)" },
	{ tokenName: "--panda-select-font-weight-size-xl", description: "Font weight of item text (extra large)" },
	{ tokenName: "--panda-select-text-shadow-size-m", description: "Text shadow of item text (medium)" },
	{ tokenName: "--panda-select-text-shadow-size-s", description: "Text shadow of item text (small)" },
	{ tokenName: "--panda-select-text-shadow-size-l", description: "Text shadow of item text (large)" },
	{ tokenName: "--panda-select-text-shadow-size-xl", description: "Text shadow of item text (extra large)" },
	{ tokenName: "--panda-select-text-shadow-focused", description: "Text shadow when focused" },
	{ tokenName: "--panda-select-text-shadow-readonly", description: "Text shadow when readonly" },
	{ tokenName: "--panda-select-text-shadow-disabled", description: "Text shadow when disabled" },
	{ tokenName: "--panda-select-single-item-padding-left", description: "Left padding of single item" },

	// Chip
	{ tokenName: "--panda-select-chip-height-size-m", description: "Height of chip (medium)" },
	{ tokenName: "--panda-select-chip-height-size-s", description: "Height of chip (small)" },
	{ tokenName: "--panda-select-chip-height-size-l", description: "Height of chip (large)" },
	{ tokenName: "--panda-select-chip-height-size-xl", description: "Height of chip (extra large)" },
	{ tokenName: "--panda-select-chip-transition", description: "Transition effect for chip" },
	{ tokenName: "--panda-select-chip-border-radius-size-m", description: "Border radius of chip (medium)" },
	{ tokenName: "--panda-select-chip-border-radius-size-s", description: "Border radius of chip (small)" },
	{ tokenName: "--panda-select-chip-border-radius-size-l", description: "Border radius of chip (large)" },
	{ tokenName: "--panda-select-chip-border-radius-size-xl", description: "Border radius of chip (extra large)" },
	{ tokenName: "--panda-select-chip-background-color", description: "Background color of chip" },
	{ tokenName: "--panda-select-chip-background-color-disabled", description: "Background color of chip when disabled" },
	{ tokenName: "--panda-select-chip-padding-right-size-m", description: "Right padding of chip label (medium)" },
	{ tokenName: "--panda-select-chip-padding-right-size-s", description: "Right padding of chip label (small)" },
	{ tokenName: "--panda-select-chip-padding-right-size-l", description: "Right padding of chip label (large)" },
	{ tokenName: "--panda-select-chip-padding-right-size-xl", description: "Right padding of chip label (extra large)" },
	{ tokenName: "--panda-select-chip-text-color", description: "Text color of chip" },
	{ tokenName: "--panda-select-chip-text-color-disabled", description: "Text color of chip when disabled" },
	{ tokenName: "--panda-select-chip-font-size-m", description: "Font size of chip text (medium)" },
	{ tokenName: "--panda-select-chip-font-size-s", description: "Font size of chip text (small)" },
	{ tokenName: "--panda-select-chip-font-size-l", description: "Font size of chip text (large)" },
	{ tokenName: "--panda-select-chip-font-size-xl", description: "Font size of chip text (extra large)" },
	{ tokenName: "--panda-select-chip-font-family-size-m", description: "Font family of chip text (medium)" },
	{ tokenName: "--panda-select-chip-font-weight-size-m", description: "Font weight of chip text (medium)" },
	{ tokenName: "--panda-select-chip-text-shadow-size-m", description: "Text shadow of chip text (medium)" },
	{ tokenName: "--panda-select-chip-text-shadow-disabled", description: "Text shadow of chip text when disabled" },

	// Chip Remove Button
	{ tokenName: "--panda-select-chip-remove-button-transition", description: "Transition effect for chip remove button" },
	{ tokenName: "--panda-select-chip-remove-button-border-radius-size-m", description: "Border radius of chip remove button (medium)" },
	{ tokenName: "--panda-select-chip-remove-button-border-radius-size-s", description: "Border radius of chip remove button (small)" },
	{ tokenName: "--panda-select-chip-remove-button-border-radius-size-l", description: "Border radius of chip remove button (large)" },
	{ tokenName: "--panda-select-chip-remove-button-border-radius-size-xl", description: "Border radius of chip remove button (extra large)" },
	{ tokenName: "--panda-select-chip-remove-button-background-color", description: "Background color of chip remove button" },
	{ tokenName: "--panda-select-chip-remove-button-background-color-hover", description: "Background color of chip remove button on hover" },
	{ tokenName: "--panda-select-chip-remove-button-icon-color-hover", description: "Icon color of chip remove button on hover" },
	{ tokenName: "--panda-select-chip-remove-button-icon-size-m", description: "Icon size of chip remove button (medium)" },
	{ tokenName: "--panda-select-chip-clear-button-icon-size-s", description: "Icon size of chip clear button (small)" },
	{ tokenName: "--panda-select-chip-clear-button-icon-size-l", description: "Icon size of chip clear button (large)" },
	{ tokenName: "--panda-select-chip-clear-button-icon-size-xl", description: "Icon size of chip clear button (extra large)" },

	// Icons
	{ tokenName: "--panda-select-icon-color", description: "Color of icons" },
	{ tokenName: "--panda-select-icon-color-hover", description: "Color of icons on hover" },
	{ tokenName: "--panda-select-icon-color-readonly", description: "Color of icons when readonly" },
	{ tokenName: "--panda-select-icon-color-disabled", description: "Color of icons when disabled" },
	{ tokenName: "--panda-select-icon-color-mandatory", description: "Color of icons when mandatory" },
	{ tokenName: "--panda-select-icon-size-m", description: "Size of icons (medium)" },
	{ tokenName: "--panda-select-icon-size-s", description: "Size of icons (small)" },
	{ tokenName: "--panda-select-icon-size-l", description: "Size of icons (large)" },
	{ tokenName: "--panda-select-icon-size-xl", description: "Size of icons (extra large)" },
	{ tokenName: "--panda-select-slot-icon-size-m", description: "Size of slot icons (medium)" },
	{ tokenName: "--panda-select-slot-icon-size-s", description: "Size of slot icons (small)" },
	{ tokenName: "--panda-select-slot-icon-size-l", description: "Size of slot icons (large)" },
	{ tokenName: "--panda-select-slot-icon-size-xl", description: "Size of slot icons (extra large)" },

	// Clear Button
	{ tokenName: "--panda-select-clear-button-size-m", description: "Size of clear button (medium)" },
	{ tokenName: "--panda-select-clear-button-size-s", description: "Size of clear button (small)" },
	{ tokenName: "--panda-select-clear-button-size-l", description: "Size of clear button (large)" },
	{ tokenName: "--panda-select-clear-button-size-xl", description: "Size of clear button (extra large)" },
	{ tokenName: "--panda-select-clear-button-icon-padding-size-m", description: "Padding of clear button icon (medium)" },
	{ tokenName: "--panda-select-clear-button-icon-padding-size-s", description: "Padding of clear button icon (small)" },
	{ tokenName: "--panda-select-clear-button-icon-padding-size-l", description: "Padding of clear button icon (large)" },
	{ tokenName: "--panda-select-clear-button-icon-padding-size-xl", description: "Padding of clear button icon (extra large)" },
	{ tokenName: "--panda-select-clear-button-icon-transition", description: "Transition effect for clear button icon" },
	{ tokenName: "--panda-select-clear-button-icon-border-radius-size-m", description: "Border radius of clear button icon (medium)" },
	{ tokenName: "--panda-select-clear-button-icon-border-radius-size-s", description: "Border radius of clear button icon (small)" },
	{ tokenName: "--panda-select-clear-button-icon-border-radius-size-l", description: "Border radius of clear button icon (large)" },
	{ tokenName: "--panda-select-clear-button-icon-border-radius-size-xl", description: "Border radius of clear button icon (extra large)" },
	{ tokenName: "--panda-select-clear-button-background-color", description: "Background color of clear button" },
	{ tokenName: "--panda-select-clear-button-icon-background-color-hover", description: "Background color of clear button icon on hover" },
	{ tokenName: "--panda-select-clear-button-icon-color", description: "Icon color of clear button" },
	{ tokenName: "--panda-select-clear-button-icon-color-hover", description: "Icon color of clear button on hover" },
	{ tokenName: "--panda-select-clear-button-icon-size-m", description: "Icon size of clear button (medium)" },
	{ tokenName: "--panda-select-clear-button-icon-size-s", description: "Icon size of clear button (small)" },
	{ tokenName: "--panda-select-clear-button-icon-size-l", description: "Icon size of clear button (large)" },
	{ tokenName: "--panda-select-clear-button-icon-size-xl", description: "Icon size of clear button (extra large)" },

	// Placeholder
	{ tokenName: "--panda-select-placeholder-color", description: "Color of placeholder text" },
	{ tokenName: "--panda-select-placeholder-color-mandatory", description: "Color of placeholder text when mandatory" },
	{ tokenName: "--panda-select-placeholder-font-size-m", description: "Font size of placeholder text (medium)" },
	{ tokenName: "--panda-select-placeholder-font-size-s", description: "Font size of placeholder text (small)" },
	{ tokenName: "--panda-select-placeholder-font-size-l", description: "Font size of placeholder text (large)" },
	{ tokenName: "--panda-select-placeholder-font-size-xl", description: "Font size of placeholder text (extra large)" },
	{ tokenName: "--panda-select-placeholder-font-family-size-m", description: "Font family of placeholder text (medium)" },
	{ tokenName: "--panda-select-placeholder-font-weight-size-m", description: "Font weight of placeholder text (medium)" },
	{ tokenName: "--panda-select-placeholder-text-shadow-size-m", description: "Text shadow of placeholder text (medium)" },

	// Prefix/Suffix Slots
	{ tokenName: "--panda-select-prefix-background-color", description: "Background color of prefix slot" },
	{ tokenName: "--panda-select-suffix-background-color", description: "Background color of suffix slot" },
	{ tokenName: "--panda-select-slot-background-color-readonly", description: "Background color of slots when readonly" },
	{ tokenName: "--panda-select-slot-background-color-disabled", description: "Background color of slots when disabled" },

	// State: Readonly
	{ tokenName: "--panda-select-border-width-readonly", description: "Border width when readonly" },
	{ tokenName: "--panda-select-border-style-readonly", description: "Border style when readonly" },
	{ tokenName: "--panda-select-border-color-readonly", description: "Border color when readonly" },
	{ tokenName: "--panda-select-background-color-readonly", description: "Background color when readonly" },
	{ tokenName: "--panda-select-elevation-readonly", description: "Box shadow/elevation when readonly" },

	// State: Focused
	{ tokenName: "--panda-select-border-color-focused", description: "Border color when focused" },
	{ tokenName: "--panda-select-background-color-focused", description: "Background color when focused" },
	{ tokenName: "--panda-select-outline", description: "Outline when focused" },

	// State: Mandatory
	{ tokenName: "--panda-select-border-width-mandatory", description: "Border width when mandatory" },
	{ tokenName: "--panda-select-border-style-mandatory", description: "Border style when mandatory" },
	{ tokenName: "--panda-select-border-color-mandatory", description: "Border color when mandatory" },
	{ tokenName: "--panda-select-background-color-mandatory", description: "Background color when mandatory" },
	{ tokenName: "--panda-select-outline-mandatory", description: "Outline when mandatory" },

	// State: Disabled
	{ tokenName: "--panda-select-border-color-disabled", description: "Border color when disabled" },
	{ tokenName: "--panda-select-background-color-disabled", description: "Background color when disabled" },
	{ tokenName: "--panda-select-elevation-disabled", description: "Box shadow/elevation when disabled" },

	// State: Valid
	{ tokenName: "--panda-select-color-valid", description: "Color when valid" },
	{ tokenName: "--panda-select-border-width-valid", description: "Border width when valid" },
	{ tokenName: "--panda-select-border-style-valid", description: "Border style when valid" },
	{ tokenName: "--panda-select-border-color-valid", description: "Border color when valid" },
	{ tokenName: "--panda-select-background-color-valid", description: "Background color when valid" },
	{ tokenName: "--panda-select-outline-valid", description: "Outline when valid" },

	// State: Invalid
	{ tokenName: "--panda-select-color-invalid", description: "Color when invalid" },
	{ tokenName: "--panda-select-border-width-invalid", description: "Border width when invalid" },
	{ tokenName: "--panda-select-border-style-invalid", description: "Border style when invalid" },
	{ tokenName: "--panda-select-border-color-invalid", description: "Border color when invalid" },
	{ tokenName: "--panda-select-background-color-invalid", description: "Background color when invalid" },
	{ tokenName: "--panda-select-outline-invalid", description: "Outline when invalid" },

	// Transition
	{ tokenName: "--panda-select-transition", description: "General transition effect" },

	// Dropdown
	{ tokenName: "--panda-select-dropdown-padding", description: "Padding of the dropdown" },
	{ tokenName: "--panda-select-dropdown-border-width", description: "Border width of the dropdown" },
	{ tokenName: "--panda-select-dropdown-border-style", description: "Border style of the dropdown" },
	{ tokenName: "--panda-select-dropdown-border-color", description: "Border color of the dropdown" },
	{ tokenName: "--panda-select-dropdown-border-radius", description: "Border radius of the dropdown" },
	{ tokenName: "--panda-select-dropdown-background-color", description: "Background color of the dropdown" },
	{ tokenName: "--panda-select-dropdown-elevation", description: "Box shadow/elevation of the dropdown" },

	// Dropdown Header
	{ tokenName: "--panda-select-dropdown-header-gap", description: "Gap in dropdown header" },
	{ tokenName: "--panda-select-dropdown-header-padding", description: "Padding of dropdown header" },
	{ tokenName: "--panda-select-dropdown-filter-padding", description: "Padding of filter in dropdown header" },
	{ tokenName: "--panda-select-dropdown-buttons-padding", description: "Padding of buttons in dropdown header" },

	// Dropdown Footer
	{ tokenName: "--panda-select-dropdown-footer-padding-top", description: "Top padding of dropdown footer" },

	// Dropdown List
	{ tokenName: "--panda-select-dropdown-list-gap", description: "Gap between list items" },
	{ tokenName: "--panda-select-dropdown-list-padding", description: "Padding of the list" },

	// Dropdown List Group
	{ tokenName: "--panda-select-dropdown-list-group-gap", description: "Gap between items in list group" },
	{ tokenName: "--panda-select-dropdown-list-group-padding-top", description: "Top padding of list group" },
	{ tokenName: "--panda-select-dropdown-list-group-padding-bottom", description: "Bottom padding of list group" },
	{ tokenName: "--panda-select-dropdown-list-group-border-bottom-width", description: "Border bottom width of list group" },
	{ tokenName: "--panda-select-dropdown-list-group-border-bottom-style", description: "Border bottom style of list group" },
	{ tokenName: "--panda-select-dropdown-list-group-border-bottom-color", description: "Border bottom color of list group" },
	{ tokenName: "--panda-select-dropdown-list-group-header-height-size-m", description: "Height of list group header (medium)" },
	{ tokenName: "--panda-select-dropdown-list-group-header-padding-top", description: "Top padding of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-padding-bottom", description: "Bottom padding of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-padding-left", description: "Left padding of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-padding-right", description: "Right padding of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-text-color", description: "Text color of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-font-size", description: "Font size of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-font-family", description: "Font family of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-text-shadow", description: "Text shadow of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-border-radius", description: "Border radius of list group header" },
	{ tokenName: "--panda-select-dropdown-list-group-header-background-color", description: "Background color of list group header" },

	// Dropdown Item
	{ tokenName: "--panda-select-dropdown-item-border-width", description: "Border width of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-border-style", description: "Border style of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-border-style-disabled", description: "Border style of dropdown item when disabled" },
	{ tokenName: "--panda-select-dropdown-item-border-style-selected-active", description: "Border style of dropdown item when selected and active" },
	{ tokenName: "--panda-select-dropdown-item-border-color", description: "Border color of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-border-color-hover", description: "Border color of dropdown item on hover" },
	{ tokenName: "--panda-select-dropdown-item-border-color-active", description: "Border color of dropdown item when active" },
	{ tokenName: "--panda-select-dropdown-item-border-color-selected", description: "Border color of dropdown item when selected" },
	{ tokenName: "--panda-select-dropdown-item-border-color-selected-active", description: "Border color of dropdown item when selected and active" },
	{ tokenName: "--panda-select-dropdown-item-border-color-disabled", description: "Border color of dropdown item when disabled" },
	{ tokenName: "--panda-select-dropdown-item-border-radius", description: "Border radius of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-background-color", description: "Background color of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-background-color-hover", description: "Background color of dropdown item on hover" },
	{ tokenName: "--panda-select-dropdown-item-background-color-active", description: "Background color of dropdown item when active" },
	{ tokenName: "--panda-select-dropdown-item-background-color-selected", description: "Background color of dropdown item when selected" },
	{ tokenName: "--panda-select-dropdown-item-background-color-selected-active", description: "Background color of dropdown item when selected and active" },
	{ tokenName: "--panda-select-dropdown-item-background-color-disabled", description: "Background color of dropdown item when disabled" },
	{ tokenName: "--panda-select-dropdown-item-height-size-m", description: "Height of dropdown item (medium)" },
	{ tokenName: "--panda-select-dropdown-item-padding-top", description: "Top padding of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-padding-bottom", description: "Bottom padding of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-padding-left", description: "Left padding of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-padding-right", description: "Right padding of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-text-color", description: "Text color of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-text-color-hover", description: "Text color of dropdown item on hover" },
	{ tokenName: "--panda-select-dropdown-item-text-color-active", description: "Text color of dropdown item when active" },
	{ tokenName: "--panda-select-dropdown-item-text-color-selected", description: "Text color of dropdown item when selected" },
	{ tokenName: "--panda-select-dropdown-item-text-color-selected-active", description: "Text color of dropdown item when selected and active" },
	{ tokenName: "--panda-select-dropdown-item-text-color-disabled", description: "Text color of dropdown item when disabled" },
	{ tokenName: "--panda-select-dropdown-item-text-decoration-disabled", description: "Text decoration of dropdown item when disabled" },
	{ tokenName: "--panda-select-dropdown-item-font-size", description: "Font size of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-font-family", description: "Font family of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-text-shadow", description: "Text shadow of dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-checkbox-size", description: "Size of checkbox in dropdown item" },
	{ tokenName: "--panda-select-dropdown-item-checkbox-color-selected", description: "Color of checkbox when selected" },

	// Dropdown Callout
	{ tokenName: "--panda-select-dropdown-callout-gap", description: "Gap in dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-padding", description: "Padding of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-border-width", description: "Border width of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-border-style", description: "Border style of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-border-color", description: "Border color of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-border-radius", description: "Border radius of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-background-color", description: "Background color of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-icon-size", description: "Icon size in dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-icon-color", description: "Icon color in dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-text-color", description: "Text color of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-font-size", description: "Font size of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-font-family", description: "Font family of dropdown callout" },
	{ tokenName: "--panda-select-dropdown-callout-text-shadow", description: "Text shadow of dropdown callout" },
];