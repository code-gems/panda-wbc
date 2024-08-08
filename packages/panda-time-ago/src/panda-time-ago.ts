// types
import { PandaTimeAgoI18nConfig, Intervals } from "../index";

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, PropertyValues, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getTimeAgo } from "./utils/utils";

@customElement("panda-time-ago")
export class PandaTimeAgo extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: String })
	time: string | number | null = null;

	@property({ type: Boolean, attribute: "allow-future", reflect: true })
	allowFuture: boolean = false;

	/** Localization config allows you to setup custom language */
	@property()
	i18n: PandaTimeAgoI18nConfig | null = null;

	// state props
	private _defaultI18nConfig: PandaTimeAgoI18nConfig = {
		yearAgo: "year ago",
		yearsAgo: "years ago",
		monthAgo: "month ago",
		monthsAgo: "months ago",
		dayAgo: "day ago",
		daysAgo: "days ago",
		yesterday: "yesterday",
		weekAgo: "week ago",
		weeksAgo: "weeks ago",
		hourAgo: "hour ago",
		hoursAgo: "hours ago",
		minAgo: "min ago",
		justNow: "just now",
		// future
		nextYear: "next year",
		yearsFromNow: "years from now",
		monthsFromNow: "months from now",
		nextMonth: "next month",
		daysFromNow: "days from now",
		tomorrow: "tomorrow",
		nextWeek: "next week",
		weeksFromNow: "weeks from now",
		hourFromNow: "hour from now",
		hoursFromNow: "hours from now",
		minFromNow: "min from now",
	};

	private _i18n: PandaTimeAgoI18nConfig = { ...this._defaultI18nConfig };

	@state()
	private _timeAgo: string = "";

	private _refreshTimer: any = setInterval(
		this._updateTimeAgo.bind(this),
		Intervals.MINUTE
	);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected updated(_changedProps: PropertyValues): void {
		if (_changedProps.has("time") && this.time !== undefined) {
			this._updateTimeAgo();
		}
		if (_changedProps.has("i18n") && this.i18n !== undefined && this.i18n !== undefined) {
			this._i18n = {
				...this._defaultI18nConfig,
				...this.i18n,
			};
			this._updateTimeAgo();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// clean up
		clearInterval(this._refreshTimer);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<span
				class="value"
				part="value"
			>
				${this._timeAgo}
			</span>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _updateTimeAgo(): void {
		// update value
		this._timeAgo = getTimeAgo(
			this.time,
			this.allowFuture,
			this._i18n
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-time-ago": PandaTimeAgo;
	}
}