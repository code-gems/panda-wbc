export class PandaDatePart extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	// observed attributes ============================================================================================

	static get observedAttributes() {
		return [
			"type",
		];
	}

	/**
	 * type
	 * ------
	 * Defines the type of date part to render. Possible values are "DD", "MM" and "YYYY".
	 * This attribute is required and should be provided by the parent component (PandaDatePicker) when rendering date parts.
	 * @default "DD"
	 * @type {string}
	 * @example
	 * <panda-date-part type="MM"></panda-date-part>
	 * <panda-date-part type="YYYY"></panda-date-part>
	 */
	get type(): string {
		return this._type;
	}

	set type(value: string) {
		this._type = value;
		this.setAttribute("type", value);
	}

	private _type: string = "DD"; // default value

	// private properties =============================================================================================

}

// Register the custom element
if (!customElements.get("panda-date-part")) {
	customElements.define("panda-date-part", PandaDatePart);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-date-part": PandaDatePart;
	}
}