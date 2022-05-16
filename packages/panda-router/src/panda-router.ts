// types
// ...

// utils
import { LitElement, TemplateResult, html } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("panda-router")
export class PandaRouterElement extends LitElement {
	@property({ type: Object })
	routerConfig: any;

	// private props
	private _pageMap!: Map<string | number, TemplateResult | undefined>;

	@property({ type: Object })
	private _pageTemplate!: TemplateResult | undefined;

	// events
	private _navigateEventBinding!: any;

	// ================================================================================================================
	// ===================================================================================================== LIFE CYCLE
	// ================================================================================================================

	constructor() {
		super();
		this._pageMap = new Map();
		this._pageTemplate = html``;
		this.routerConfig = {};
	}

	connectedCallback(): void {
		super.connectedCallback();
		this._init();
		this._handleLocation();

		// add event listeners
		this._navigateEventBinding = this._handleLocation.bind(this);
		document.addEventListener("panda-router-navigate", this._navigateEventBinding);
		window.addEventListener("popstate", this._navigateEventBinding);
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove event listeners
		document.removeEventListener("panda-router-navigate", this._navigateEventBinding);
		window.removeEventListener("popstate", this._navigateEventBinding);
	}

	// ================================================================================================================
	// ====================================================================================================== RENDERERS
	// ================================================================================================================

	protected render() {
		return this._pageTemplate;
	}

	// ================================================================================================================
	// ======================================================================================================== HELPERS
	// ================================================================================================================

	private _init() {
		if (this.routerConfig) {
			const pages: string[] = Object.keys(this.routerConfig);

			// map all pages from router config
			pages.forEach(
				(page) => {
					this._pageMap.set(page, this.routerConfig[page]);
				}
			);
		} else {
			console.warn("%c ⚠️ [PANDA ROUTER] Router config not found!", "font-size: 16px;");
		}
	}

	private _handleLocation(): void {
		const path: string = window.location.pathname;
		console.log("%c _handleLocation", "font-size: 24px; color: orange;", path);
		console.log("%c _pageMap", "font-size: 24px; color: orange;", this._pageMap?.has(path), this._pageMap);

		if (this._pageMap?.has(path)) {
			this._pageTemplate = this._pageMap.get(path);
		} else {
			if (this._pageMap?.has(404)) {
				this._pageTemplate = this._pageMap.get(404);
			} else {
				this._pageTemplate = html`<h1>#404 - Page not found</h1>`;
			}
		}
		this.requestUpdate();
	}

	// ================================================================================================================
	// ============================================================================================================ API
	// ================================================================================================================

	public reload() {
		this.requestUpdate();
	}
}

export const navigate = (pathName: string, e: MouseEvent) => {
	if (e) {
		e.stopPropagation();
		e.preventDefault();
	}
	console.log("%c navigate (event)", "font-size: 24px; color: red;", pathName);

	window.history.pushState(
		{},
		pathName,
		window.location.origin + pathName
	);
	// notify router
	const event = new CustomEvent("panda-router-navigate", {
		detail: {
			pathName
		}
	});
	document.dispatchEvent(event);
};
