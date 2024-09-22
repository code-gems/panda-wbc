// types
import { PandaThemeSwitcherToggleEvent, PandaThemeSwitcherTheme } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-icon";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement("panda-theme-switcher")
export class PandaThemeSwitcher extends LitElement {
	// css styles
	static get styles() {
		return [
			styles
		];
	}

	@property({ type: String })
	selectedTheme: PandaThemeSwitcherTheme = PandaThemeSwitcherTheme.LIGHT;

	@property({ type: String, attribute: "light-icon" })
	lightIcon: string = "sun";

	@property({ type: String, attribute: "dark-icon" })
	darkIcon: string = "moon";

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const flip = this.selectedTheme === PandaThemeSwitcherTheme.LIGHT
			? "flip"
			: "";

		return html`
			<div class="theme-switcher" part="theme-switcher">
				<div class="switcher-cont ${flip}" part="switcher-cont">
					<div
						class="switcher"
						part="switcher"
						@click="${this._onToggleTheme}"
					>
						<div
							class="btn"
							part="btn-light"
							title="Switch to light theme"
						>
							<panda-icon icon="${ this.lightIcon ?? "sun"}"></panda-icon>
						</div>
						<div
							class="btn"
							part="btn-dark"
							title="Switch to dark theme"
						>
							<panda-icon icon="${this.darkIcon ?? "moon"}"></panda-icon>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	
	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onToggleTheme() {
		// toggle theme
		if (this.selectedTheme === PandaThemeSwitcherTheme.LIGHT) {
			this.selectedTheme = PandaThemeSwitcherTheme.DARK;
		} else {
			this.selectedTheme = PandaThemeSwitcherTheme.LIGHT;
		}
		// trigger change event
		const event: PandaThemeSwitcherToggleEvent = new CustomEvent("change", {
			detail: {
				value: this.selectedTheme
			}
		});
		this.dispatchEvent(event);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-theme-switcher": PandaThemeSwitcher;
	}
}
