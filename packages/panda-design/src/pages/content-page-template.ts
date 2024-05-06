// types
import { ContextMenuItem, ComponentPropertyDetails, ComponentEventDetails, ComponentInterfaceDetails } from "panda-design-typings";

// styles
import { uiComponents } from "../styles/styles";
import { scrollbar } from "@panda-wbc/panda-theme";

// components & web-parts
import "../web-parts/internal-link/internal-link";
import "../web-parts/version-shield/version-shield";
import "../web-parts/code-sample/code-sample";

// utils
import { LitElement, CSSResultGroup, TemplateResult, html } from "lit";
import { query, queryAll, property } from "lit/decorators.js";
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

	// page details
	abstract pageId: string;
	public customStyles!: CSSResultGroup;

	@property({ type: Array })
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
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		// remove events
		this._contentPageEl.removeEventListener("scroll", this._contentPageScrollEvent);
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

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

	abstract _renderPageBanner(): TemplateResult;

	abstract _renderPageContent(): TemplateResult;

	private _renderContextMenu() {
		const contextMenuHtml: TemplateResult[] = [];
		// extract context menu object
		const selectedPage = new PageLibrary().getPageById(this.pageId);
		this._contextMenu = selectedPage?.contextMenu ?? [];
		// generate context menu items
		this._contextMenu.forEach(({ name, contextId }) => {
			contextMenuHtml.push(html`
				<div
					class="list-item"
					@click="${() => this._onContextMenuClick(contextId)}"
				>
					<div class="icon">
						<panda-icon icon="chevron-right"></panda-icon>
					</div>
					<label>${name}</label>
				</div>
			`);
		});

		return html`
			<div id="content-list" class="content-list">
				<div class="header">On this page</div>
				<div class="list">
					${contextMenuHtml}
				</div>
			</div>
		`;
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
			this._contentListEl.classList.add("fixed");
		} else {
			this._contentListEl.classList.remove("fixed");
		}
	}
}
