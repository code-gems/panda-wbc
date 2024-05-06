// types
import { PandaIconTemplate } from "../../index";

export const defaultIcons: PandaIconTemplate[] = [
	// system
	{ name: "apps", template: `<path d="M2,7H7V2H2ZM9.5,22h5V17h-5ZM2,22H7V17H2Zm0-7.5H7v-5H2Zm7.5,0h5v-5h-5ZM17,2V7h5V2ZM9.5,7h5V2h-5ZM17,14.5h5v-5H17ZM17,22h5V17H17Z"/>` },
	{ name: "info", template: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>` },
	{ name: "info-outline", template: `<path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>` },
	{ name: "error", template: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>` },
	{ name: "error-outline", template: `<path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>` },
	{ name: "warning", template: `<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>` },
	{ name: "help", template: `<path d="M11.87,2A10,10,0,1,0,22,11.87,10,10,0,0,0,11.87,2Zm0,16.09h-.06a1.46,1.46,0,0,1,0-2.91h0a1.46,1.46,0,1,1,0,2.91ZM15.42,11a6.55,6.55,0,0,1-1.2,1.07l-.61.42a1.65,1.65,0,0,0-.61.75,1.61,1.61,0,0,0-.1.63V14H10.58v-.2c0-.81.05-1.29.39-1.68a9.91,9.91,0,0,1,1.73-1.4,2.09,2.09,0,0,0,.42-.42,1.53,1.53,0,0,0,.35-.87,1.67,1.67,0,0,0-.32-1A1.33,1.33,0,0,0,12,8a1.25,1.25,0,0,0-1.17.54,2.1,2.1,0,0,0-.35,1.16v.1H8.08V9.65A3.63,3.63,0,0,1,9.64,6.51a4.05,4.05,0,0,1,2.26-.6,4.89,4.89,0,0,1,2.92.84A2.91,2.91,0,0,1,16,9.26,2.87,2.87,0,0,1,15.42,11Z"/>` },
	{ name: "help-outline", template: `<path d="M12,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22ZM12,3.81A8.19,8.19,0,1,0,20.19,12,8.19,8.19,0,0,0,12,3.81Z"/><path d="M11.87,15h0a1.36,1.36,0,0,0,0,2.71h.05a1.36,1.36,0,1,0,0-2.71Z"/><path d="M15.71,9.44A2.72,2.72,0,0,0,14.62,7.1a4.56,4.56,0,0,0-2.72-.78,3.81,3.81,0,0,0-2.11.55A3.4,3.4,0,0,0,8.34,9.81V9.9h2.24V9.81a2,2,0,0,1,.33-1.08A1.17,1.17,0,0,1,12,8.22a1.23,1.23,0,0,1,1.07.41,1.56,1.56,0,0,1,.3.93,1.36,1.36,0,0,1-.33.8,1.75,1.75,0,0,1-.38.39A9.34,9.34,0,0,0,11,12.06a2.36,2.36,0,0,0-.35,1.57v.18h2.17v-.09a1.71,1.71,0,0,1,.09-.59,1.55,1.55,0,0,1,.57-.69l.57-.39a6,6,0,0,0,1.12-1h0A2.72,2.72,0,0,0,15.71,9.44Z"/>` },
	{ name: "settings", template: `<path d="M12,15.52A3.52,3.52,0,0,0,15.52,12,3.52,3.52,0,0,0,12,8.48,3.52,3.52,0,0,0,8.48,12,3.52,3.52,0,0,0,12,15.52ZM19.47,13l2.11,1.64c.22.16.25.37.09.66l-2,3.47A.46.46,0,0,1,19,19l-2.48-1a9,9,0,0,1-1.69,1l-.38,2.63A.46.46,0,0,1,14,22H10c-.25,0-.4-.14-.47-.42L9.14,19a7.4,7.4,0,0,1-1.69-1L5,19a.46.46,0,0,1-.61-.19l-2-3.47c-.16-.29-.13-.5.09-.66L4.53,13a8.2,8.2,0,0,1,0-1,8.2,8.2,0,0,1,0-1L2.42,9.37c-.22-.16-.25-.37-.09-.66l2-3.47A.46.46,0,0,1,5,5.05L7.44,6a9,9,0,0,1,1.69-1l.38-2.63A.46.46,0,0,1,10,2h4c.25,0,.4.14.47.42l.37,2.63a7.4,7.4,0,0,1,1.69,1l2.49-1a.46.46,0,0,1,.61.19l2,3.47c.16.29.13.5-.09.66L19.47,11a8.2,8.2,0,0,1,0,1A8.2,8.2,0,0,1,19.47,13Z"/>` },
	{ name: "more", template: `<path d="M5.75,10.25A1.75,1.75,0,1,1,4,12,1.75,1.75,0,0,1,5.75,10.25Z"/><path d="M12,10.25A1.75,1.75,0,1,1,10.25,12,1.75,1.75,0,0,1,12,10.25Z"/><path d="M18.25,10.25A1.75,1.75,0,1,1,16.5,12,1.75,1.75,0,0,1,18.25,10.25Z"/>` },
	{ name: "warning-box", template: `<path d="M3.11,2H20.89A1.11,1.11,0,0,1,22,3.11V20.89A1.11,1.11,0,0,1,20.89,22H3.11A1.11,1.11,0,0,1,2,20.89V3.11A1.11,1.11,0,0,1,3.11,2ZM12,18.67a1.12,1.12,0,1,0-1.11-1.11A1.11,1.11,0,0,0,12,18.67ZM12,5.33a1.11,1.11,0,0,0-1.11,1.11v6.67a1.11,1.11,0,0,0,2.22,0V6.44A1.11,1.11,0,0,0,12,5.33Z"/>` },
	{ name: "check", template: `<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>` },
	{ name: "check-circle", template: `<path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm5.31,9.19L11,16.57h0a1,1,0,0,1-.17.12l-.09.05a.72.72,0,0,1-.29.06.8.8,0,0,1-.3-.06L10,16.69a.62.62,0,0,1-.17-.11h0l-3.11-3.2a.79.79,0,0,1,0-1.11.8.8,0,0,1,1.12,0l2.54,2.62,5.76-5.81a.78.78,0,0,1,1.11,0A.8.8,0,0,1,17.31,10.19Z"/>` },
	{ name: "check-circle-outline", template: `<path d="M12,23A11,11,0,1,1,23,12,11,11,0,0,1,12,23ZM12,3.1A8.9,8.9,0,1,0,20.9,12,8.89,8.89,0,0,0,12,3.1Z"/><path d="M10.9,16.14a1,1,0,0,1-.73-.32L7,12.68a1,1,0,0,1,0-1.47,1,1,0,0,1,1.47,0l2.41,2.41,5.6-5.5A1,1,0,0,1,18,9.59l-6.34,6.29A1.3,1.3,0,0,1,10.9,16.14Z"/>` },
	{ name: "lock", template: `<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>` },
	{ name: "lock-open", template: `<path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/>` },
	{ name: "lock-outline", template: `<path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"/>` },
	{ name: "lock-open-outline", template: `<path d="M18,8h-1V6c0-2.8-2.2-5-5-5S7,3.2,7,6h1.9c0-1.7,1.4-3.1,3.1-3.1s3.1,1.4,3.1,3.1v2H6c-1.1,0-2,0.9-2,2v10 c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z"/>` },
	{ name: "search", template: `<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>` },
	{ name: "check-box", template: `<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>` },
	{ name: "check-box-indeterminate", template: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>` },
	{ name: "check-box-outline-blank", template: `<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>` },
	{ name: "controls", template: `<path fill-rule="evenodd" d="M10,4a4,4,0,0,1,3.87,3H20a1,1,0,0,1,0,2H13.87A4,4,0,0,1,6.13,9H4A1,1,0,0,1,4,7H6.13A4,4,0,0,1,10,4ZM8,8a2,2,0,1,1,2,2A2,2,0,0,1,8,8Zm5.13,9a4,4,0,1,0,0-2H4a1,1,0,0,0,0,2ZM19,16a2,2,0,1,0-2,2A2,2,0,0,0,19,16Z"/>` },
	{ name: "controls-2", template: `<path d="M21,13H10.85a4,4,0,0,1-7.7,0H3a1,1,0,0,1,0-2h.15a4,4,0,0,1,7.7,0H21a1,1,0,0,1,0,2ZM7,10a2,2,0,1,0,2,2A2,2,0,0,0,7,10ZM21,7h-.15a4,4,0,0,1-7.7,0H3A1,1,0,0,1,3,5H13.15a4,4,0,0,1,7.7,0H21a1,1,0,0,1,0,2ZM17,4a2,2,0,1,0,2,2A2,2,0,0,0,17,4ZM3,17H13.15a4,4,0,0,1,7.7,0H21a1,1,0,0,1,0,2h-.15a4,4,0,0,1-7.7,0H3a1,1,0,0,1,0-2Zm14,3a2,2,0,1,0-2-2A2,2,0,0,0,17,20Z"/>` },
	{ name: "adjust", template: `<path d="M21,13H9.82a3,3,0,0,1-5.64,0H3a1,1,0,0,1,0-2H4.18a3,3,0,0,1,5.64,0H21a1,1,0,0,1,0,2ZM7,10.5A1.5,1.5,0,1,0,8.5,12,1.5,1.5,0,0,0,7,10.5ZM21,6H19.82a3,3,0,0,1-5.64,0H3A1,1,0,0,1,3,4H14.18a3,3,0,0,1,5.64,0H21a1,1,0,0,1,0,2ZM17,3.5A1.5,1.5,0,1,0,18.5,5,1.5,1.5,0,0,0,17,3.5ZM3,18H14.18a3,3,0,0,1,5.64,0H21a1,1,0,0,1,0,2H19.82a3,3,0,0,1-5.64,0H3a1,1,0,0,1,0-2Zm14,2.5A1.5,1.5,0,1,0,15.5,19,1.5,1.5,0,0,0,17,20.5Z"/>` },
	
	// time
	{ name: "calendar", template: `<path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>` },

	// files
	{ name: "folder", template: `<path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>` },
	{ name: "upload-file", template: `<path d="M11.3,18.9h1.5v-5l2.1,2.1l1.1-1.1L12,11.1L8.2,15L9.2,16l2.1-2.1V18.9z M5.5,22c-0.4,0-0.8-0.1-1.1-0.5c-0.3-0.3-0.4-0.6-0.4-1v-17c0-0.4,0.2-0.8,0.4-1C4.8,2.1,5.1,2,5.5,2h9L20,7.5v13c0,0.4-0.1,0.8-0.4,1c-0.3,0.3-0.7,0.5-1.1,0.5H5.5z M13.8,8.1V3.5H5.5v17h13V8.1H13.8z M5.5,3.5v4.7V3.5v17V3.5z"/>` },
	{ name: "download-file", template: `<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>` },

	// arrows & chevrons
	{ name: "arrow-back", template: `<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>` },
	{ name: "arrow-downward", template: `<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>` },
	{ name: "arrow-forward", template: `<path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>` },
	{ name: "arrow-upward", template: `<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>` },
	{ name: "arrow-drop-up", template: `<path d="M7,13.5l5-5l5,5H7z"/>` },
	{ name: "arrow-drop-down", template: `<path d="M12,15.5l-5-5h10L12,15.5z"/>` },
	{ name: "arrow-drop-left", template: `<path d="M13.5,17l-5-5l5-5V17z"/>` },
	{ name: "arrow-drop-right", template: `<path d="M10.5,17V7l5,5L10.5,17z"/>` },
	{ name: "chevron-down", template: `<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>` },
	{ name: "chevron-left", template: `<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>` },
	{ name: "chevron-right", template: `<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>` },
	{ name: "chevron-up", template: `<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>` },
	{ name: "expand", template: `<path d="M9.89,21.5V19.39H6.1l4.75-4.75L9.36,13.15,4.61,17.9V14.11H2.5V21.5H9.89m4.75-10.65L19.39,6.1V9.89H21.5V2.5H14.11V4.61H17.9L13.15,9.36l1.49,1.49Z"/>` },
	{ name: "expand-up", template: `<path d="M12,13.93,4.11,22,2,19.84,12,9.62,22,19.84,19.89,22Zm0-7.62L4.11,14.38,2,12.22,12,2,22,12.22l-2.11,2.16L12,6.31Z"/>` },
	{ name: "expand-down", template: `<path d="M12,10.07,19.89,2,22,4.16,12,14.38,2,4.16,4.11,2Zm0,7.62,7.89-8.07L22,11.78,12,22,2,11.78,4.11,9.62,12,17.69Z"/>` },
	{ name: "expand-left", template: `<path d="M13.9,12l8.1,7.9L19.8,22L9.6,12L19.8,2L22,4.1L13.9,12z M6.3,12l8.1,7.9L12.2,22L2,12L12.2,2l2.2,2.1L6.3,12L6.3,12z"/>` },
	{ name: "expand-right", template: `<path d="M10.07,12,2,4.11,4.16,2,14.38,12,4.16,22,2,19.89Zm7.62,0L9.62,4.11,11.78,2,22,12,11.78,22,9.62,19.89,17.69,12Z"/>` },

	// text editor icons
	{ name: "format-align-center", template: `<path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/>` },
	{ name: "format-align-justify", template: `<path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>` },
	{ name: "format-align-left", template: `<path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/>` },
	{ name: "format-align-right", template: `<path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/>` },
	{ name: "format-blockquote", template: `<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>` },
	{ name: "format-bold", template: `<path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>` },
	{ name: "format-indent-decrease", template: `<path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>` },
	{ name: "format-indent-increase", template: `<path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>` },
	{ name: "format-italic", template: `<path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>` },
	{ name: "format-list-bulleted", template: `<path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>` },
	{ name: "format-list-numbered", template: `<path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>` },
	{ name: "format-strikethrough", template: `<path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"/>` },
	{ name: "format-underline", template: `<path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/>` },
	{ name: "format-clear", template: `<path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"/>` },
	{ name: "code", template: `<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>` },
	{ name: "edit", template: `<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>` },
	{ name: "redo", template: `<path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/>` },
	{ name: "undo", template: `<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>` },
	{ name: "cut", template: `<path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/>` },
	{ name: "copy", template: `<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>` },
	{ name: "paste", template: `<path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>` },

	// social media
	{ name: "profile", template: `<path d="M8.67,14.28a4.51,4.51,0,0,0,6.66,0,7.53,7.53,0,0,1,3.87,4.61,10.49,10.49,0,0,1-14.4,0A7.57,7.57,0,0,1,8.67,14.28Z"/><path d="M12,5.25a4.5,4.5,0,1,1-4.5,4.5A4.5,4.5,0,0,1,12,5.25Z"/><path d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0ZM22.5,12A10.5,10.5,0,1,0,12,22.5,10.51,10.51,0,0,0,22.5,12Z"/>` },
	{ name: "user", template: `<path d="M11.36,2.06a5,5,0,0,0-3.51,2.2A4.79,4.79,0,0,0,7,7a4.94,4.94,0,0,0,3.59,4.78A3.71,3.71,0,0,0,12,12a3.71,3.71,0,0,0,1.38-.16,5,5,0,0,0,3-2.49A4.41,4.41,0,0,0,17,7.23,4.79,4.79,0,0,0,15.5,3.48a4.24,4.24,0,0,0-1.37-1A5.19,5.19,0,0,0,11.36,2.06Z"/><path d="M10.57,14.55l-.85.12A10.75,10.75,0,0,0,2.5,18.73c-.52.7-.51.66-.49,2V22H22V20.76c0-1.39,0-1.32-.55-2.12a10.94,10.94,0,0,0-7.13-4A34.14,34.14,0,0,0,10.57,14.55Z"/>` },
	{ name: "user-outline", template: `<path d="M12,4.37A2.56,2.56,0,0,1,14.62,7,2.56,2.56,0,0,1,12,9.62,2.56,2.56,0,0,1,9.38,7,2.56,2.56,0,0,1,12,4.37m0,11.25c3.75,0,7.62,1.88,7.62,2.63v1.37H4.37V18.25c0-.75,3.88-2.63,7.63-2.63M12,2a5,5,0,1,0,5,5,5,5,0,0,0-5-5m0,11.25c-3.38,0-10,1.63-10,5V22H22V18.25c0-3.37-6.62-5-10-5"/>` },
	{ name: "heart", template: `<path d="M 12 21.35 l -1.45 -1.32 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 c 1.74 0 3.41 0.81 4.5 2.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 c 0 3.78 -3.4 6.86 -8.55 11.54 L 12 21.35 Z"/>` },
	{ name: "heart-outline", template: `<path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>` },
	{ name: "notification-active", template: `<path d="M6.68,1.94,5,.18A13,13,0,0,0,0,9.85H2.41A10.48,10.48,0,0,1,6.68,1.94ZM21.59,9.85H24A13,13,0,0,0,19,.18L17.32,1.94A10.48,10.48,0,0,1,21.59,9.85Zm-2.37.61c0-3.78-2-6.94-5.42-7.78V1.85a1.8,1.8,0,1,0-3.6,0v.83c-3.45.84-5.42,4-5.42,7.78v6.16l-2.4,2.46v1.23H21.62V19.08l-2.4-2.46V10.46ZM12,24a2.63,2.63,0,0,0,.49-.05,2.46,2.46,0,0,0,1.73-1.45,2.57,2.57,0,0,0,.19-1H9.59A2.44,2.44,0,0,0,12,24Z"/>` },
	{ name: "notification", template: `<path d="M12,24a2.46,2.46,0,0,0,2.46-2.46H9.54A2.46,2.46,0,0,0,12,24Zm7.38-7.38V10.46c0-3.78-2-6.94-5.53-7.78V1.85a1.85,1.85,0,0,0-3.7,0v.83c-3.52.84-5.53,4-5.53,7.78v6.16L2.15,19.08v1.23h19.7V19.08l-2.47-2.46Z"/>` },
	{ name: "notification-outline", template: `<path d="M12.06,4.18a8.14,8.14,0,0,1,1.36.26,5.87,5.87,0,0,1,4.45,5.76v7.36l.53.54.44.45H5.16l.44-.45.53-.54V10.2a5.87,5.87,0,0,1,4.45-5.76,10,10,0,0,1,1.36-.26ZM12,0a1.76,1.76,0,0,0-1.78,1.8v.84A7.76,7.76,0,0,0,4.31,10.2v6.6L1.93,19.2v1.2H22.07V19.2L19.7,16.8V10.2a7.77,7.77,0,0,0-5.92-7.56V1.8A1.76,1.76,0,0,0,12,0Zm2.37,21.6H9.63a2.37,2.37,0,1,0,4.74,0Z"/>` },
	{ name: "notification-add", template: `<path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"/>` },

	// e-commerce
	{ name: "credit-card", template: `<path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>` },

	// cloud
	{ name: "cloud", template: `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>` },
	{ name: "cloud-outline", template: `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>` },

	// misc
	{ name: "add", template: `<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>` },
	{ name: "add-box", template: `<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>` },
	{ name: "add-circle", template: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>` },
	{ name: "add-circle-outline", template: `<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>` },
	{ name: "wrench", template: `<path d="M21.73,18.32,13.4,10a5.88,5.88,0,0,0-8-7.41l4,4L6.54,9.31l-4-4A5.88,5.88,0,0,0,10,13.4l8.33,8.33a.88.88,0,0,0,1.27,0l2.14-2.14A.88.88,0,0,0,21.73,18.32Z"/>` },
	{ name: "close", template: `<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>` },
	{ name: "menu", template: `<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>` },
	{ name: "menu-add", template: `<path d="M2.5,14.8v-1.5H10v1.5H2.5z M2.5,10.6V9.1h11.8v1.5H2.5z M2.5,6.5V5h11.8v1.5H2.5z M15.8,19v-4.3h-4.3v-1.5h4.3V9h1.5v4.3h4.3v1.5h-4.3V19H15.8z"/>` },
	{ name: "exclamation", template: `<path d="M9.78,19.78a2.22,2.22,0,1,0,4.44,0h0a2.22,2.22,0,1,0-4.44,0Z"/><path d="M9.78,2h4.44V15.33H9.78Z"/>` },
	{ name: "unlink", template: `<path d="M3.4,12A3.1,3.1,0,0,1,6.5,8.9h4V7h-4a5,5,0,0,0,0,10h4V15.1h-4A3.1,3.1,0,0,1,3.4,12ZM17.5,7h-4V8.9h4a3.1,3.1,0,1,1,0,6.2h-4V17h4a5,5,0,0,0,0-10Z"/>` },
	{ name: "pin", template: `<path d="M22,10.89l-1.48,1.48-.74-.74-4.45,4.44-.74,3.71-1.48,1.48L8.67,16.81,3.48,22,2,20.52l5.19-5.19L2.74,10.89,4.22,9.41l3.71-.74,4.44-4.45-.74-.74L13.11,2Z"/>` },
	{ name: "pin-outline", template: `<path d="M13.11,2,22,10.89l-1.48,1.48-.74-.74-4.45,4.44-.74,3.71-1.48,1.48L8.67,16.81,3.48,22,2,20.52l5.19-5.19L2.74,10.89,4.22,9.41l3.71-.74,4.44-4.45-.74-.74L13.11,2Zm.74,3.7L9,10.6l-3,.59L12.81,18l.59-3,4.9-4.89L13.85,5.7Z"/>` },
	{ name: "flag", template: `<path d="M5,2.63A.64.64,0,0,0,4.36,2H3.12a.64.64,0,0,0-.62.63V21.38a.64.64,0,0,0,.62.62H4.36A.64.64,0,0,0,5,21.38V2.63Zm15.9,1.75C14.27,7.88,15,.71,7,3.5a.63.63,0,0,0-.41.58v9.71a.39.39,0,0,0,.54.38c7.93-2.67,7.1,4.66,14,.75a.66.66,0,0,0,.33-.54V4.71a.4.4,0,0,0-.62-.33Z"/>` },
	{ name: "flash", template: `<path d="M17.7,10.9H14l2.09-8.64c0-.31-.35-.31-.53-.16L6.07,12.63a.29.29,0,0,0,.18.47H10L7.86,21.74c0,.31.36.31.54.16l9.48-10.53C18.06,11.21,18.06,10.9,17.7,10.9Z"/>` },
	{ name: "school", template: `<path d="M5.64,13.07v3.64L12,20.18l6.36-3.47V13.07L12,16.55,5.64,13.07ZM12,3.82,2,9.27l10,5.46,8.18-4.47v6.29H22V9.27Z"/>` },
	{ name: "emitter", template: `<path d="M4.93,4.93a10,10,0,0,0,0,14.14l1.41-1.41a8,8,0,0,1,0-11.32L4.93,4.93m14.14,0L17.66,6.34a8,8,0,0,1,0,11.32l1.41,1.41a10,10,0,0,0,0-14.14M7.76,7.76a6,6,0,0,0,0,8.48l1.41-1.41a4,4,0,0,1,0-5.66L7.76,7.76m8.48,0L14.83,9.17a4,4,0,0,1,0,5.66l1.41,1.41a6,6,0,0,0,0-8.48M12,10a2,2,0,0,0-2,2h0a2,2,0,1,0,2-2Z"/>` },
	{ name: "sync", template: `<path d="M6.31,15.47a6.67,6.67,0,0,0,12-1.25h2.32A8.89,8.89,0,0,1,9.77,20.61,9,9,0,0,1,4.7,17.08L2,19.78V13.11H8.67L6.31,15.47ZM17.69,8.53a6.67,6.67,0,0,0-12,1.25H3.39A8.89,8.89,0,0,1,19.3,6.92L22,4.22v6.67H15.33Z"/>` },
	{ name: "sync-error", template: `<path d="M2,12a8.81,8.81,0,0,0,2.62,6.27L2,20.89H8.67V14.22L6.18,16.71a6.65,6.65,0,0,1,2.49-11V3.4A8.88,8.88,0,0,0,2,12Zm8.89,5.56h2.22V15.33H10.89ZM22,3.11H15.33V9.78l2.49-2.49a6.65,6.65,0,0,1-2.49,11v2.31a8.85,8.85,0,0,0,4-14.86Zm-11.11,10h2.22V6.44H10.89v6.67Z"/>` },
	{ name: "sync-disabled", template: `<path d="M10.33,4.74V2.3a9.3,9.3,0,0,0-2.6,1.12L9.44,5.13a8,8,0,0,1,.89-.39ZM2,3.64,4.75,6.39A9.26,9.26,0,0,0,6.07,17.92L3.32,20.67h7v-7L7.72,16.28A7,7,0,0,1,6.46,8.1l9.44,9.44a9.1,9.1,0,0,1-.9.4v2.43a9.49,9.49,0,0,0,2.61-1.12L20.36,22l1.49-1.49L3.48,2.15ZM22,2H15V9l2.61-2.61a7,7,0,0,1,1.26,8.18l1.71,1.71A9.28,9.28,0,0,0,19.25,4.75Z"/>` },
	{ name: "qrcode", template: `<path d="M11.41,12.59V22H2V12.59Zm3.09,7.53V22H12.62V20.12ZM22,17.63V22H18.25V20.12h1.87V17.63ZM9.54,14.46H3.88v5.66H9.54V14.46Zm6.83,0v3.75h1.88v1.87H14.5V14.5ZM8.25,15.75v3.13H5.12V15.75Zm11.87,0v1.88H18.25V15.75ZM22,12.62v3.13H20.12V14.5H18.25V12.62Zm-7.5,0V14.5H12.62V12.62ZM11.41,2v9.41H2V2ZM22,2v9.41H12.59V2ZM9.54,3.88H3.88V9.54H9.54V3.88Zm10.58,0H14.46V9.54h5.66ZM8.25,5.13V8.25H5.12V5.13Zm10.62,0V8.25H15.75V5.13Z"/>` },
	{ name: "moon", template: `<path d="M12.28,22h-.1a10.29,10.29,0,0,1-7.35-3.16,10.49,10.49,0,0,1-.27-14,10.27,10.27,0,0,1,4-2.74,1,1,0,0,1,1.06.22,1,1,0,0,1,.24,1,8.42,8.42,0,0,0,2,8.83,8.49,8.49,0,0,0,8.85,1.94,1,1,0,0,1,1.27,1.29A10.06,10.06,0,0,1,19.59,19,10.28,10.28,0,0,1,12.28,22Z"/>` },
	{ name: "sun", template: `<path d="M5.64,17l-.71.71a1,1,0,0,0,1.41,1.41l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4a1,1,0,0,0,1-1Zm7-7a1,1,0,0,0,1-1h0V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-1.7l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,0,0-1.3-1.52l-.11.11L17,5.64a1,1,0,0,0,0,1.41,1,1,0,0,0,.66.29ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1h0v1a1,1,0,0,0,2,0V20a1,1,0,0,0-1-1Zm6.36-2a1,1,0,0,0-1.36.39,1,1,0,0,0,0,1l.71.71a1,1,0,0,0,1.41-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.5,5.5,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12h0A3.5,3.5,0,0,1,12,15.5Z"/>` },
	{ name: "theme", template: `<path d="M12,2C4.7,2,2,8.39,2,12s2.6,10,9.79,10c0,0,1.79,0,1.79-1.58s-.81-1.1-.81-2.26A1.55,1.55,0,0,1,14,16.48a13,13,0,0,0,4.34-.36A5.77,5.77,0,0,0,22,10.87,9.75,9.75,0,0,0,12,2ZM5.9,12a1.73,1.73,0,0,1-1.23-.51,1.78,1.78,0,0,1-.51-1.23A1.76,1.76,0,0,1,5,8.71a1.73,1.73,0,0,1,1.76,0A1.77,1.77,0,0,1,5.9,12ZM9.18,7.69A1.74,1.74,0,0,1,7.44,6,1.74,1.74,0,1,1,9.18,7.69Zm5.57,0a1.76,1.76,0,1,1,.88-3.29A1.72,1.72,0,0,1,16.48,6a1.73,1.73,0,0,1-1.73,1.74ZM18.05,12a1.78,1.78,0,1,1,1.74-1.74,1.77,1.77,0,0,1-.5,1.23,1.74,1.74,0,0,1-1.24.51Z"/>` },
	{ name: "color-picker", template: `<path d="M21.22,7.52a3.17,3.17,0,0,0-.29-4.45,3.17,3.17,0,0,0-4.44-.29L15,4.27,19.73,9l1.49-1.48Z"/><path d="M8.85,19.89l7.72-7.73,1,1,2-2L12.86,4.46l-2,2,1,1L4.11,15.15,2,21.05,3,22l5.9-2.11ZM13.18,8.77l2.06,2.05L7.37,18.69,4.11,19.9l1.2-3.27,7.87-7.86Z"/>` },
	{ name: "home", template: `<path d="M10,20.5v-6h4v6h5v-8h3l-10-9-10,9H5v8Z"/>` },
	{ name: "code-sample", template: `<path d="M20.71,10.71,16.86,6.86,15.57,8.14,19.43,12l-3.86,3.86,1.29,1.28,3.85-3.85L22,12ZM7.14,6.86,3.29,10.71,2,12l1.29,1.29,3.85,3.85,1.29-1.28L4.57,12,8.43,8.14ZM8.7,20.52,13.54,3l1.75.48L10.46,21Z"/>` },
	{ name: "ai", template: `<path d="M6.394 4.444c.188-.592 1.024-.592 1.212 0C8.4 8.9 9.1 9.6 13.556 10.394c.592.188.592 1.024 0 1.212C9.1 12.4 8.4 13.1 7.606 17.556c-.188.592-1.024.592-1.212 0C5.6 13.1 4.9 12.4.444 11.606c-.592-.188-.592-1.024 0-1.212C4.9 9.6 5.6 8.9 6.394 4.444m8.716 9.841a.41.41 0 0 1 .78 0c.51 2.865.96 3.315 3.825 3.826.38.12.38.658 0 .778-2.865.511-3.315.961-3.826 3.826a.408.408 0 0 1-.778 0c-.511-2.865-.961-3.315-3.826-3.826a.408.408 0 0 1 0-.778c2.865-.511 3.315-.961 3.826-3.826Zm2.457-12.968a.454.454 0 0 1 .866 0C19 4.5 19.5 5 22.683 5.567a.454.454 0 0 1 0 .866C19.5 7 19 7.5 18.433 10.683a.454.454 0 0 1-.866 0C17 7.5 16.5 7 13.317 6.433a.454.454 0 0 1 0-.866C16.5 5 17 4.5 17.567 1.317"/>` },
	
	{ name: "trend-up", template: `<path d="M12,6l6,10H6L12,6z"/>` },
	{ name: "trend-down", template: `<path d="M12,18L6,8h12L12,18z"/>` },
];
// { name: "xxx", template: `<path d=""/>` },