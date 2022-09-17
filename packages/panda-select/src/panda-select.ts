// types
import { PandaSelectItem } from "../index";
import { PandaSelectOverlay } from "./panda-select-overlay";

type OverlayPosition = {
	x: number;
	y: number;
}

// styles
import { styles } from "./styles/styles";

// mixins
import { scroll } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-icon";
import "./panda-select-overlay";

// utils
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { minValue, getParentOffsetTop, getParentOffsetLeft } from "./utils/utils";

@customElement("panda-select")
export class PandaSelect extends LitElement {
	// css styles
	static get styles() {
		return [styles, scroll];
	}

	@property({ type: Object })
	items!: PandaSelectItem[];

	@property({ type: Object })
	value!: PandaSelectItem | null;

	@property({ type: Boolean, attribute: true })
	disabled!: boolean;

	@property({ type: Boolean, attribute: true })
	busy!: boolean;

	@property({ type: String, attribute: true })
	spinner!: string;

	// view props
	@property({ type: Boolean })
	private _showDropdown!: boolean;

	// elements
	private _overlayEl!: PandaSelectOverlay;

	// event bindings
	private _selectItemEventBinding: any;
	private _hideOverlayEventBinding: any;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this._showDropdown = false;
		this.value = null;
		this.items = [];

		// bind events
		this._selectItemEventBinding = this._onItemSelect.bind(this);
		this._hideOverlayEventBinding = this._hideOverlay.bind(this);
		// document.addEventListener("click", this._hideOverlayEventBinding);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		// remove event listeners
		document.removeEventListener("click", this._hideOverlayEventBinding);
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return html`
			<div
				class="panda-select"
				part="panda-select"
				@click="${(e: MouseEvent) => this._onShowDropdown(e)}"
			>
				<div class="value-cont" part="value-cont">
					<div class="value" part="value">
						${this.value || ""}
					</div>
				</div>
				<div class="toggle-btn" part="toggle-btn">
					<panda-icon icon="expand-more"></panda-icon>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _getDatePickerPosition(): OverlayPosition {
		const rect = this.getBoundingClientRect();
		let x = minValue(rect.left + window.scrollX + getParentOffsetTop(this), 0);
		let y = minValue(rect.bottom + window.scrollY + getParentOffsetLeft(this), 0);

		console.log("%c DOMRect x/y", "font-size: 24px; color: green;", rect, x, y);
		console.log("%c Window", "font-size: 24px; color: green;", window.innerWidth, window.innerHeight);
		console.log("%c rect.top", "font-size: 24px; color: green;", rect.top);
		console.log("%c Window scroll y", "font-size: 24px; color: green;", window.scrollY);
		console.log("%c el offset", "font-size: 24px; color: green;", getParentOffsetTop(this));

		console.log("%c innerHeight / Y", "font-size: 24px; color: green;", window.innerHeight, y);


		if (window.innerHeight - y < 300) {
			y = y - 300 - rect.height;
		}
		if (window.innerWidth - x < 300) {
			x = x - 300 + rect.width;
		}

		return {
			x,
			y
		};
	}

	private _showSelectDropdown() {

		this._overlayEl = document.createElement("panda-select-overlay");

		// add event listeners
		this._overlayEl.addEventListener("select-item", this._selectItemEventBinding);
		this._overlayEl.addEventListener("close", this._hideOverlayEventBinding);

		// set date picker overlay's props
		this._overlayEl.items = this.items;
		this._overlayEl.value = this.value;

		// set overlay's position
		const position = this._getDatePickerPosition();
		this._overlayEl.style.position = `absolute`;
		this._overlayEl.style.top = `${position.y}px`;
		this._overlayEl.style.left = `${position.x}px`;

		// append element to document body
		document.body.appendChild(this._overlayEl);
	}

	// ================================================================================================================
	// ========================================================================================================= EVENTS
	// ================================================================================================================

	private _onShowDropdown(e: MouseEvent) {
		console.log("%c _onInputFieldClick", "font-size: 24px; color: green;");
		e.stopPropagation();
		e.preventDefault();
		this._showSelectDropdown();
	}

	/**
	 * Removes date picker overlay element from DOM if present
	 */
	private _hideOverlay() {
		if (this._overlayEl) {
			document.body.removeChild(this._overlayEl);
		}
	}

	private _onItemSelect() {

	}

}

declare global {
	interface HTMLElementTagNameMap {
		"panda-select": PandaSelect;
	}
}