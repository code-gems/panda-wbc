// style
import { styles } from "./styles/styles";

// components
import "@panda-wbc/panda-spinner";

export class PandaButtonNew extends HTMLElement {
	
constructor() {
                super();
                this.attachShadow({ mode: 'open', delegatesFocus: true });

                const template = document.createElement('template');
                template.innerHTML = `
                    <style>
                        :host {
							position: sticky;
							display: inline-block;
                            height: var(--panda-button-height-size-m, 40px);
                            user-select: none;
                            outline: none;
                        }

                        .button {
                            position: relative;
                            display: flex;
                            align-items: center;
                            width: fit-content;
                            height: 100%;
                            padding: 0px 16px;

                    		outline: none;
                            cursor: pointer;

                            
                            border-radius: 10px;
                            border: solid 1px transparent;
                            background: #E4E4E4;
                            background-clip: padding-box;
                            box-shadow: 0px 1px 0px #ECECEC inset,
                                0px -1px 0px #DDDDDD inset,
                                0px 1px 2px hsl(0deg 0% 0% / 10%);
                            box-sizing: border-box;
                        }
                        
                        .button::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            margin: -1px;

                            border-radius: inherit;
                            background: linear-gradient(to bottom, #fff, #000);
                            z-index: -1;
                        }
                        
                        .label {
                            display: flex;
                            align-items: center;
                            height: 100%;
                            color: #000;
                            font-size: 14px;
                            font-weight: 700;
                            font-family: "Poppins", sans-serif;
                        }
                    </style>
                    <div class="button">
                        <slot name="prefix"></slot>
                        <div class="label"><slot></slot></div>
                        <slot name="suffix"></slot>
                    </div>
                `;
                this.shadowRoot!.appendChild(template.content.cloneNode(true));
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

}

// Register the custom element
if (!customElements.get("panda-button-new")) {
	customElements.define("panda-button-new", PandaButtonNew);
}

declare global {
	interface HTMLElementTagNameMap {
		"panda-button-new": PandaButtonNew;
	}
}
