import { LitElement, html, css } from "lit";
import "../src/panda-router";

class DemoPage extends LitElement {
	// css styles
	static styles = css`

	`;

	private _routerConfig!: any;

	constructor() {
		super();
		// router config
		this._routerConfig = {
			404: html`(CUSTOM) #404 - Page not found`,
			"/": html`<home-page></home-page>`,
			"/home": html`<home-page></home-page>`,
			"/docs": html`DOCS`,
			"/about": html`ABOUT`,
		};
	}

	protected render() {
		return html`
			<panda-router
				.routerConfig="${this._routerConfig}"
				@navigate="${(e: any) => this._onNavigate(e)}"
			></panda-router>
		`;
	}

	private _onNavigate(e: any) {
		console.log("%c _onNavigate", "font-size: 24px; color: green;", e);
	}

}
window.customElements.define("demo-page", DemoPage);
