// types
import {
	ComponentPropertyDetails,
	ComponentEventDetails,
	ComponentInterfaceDetails,
	ContentSectionName,
	Page,
} from "panda-design-typings";

// styles
import { uiComponents } from "../styles/styles";
import { scrollbar } from "@panda-wbc/panda-mixins";

// components & web-parts
import "@panda-wbc/panda-particle-banner";
import "../web-parts/internal-link/internal-link";
import "../web-parts/version-badge/version-badge";
import "../web-parts/code-sample/code-sample";
import "../web-parts/page-banner/page-banner";

// utils
import { LitElement, CSSResultGroup, TemplateResult, html } from "lit";
import { queryAll, state } from "lit/decorators.js";
import { pageLibrary } from "../utils/page-library";
import { navigate } from "@panda-wbc/panda-router/lib/panda-router";

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

	// ========================================================================

	@state()
	public contentPageConfig!: Page;

	public customStyles!: CSSResultGroup;

	// private props ==========================================================
	
	@state()
	private _hasContextMenu = false;
	
	// elements
	@queryAll("[data-content-section-name]")
	private _contentSectionsEls!: HTMLDivElement[];

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
		// check for internal link
		if (location.hash) {
			this._scrollToHash();
		}
		// check for context menu
		const selectedPage = pageLibrary.getPageById(this.contentPageConfig?.pageId);
		const contextMenu = selectedPage?.contextMenu;
		this._hasContextMenu = contextMenu != null;
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	abstract _renderPageContent(): TemplateResult;
	
	private _renderPageBanner(): TemplateResult {
			return html`
			<div class="banner small particle-banner">
				<pd-page-banner
					.header="${this.contentPageConfig?.pageName}"
					.version="${this.contentPageConfig?.version ?? ""}"
					.native="${!!this.contentPageConfig?.native}"
				></pd-page-banner>
			</div>
		`;
	}

	render(): TemplateResult {
		return html`
			<style>
				${this.customStyles || ""}
			</style>
			<div class="content-page-wrap scrollbar">
				<div class="content-page ${this._hasContextMenu ? "has-context-menu" : ""}">
					<!-- PAGE BREADCRUMBS -->
					<pd-breadcrumbs
						.pageName="${this.contentPageConfig?.pageName}"
						.pageUri="${this.contentPageConfig?.pageUri}"
					></pd-breadcrumbs>

					${this._renderPageBanner()}
				
					<!-- CONTENT PAGE TEMPLATE -->
					${this._renderPageContent()}

					<!-- CUSTOMIZATION SECTION -->
					
					<!-- RENDER PREVIOUS/NEXT PAGE SECTION -->
					${this._renderPageFooter()}
				</div>
					
				<!-- CONTEXT MENU -->
				${this._renderContextMenu()}
			</div>
		`;
	}

	private _renderPageFooter(): TemplateResult {
		const category = this.contentPageConfig?.category;
		const allPages = pageLibrary.getPages(category, true);
		let previousPage!: Page;
		let nextPage!: Page;

		// find previous and next page based on order in page library
		for (const [index, page] of allPages.entries()) {
			if (page.pageId === this.contentPageConfig?.pageId) {
				previousPage = allPages[index - 1];
				nextPage = allPages[index + 1];
				break;
			}
		}

		const previousPageHtml = previousPage == null
			? html``
			: html`
				<div class="page-btn previous" @click="${() => navigate(previousPage.pageUri)}">
					<div class="icon">
						<panda-icon icon="arrow-back"></panda-icon>
					</div>
					<div class="body">
						<div class="label">Previous</div>
						<div class="title">${previousPage.pageName}</div>
					</div>
				</div>
			`;

		const nextPageHtml = nextPage == null
			? html``
			: html`
				<div class="page-btn next" @click="${() => navigate(nextPage.pageUri)}">
					<div class="body">
						<div class="label">Next</div>
						<div class="title">${nextPage.pageName}</div>
					</div>
					<div class="icon">
						<panda-icon icon="arrow-forward"></panda-icon>
					</div>
				</div>
			`;

		return html`
			<div class="section">
				<div class="page-navigation">
					${previousPageHtml}
					${nextPageHtml}
				</div>
			</div>
		`;
	}

	private _renderContextMenu(): TemplateResult | void {
		const selectedPage = pageLibrary.getPageById(this.contentPageConfig?.pageId);
		const contextMenu = selectedPage?.contextMenu;
		
		if (contextMenu != null) {
			const contextMenuHtml: TemplateResult[] = [];
			// generate context menu items
			contextMenu.forEach(({ name, contextId, children }) => {
				let childrenContHtml: TemplateResult = html``;
				const childrenHtml: TemplateResult[] = [];

				// check for children
				if (children?.length) {
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
			console.warn("%c Content Sections:", "font-size: 16px;", [...this._contentSectionsEls].map((sectionEl) => sectionEl.dataset.contentSectionName));
		}
	}
}
