// types

// styles
import { styles } from "./styles/styles";

// components
import "./panda-chip";
import "./panda-chips";

// utils

export class PandaChipsInput extends HTMLElement {
	// css styles
	static get styles() {
		return styles;
	}


	theme!: string;

	label!: string;

	chips!: any[];
	
	placeholder: string | null = null;

	disabled: boolean = false;
	
	busy: boolean = false;

	focused: boolean = false;

	autofocus: boolean = false;

	autoselect: boolean = false;

	spellcheck: boolean = false;

	mandatory: boolean = false;

	spinnerType!: string;

	// state props
	private _inputText!: string;

	// elements
	private readonly _inputEl!: HTMLInputElement;
	
	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render() {
		const modCss: string[] = [];
		let labelHtml = ``;
		let spinnerHtml = ``;

		// generate label if defined
		if (this.label) {
			labelHtml = `
				<div class="label" part="label">
					${this.label}
				</div>
			`;
		}

		// check if component is in busy state
		if (this.busy) {
			spinnerHtml = `
				<div class="spinner-cont" part="spinner-cont">
					<panda-spinner
						part="spinner"
						spinner="${this.spinnerType ?? "dots"}"
					>
					</panda-spinner>
				</div>
			`;
		}

		if (this.disabled) {
			modCss.push("disabled");
		}
		if (this.mandatory) {
			modCss.push("mandatory");
		}

		return `
			${labelHtml}
			<div
				class="chips-cont"
				part="chips-cont"
			>
				<slot name="prefix"></slot>
				<div
					class=""
					part=""
				>

				</div>
				<slot name="suffix"></slot>
				${spinnerHtml}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	


	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-chips-input": PandaChipsInput;
	}
}
