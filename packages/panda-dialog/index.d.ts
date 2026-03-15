export type { PandaDialog } from "./src/panda-dialog";
export type { PandaDialogOverlay } from "./src/panda-dialog-overlay";

/**
 * DialogEvent
 * -----------
 * Represents an event that can be listened to on the dialog component.
 */
export type DialogEvent = {
	/** The CSS selector of the element to listen for the event on. */
	selector: string;
	/** The type of the event to listen for (e.g., "click", "close", etc.). */
	type: string;
	/** The event listener function or object that will be called when the event is triggered. */
	listener: EventListenerOrEventListenerObject;
	/** Optional options for the event listener (e.g., capture, once, passive). */
	options?: boolean | AddEventListenerOptions;
}
