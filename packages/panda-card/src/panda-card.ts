// styles
import { styles } from "./styles/styles";

// utils
import { applyStyles, parseBooleanAttribute } from "@panda-wbc/panda-utils/lib/component-utils";
import { isEmpty } from "@panda-wbc/panda-utils";

export class PandaCard extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";
	
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================
	static get observedAttributes() {
		return ["horizontal"];
	}

	/**
	 * horizontal
	 * ---
	 * Defines the orientation of the card. If true, the card will be displayed in a horizontal layout. 
	 * If false, it will be displayed in a vertical layout (default).
	 * @type {boolean}
	 * @default false
	 * @attr horizontal
	 * @public
	 * @example
	 * ```html
	 * <panda-card horizontal>
	 *   <!-- card content -->
	 * </panda-card>
	 * ```
	 */
	get horizontal(): boolean {
		return this._horizontal;
	}

	set horizontal(value: boolean) {
		if (this._horizontal !== value) {
			this._horizontal = value;
			// reflect to attribute
			if (isEmpty(this._horizontal)) {
				this.removeAttribute("horizontal");
			} else {
				this.setAttribute("horizontal", "");
			}
		}
	}

	private _horizontal!: boolean;

	// state properties ===============================================================================================
	private _hasMedia!: boolean;

	// elements =======================================================================================================
	private readonly _cardEl!: HTMLDivElement;
	private _mediaSlotEl!: HTMLSlotElement;
	
	// events =========================================================================================================
	private readonly _mediaSlotChange!: EventListener;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		applyStyles(styles, this.shadowRoot);

		// create component template
		this.shadowRoot!.innerHTML = /*html*/`
			<div class="card" part="card">
				<slot name="media"></slot>
				<div class="card-body" part="card-body">
					<div class="header">
						<slot name="header-prefix"></slot>
						<slot name="header">
							<slot name="title"></slot>
							<slot name="subtitle"></slot>
						</slot>
						<slot name="header-suffix"></slot>
					</div>
					<div class="content">
						<slot></slot>
					</div>
					<slot name="footer"></slot>
				</div>
			</div>
		`;



		// initialize event binders
		this._mediaSlotChange = this._onMediaSlotChange.bind(this);

		if (this.shadowRoot) {
			this._cardEl = this.shadowRoot.querySelector(".card") as HTMLDivElement;
			this._mediaSlotEl = this.shadowRoot.querySelector(`slot[name="media"]`) as HTMLSlotElement;
		}
	}

	connectedCallback(): void {
		// add event listeners
		this._mediaSlotEl.addEventListener("slotchange", this._mediaSlotChange);
		// initial component render
		this._updateComponent();
	}

	disconnectedCallback(): void {
		// remove event listeners
		this._mediaSlotEl.removeEventListener("slotchange", this._mediaSlotChange);
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "horizontal":
				this._horizontal = parseBooleanAttribute(_newValue);
				break;
		}
		// update component on attribute change
		this._updateComponent();
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateComponent(): void {
		if (this.isConnected) {
			// check orientation
			if (this._horizontal) {
				this._cardEl.classList.add("horizontal");
			} else {
				this._cardEl.classList.remove("horizontal");
			}
			// check if media slot has content
			if (this._hasMedia) {
				this._cardEl.classList.add("has-media");
			} else {
				this._cardEl.classList.remove("has-media");
			}
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	/** Handle changes in the media slot content */
	private _onMediaSlotChange(): void {
		this._hasMedia = true;
		this._updateComponent();
	}
}

// Register the custom element
if (!customElements.get("panda-card")) {
	customElements.define("panda-card", PandaCard);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-card": PandaCard;
	}
}
