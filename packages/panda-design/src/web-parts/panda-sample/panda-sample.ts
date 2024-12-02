// types
import { Tab } from "panda-sample-types";

// styles
import { styles } from "./styles/styles";

// components
import "../event-logger/event-logger";
import "@panda-wbc/panda-icon";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";

@customElement("panda-sample")
export class PandaSample extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@state()
	private _selectedTab: Tab = Tab.CODE;

	@query("#tab-sample")
	private readonly _tabSampleEl!: HTMLDivElement;

	@query("#tab-code")
	private readonly _tabCodeEl!: HTMLDivElement;

	@query("#logs-cont")
	private readonly _logsContEl!: HTMLDivElement;

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
							class="tab ${this._selectedTab === Tab.SAMPLE ? "active" : ""}"
							@click="${() => this._onChangeTab(Tab.SAMPLE)}"
						>
							Sample
						</div>
						<div
							class="tab ${this._selectedTab === Tab.CODE ? "active" : ""}"
							@click="${() => this._onChangeTab(Tab.CODE)}"
						>
							Code
						</div>
					</div>
					<span class="spacer"></span>
					<div>
						<div
							class="btn"
							@click="${this._onToggleLogs}"
						>
							<panda-icon icon="code"></panda-icon>
						</div>
					</div>
				</div>
				<div class="body">
					<div
						id="tab-sample"
						class="tab-body"
					>
						<!-- SAMPLE / DEMO EXAMPLE -->
						<slot name="sample"></slot>
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
