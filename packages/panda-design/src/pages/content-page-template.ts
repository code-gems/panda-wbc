// types
import {
	ContextMenuItem,
	ComponentPropertyDetails,
	ComponentEventDetails,
	ComponentInterfaceDetails,
	ContentSectionName,
	Page,
} from "panda-design-typings";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { uiComponents } from "../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// components & web-parts
import "@panda-wbc/panda-particle-banner";
import "../web-parts/internal-link/internal-link";
import "../web-parts/version-shield/version-shield";
import "../web-parts/code-sample/code-sample";

// utils
import { LitElement, CSSResultGroup, TemplateResult, html, PropertyValues } from "lit";
import { query, queryAll, state } from "lit/decorators.js";
import PageLibrary from "../utils/page-library";

export abstract class ContentPageTemplate extends LitElement {
	// css styles
	static get styles() {
		return [
			scrollbar,
			uiComponents.table,
			uiComponents.banner,
			uiComponents.form,
			uiComponents.sample,
			uiComponents.appLayout,
			uiComponents.columnSystem,
			uiComponents.modifiers,
		];
	}

	@state()
	public contentPageConfig!: Page;

	public customStyles!: CSSResultGroup;

	@state()
	private _componentVersion!: string;

	@state()
	private _contextMenu!: ContextMenuItem[];

	// elements
	@query("#content-page-wrap")
	private _contentPageEl!: HTMLDivElement;

	@query("#context-menu")
	private _contextMenuEl!: HTMLDivElement;

	@query("#content-list")
	private _contentListEl!: HTMLDivElement;

	@query("#btn-scroll-top")
	private _btnScrollTopEl!: HTMLDivElement;

	@queryAll("[data-content-section-name]")
	private _contentSectionsEls!: HTMLDivElement[];

	// events
	private _contentPageScrollEvent: any = this._onContentPageScroll.bind(this);

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	/**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * ```ts
     * firstUpdated() {
	 *   super.firstUpdated();
     *   this.renderRoot.getElementById('my-text-area').focus();
     * }
     * ```
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
	firstUpdated(): void {
		// add events
		this._contentPageEl.addEventListener("scroll", this._contentPageScrollEvent);
		if (location.hash) {
			this._scrollToHash();
		}
		console.log(`%c ⚡ contentPageConfig`, "font-size: 24px; color: crimson; background: black;", this.contentPageConfig);

		
		const packageFile = import("../../../panda-heatmap/package.json");
		packageFile.then((pkg) => {
			this._componentVersion = pkg.version;
		});
	}

	updated(_changedProps: PropertyValues): void {
		console.log(`%c ⚡ _changedProps`, "font-size: 24px; color: crimson; background: black;", _changedProps);
	}

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove events
		this._contentPageEl.removeEventListener("scroll", this._contentPageScrollEvent);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	abstract _renderPageContent(): TemplateResult;

	protected render() {
		return html`
			<style>
				${this.customStyles || ""}
			</style>
			<div id="content-page-wrap" class="content-page-wrap scrollbar">
				${this._renderPageBanner()}
				
				<div class="content-page">
					<div id="content" class="content">
						${this._renderPageContent()}
					</div>
					
					<!-- CONTEXT MENU -->
					<div id="context-menu" class="context-menu">
						${this._renderContextMenu()}
						${this._renderScrollTopButton()}
					</div>
				</div> <!-- END OF CONTENT PAGE -->
			</div>
		`;
	}
	
	private _renderPageBanner(): TemplateResult {
		console.log(`%c ⚡ (_renderPageBanner)`, "font-size: 24px; color: crimson; background: black;");

		const primaryColor = getComputedStyle(this).getPropertyValue("--panda-primary-color");
		const secondaryColor = getComputedStyle(this).getPropertyValue("--panda-secondary-color");
		const tertiaryColor = getComputedStyle(this).getPropertyValue("--panda-tertiary-color");

		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				blurMax: 5,
				blurMin: 2,
				colors: [primaryColor, secondaryColor, tertiaryColor],
				colorOpacityVariation: 50,
				colorSaturationVariation: 30,
				maxSpeedX: 0.1,
				minSpeedX: -0.1,
				maxSpeedY: -0.5,
				minSpeedY: -0.1,
				sizeMax: 80,
				sizeMin: 40,
			}],
			showFps: true
		};

		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner .config="${bannerConfig}">
					<div class="content">
						<h1>${this.contentPageConfig?.pageName}</h1>
					</div>
				</panda-particle-banner>
				<version-shield
					prefix="version"
					version="${this._componentVersion}"
					color="orange"
				></version-shield>
			</div>
		`;
	}

	private _renderContextMenu() {
		const selectedPage = new PageLibrary().getPageById(this.contentPageConfig?.pageId);
		const contextMenu = selectedPage?.contextMenu ?? [];
		
		if (contextMenu != null) {
			const contextMenuHtml: TemplateResult[] = [];
			// generate context menu items
			contextMenu.forEach(({ name, contextId, children }) => {
				let childrenContHtml: TemplateResult = html``;
				const childrenHtml: TemplateResult[] = [];

				// check for children
				if (children != null && children.length > 0) {
					children.forEach(({ name, contextId }) => {
						childrenHtml.push(html`
							<div
								class="subitem"
								@click="${() => this._onContextMenuClick(contextId)}"
							>
								<div class="label">${name}</div>
							</div>
						`);
					});

					childrenContHtml = html`
						<div class="subitem-list">
							${childrenHtml}
						</div>
					`;
				}

				contextMenuHtml.push(html`
					<div
						class="list-item"
						@click="${() => this._onContextMenuClick(contextId)}"
					>
						${name}
					</div>
					${childrenContHtml}
				`);
			});

			if (this.contentPageConfig?.designTokens) {
				contextMenuHtml.push(html`
					<div
						class="list-item"
						@click="${() => this._onContextMenuClick(ContentSectionName.CUSTOMIZATION)}"
					>
						Customization
					</div>
				`);
			}

			if (this.contentPageConfig?.relatedPages) {
				contextMenuHtml.push(html`
					<div
						class="list-item"
						@click="${() => this._onContextMenuClick(ContentSectionName.RELATED_PAGES)}"
					>
						Related Pages
					</div>
				`);
			}

			return html`
				<div class="context-menu">
					<div class="content-list">
						<div class="header">
							<div class="text">On this page</div>
						</div>
						<div class="list scrollbar">
							${contextMenuHtml}
						</div>
					</div>
				</div>
			`;
		}
	}

	private _renderScrollTopButton() {
		return html`
			<div id="btn-scroll-top" class="btn-scroll-top">
				<panda-icon icon="chevron-up"></panda-icon>
			</div>
		`;
	}

	public _renderComponentPropertyTable(componentPropertyList: ComponentPropertyDetails[] = []): TemplateResult {
		const tableBodyHtml: TemplateResult[] = [];
		// check if properties have option column included
		const hasOptions = componentPropertyList.find((propertyDetails) => propertyDetails.options !== undefined);
		// parse component properties
		componentPropertyList.forEach((propertyDetails) => {
			const {
				name,
				type,
				defaultValue,
				options = [],
				description,
			} = propertyDetails;

			tableBodyHtml.push(html`
				<div class="tr">
					<div class="td"><i class="code">${name}</i></div>
					<div class="td"><span class="variable-type">${type}</span></div>
					<div class="td">${defaultValue}</div>
					${hasOptions ? html`<div class="td">${options.join(" | ")}</div>` : html``}
					<div class="td">${description}</div>
				</div>
			`);
		});

		const modClass = hasOptions ? "with-options" : "";

		return html`
			<div class="table table-properties ${modClass}">
				<div class="thead">
					<div class="tr">
						<div class="td">PROPERTY NAME</div>
						<div class="td">TYPE</div>
						<div class="td">DEFAULT VALUE</div>
						${hasOptions ? html`<div class="td">OPTIONS</div>` : html``}
						<div class="td">DESCRIPTION</div>
					</div>
				</div>
				<div class="tbody">
					${tableBodyHtml}
				</div>
			</div>
		`;
	}

	public _renderComponentEventsTable(componentPropertyList: ComponentEventDetails[] = []): TemplateResult {
		const tableBodyHtml: TemplateResult[] = [];

		componentPropertyList.forEach((propertyDetails) => {
			const {
				name,
				returnType,
				description,
			} = propertyDetails;

			tableBodyHtml.push(html`
				<div class="tr">
					<div class="td"><i class="code">${name}</i></div>
					<div class="td"><span class="variable-type">${returnType}</span></div>
					<div class="td">${description}</div>
				</div>
			`);
		});

		return html`
			<div class="table table-events">
				<div class="thead">
					<div class="tr">
						<div class="td">EVENT</div>
						<div class="td">RETURN TYPE</div>
						<div class="td">DESCRIPTION</div>
					</div>
				</div>
				<div class="tbody">
					${tableBodyHtml}
				</div>
			</div>
		`;
	}

	public _renderComponentInterfaceTable(componentPropertyList: ComponentInterfaceDetails[] = []): TemplateResult {
		const tableBodyHtml: TemplateResult[] = [];

		componentPropertyList.forEach((propertyDetails) => {
			const {
				method,
				returnType,
				description,
			} = propertyDetails;

			tableBodyHtml.push(html`
				<div class="tr">
					<div class="td"><i class="code">${method}</i></div>
					<div class="td"><span class="variable-type">${returnType}</span></div>
					<div class="td">${description}</div>
				</div>
			`);
		});

		return html`
			<div class="table table-interface">
				<div class="thead">
					<div class="tr">
						<div class="td">API</div>
						<div class="td">RETURN TYPE</div>
						<div class="td">DESCRIPTION</div>
					</div>
				</div>
				<div class="tbody">
					${tableBodyHtml}
				</div>
			</div>
		`;
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _scrollToHash(): void {
		setTimeout(() => {
			this._onContextMenuClick(location.hash.slice(1), true);
		}, 0);
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onContextMenuClick(contextId: string, highlight: boolean = false): void {
		let contentSectionEl!: HTMLDivElement;
		this._contentSectionsEls.forEach((sectionEl) => {
			// find content section based on dataset
			if (sectionEl.dataset.contentSectionName === contextId) {
				contentSectionEl = sectionEl;
			}
		});
		// check if content section was found
		if (contentSectionEl) {
			contentSectionEl.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			// highlight section
			if (highlight) {
				contentSectionEl.classList.remove("highlight");
				contentSectionEl.classList.add("highlight");
			}
		} else {
			console.warn("%c Unable to locate content section. Please verify your contextMenu config.", "font-size: 16px;", contextId);
			console.warn("%c Context menu config:", "font-size: 16px;", this._contextMenu);
			console.warn("%c Content Sections:", "font-size: 16px;", [...this._contentSectionsEls].map((sectionEl) => sectionEl.dataset.contentSectionName));
		}
	}

	private _onContentPageScroll(): void {
		const contextMenuRect: DOMRect = this._contextMenuEl.getBoundingClientRect();
		// check if context menu container is outside of the view port
		if (contextMenuRect.top < 0) {
			// this._contentListEl.classList.add("fixed");
		} else {
			// this._contentListEl.classList.remove("fixed");
		}
	}
}
