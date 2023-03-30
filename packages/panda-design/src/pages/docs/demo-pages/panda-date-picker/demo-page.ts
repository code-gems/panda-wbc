// types
import { PageCategory } from "panda-design-typings";
import { PandaEvent } from "@panda-wbc/panda-date-picker";

// components
import "@panda-wbc/panda-date-picker";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-icon/lib/food-icon-pack";

// utils & config
import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
// import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

export const pageId = "panda-date-picker";
export const pageName = "Date Picker";
export const pageUri = "/docs?demo=panda-date-picker";
export const keywords = ["date", "picker", "month", "calendar", "ui", "component", "form", "time", "date range"];
export const description = ["Date Picker description"];
export const contextMenu = [];

@customElement("panda-date-picker-demo-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DOCS,
	keywords,
	description,
	contextMenu,
	template: html`<panda-date-picker-demo-page></panda-date-picker-demo-page>`
})
export class PandaIconDemoPage extends LitElement {
	//css styles
	// static get styles() {
	// 	return styles;
	// }

	@property({ type: Array })
	private _presetDates = [
		{ label: "My B-Day", date: "2022-09-01" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
		{ label: "Christmas", date: "2022-12-25" },
	];

	@property({ type: Array })
	private _events: PandaEvent[] = [
		{ date: "2022-12-25", label: "Interview", description: "Wish me luck ;)", time: "14:30" },
		{ date: "2022-12-28", label: "Dinner with friends", description: "John's Pizza, Orchard St. #01-21 B1", time: "19:00" },
		{ date: "2022-12-02", label: "My Birthday", description: "Happy Birthday ME!!!", wholeDay: true, time: "12:00" },
		{ date: "2022-11-29", label: "Some event", description: "Some event description", wholeDay: true, time: "12:00" },
	];

	@query("#date-picker")
	private _datePickerEl!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	// ...

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return html`

			<div style="display: flex; flex-flow: row; gap: 10px; padding: 40px;">
				<panda-date-picker
					id="date-picker"
					style="width: 200px;"
					placeholder="Select..."
					theme="valid"
					.events="${this._events}"
					.value="${"2022-05-23"}"
					.format="${"DD MMM YYYY"}"
					.presetDates="${this._presetDates}"
					.disabled="${false}"
					@change="${this._onDateChange}"
				>
				</panda-date-picker>

				<br />
				<button
					@click="${() => this._onDatePickerValueChange("2022-01-01")}"
				>
					CHANGE DATE [2022-01-01]
				</button>

				<panda-month-calendar
					.events="${this._events}"
					.presetDates="${this._presetDates}"
					.highlightDate="${[{ date: "2022-11-01", label: "Adrian's Birthday" }]}"
					@change="${(e: any) => this._onMonthCalendarDateChange(e.target.selectedDate)}"
				>
				</panda-month-calendar>

			</div>
			<!--
				<panda-date-picker
					theme="mandatory"
					.value="${"2022-10-20"}"
					.disableDates="${["2022-10-23", "2022-10-25"]}"
					.busy="${false}"
					icon="cake"
					placeholder="Select birthday..."
					.disableDates="${["2022-10-23", "2022-10-25"]}"
					.disableDateRange="${[{ from: "2022-10-05", to: "2022-10-15" }]}"
					.firstDayOfWeek="${1}"
					.presetDates="${this._presetDates}"
					@change="${(e: any) => this._onDateChange(e)}"
				>
				</panda-date-picker>
				<panda-date-picker
					theme="primary"
					.value="${"2022-02-14"}"
					@change="${(e: any) => this._onDateChange(e)}"
				></panda-date-picker>


				<panda-date-picker
					.value="${"2022-03-14"}"
					@change="${(e: any) => this._onDateChange(e)}"
					disabled
				></panda-date-picker>


				<panda-date-picker
					.value="${"2022-03-14"}"
					@change="${(e: any) => this._onDateChange(e)}"
					busy
				></panda-date-picker>

			<panda-month-calendar
				.selectedDate="${null}"
				.firstDayOfWeek="${1}"
				.disableDates="${["2022-10-23", "2022-10-25", "2022-09-30", "2022-11-02"]}"
				disable-weekends
				@change="${(e: any) => this._onMonthCalendarDateChange(e.target.selectedDate)}"
			>
			</panda-month-calendar>

			<panda-month-calendar
				.selectedDate="${null}"
				.disableDateRange="${[{ from: "2022-09-23", to: "2022-10-25" }, { from: "2022-12-06", to: "2022-12-25" }]}"
				.highlightDate="${[{ date: "2022-10-13", label: "MY BIRTHDAY" }]}"
				@change="${(e: any) => this._onMonthCalendarDateChange(e.target.selectedDate)}"
			>
			</panda-month-calendar>

			<panda-month-calendar
				.selectedDate="${"2022-10-15"}"
				.min="${"2022-10-02"}"
				.max="${"2022-10-23"}"
				.highlightDate="${[{ date: "2022-10-13", label: "SPOT" }, { date: "2022-10-15", label: "TOM" }]}"
				@change="${(e: any) => this._onMonthCalendarDateChange(e.target.selectedDate)}"
			>
			</panda-month-calendar>

			<panda-month-calendar
				.selectedDate="${"2022-10-24"}"
				.presetDatesHeader="${"Events"}"
				.presetDates="${this._presetDates}"
				@change="${(e: any) => this._onMonthCalendarDateChange(e.target.selectedDate)}"
				week-starts-on-monday
			>
			</panda-month-calendar>
	
			<style>
				.test-cont {
					display: block;
					width: 600px;
					height: 400px;
					overflow: auto;

					margin-bottom: 300px;

					background-color: #f2f2f2;
				}

				.test {
					display: flex;
					flex-flow: column;
					justify-content: flex-end;
					align-items: flex-end;
					width: 2000px;
					height: 2000px;
					overflow: hidden;
				}
			</style>
			<div class="test-cont">
				<div class="test">
					<panda-date-picker
						theme="primary"
						.value="${"2022-09-01"}"
						@change="${(e: any) => this._onDateChange(e)}"
					></panda-date-picker>
				</div>
			</div>
-->
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onDateChange(e: any) {
		console.log("%c !!!!!!!!!!!!!!!!! [PANDA DESIGN] _onDateChange", "font-size: 24px; color: red;", e.target.value);
	}

	private _onMonthCalendarDateChange(e: any) {
		console.log("%c [PANDA DESIGN] _onMonthCalendarDateChange", "font-size: 24px; color: orange;", e);
	}

	_onDatePickerValueChange(date: string) {
		this._datePickerEl.value = date;
	}
}