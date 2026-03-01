// types

// syntax highlighter
import { pandaSyntaxHighlighter } from "./panda-syntax-highlighter";

// style
import { styles } from "./styles/styles";

class PandaCode extends HTMLElement {
	/** Version of the component. */
	public static version = "1.0.0";

	// ================================================================================================================
	// PROPERTIES =====================================================================================================
	// ================================================================================================================
	
	static readonly observedAttributes = [
		"lang",
		"lines",
		"code",
		"trim-empty-lines",
	];

	// code ===========================================================================================================
	private _code = "";

	get code() {
		return this._code;
	}

	set code(value: string) {
		if (this._code !== value) {
			this._code = value;
		}
	}

	// lang ===========================================================================================================
	private _lang!: string;
	
	get lang(): string {
		return this._lang;
	}

	set lang(value: string) {
		if (this._lang !== value) {
			this._lang = value;
			
			// reflect to attribute
			if (value == null || value === "") {
				this.removeAttribute("lang");
			} else {
				this.setAttribute("lang", this._lang);
			}
		}
	}

	// lines ==========================================================================================================
	private _lines!: string;

	get lines(): string {
		return this._lines;
	}

	set lines(value: string) {
		if (this._lines !== value) {
			this._lines = value;

			// reflect to attribute
			if (value == null || value === "") {
				this.removeAttribute("lines");
			} else {
				this.setAttribute("lines", this._lines);
			}
		}
	}

	// trim empty lines ===============================================================================================
	private _trimEmptyLines = false;
	
	get trimEmptyLines() {
		return this._trimEmptyLines;
	}

	set trimEmptyLines(value: boolean) {
		if (this._trimEmptyLines !== value) {
			this._trimEmptyLines = value;
			// reflect to attribute
			if (value) {
				this.setAttribute("trim-empty-lines", "");
			} else {
				this.removeAttribute("trim-empty-lines");
			}
		}
	}
	
	// private properties =============================================================================================
	private _ready!: boolean;
	
	// elements
	private readonly _codeEl!: HTMLElement;
	private readonly _slotEl!: HTMLSlotElement;

	// events
	private readonly _slotChangeEvent!: any;

	// ================================================================================================================
	// LIFE CYCLE =====================================================================================================
	// ================================================================================================================
	
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		// apply component styles
		this._applyStyles();

		// create component template
		const template = document.createElement("template");
		template.innerHTML = /*html*/`
			<pre class="syntax" part="syntax">
				<code></code>
			</pre>
			<slot></slot>
		`;

		// apply template
		this.shadowRoot!.appendChild(template.content.cloneNode(true));

		// initialize class properties
		this._lang = "";
		this._lines = "";
		this._ready = false;

		console.log(`%c ⚡ shadowRoot`, "font-size: 24px; color: crimson; background: black;", this.shadowRoot);
		if (this.shadowRoot) {
			// get element handles
			this._codeEl = this.shadowRoot.querySelector("code") as HTMLElement;
			this._slotEl = this.shadowRoot.querySelector("slot") as HTMLSlotElement;

			console.log(`%c ⚡ _slotEl`, "font-size: 24px; color: crimson; background: black;", this._slotEl);

			
			// add event listeners to component template
			this._slotChangeEvent = this._onSlotChanged.bind(this);
			this._slotEl.addEventListener("slotchange", this._slotChangeEvent);
		}
	}

	connectedCallback() {
		this._ready = true;
		this._updateComponent();
	}

	attributeChangedCallback(_name: string, _oldValue: any, _newValue: any): void {
		// do not process if value did not change
		if (_oldValue === _newValue) {
			return;
		}
		switch (_name) {
			case "lang":
				this._lang = _newValue;
				break;
			case "lines":
				this._lines = _newValue;
				break;
		}
		// update component
		this._updateComponent();
	}

	private _updateComponent(): void {
		if (this._ready) {
			// get slot content
		}
	}

	// ================================================================================================================
	// HELPERS ========================================================================================================
	// ================================================================================================================

	/** Apply component styles to shadow root. */
	private _applyStyles(): void {
		const cssStyleSheet = new CSSStyleSheet();
		cssStyleSheet.replaceSync(styles);
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets = [cssStyleSheet];
		}
	}

	// ================================================================================================================
	// EVENTS =========================================================================================================
	// ================================================================================================================
	
	private _onSlotChanged(event: Event): void {
		console.log(`%c ⚡ (_onSlotChanged) innerHTML`, "font-size: 24px; color: crimson; background: black;", event.target);
		// check if slot has any content
		const assignedNodes = this._slotEl.assignedNodes({ flatten: true });

		// check if there are any assigned nodes
		if (assignedNodes.length > 0) {
			// get code from slot
			let code = "";

			assignedNodes.forEach((node) => {
				if (node.nodeType === Node.TEXT_NODE) {
					code += node.textContent;
				} else if (node.nodeType === Node.ELEMENT_NODE) {
					code += (node as HTMLElement).outerHTML;
				}
			});

			// check if slot is empty
			if (code.trim().length === 0) {
				console.log(`%c ⚡ (_onSlotChanged) empty slot content`, "font-size: 24px; color: crimson; background: black;");
				// set code property to code element
				this._codeEl.innerHTML = this._code;
			} else {
				console.log(`%c ⚡ (_onSlotChanged) code`, "font-size: 24px; color: crimson; background: black;", code);
				// highlight code
				const highlightedCode = pandaSyntaxHighlighter.highlight(code, this._lang);
				console.log(`%c ⚡ (_onSlotChanged) highlightedCode`, "font-size: 24px; color: crimson; background: black;", highlightedCode);
				// set highlighted code to code element
				this._codeEl.innerHTML = highlightedCode;
			}
		}
	}
}

// Register the custom element
if (!customElements.get("panda-code")) {
	customElements.define("panda-code", PandaCode);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-code": PandaCode;
	}
}