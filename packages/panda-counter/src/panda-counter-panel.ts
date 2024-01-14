// types
import { PandaCounterAnimation } from "../index";

// style
import { panelStyles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("panda-counter-panel")
export class PandaCounterPanel extends LitElement {
	// css style
	static get styles() {
		return panelStyles;
	}

	@property({ type: String, attribute: true, reflect: true })
	theme: string = "";

	@property({ type: Number })
	index: number = 0;

	@property({ type: String })
	char: string = "";

	@property({ type: Array })
	charSet: string[] = [];

	@property({ type: Number })
	textHeight: number = 0;

	@property({ type: String })
	animation: PandaCounterAnimation = PandaCounterAnimation.EASE;

	// state props
	@state()
	private _firstRender: boolean = true;

	@state()
	private _animationName: string = "";

	// timers
	private _firstRunTimer!: number;

	// elements
	@query("#panel-cont")
	private _panelContEl!: HTMLDivElement;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	firstUpdated(): void {
		// init panel
		this._init();

		this._firstRunTimer = setTimeout(() => {
			this._firstRender = false;
		}, 400);
	}

	protected updated(changedProps: PropertyValues): void {
		if (changedProps.has("textHeight") && this.textHeight !== undefined) {
			this._setPanelHeightProperty();
		}
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		// clear timer
		if (this._firstRunTimer) {
			clearTimeout(this._firstRunTimer);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		const panelHtml: TemplateResult[] = [];
		let marginTop = `${this.textHeight}px`;

		this.charSet.forEach((char, index) => {
			// don't set margin top offset for the first render
			if (!this._firstRender && char === this.char) {
				marginTop = `-${(this.charSet.length - index - 1) * this.textHeight}px`;
			}
			
			panelHtml.unshift(html`
				<div class="panel-item" part="panel-item">${char}</div>
			`);
		});

		
		return html`
			<div
				id="panel-cont"
				class="panel-cont"
				part="panel-cont"
			>
				<div
					class="panel ${this._animationName}"
					part="panel"
					style="margin-top: ${marginTop};"
				>
					${panelHtml}
				<div>
			<div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _init(): void {
		this._panelContEl.style.height = `${this.textHeight}px`;

		switch (this.animation) {
			case PandaCounterAnimation.LINEAR:
				this._animationName = "animation-linear";
				break;
			case PandaCounterAnimation.EASE_IN:
				this._animationName = "animation-ease-in";
				break;
			case PandaCounterAnimation.EASE_OUT:
				this._animationName = "animation-ease-out";
				break;
			case PandaCounterAnimation.EASE_IN_OUT:
				this._animationName = "animation-ease-in-out";
				break;
			case PandaCounterAnimation.EASE_IN_BACK:
				this._animationName = "animation-ease-in-back";
				break;
			case PandaCounterAnimation.EASE_OUT_BACK:
				this._animationName = "animation-ease-out-back";
				break;
			case PandaCounterAnimation.EASE_IN_OUT_BACK:
				this._animationName = "animation-ease-in-out-back";
				break;
			case PandaCounterAnimation.BOUNCE:
				this._animationName = "animation-bounce";
				break;
		}
	}

	private _setPanelHeightProperty() {
		// set panel height css property
		this.style.setProperty("--panda-counter-panel-height", `${this.textHeight}px`);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-counter-panel": PandaCounterPanel;
	}
}
