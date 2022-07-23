// types

export type SearchParam = {
	name: string;
	value: string;
}

export interface PandaRouterNavigateEvent {
	pathname: string;
	search: string;
	searchParams: SearchParam[];
}


// utils
import { LitElement, TemplateResult, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("panda-router")
export class PandaRouterElement extends LitElement {
	static get styles() {
		return css`
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}
		`;
	}

	@property({ type: Object })
	routerConfig: any;

	// private props
	private _pageMap!: Map<string | number, TemplateResult | undefined>;

	@property({ type: Object })
	private _pageTemplate!: TemplateResult | undefined;

	// events
	private _navigateEventBinding!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
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
		if (this._navigateEventBinding) {
			document.removeEventListener("panda-router-navigate", this._navigateEventBinding);
			window.removeEventListener("popstate", this._navigateEventBinding);
		}
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render() {
		return this._pageTemplate;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
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
		const pathname = window.location.pathname;
		console.log("%c _handleLocation", "font-size: 24px; color: orange;", pathname);
		console.log("%c window.location", "font-size: 24px; color: orange;", window.location);
		console.log("%c _pageMap", "font-size: 24px; color: orange;", this._pageMap?.has(pathname), this._pageMap);

		if (this._pageMap?.has(pathname)) {
			this._pageTemplate = this._pageMap.get(pathname);
		} else {
			if (this._pageMap?.has(404)) {
				this._pageTemplate = this._pageMap.get(404);
			} else {
				this._pageTemplate = html`<h1>#404 - Page not found</h1>`;
			}
		}
		this.requestUpdate();

		// trigger on-navigate event
		this._triggerNavigateEvent(pathname);
	}

	private _parseSearchParams(search: string) {
		return null;
	}

	private _triggerNavigateEvent(pathname: string) {
		const navigateEventDetail: any = {
			pathname,
			search: window.location.search,
			searchParams: this._parseSearchParams(window.location.search)
		};
		const event = new CustomEvent("on-navigate", {
			detail: navigateEventDetail
		});
		this.dispatchEvent(event);
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public reload() {
		this.requestUpdate();
	}
}

export const navigate = (pathname: string, e: MouseEvent) => {
	if (e) {
		e.stopPropagation();
		e.preventDefault();
	}
	console.log("%c navigate (event)", "font-size: 24px; color: red;", pathname);

	window.history.pushState(
		{},
		pathname,
		window.location.origin + pathname
	);
	// notify router
	const event = new CustomEvent("panda-router-navigate", {
		detail: {
			pathname
		}
	});
	document.dispatchEvent(event);
};

/**
 * Adding locationChanged() callback to your component class.
 */
export const routerify = () => {
	return (target: any): typeof target => {
		return class extends target {
			connectedCallback() {
				this.__safeInvoke(super.connectedCallback);

				const onNavigate = () => {
					this.__safeInvoke(super.locationChanged);
				}

				// add event listener
				this.__navigateEventBinding = onNavigate.bind(this);
				document.addEventListener("panda-router-navigate", this.__navigateEventBinding);
				window.addEventListener("popstate", this.__navigateEventBinding);

				// subscribe to app store
				console.log("%c CONNECT ", "font-size: 24px; color: blueviolet;");
			}

			disconnectedCallback() {
				if (this.__navigateEventBinding) {
					console.log("%c DISCONNECT", "font-size: 24px; color: blueviolet;");
					document.addEventListener("panda-router-navigate", this.__navigateEventBinding);
					window.addEventListener("popstate", this.__navigateEventBinding);
				}
				this.__safeInvoke(super.disconnectedCallback);
			}

			__safeInvoke(f: any, ...args: any[]) {
				if (f) {
					f.bind(this)(...args);
				}
			}
		}
	}
}