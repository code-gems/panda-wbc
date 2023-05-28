# Welcome to Panda Design

## 📜 Docs

### Adding new demo page

To create new component demo page:
1. Create new folder in `src/pages/docs/demo-pages/` eg. `my-component`
1. In your new folder, create two files:
	- `demo-page.ts`
	- `page-config.ts`
1. Define all page attributes in `page-config.ts`:
```javascript
	// page-config.ts file:
	export const pageId = "my-component"; // unique ID for this demo page
	export const pageName = "My Component"; // this name will appear on the side menu
	export const pageUri = "/develop?content=my-component"; // url assigned to panda-router
	export const keywords = ["cool", "awesome"]; // define some keywords to help find your page in global search
	export const description = ["Showcase of an awesome component."]; // write some description of your demo page to help users understand what is this page about
	export const contextMenu = []; // context menu content that will appear on the right side
```
1. Create your demo page `demo-page.ts`:
```javascript
	// demo-page.ts file:
	// types
	import { PageCategory } from "panda-design-typings";

	// styles
	// ...

	// components
	import "@panda-wbc/my-component"; // don't forget to import your awesome component

	// utils
	import { html, LitElement } from "lit";
	import { customElement } from "lit/decorators.js";
	import { page } from "../../../../common/page-library";
	import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

	@customElement("my-component-content-page")
	@page({
		pageId,
		pageName,
		pageUri,
		category: PageCategory.DEVELOP, // category of page
		keywords,
		description,
		contextMenu,
		template: html`<my-component-content-page></my-component-content-page>`
	})
	export class MyComponentDemoPage extends LitElement {
		protected render() {
			return html`
				... your demo page template here ...
			`;
		}
	}
```
1. Import your new demo page in demo page loader file `src/pages/docs/loader.ts`
```javascript
	// loader.ts file:
	import "./demo-pages/my-component/demo-page"; // import your demo page file (.ts)
```
## Change Log

TBD