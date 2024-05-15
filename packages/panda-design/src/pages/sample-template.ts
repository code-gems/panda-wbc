// styles
import { scrollbar } from "@panda-wbc/panda-theme";
import { uiComponents } from "../styles/styles";

// utils
import { LitElement, html, TemplateResult, CSSResultGroup } from "lit";

export abstract class SampleTemplate extends LitElement {
	// css styles
	static get styles() {
		return [
			scrollbar,
			uiComponents.columnSystem,
		];
	}

	public customStyles!: CSSResultGroup;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<style>
				${this.customStyles || ""}
			</style>
			${this.renderSample()}
		`;
	}

	abstract renderSample(): TemplateResult;
}