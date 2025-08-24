// types
import {
	ComponentEventDetails,
	ComponentPropertyDetails,
	ContentSectionName,
} from "panda-design-typings";
import { PandaParticleBannerConfig } from "@panda-wbc/panda-particle-banner";

// styles
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-text-field";
import "@panda-wbc/panda-icon";
// import "@panda-wbc/panda-particle-banner";

// utils
import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { page } from "../../../../utils/page-library";
import { ContentPageTemplate } from "../../../content-page-template";
import { pageConfig } from "./page-config";

// code snippets
import {
	busyStateSnippet,
	disabledStateSnippet,
	implementationSnippet,
	installationSnippet,
} from "./snippets/snippets";
import { PandaTextFieldOnInputEvent } from "@panda-wbc/panda-text-field";
import { PandaComboBoxChangeEvent } from "@panda-wbc/panda-combo-box";

@page(pageConfig)
@customElement("panda-text-field-content-page")
export class PandaTextFieldContentPage extends ContentPageTemplate {
	// page details
	public pageId: string = pageConfig.pageId;
	public customStyles: CSSResultGroup = styles;

	private readonly _componentProperties: ComponentPropertyDetails[] = [
		{ name: "value", type: "String", defaultValue: "-", description: "Component input value." },
		{ name: "label", type: "String", defaultValue: "-", description: "Component label that appears above the component." },
		{ name: "placeholder", type: "String", defaultValue: "-", description: "Placeholder text shown in case no initial value is provided." },
		{ name: "disabled", type: "Boolean", defaultValue: "false", description: "Sets a disabled state for the component." },
		{ name: "busy", type: "Boolean", defaultValue: "false", description: "Sets busy state for the component." },
		{ name: "autofocus", type: "Boolean", defaultValue: "false", description: "Sets the focus to the component on page load." },
		{ name: "autoselect", type: "Boolean", defaultValue: "false", description: "Select component value when given focus." },
		{ name: "spellcheck", type: "Boolean", defaultValue: "false", description: "Enables spellcheck for the entered values." },
		{ name: "mandatory", type: "Boolean", defaultValue: "false", description: "Visually indicates required field if value is not set." },
		{ name: "theme", type: "String", defaultValue: "-", description: "Apply one of the color themes to the component.." },
		{ name: "spinnerType", type: "String", defaultValue: "dots", description: "Spinner animation type for busy state." },
	];

	private readonly _componentEvents: ComponentEventDetails[] = [
		{ name: "@on-input", returnType: "PandaTextFieldOnInputEvent", description: "Triggered every time user inputs a new value." },
		{ name: "@change", returnType: "PandaTextFieldOnInputEvent", description: "Triggered every time component's value changes." },
	];

	private _componentInterface: ComponentEventDetails[] = [
		{ name: "focus()", returnType: "void", description: "Set focus to the input field." },
		{ name: "clear()", returnType: "void", description: "Clears input value and triggers @on-input event." },
	];

	// demo props
	@state()
	private _selectedDemoTheme = "";

	private readonly _themeList = [
		"[default]",
		"size-s",
		"size-l",
		"size-xl",
		"valid",
		"invalid",
		"mandatory",
	];

	@state()
	private _value: any = "";

	@state()
	private _label: any = "Test label:";

	@state()
	private _description: any = null;
	
	@state()
	private _placeholder: string | string[] = ["Enter...", "your name", "and last name"];

	@state()
	private _working = false;

	@state()
	private _readonly = false;

	@state()
	private _disabled = false;

	@state()
	private _mandatory = false;

	@state()
	private _spellcheck = false;

	@state()
	private _autoselect = false;

	@state()
	private _autocomplete = false;

	@state()
	private _maxLength: number | null = null;
	
	@state()
	private _showCharacterCounter = false;

	// ================================================================================================================
	// RENDERERS ======================================================================================================
	// ================================================================================================================

	_renderPageBanner(): TemplateResult {
		return html`
			<div class="banner small">
				<h1>TEXT FIELD</h1>
				<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
			</div>
		`;
		const primaryColor = getComputedStyle(this).getPropertyValue("--panda-primary-color");
		const secondaryColor = getComputedStyle(this).getPropertyValue("--panda-secondary-color");
		const tertiaryColor = getComputedStyle(this).getPropertyValue("--panda-tertiary-color");

		const bannerConfig: PandaParticleBannerConfig = {
			particleGroup: [{
				particleCount: 50,
				blur: true,
				colors: [primaryColor, secondaryColor, tertiaryColor]
			}]
		};
		return html`
			<div class="banner small particle-banner">
				<panda-particle-banner
					.config="${bannerConfig}"					
				>
					<div class="content">
						<h1>TEXT FIELD</h1>
					</div>
					<version-shield prefix="version" version="1.0.0" color="orange"></version-shield>
				</panda-particle-banner>
			</div>
		`;
	}

	_renderPageContent(): TemplateResult {
		return html`
			${this._renderOverviewSection()}
		`;
		// return html`
		// 	${this._renderOverviewSection()}
		// 	${this._renderInstallationSection()}
		// 	${this._renderUsageSection()}
		// 	${this._renderComponentStatesSection()}
		// `;
	}

	private _renderOverviewSection(): TemplateResult {
		return html`
			<!-- OVERVIEW -->
			<div class="content-section" data-content-section-name="${ContentSectionName.OVERVIEW}">
				<div class="section">
					<internal-link theme="h2">Overview</internal-link>
					<p>
						The text field component provides users with a standard input for entering single-line text 
						content such as names, email addresses, or search queries. 
						It supports various states including default, focused, readonly, and disabled, 
						with built-in validation styling and accessibility features. 
					</p>
					<p>
						The component accepts customizable placeholder text, labels, and helper messages to guide user input. 
						Text field can be configured with different sizes as well as prefix/suffix icons for enhanced functionality. 
						Use text fields when you need to collect short, structured text input from users in forms or data entry workflows.
					</p>
				</div>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="rows">

							<div class="row">
								<div class="col-3">
									<panda-combo-box
										.value="${this._selectedDemoTheme}"
										.items="${this._themeList}"
										@change="${this._onThemeChange}"
									>
									</panda-combo-box>
								</div>
							</div><!-- row -->

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onSetValue}">
										Set Value
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onSetValueAsync}">
										Set Value (Async)
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onChangeValue}">
										Change Value
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onRemoveValue}">
										Remove Value
									</panda-button>
								</div>
							</div><!-- row -->

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onChangeLabel}">
										Change Label
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onRemoveLabel}">
										Remove Label
									</panda-button>
								</div>
								<div class="col-6">
									<panda-button @click="${this._onToggleReadonlyAsync}">
										Toggle Readonly Async (${this._readonly ? "ON" : "OFF"})
									</panda-button>
								</div>
							</div><!-- row -->

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleReadonly}">
										Toggle Readonly (${this._readonly ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleWorking}">
										Toggle Working (${this._working ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleDisable}">
										Toggle Disable (${this._disabled ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleMandatory}">
										Toggle Mandatory (${this._mandatory ? "ON" : "OFF"})
									</panda-button>
								</div>
							</div><!-- row -->

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleSpellcheck}">
										Toggle Spellcheck (${this._spellcheck ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleAutoselect}">
										Toggle Autoselect (${this._autoselect ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleAutocomplete}">
										Toggle Autocomplete (${this._autocomplete ? "ON" : "OFF"})
									</panda-button>
								</div>

							</div><!-- row -->

							<div class="row">
								<div class="col-3">
									<panda-button @click="${this._onToggleDescription}">
										Toggle description (${this._description != null ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleMaxLength}">
										Toggle Max Length (${this._maxLength ? "ON" : "OFF"})
									</panda-button>
								</div>
								<div class="col-3">
									<panda-button @click="${this._onToggleCharacterCounter}">
										Toggle Char Counter (${this._showCharacterCounter ? "ON" : "OFF"})
									</panda-button>
								</div>
							</div><!-- row -->

							<div class="row">

								<div class="col-3">
									<panda-text-field
										.theme="${this._selectedDemoTheme}"
										.label="${this._label}"
										.placeholder="${this._placeholder}"
										.placeholderInterval="${500}"
										.description="${this._description}"
										.value="${this._value}"
										.minLength="${3}"
										.maxLength="${this._maxLength}"
										.working="${this._working}"
										.readonly="${this._readonly}"
										.disabled="${this._disabled}"
										.mandatory="${this._mandatory}"
										.spellcheck="${this._spellcheck}"
										.autoselect="${this._autoselect}"
										.autocomplete="${this._autocomplete ? "username email" : "off"}"
										.showCharacterCounter="${this._showCharacterCounter}"
										@on-input="${this._onInput}"
										spinner-type="google"
									>
										<div slot="prefix" class="icon">
											<panda-icon icon="user"></panda-icon>
										</div>
										<div slot="suffix">
											.com
										</div>
									</panda-text-field>
								</div>
<!--
								<div class="col-3">
									<panda-text-field
										label="Working"
										placeholder="Enter..."
										working
										.value="${"Doe"}"
										@on-input="${this._onInput}"
									>
									</panda-text-field>
								</div>

								<div class="col-3">
									<panda-text-field
										label="Readonly"
										placeholder="Enter..."
										readonly
										.value="${"Wall St."}"
										@on-input="${this._onInput}"
									>
									</panda-text-field>
								</div>

								<div class="col-3">
									<panda-text-field
										label="Disabled"
										placeholder="Enter..."
										disabled
										.value="${"Wall St."}"
										@on-input="${this._onInput}"
									>
									</panda-text-field>
								</div>
-->
						</div><!-- row -->

						</div><!-- rows -->
					</div><!-- sample -->
				</div><!-- sample cont -->
			</div>
		`;
	}

	private _renderInstallationSection(): TemplateResult {
		return html`
			<!-- INSTALLATION -->
			<div class="content-section" data-content-section-name="${ContentSectionName.INSTALLATION}">
				<div class="section">
					<internal-link theme="h2">Installation</internal-link>
					<p>
						Start by initiating the installation of the npm library through a command executed in either the terminal or command prompt.
						Utilize the package manager, indicating both the library name and its version for installation.
					</p>
	
					<code-sample header="Installation">
						${installationSnippet}
					</code-sample>
				</div>
			</div>
		`;
	}
	
	private _renderUsageSection(): TemplateResult {
		return html`
			<!-- USAGE -->
			<div class="content-section" data-content-section-name="${ContentSectionName.USAGE}">
				<div class="section">
					<internal-link theme="h2">Usage</internal-link>
					<p>
						Please refer below for instructions on utilizing our component. Experiment with the provided sample code to explore all the features of the component.
					</p>
	
					<code-sample header="Implementation">
						${implementationSnippet}
					</code-sample>
				</div>

				${this._renderComponentPropertiesSection()}
				${this._renderComponentEventsSection()}
				${this._renderComponentInterfaceSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderComponentPropertiesSection(): TemplateResult {
		return html`
			<!-- COMPONENT PROPERTIES -->
			<div class="section">
				<h3>Properties</h3>
				<p>
					Component properties play a crucial role in specifying the component's behavior, appearance, and functionality, 
					and they are frequently employed for data binding purposes. 
				</p>
				<p>
					Here is a compilation of the supported properties/attributes for this particular component:
				</p>
				
				${this._renderComponentPropertyTable(this._componentProperties)}
			</div>
		`;
	}

	private _renderComponentEventsSection(): TemplateResult {
		return html`
			<!-- COMPONENT EVENTS -->
			<div class="section">
				<h3>Events</h3>
				<p>
					Component events are instrumental in elevating the interactivity and adaptability of software applications. 
					These events serve as carefully designed triggers that facilitate communication between the component and the application, 
					frequently enabling the exchange of data and actions across diverse user interface elements.
				</p>
				<p>
					See list of events provided below:
				</p>
				
				${this._renderComponentEventsTable(this._componentEvents)}
			</div>
		`;
	}

	private _renderComponentInterfaceSection(): TemplateResult {
		return html`
			<!-- COMPONENT INTERFACE -->
			<div class="section">
				<h3>Interface</h3>
				<p>
					Component interface allow developers to interact with and manipulate component from the code level.
					These APIs provide the means to access and control various aspects and functionalities of the element dynamically.
				</p>
				<p>
					See list of available APIs below:
				</p>
				
				${this._renderComponentEventsTable(this._componentInterface)}
			</div>
		`;
	}

	private _renderComponentStatesSection(): TemplateResult {
		return html`
			<!-- COMPONENT STATES -->
			<div class="content-section" data-content-section-name="${ContentSectionName.COMPONENT_STATES}">
				<div class="section">
					<internal-link theme="h2">Component States</internal-link>
					<p>
						Web components typically have different states that reflect their behavior and appearance based on user interaction or application logic.
						Below is the list of few states that are typical to this component:
					</p>
					<ul>
						<li>Default</li>
						<li>Disabled</li>
						<li>Busy</li>
					</ul>
				</div>

				${this._renderDefaultComponentStateSection()}
				${this._renderDisabledComponentStatesSection()}
				${this._renderBusyComponentStatesSection()}
			</div> <!-- END OF CONTENT SECTION -->
		`;
	}

	private _renderDefaultComponentStateSection(): TemplateResult {
		return html`
			<div class="section">
				<h3>Default</h3>
				<p>
					The default state represents the initial appearance and behavior of the component when it is first rendered or loaded.
					It reflects the component's default settings and may display placeholder content or default styling.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${"First Name:"}"
											.placeholder="${"Enter..."}"
											@on-input="${this._onInput}"
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	private _renderDisabledComponentStatesSection() {
		return html`
			<div class="section">
				<h3>Disabled</h3>
				<p>
					Components can enter a disabled state when they are not editable or interactable.
					Component is then visually presented as disabled, providing clarity to user that they cannot be modified.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${"First Name:"}"
											.placeholder="${"Enter..."}"
											.value="${"James"}"
											@on-input="${this._onInput}"
											disabled
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Disabled State Example">
					${disabledStateSnippet}
				</code-sample>
			</div>
		`;
	}

	private _renderBusyComponentStatesSection() {
		return html`
			<div class="section">
				<h3>Busy</h3>
				<p>
					Components can enter a disabled state when they are not editable or interactable.
					Component is then visually presented as disabled, providing clarity to user that they cannot be modified.
				</p>

				<!-- SAMPLE -->
				<div class="sample-cont">
					<div class="sample">
						<div class="form">
							<div class="form-section">
								<div class="row">
									<div class="col-full">
										<panda-text-field
											.label="${"First Name:"}"
											.placeholder="${"Enter.."}"
											.value="${"James"}"
											@on-input="${this._onInput}"
											busy
										>
										</panda-text-field>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<code-sample header="Busy State Example">
					${busyStateSnippet}
				</code-sample>
			</div>
		`;
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================

	private _onInput(event: PandaTextFieldOnInputEvent) {
		console.log("%c 🔥 [TEXT FIELD DEMO PAGE] _onInput::value", "font-size: 24px; color: orange;", event.detail.value);
		this._value = event.detail.value;
	}
	
	private _onThemeChange(event: PandaComboBoxChangeEvent): void {
		this._selectedDemoTheme = event.detail.value;
	}
	
	private _onSetValue(): void {
		this._value = "Big Body Niggas!";
	}
	
	private _onChangeValue(): void {
		this._value = "Value: " + new Date().getTime();
	}
	
	private _onRemoveValue(): void {
		this._value = null;
	}
	
	private _onChangeLabel(): void {
		this._label = "Label: " + new Date().getTime();
	}
	
	private _onRemoveLabel(): void {
		this._label = null;
	}
	
	private async _onSetValueAsync(): Promise<void> {
		await new Promise((r) => setTimeout(r, 2000));
		this._value = "Big Body Niggas! (Async)";
	}

	private _onToggleReadonly(): void {
		this._readonly = !this._readonly;
	}

	private async _onToggleReadonlyAsync(): Promise<void> {
		await new Promise((r) => setTimeout(r, 2000));
		this._readonly = !this._readonly;
	}

	private _onToggleWorking(): void {
		this._working = !this._working;
	}

	private _onToggleDisable(): void {
		this._disabled = !this._disabled;
	}

	private _onToggleMandatory(): void {
		this._mandatory = !this._mandatory;
	}

	private _onToggleAutoselect(): void {
		this._autoselect = !this._autoselect;
	}

	private _onToggleAutocomplete(): void {
		this._autocomplete = !this._autocomplete;
	}

	private _onToggleSpellcheck(): void {
		this._spellcheck = !this._spellcheck;
	}

	private _onToggleDescription(): void {
		this._description = this._description == null
			? "Apply the received code as a voucher code at the payment page."
			: null;
	}

	private _onToggleMaxLength(): void {
		this._maxLength = this._maxLength
			? null
			: 30;
	}

	private _onToggleCharacterCounter(): void {
		this._showCharacterCounter = !this._showCharacterCounter;
	}
}