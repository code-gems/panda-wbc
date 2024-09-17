// types
import { LogEntry } from "panda-design-typings";

const enum SampleTab {
	DEMO,
	CODE,
}

// styles
import { scrollbar } from "@panda-wbc/panda-theme";
import { uiComponents } from "../styles/styles";

// components
import "@panda-wbc/panda-time-ago";

// utils
import { LitElement, html, TemplateResult, CSSResultGroup } from "lit";
import { state } from "lit/decorators.js";

export abstract class SampleTemplate extends LitElement {
	// css styles
	static get styles() {
		return [
			scrollbar,
			uiComponents.sample,
			uiComponents.columnSystem,
		];
	}

	public customStyles!: CSSResultGroup;

	// state props

	@state()
	private _logs: LogEntry[] = [];

	@state()
	private _selectedTab: SampleTab = SampleTab.DEMO;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<style>
				${this.customStyles || ""}
			</style>
			
			<div class="sample">
				<div class="tabs">
					<div
						class="tab"
						@click="${this._onTabChange(SampleTab.DEMO)}"
					>
						Demo
					</div>
					<div
						class="tab"
						@click="${this._onTabChange(SampleTab.CODE)}"
					>
						Code
					</div>
				</div>

				<div class="content">
					<div class="tab-cont">
						${this.renderDemo()}
						${this._renderLogs()}
					</div>
					<div class="tab-cont">
						${this._renderCodeSample()}
					</div>
				</div>
			</div>
		`;
	}

	private _renderLogs(): TemplateResult {
		const _logsHtml: TemplateResult[] = [];
		this._logs.forEach((log) => {
			_logsHtml.push(html`
				<div class="logs">
					
				</div>
			`);
		});
		return html`
			<div class="logs">
				${_logsHtml}
			</div>
		`;
	}

	private _renderCodeSample(): TemplateResult {
		return html`CODE SAMPLE`;
	}

	abstract renderDemo(): TemplateResult;

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public addLog(log: LogEntry): void {
		this._logs.push(log);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onTabChange(tab: SampleTab): void {
		this._selectedTab = tab;
	}
}