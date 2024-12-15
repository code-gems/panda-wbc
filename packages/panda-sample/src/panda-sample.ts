// types
import { Tab } from "panda-sample-types";

// styles
import { styles } from "./styles/styles";

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
		return styles;
	}

	@property({ type: String, reflect: true })
	caption!: string;

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
					${this.caption}
				</div>
				<div class="body">
					<div
						id="tab-preview"
						class="tab-body"
					>
						<!-- SAMPLE / DEMO EXAMPLE -->
						<slot name="preview"></slot>
					</div>
					<div
						id="tab-code"
						class="tab-body"
					>
						<!-- CODE EXAMPLE -->
						<slot name="code"></slot>
					</div>
					<div
						id="logs-cont"
						class="logs-cont"
					>
						${this._renderLogs()}
					</div>
				</div>
			</div>
		`;
	}

	private _renderPreviewTab(): TemplateResult {
		return html`
			<div>
				<div
					class="btn"
					@click="${this._onToggleLogs}"
				>
					<panda-icon icon="terminal"></panda-icon>
				</div>
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
