// types
import { PandaResizableLayoutOrientation } from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";

class PandaResizableLayout extends HTMLElement {
	/** Version of the component. */
	public static readonly version = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = [
		"orientation",
		"min-size",
		"max-size",
	];

	/**
	 * orientation
	 * -----------
	 * Defines the orientation of the resizable layout. Possible values are "horizontal" and "vertical".
	 */
	get orientation(): PandaResizableLayoutOrientation {
		return this._orientation;
	}

	set orientation(value: PandaResizableLayoutOrientation) {
		if (this._orientation !== value) {
			this._orientation = value;
			// reflect to attribute
			if (this._orientation == null) {
				this.removeAttribute("orientation");
			} else {
				this.setAttribute("orientation", this._orientation);
			}
		}
	}

	private _orientation!: PandaResizableLayoutOrientation;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// apply component styles
		applyStyles(styles, this.shadowRoot);
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

}

// Register the custom element
if (!customElements.get("panda-resizable-layout")) {
	customElements.define("panda-resizable-layout", PandaResizableLayout);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-resizable-layout": PandaResizableLayout;
	}
}