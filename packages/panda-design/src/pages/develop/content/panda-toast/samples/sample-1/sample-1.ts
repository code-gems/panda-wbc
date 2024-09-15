// types
import { PandaSelectChangeEvent } from "@panda-wbc/panda-select";

// components
import "@panda-wbc/panda-select";
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-button";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { SampleTemplate } from "../../../../../sample-template";

@customElement("panda-toast-themes-sample")
class Sample extends SampleTemplate {
	@state()
	private _themeList: string[] = ["info", "done", "warn", "alert", "primary", "secondary", "tertiary"];

	@state()
	private _theme: string = "info";

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
					</div>
					<div class="col-half content-center">
						<panda-toast
							.theme="${this._theme}"
							icon="cake"
							header="Happy birthday!"
							message="Congratulations! you are now 1 year older!"
							closable
						>
						</panda-toast>
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
}