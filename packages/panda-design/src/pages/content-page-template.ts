// types
import { ContextMenuItem } from "panda-design-typings";

// utils
import { LitElement, TemplateResult, html } from "lit";
import { query, queryAll, property } from "lit/decorators.js";
import PageLibrary from "../utils/page-library";

export abstract class ContentPageTemplate extends LitElement {
	// page details
	abstract pageId: string;

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

	@queryAll(".content-section")
	private _contentSectionsEl!: HTMLDivElement[];

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
			<div id="content-page-wrap" class="content-page-wrap scroll">
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
		this._contextMenu = selectedPage?.contextMenu || [];
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

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onContextMenuClick(contextId: string) {
		let contentSectionEl!: HTMLDivElement;
		this._contentSectionsEl.forEach((sectionEl) => {
			// find content section based on dataset
			if (sectionEl.dataset.contentSectionName === contextId) {
				contentSectionEl = sectionEl;
			}
		});
		// check if content section was found
		if (contentSectionEl) {
			contentSectionEl.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			console.warn("%c Unable to locate content section. Please verify your contextMenu config.", "font-size: 16px;", contextId);
			console.warn("%c Context menu config:", "font-size: 16px;", this._contextMenu);
			console.warn("%c Content Sections:", "font-size: 16px;", [...this._contentSectionsEl].map((sectionEl) => sectionEl.dataset.contentSectionName));
		}
	}

	private _onContentPageScroll(e: Event) {
		const contextMenuRect: DOMRect = this._contextMenuEl.getBoundingClientRect();
		// check if context menu container is outside of the view port
		if (contextMenuRect.top < 0) {
			this._contentListEl.classList.add("fixed");
		} else {
			this._contentListEl.classList.remove("fixed");
		}
	}
}
