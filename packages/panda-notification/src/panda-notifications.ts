// types
import { PandaNotification } from "../index";

// styles
import { styles } from "./styles/styles";

// components
import "./panda-notification";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { pandaNotificationCenter } from "./panda-notification-center";

@customElement("panda-notifications")
export class PandaNotifications extends LitElement {
	static get styles() {
		return styles;
	}

	@property({ type: String, attribute: true })
	scope: string | null = null;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	connectedCallback(): void {
		super.connectedCallback();
		pandaNotificationCenter.subscribe({
			scope: this.scope,
			callback: this.notify
		})
	}

	/** handle new notifications */
	notify(notification: PandaNotification) {
		console.log("%c ⚡ [PANDA NOTIFICATIONS] notify()", "font-size: 24px; color: blueviolet;", notification);

	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="notifications-cont">
				<slot></slot>
				<div class="notifications">
					<!-- NOTIFICATION BOARD -->
					<panda-notification
						theme="info"
					>
						Some notification message
					</panda-notification>
				</div>
			</div>
		`;
	}


	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================


}

declare global {
	interface HTMLElementTagNameMap {
		"panda-notifications": PandaNotifications;
	}
}