// types
import { EventLogger } from "../web-parts/event-logger/event-logger";

const enum SampleTab {
	DEMO,
	CODE,
}

// styles
import { scrollbar } from "@panda-wbc/panda-theme";
import { uiComponents } from "../styles/styles";

// components
import "../web-parts/event-logger/event-logger";

// utils
import { LitElement, html, TemplateResult, CSSResultGroup } from "lit";
import { query, state } from "lit/decorators.js";

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
	private _selectedTab: SampleTab = SampleTab.DEMO;

	@query("#logger")
	private _eventLoggerEl!: EventLogger;

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
						<event-logger id="logger"></event-logger>
					</div>
					<div class="tab-cont">
						${this._renderCodeSample()}
					</div>
				</div>
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

	public log(message: string): void {
		this._eventLoggerEl.log(message);
	}

	public warn(message: string): void {
		this._eventLoggerEl.warn(message);
	}

	public error(message: string): void {
		this._eventLoggerEl.error(message);
	}

	public clear(): void {
		this._eventLoggerEl.clear();
	}
	
	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onTabChange(tab: SampleTab): void {
		this._selectedTab = tab;
	}
}