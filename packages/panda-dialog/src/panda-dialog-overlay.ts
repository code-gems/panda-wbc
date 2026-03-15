// styles
import { DialogEvent } from "..";
import { styles } from "./styles/overlay-styles";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";

export class PandaDialogOverlay extends HTMLElement {
	/** Version of the component. */
	public static readonly version = "1.0.0";
	
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"no-close-on-outside-click",
		"no-close-on-esc"
	];

	/**
	 * template
	 * --------
	 * The template content to be displayed in the dialog overlay.
	 * @type {Element | null}
	 * @public
	 */
	get template(): Element | null {
		return this._template;
	}

	set template(value: Element | null) {
		this._template = value;
		this._applyContent();
	}

	private _template!: Element | null;

	/**
	 * noCloseOnOutsideClick
	 * ----------------------
	 * Indicates whether the dialog should be closed when clicking outside of it.
	 * @default false
	 * @type {boolean}
	 * @attr no-close-on-outside-click
	 * @public
	 */
	get noCloseOnOutsideClick(): boolean {
		return this._noCloseOnOutsideClick;
	}

	set noCloseOnOutsideClick(value: boolean) {
		if (this._noCloseOnOutsideClick !== value) {
			this._noCloseOnOutsideClick = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._noCloseOnOutsideClick) {
				this.setAttribute("no-close-on-outside-click", "");
			} else {
				this.removeAttribute("no-close-on-outside-click");
			}
		}
	}

	private _noCloseOnOutsideClick!: boolean;

	/**
	 * noCloseOnEsc
	 * -------------
	 * Indicates whether the dialog should be closed when pressing [ESC] key.
	 * @default false
	 * @type {boolean}
	 * @attr no-close-on-esc
	 * @public
	 */
	get noCloseOnEsc(): boolean {
		return this._noCloseOnEsc;
	}

	set noCloseOnEsc(value: boolean) {
		if (this._noCloseOnEsc !== value) {
			this._noCloseOnEsc = parseBooleanAttribute(value);
			// reflect to attribute
			if (this._noCloseOnEsc) {
				this.setAttribute("no-close-on-esc", "");
			} else {
				this.removeAttribute("no-close-on-esc");
			}
		}
	}

	private _noCloseOnEsc!: boolean;

	/**
	 * eventList
	 * ---------
	 * List of events that are triggered by the dialog component. 
	 * This can be used by the parent component to listen to dialog events (e.g., "click" event).
	 * @type {Array<DialogEvent>}
	 * @public
	 */
	get eventList(): DialogEvent[] {
		return this._eventList;
	}

	set eventList(value: DialogEvent[]) {
		if (this._eventList !== value) {
			this._eventList = value;
		}
	}

	private _eventList!: DialogEvent[];

	// private properties =============================================================================================
	private _ready!: boolean;
	private _preventClose!: boolean;
	private readonly _eventRegistry!: WeakMap<Element, Partial<DialogEvent>[]>;

	// elements
	private readonly _overlayEl!: HTMLDivElement;
	private readonly _contentEl!: HTMLDivElement;
	
	// events
	private readonly _dialogCloseEvent!: EventListener;
	private readonly _keyPressEvent!: ((event: KeyboardEvent) => void);
	private readonly _closeOverlayEvent!: EventListener;
	private readonly _preventCloseEvent!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		applyStyles(styles, this.shadowRoot);
		
		// apply template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="dialog-overlay" part="dialog-overlay">
				<div class="content" part="content"></div>
			</div>
		`;

		// initialize class props
		this._ready = false;
		this._preventClose = false;
		this._noCloseOnOutsideClick = false;
		this._noCloseOnEsc = false;
		this._eventList = [];
		this._eventRegistry = new WeakMap();

		if (this.shadowRoot) {
			// get elements handle
			this._overlayEl = this.shadowRoot.querySelector(".dialog-overlay") as HTMLDivElement;
			this._contentEl = this.shadowRoot.querySelector(".content") as HTMLDivElement;

			// add event listeners
			this._dialogCloseEvent = this._triggerCloseEvent.bind(this);
			document.addEventListener("panda-dialog-close", this._dialogCloseEvent);
			this._keyPressEvent = this._onKeyPress.bind(this);
			document.addEventListener("keydown", this._keyPressEvent);
			this._closeOverlayEvent = this._onCloseOverlay.bind(this);
			this._overlayEl.addEventListener("click", this._closeOverlayEvent);
			this._preventCloseEvent = this._onPreventClose.bind(this);
			this._contentEl.addEventListener("click", this._preventCloseEvent);
		}
	}

	connectedCallback(): void {
		this._ready = true;
		this._applyContent();
	}

	disconnectedCallback(): void {
		// remove events
		document.removeEventListener("panda-dialog-close", this._dialogCloseEvent);
		document.removeEventListener("keydown", this._keyPressEvent);
		this._overlayEl.removeEventListener("click", this._closeOverlayEvent);
		this._contentEl.removeEventListener("click", this._preventCloseEvent);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "no-close-on-outside-click":
				this._noCloseOnOutsideClick = parseBooleanAttribute(_newValue);
				break;
			case "no-close-on-esc":
				this._noCloseOnEsc = parseBooleanAttribute(_newValue);
				break;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply template content to dialog overlay */
	private _applyContent() {
		if (this._ready && this.template != null) {
			this._contentEl.innerHTML = this.template.innerHTML;
			
			// check if there are any events to be added to the content and add them
			if (this.eventList?.length > 0) {
				this.eventList.forEach(({ selector, type, listener, options }) => {
					// add event listener to all elements matching the selector
					this._contentEl.querySelectorAll(selector).forEach((element) => {
						// check if element is already registered in the event registry, if not add it
						if (!this._eventRegistry.has(element)) {
							this._eventRegistry.set(element, []);
						}
						// store event listener in registry for later removal
						this._eventRegistry.get(element)!.push({ type, listener, options });
						// add event listener to element						
						element.addEventListener(type, listener, options);
					});
				});
			}
		}
	}

	private _triggerCloseEvent(): void {
		const event = new CustomEvent("close", {});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPreventClose(): void {
		// stopping propagation or preventing event will cause input type="file" to not work...
		// hence this is the working solution
		this._preventClose = true;
	}

	private _onCloseOverlay(): void {
		if (this._preventClose) {
			this._preventClose = false;
		} else if (!this.noCloseOnOutsideClick) {
			this._triggerCloseEvent();
		}
	}
	
	private _onKeyPress(event: KeyboardEvent): void {
		// check if [ESC] key was pressed
		if (event.key === "Escape" && !this.noCloseOnEsc) {
			this._triggerCloseEvent();
		}
	}
}

// Register the custom element
if (!customElements.get("panda-dialog-overlay")) {
	customElements.define("panda-dialog-overlay", PandaDialogOverlay);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-dialog-overlay": PandaDialogOverlay;
	}
}
