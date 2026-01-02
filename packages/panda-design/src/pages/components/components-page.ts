// types
import { PageCategory } from "panda-design-typings";

// styles & mixins
import { styles } from "./styles/styles";

// web parts
import "../../web-parts/app-side-bar/app-side-bar";
import "../../web-parts/app-submenu/app-submenu";

// load demo pages
import "./loader";

// utils
import { TemplateResult, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ParentPageTemplate } from "../parent-page-template";
import { pageConfig } from "./page-config";
import { page } from "../../utils/page-library";

@page(pageConfig)
@customElement("components-page")
class ComponentsPage extends ParentPageTemplate {
	// parent page props
	public customStyles = styles;
	pageCategory: PageCategory = PageCategory.DEVELOP;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderBanner(): TemplateResult {
		return html`
			<div class="banner">
				<div class="content">
					<h1>COMPONENTS</h1>
					<p>
						Welcome to Panda Components Section.
						Panda Components is a collection of pre-built and reusable user interface components and elements that are specifically designed for a particular application or website. 
					</p>
				</div>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderAboutSection()}
		`;
	}

	private _renderAboutSection(): TemplateResult {
		return html`
			<div class="cards">
				<div class="card">
					<h1>Tailored Design & Branding</h1>
					<p>
						Unlike generic UI libraries, a panda element library is tailored to match the unique design requirements and branding of a specific application or website. 
						The elements within the library are carefully crafted to reflect the visual identity, color scheme, typography, and overall style guidelines of the project. 
						This ensures a cohesive and visually pleasing user experience that aligns with the brand's image.
					</p>
				</div>
				<div class="card">
					<h1>Consistency & Efficiency</h1>
					<p>
						By utilizing a custom element library, developers can ensure a consistent look and feel throughout the application or website. 
						Since the elements are pre-designed and thoroughly tested, they maintain a standardized behavior and visual consistency across different screens and interactions. 
						This consistency not only enhances the user experience but also improves development efficiency as developers can reuse and modify existing components rather than starting from scratch.
					</p>
				</div>
				<div class="card">
					<h1>Flexibility & Extensibility</h1>
					<p>
						While a custom element library provides a set of predefined components, it should also allow for flexibility and extensibility. 
						Developers should be able to customize the elements to suit specific needs or create new components that seamlessly integrate with the existing library. 
						This flexibility ensures that the library can adapt to evolving design requirements and accommodate future enhancements.
					</p>
				</div>
			</div>
		`;
	}

	private _renderComponentCardsSection(): TemplateResult {
		return html`
		
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}