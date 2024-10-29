// types
import { GridConfig } from "../index";

// style
import { styles } from "./styles/styles";

// components
import "./panda-grid-panel";

// utils
import { LitElement, html, TemplateResult } from "lit";
import {
	customElement,
	property,
	query,
	queryAssignedElements,
	state,	
} from "lit/decorators.js";

@customElement("panda-grid-layout")
export class PandaGridLayout extends LitElement {
	// css style
	static get styles() {
		return styles;
	}

	@property({ type: Object })
	gridConfig: GridConfig = {
		panelSize: 300,

	};

	@state()
	private _panelList: any = [];
	
	@state()
	private _panelListTemp: any = [];

	// elements
	@query("#grid-layout")
	private _grid!: HTMLDivElement;

	@queryAssignedElements()
	private _slottedPanels!: HTMLElement[];

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	protected firstUpdated(): void {
		console.log("%c ⚡ (firstUpdated) _slottedPanels", "font-size: 24px; color: orange;", this._slottedPanels);

	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div
				class="grid-layout-cont"
				part="grid-layout-cont"
			>
				<div
					id="grid-layout"
					class="grid-layout"
					part="grid-layout"
				>
					<slot @slotchange="${this._onSlotChange}"></slot>
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onSlotChange(event: Event): void {
		const slotEl: any = event.target;
		const assignedElements = slotEl.assignedElements();
		console.log("%c ⚡ (_onSlotChange) assignedElements", "font-size: 24px; color: orange;", assignedElements);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-grid-layout": PandaGridLayout;
	}
}
