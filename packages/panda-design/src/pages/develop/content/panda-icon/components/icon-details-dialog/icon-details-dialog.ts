// types

// styles
import { styles } from "./styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme/lib/mixins";

// components
import "@panda-wbc/panda-click-to-copy";
import "@panda-wbc/panda-icon";
import "@panda-wbc/panda-button";
import "@panda-wbc/panda-icon/lib/av-icon-pack";
import "@panda-wbc/panda-icon/lib/food-icon-pack";
import "@panda-wbc/panda-icon/lib/map-icon-pack";
import "../../../../../../web-parts/code-sample/code-sample";

// utils
import { LitElement, PropertyValueMap, TemplateResult, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { uiComponents } from "../../../../../../styles/styles";

// config
import { getIconListDetails } from "../../icon-list";
import { IconDetails } from "panda-icon-typings";

@customElement("icon-details-dialog")
export class IconDetailsDialog extends LitElement {
	static get styles() { 
		return [
			styles,
			scrollbar,
			uiComponents.dialog,
		];
	}

	@property({ type: String, attribute: true, reflect: true })
	icon!: string;

	@state()
	private _selectedIconDetails: IconDetails | null = null;

	@state()
	private _iconListDetail: IconDetails[] = [];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		// get icon list details
		this._iconListDetail = getIconListDetails();
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("icon") && this.icon) {
			// extract selected icon details
			this._selectedIconDetails = this._iconListDetail.find(({ name }) => name === this.icon) ?? null;
		}
	}
	
	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	render(): TemplateResult {
		const icon = this._selectedIconDetails?.name;
		return html`
			<div class="dialog">
				<div class="header">
					<label>Icon Details</label>
					<div
						class="btn-close"
						@click="${this._onClose}"
					>
						<panda-icon icon="close"></panda-icon>
					</div>
				</div>
				<div class="body scrollbar">
					<div class="body-wrap">
						<div class="layout">
							<div class="body">
								<div class="icon">
									<panda-icon icon="${icon}"></panda-icon>
								</div>
								<div class="details">
									<panda-button
										theme="primary flat"
									>
										<panda-icon
											slot="prefix"
											class="prefix-icon"
											icon="${icon}"
										></panda-icon>
										My Button
									</panda-button>
									<panda-button
										theme="secondary flat"
									>
										<panda-icon
											slot="prefix"
											class="prefix-icon"
											icon="${icon}"
										></panda-icon>
										My Button
									</panda-button>
								</div>
							</div>
							<div class="footer">
								${this._renderTags()}
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<panda-button
						theme="flat"
						@click="${this._onClose}"
					>
						CLOSE
					</panda-button>
				</div>
			</div>
		`;
	}

	private _renderTags(): TemplateResult[] | void {
		if (this._selectedIconDetails) {
			const tagListHtml: TemplateResult[] = [];
			
			this._selectedIconDetails.keywords.forEach((keyword) => {
				tagListHtml.push(html`
					<div class="tag">${keyword}</div>
				`);
			});

			return tagListHtml;
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onClose(): void {
		const event = new CustomEvent("panda-dialog-close", {});
		document.dispatchEvent(event);
	}
}