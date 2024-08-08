// types

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-pips-pager";
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

	@property({ type: Number, attribute: "selected", reflect: true })
	selected: number = 0;

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
    
	// or 'vertical'
    orientation: string = "horizontal"; 
    
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

	

	// props for calculations
	private _slideWidth: number = 300; // width of a slide
	private _slideHeight: number = 250; // height of a slide
	private _slideGap: number = 10; // gap between slides


	// elements
	@query("#slideshow")
	private _slideshowEl!: HTMLElement;

	private _slideshowRect!: DOMRect;

	@queryAssignedElements({ selector: "panda-slideshow-slide"})
	private _slideEls!: HTMLElement[]; 

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================

	firstUpdated(): void {
		const _computedStyle = getComputedStyle(this);
		// get slide size
		const _slideWidth = _computedStyle.getPropertyValue("--panda-slideshow-slide-width");
		this._slideWidth = parseInt(_slideWidth) || 300;
		const _slideHeight = _computedStyle.getPropertyValue("--panda-slideshow-slide-height");
		this._slideHeight = parseInt(_slideHeight) || 250;
		console.log("%c 💎 _slideSize", "font-size: 24px; color: blueviolet;", this._slideWidth, this._slideHeight);

		// get slide gap
		const _slideGap = _computedStyle.getPropertyValue("--panda-slideshow-slide-gap");
		this._slideGap = parseInt(_slideGap) || 10;
		console.log("%c 💎 _slideGap", "font-size: 24px; color: blueviolet;", this._slideGap);


		
		console.log("%c 💎 firstUpdated -> _contentEls", "font-size: 24px; color: blueviolet;", this._slideEls);
		this._slideshowRect = this._slideshowEl.getBoundingClientRect();
		console.log("%c 💎 firstUpdated -> slideshow RECT", "font-size: 24px; color: blueviolet;", this._slideshowRect);
		// initialize pages position
		this._initSlideshow();
	}



	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	protected render(): TemplateResult {
		return html`
			<div
				class="slideshow-cont"
				part="slideshow-cont"
			>
				<slot
					id="slideshow"
					class="slideshow"
					part="slideshow"
					@wheel=${this._onPageScroll}
				>
				</slot>
				<div class="pagination">
					<panda-pips-pager
					
					>
					</panda-pips-pager>
				</div>
			</div>
		`;
	}
	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	private _initSlideshow(): void {

		this._slideEls.forEach((contentEl, index) => {
			contentEl.style.top = `0px`;
			const _left = (index * this._slideWidth) + (index * this._slideGap);
			contentEl.style.left = `${_left}px`;
		});

		// 0 -> 
		// 1 -> 
		// 2 -> 
		// 3 -> 

		// 4 -> 0
		// 5 -> 0
		// 6 -> 0
		// 7 -> 0
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