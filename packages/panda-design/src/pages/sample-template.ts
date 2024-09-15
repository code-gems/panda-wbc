// types
import { LogEntry } from "panda-design-typings";

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

	public logs: LogEntry[] = [];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<style>
				${this.customStyles || ""}
			</style>
			<div>
				<div>
					${this.renderSample()}
				</div>
				<div>
					${this._renderLogs()}
				</div>
			</div>
		`;
	}

	private _renderLogs(): TemplateResult {
		return html`
			
		`;
	}

	abstract renderSample(): TemplateResult;
}