// types
import { PageCategory } from "panda-design-typings";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-counter";
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-icon";

// utils
import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import {
	pageId,
	pageName,
	pageUri,
	keywords,
	description,
	contextMenu
} from "./page-config";

@customElement("panda-counter-content-page")
@page({
	pageId,
	pageName,
	pageUri,
	category: PageCategory.DEVELOP,
	keywords,
	description,
	contextMenu,
	template: html`<panda-counter-content-page></panda-counter-content-page>`,
})
export class PandaCounterContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageId;
	public customStyles = styles;

	// demo props
	@state()
	private _value: any = 1345;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>COUNTER</h1>

				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
	}

	private _renderOverviewSection(): TemplateResult {
		const _customCharSet = ["狗", "猫"];
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="overview" style="height: 1000px;">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						The Panda Counter is a web component that provides a simple and visually appealing way to display and animate numerical counters for your application.
						This component is designed for scenarios where you want to showcase fast changing values, such as counting the number of likes, comments, or any other quantifiable metric.
					</p>
				</div>

				<div class="sample-cont">
					<div class="sample">
						<div class="rows">
							<div class="row">
								<div class="col-full">
									<panda-counter
										label="My Account:"
										.value="${this._value}"
										counter-style="1"
										debounce
									>
									</panda-counter>
								</div>
							</div>

							<div class="row">
								<div class="col-2">
									<panda-button>
										<div class="prefix-icon" slot="prefix">
											<panda-icon icon="download-file"></panda-icon>
										</div>
										<panda-counter
											.value="${this._value}"
										>
											<div slot="suffix">%</div>
										</panda-counter>
									</panda-button>
								</div>
							</div>

							<div class="row">
								<div class="col-full">
									<panda-counter
										theme="big-display"
										label="My Account:"
										.value="${this._value}"
										counter-style="2"
										.animation="${7}"
										debounce
									>
									</panda-counter>
								</div>
							</div>

							<div class="row">
								<div class="col-full">
									<panda-counter
										label="Custom characters:"
										.value="${this._value}"
										.charSet="${_customCharSet}"
										debounce
									>
									</panda-counter>
								</div>
							</div>

							<div class="row">
								<div class="col-3">
									<panda-button
										@click="${() => this._onChangeValue(-10)}"
									>
										-10
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button
										@click="${() => this._onChangeValue(-1)}"
									>
										-1
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button
										@click="${() => this._onChangeValue(1)}"
									>
										+1
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button
										@click="${() => this._onChangeValue(10)}"
									>
										+10
									</panda-button>
								</div>
							</div>

							<div class="row">
								<div class="col-4">
									<panda-button
										@click="${() => this._onSetValue(3450)}"
									>
										3450
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										@click="${() => this._onSetValue(12345678)}"
									>
										12345678
									</panda-button>
								</div>
								<div class="col-4">
									<panda-button
										@click="${() => this._onSetValue("1000.02")}"
									>
										1000.02
									</panda-button>
									<panda-button
										@click="${() => this._onSetValue("USD")}"
									>
										USD
									</panda-button>
									<panda-button
										@click="${() => this._onSetValue("SGD")}"
									>
										SGD
									</panda-button>
									<panda-button
										@click="${() => this._onSetValue("狗")}"
									>
										狗
									</panda-button>
									<panda-button
										@click="${() => this._onSetValue("猫")}"
									>
										猫
									</panda-button>
								</div>
							</div>

						</div>
					</div>
				</div>			

			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onChangeValue(value: number) {
		this._value = parseFloat(this._value || 0) + value;
	}

	private _onSetValue(value: any) {
		this._value = value;
	}
}