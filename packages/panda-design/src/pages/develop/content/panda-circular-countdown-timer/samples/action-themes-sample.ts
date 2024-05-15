// types
import { PandaSelectChangeEvent } from "@panda-wbc/panda-select";

// components
import "@panda-wbc/panda-select";
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-button";

// utils
import { html, TemplateResult } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { SampleTemplate } from "../../../../sample-template";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";

@customElement("panda-circular-countdown-timer-action-colors-themes")
class Sample extends SampleTemplate {
	@state()
	private _themeList: string[] = ["info", "done", "warn", "alert", "primary", "secondary", "tertiary"];

	@state()
	private _theme: string = "info";

	@state()
	private _showScale: boolean = true;
	
	@state()
	private _busy: boolean = false;

	@query("#timer")
	private _timerEl!: any;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	renderSample(): TemplateResult {
		return html`
			<div class="rows">
				<div class="row">
					<div class="col-half">
						<panda-select
							label="Select theme:"
							.items="${this._themeList}"
							.value="${this._theme}"
							@change="${this._onChangeTheme}"
						>
						</panda-select>

						<panda-button @click="${this._onStart}">START</panda-button>
						<panda-button @click="${this._onTogglePause}">PAUSE</panda-button>
						<panda-button @click="${this._onStop}">STOP</panda-button>
						<panda-button @click="${this._onRestart}">RESTART</panda-button>
						<panda-button @click="${this._onToggleBusy}">TOGGLE BUSY STATE</panda-button>

						<panda-checkbox
							.checked="${this._showScale}"
							@change="${this._onToggleShowScale}"
						>
							Show scale
						</panda-checkbox>

					</div>
					<div class="col-half content-center">
						<panda-circular-countdown-timer
							id="timer"
							.theme="${this._theme}"
							.time="${60}"
							.format="${"SSs"}"
							.showScale="${this._showScale}"
							.busy="${this._busy}"
							show-time
							autostart
						>
						</panda-circular-countdown-timer>
					</div>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeTheme(event: PandaSelectChangeEvent): void {
		const _theme = event.detail.value;
		this._theme = _theme;
		console.log("%c _onChangeTheme", "font-size: 24px; color: green;", _theme);
	}

	private _onToggleBusy(): void {
		this._busy = !this._busy;
	}

	private _onTogglePause(): void {
		this._timerEl.pause();
	}

	private _onStart(): void {
		this._timerEl.start();
	}

	private _onStop(): void {
		this._timerEl.stop();
	}

	private _onRestart(): void {
		this._timerEl.restart();
	}

	private _onToggleShowScale(event: PandaCheckboxChangeEvent) {
		console.log("%c (_onToggleShowScale) checked", "font-size: 24px; color: green;", event.detail.checked);
		this._showScale = event.detail.checked;
	}

}