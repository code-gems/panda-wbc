// types
import { PandaSelectChangeEvent } from "@panda-wbc/panda-select";
import { ToastPosition } from "@panda-wbc/panda-toast";
import { PandaCheckboxChangeEvent } from "@panda-wbc/panda-checkbox";

// components
import "@panda-wbc/panda-toast";
import "@panda-wbc/panda-select";
import "@panda-wbc/panda-checkbox";
import "@panda-wbc/panda-button";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { SampleTemplate } from "../../../../../sample-template";
import { PandaToastCenter } from "@panda-wbc/panda-toast/lib/panda-toast-center";

@customElement("panda-toast-themes-sample")
class Sample extends SampleTemplate {
	@state()
	private _themeList: string[] = ["info", "done", "warn", "alert", "primary", "secondary", "tertiary"];

	@state()
	private _selectedTheme: string = "info";

	@state()
	private _closable: boolean = false;

	private _pandaToastCenter = new PandaToastCenter();

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	renderDemo(): TemplateResult {
		return html`
			<div class="rows">
				<div class="row">
					<div class="col-half">
						<panda-button @click="${this._onCreateToast}">
							CREATE TOAST
						</panda-button>
					</div>
					<div class="col-half">
						<panda-checkbox
							.checked="${this._closable}"
							@change="${this._onToggleClosable}"
						>
							Closable
						</panda-checkbox>
					</div>
				</div>

				<div class="row">
					<div class="col-half">
						<panda-select
							label="Select theme:"
							.items="${this._themeList}"
							.value="${this._selectedTheme}"
							@change="${this._onChangeTheme}"
						>
						</panda-select>
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
		this._selectedTheme = _theme;
		console.log("%c (_onChangeTheme) theme:", "font-size: 24px; color: green;", _theme);
	}

	private _onCreateToast(): void {
		console.log("%c (_onCreateToast)", "font-size: 24px; color: green;");

		this._pandaToastCenter.createToast({
			theme: this._selectedTheme,
			icon: "cake",
			header: "Happy birthday!",
			message: "Congratulations! you are now 1 year older!",
			closable: this._closable,
			// interval: 5 * 60 * 1000,
			position: ToastPosition.BOTTOM_RIGHT,
		});
	}

	private _onToggleClosable(event: PandaCheckboxChangeEvent): void {
		this._closable = event.detail.checked;
		console.log("%c (_onToggleClosable) closable:", "font-size: 24px; color: green;", this._closable);
	}
}