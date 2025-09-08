// types
// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

export class PandaThemeAccentColorList extends HTMLElement {
	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	static readonly observedAttributes = ["value"];

	// value ==========================================================================================================
	private _value!: string;
	
	get value(): string {
		return this._value;
	}

	set value(value: string) {
		if (this._value !== value) {
			this._value = value;
			// reflect to attribute
			this.setAttribute("value", this._value);
		}
	}

	// accentColorList ================================================================================================

	private _accentColorList!: string[];

	get accentColorList(): string[] {
		return this._accentColorList;
	}

	set accentColorList(value: string[]) {
		this._accentColorList = value;
	}

	// view properties ================================================================================================

	// template elements
	private readonly _accentColorListEl!: HTMLDivElement;
	
	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		// create shadow root
		this.attachShadow({ mode: "open", delegatesFocus: true });

		// create component template
		const template = document.createElement("template");
		template.innerHTML = `
			<div class="accent-color-list" part="accent-color-list"></div>
		`;

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._value = "";

		// get template element handles
		if (this.shadowRoot) {
			this._accentColorListEl = this.shadowRoot.querySelector(".accent-color-list") as HTMLDivElement;
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================


	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	/**
	 * Handle accent color change events.
	 * @param color The new accent color value.
	 */
	private _onAccentColorChange(color: string): void {
		this._value = color;
		// this._updateState();
		// this.dispatchEvent(new CustomEvent<PandaThemeSelectChangeEventDetails>("change", {
		// 	detail: {
		// 		accentColor: this._value
		// 	}
		// }));
	}
}

// Register the custom element
if (!customElements.get("panda-theme-accent-color-list")) {
	customElements.define("panda-theme-accent-color-list", PandaThemeAccentColorList);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-accent-color-list": PandaThemeAccentColorList;
	}
}