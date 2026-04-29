// styles & mixins
import { styles } from "./styles/styles";

// web parts
// ...

// utils
import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { ParentPageTemplate } from "../parent-page-template";
import { page } from "../../utils/page-library";

// page config
import { pageConfig } from "./page-config";

@page(pageConfig)
@customElement("contact-page")
class ContactPage extends ParentPageTemplate {
	// page details
	pageConfig = pageConfig;
	customStyles = styles;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageContent(): TemplateResult {
		return html`
			CONTACT PAGE CONTENT
		`;
	};

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	// ...
}