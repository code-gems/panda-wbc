// types
import { Tab } from "panda-sample-types";

// styles
import { styles } from "./styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme";

// components
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-time-ago";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, query, state, property } from "lit/decorators.js";

@customElement("panda-sample")
export class PandaSample extends LitElement {
	// css styles
	static get styles() {
		return [styles, scrollbar];
	}

	@property({ type: String })
	caption!: string;

	@property({ type: String })
	code!: string;

	@state()
	private _selectedTab: Tab = Tab.PREVIEW;

	@query("#tab-preview")
	private readonly _previewTabEl!: HTMLDivElement;

	@query("#tab-code")
	private readonly _codeTabEl!: HTMLDivElement;

	@query("#logs-cont")
	private readonly _logsPanelEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		const show = this._selectedTab === Tab.CODE
			? "show"
			: "";
		
		return html`
			<div class="sample">
				<div class="header">
					<div class="tabs">
						<div
							class="tab ${this._selectedTab === Tab.PREVIEW ? "active" : ""}"
							@click="${() => this._onChangeTab(Tab.PREVIEW)}"
						>
							<div class="icon">
								<panda-icon icon="lab"></panda-icon>
							</div>
							<div class="label">Preview</div>
						</div>
						<div
							class="tab ${this._selectedTab === Tab.CODE ? "active" : ""}"
							@click="${() => this._onChangeTab(Tab.CODE)}"
						>
							<div class="icon">
								<panda-icon icon="logs"></panda-icon>
							</div>
							<div class="label">Code</div>
						</div>
					</div>
					<span class="spacer"></span>
					<div class="caption">${this.caption}</div>
				</div>
				<div class="body">
					<div
						id="tab-preview"
						class="tab-body"
					>
						<!-- SAMPLE / DEMO EXAMPLE -->
						<slot></slot>
					</div>
					<div
						id="tab-code"
						class="tab-body code scrollbar ${show}"
					>
						<!-- CODE EXAMPLE -->
						${this._renderCode()}
					</div>
				</div>
				<div class="footer">
					<div class="header">
						<div
							class="btn"
							@click="${this._onToggleLogs}"
						>
							<panda-icon icon="terminal"></panda-icon>
						</div>
					</div>
					<div class="logs">
						${this._renderLogs()}
					</div>
				</div>
			</div>
		`;
	}

	private _renderCode(): TemplateResult {
		return html`
			<div class="code-wrap">
				${this.code}
			</div>
		`;
	}

	private _renderLogs(): TemplateResult[] {
		const logsHtml: TemplateResult[] = [];

		return logsHtml;
	}
	
	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeTab(tab: Tab): void {
		this._selectedTab = tab;
	}

	private _onToggleLogs(): void {

	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-sample": PandaSample;
	}
}
