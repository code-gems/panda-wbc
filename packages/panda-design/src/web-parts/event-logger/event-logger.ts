// types
const enum EventType {
	INFO = "info",
	WARN = "warning",
	ERROR = "error",
}

type LoggerEvent = {
	type: EventType;
	message: string;
	timestamp: number;
}

// css styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-time-ago";

// utils
import { html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("event-logger")
export class EventLogger extends LitElement {
	static get styles() {
		return styles;
	}
	
	@state()
	private _eventList: LoggerEvent[] = [];

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		return html`
			<div class="events">
				${
					this._eventList.map(
						({ type, message, timestamp }) => html`
							<div class="event">
								<div class="icon ${type}">
									<panda-icon icon="${type}"></panda-icon>
								</div>
								<div class="details">
									<div class="message">${message}</div>
									<div class="timestamp">
										<panda-time-ago .time="${timestamp}"></panda-time-ago>
									</div>
								</div>
							</div>
						`
					)
				}
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _addEvent(type: EventType, message: string): void {
		this._eventList.unshift({
			type,
			message,
			timestamp: new Date().getTime(),
		});
		this.requestUpdate();
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public log(message: string): void {
		this._addEvent(EventType.INFO, message);
	}
	
	public warn(message: string): void {
		this._addEvent(EventType.WARN, message);
	}
	
	public error(message: string): void {
		this._addEvent(EventType.ERROR, message);
	}
	
	public clear(): void {
		this._eventList = [];
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"event-logger": EventLogger;
	}
}