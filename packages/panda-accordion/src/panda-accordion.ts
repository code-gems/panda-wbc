// types

// styles
import { styles } from "./styles/styles";

// components
import "./panda-slideshow-slide";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";

@customElement("panda-slideshow")
export class PandaSlideshow extends LitElement {
	// css styles
	static get styles() {
		return styles;
	}

	@property({ type: Number, attribute: "selected-page" })
	selectedPage: number = 0;

	@property({ type: Boolean, attribute: "hide-pagination", reflect: true })
	hidePagination: boolean = false;

	// displays navigation pips
    hidePips: boolean = false;
    
    // animation speed
    animation: number = 300;
    
	// delay in ms
    delay: number = 0;
    
	// the interval in ms that the resize callback is fired
    throttle: number = 50;
    
	// swipe / mouse drag distance in px
    swipeThreshold: number = 50;
    
	// or 'horizontal'
    orientation: string = "vertical"; 
    
	// drag / scroll freely instead of snapping to the next page
    freeScroll: boolean = false;
    
	// nav elements
    // navPrevEl: false,
    // navNextEl: false,
    
	// infinite scroll
    infinite: boolean = false
    
	// default: false
    // slideshow: { // enable slideshow
    //   interval: 3000,
    //   delay: delay
    // },
    
	// easing function
    // easing: function easing(t, b, c, d, s) {
    //  return -c * (t /= d) * (t - 2) + b;
    // },
    
	// child selector
    // childSelector: '[data-anchor]',

	


	// elements
	private _fullPageRect!: DOMRect;

	@query("slot")
	private _slotEl!: HTMLSlotElement;

	@queryAssignedElements({ selector: "panda-full-page-content"})
	private _contentEls!: HTMLElement[]; 

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	firstUpdated(): void {
		console.log("%c 1. firstUpdated -> _slotEl", "font-size: 24px; color: green;", this._slotEl.assignedNodes({ flatten: true }));
		console.log("%c 2. firstUpdated -> _slotEl", "font-size: 24px; color: green;", this._slotEl.assignedNodes({ flatten: true }).filter((node) => node.nodeName === "PANDA-FULL-PAGE-CONTENT"));
		console.log("%c 3. firstUpdated -> _contentEls (winner)", "font-size: 24px; color: green;", this._contentEls);

		this._fullPageRect = this.getBoundingClientRect();
		console.log("%c 4. firstUpdated -> _fullPageRect", "font-size: 24px; color: green;", this._fullPageRect);
		// initialize pages position
		this._initPages();
	}

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<slot
				class="page-cont"
				part="page-cont"
				@wheel=${this._onPageScroll}
			>
			</slot>
		`;
	}
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _initPages(): void {
		this._contentEls.forEach((contentEl, index) => {
			contentEl.style.top = `${index * this._fullPageRect.height}px`;
		});
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onPageScroll(event: WheelEvent): void {
		event.preventDefault();
		const delta = Math.sign(event.deltaY);

		console.log("%c _onPageScroll -> event", "font-size: 24px; color: green;", event);
		console.log("%c _onPageScroll -> delta", "font-size: 24px; color: green;", delta);
		// const newPage = this.currentPage + delta;
	
		// if (newPage >= 0 && newPage < this.pages.length) {
		// 	this.currentPage = newPage;
		// 	this.scrollToPage(newPage);
		// }
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-slideshow": PandaSlideshow;
	}
}