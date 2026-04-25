// types
import {
	PageDetails,
	PandaRouterNavigateEventDetail,
	RouterConfig,
	SearchParams,
} from "../index";

// utils
import { applyStyles } from "@panda-wbc/panda-utils/lib/component-utils";

export class PandaRouter extends HTMLElement {
	/** Version of the component. */
	public readonly version: string = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================

	/**
	 * routerConfig
	 * ---
	 * Configuration object for the router.
	 * It should contain a "route" property which is an object mapping pathnames to page details (template and optional title).
	 * When the routerConfig is set, the router will initialize its internal page map and handle the current location to render 
	 * the appropriate page.
	 * @type {RouterConfig}
	 */
	get routerConfig(): RouterConfig {
		return this._routerConfig;
	}

	set routerConfig(value: RouterConfig) {
		this._routerConfig = value;
		this._parseRouterConfig();
		this._handleLocation();
	}

	private _routerConfig!: RouterConfig;

	// private properties =============================================================================================
	private readonly _pageMap!: Map<string | number, PageDetails>;

	private _pageTemplate!: string | undefined;

	// events
	private _navigateEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	constructor() {
		super();
		this.attachShadow({ mode: "open", delegatesFocus: true });
		this.shadowRoot!.innerHTML = "";
		const styles = `
			:host {
				display: block;
				width: 100%;
				height: 100%;
			}
		`;
		applyStyles(styles, this.shadowRoot);

		this._pageMap = new Map();
		this._pageTemplate = "";
		this._routerConfig = {
			route: {}
		};
	}

	connectedCallback(): void {
		this._parseRouterConfig();
		this._handleLocation();

		// add event listeners
		this._navigateEvent = this._handleLocation.bind(this);
		document.addEventListener("panda-router-navigate", this._navigateEvent);
		globalThis.addEventListener("popstate", this._navigateEvent);
	}

	disconnectedCallback(): void {
		// remove event listeners
		if (this._navigateEvent) {
			document.removeEventListener("panda-router-navigate", this._navigateEvent);
			globalThis.removeEventListener("popstate", this._navigateEvent);
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	protected _updateTemplate(): void {
		if (this.isConnected) {
			this.shadowRoot!.innerHTML = this._pageTemplate ?? "";
		}
	}

	/**
	 * Parses the router configuration and initializes the internal page map.
	 * The page map is a Map object that maps pathnames to their corresponding page details (template and optional title).
	 * This method should be called whenever the routerConfig property is set or updated to ensure that the router has 
	 * the latest configuration.
	 */
	private _parseRouterConfig() {
		if (this._routerConfig?.route) {
			const pages: string[] = Object.keys(this._routerConfig.route);

			// map all pages from router config
			pages.forEach((page) => {
				this._pageMap.set(page, this._routerConfig.route[page]);
			});
		} else {
			console.warn("%c ⚠️ [PANDA ROUTER] Router config not found!", "font-size: 16px;");
		}
	}

	private _handleLocation(): void {
		// get page details
		const pathname = globalThis.location.pathname;
		const pageDetails = this._pageMap.get(pathname);

		if (pageDetails) {
			// apply page template
			this._pageTemplate = pageDetails?.template ?? "";
		} else if (pageDetails == null && this._pageMap.has(404)) {
			// if no page details found for current pathname, try to find 404 page
			const pageNotFoundDetails = this._pageMap.get(404);
			if (pageNotFoundDetails) {
				this._pageTemplate = pageNotFoundDetails?.template ?? "";
			}
		} else {
			// fallback to default 404 page
			this._pageTemplate = `<h1>#404 - Page not found</h1>`;
		}

		// update page title
		this._updatePageTitle();
		// update the component with the new page template
		this._updateTemplate();
		// trigger on-navigate event
		this._triggerNavigateEvent(pathname);
	}

	private _parseSearchParams(search: string): SearchParams {
		let searchParams: SearchParams = {};
		if (search) {
			const searchParamsArray = search.replace("?", "").split("&");
			searchParamsArray.forEach(
				(params) => {
					const paramParts: string[] = params.split("=");
					searchParams[paramParts[0]] = paramParts[1] || null;
				}
			);
		}
		return searchParams;
	}

	private _triggerNavigateEvent(pathname: string): void {
		const event = new CustomEvent<PandaRouterNavigateEventDetail>("on-navigate", {
			detail: {
				pathname,
				search: globalThis.location.search,
				searchParams: this._parseSearchParams(globalThis.location.search)
			}
		});
		this.dispatchEvent(event);
	}

	/** Updates the document title based on the current pathname. */
	private _updatePageTitle(): void {
		const pathname = globalThis.location.pathname;
		const search = globalThis.location.search;
		const searchParams = this._parseSearchParams(globalThis.location.search);

		const pageDetails = this._pageMap.get(pathname);
		if (pageDetails?.title) {
			document.title = pageDetails.title({
				pathname,
				search,
				searchParams,
			});
		}
	}

	// ================================================================================================================
	// API ============================================================================================================
	// ================================================================================================================

	public reload(): void {
		this._updateTemplate();
	}
}

export const navigate = (pathname: string, event: MouseEvent | null = null) => {
	if (event) {
		event.stopPropagation();
		event.preventDefault();
	}

	globalThis.history.pushState(
		{},
		pathname,
		globalThis.location.origin + pathname
	);
	// notify router
	const navigateEvent = new CustomEvent("panda-router-navigate", {
		detail: {
			pathname
		}
	});
	document.dispatchEvent(navigateEvent);
}

/**
 * Adding locationChanged() callback to your component class.
 */
export const routify = () => {
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
				globalThis.addEventListener("popstate", this.__navigateEventBinding);
			}

			disconnectedCallback() {
				if (this.__navigateEventBinding) {
					document.removeEventListener("panda-router-navigate", this.__navigateEventBinding);
					globalThis.removeEventListener("popstate", this.__navigateEventBinding);
				}
				this.__safeInvoke(super.disconnectedCallback);
			}

			__safeInvoke(fn: any, ...args: any[]) {
				if (fn) {
					fn.bind(this)(...args);
				}
			}
		}
	}
}

// Register the custom element
if (!customElements.get("panda-router")) {
	customElements.define("panda-router", PandaRouter);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-router": PandaRouter;
	}
}