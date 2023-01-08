# Welcome to Panda Design

## Docs

### Adding new demo page

To create new component demo page:
1. Create new folder in `src/pages/docs/demo-pages/` eg. `my-component`
1. In your new folder, create two files:
	- `demo-page.ts`
	- `page-config.ts`
1. Define all page attributes in `page-config.ts`:
```javascript
	export const pageId = "my-component"; // unique ID for this demo page
	export const pageName = "My Component"; // this name will appear on the side menu
	export const pageUri = "/docs?demo=my-component"; // url assigned to panda-router
	export const keywords = ["cool", "awesome"]; // define some keywords to help find your page in global search
	export const description = ["Showcase of an awesome component."]; // write some description of your demo page to help users understand what is this page about
	export const contextMenu = []; // context menu content that will appear on the right side
```
1. Create your demo page:
```javascript
	// types
	import { PageCategory } from "panda-design-typings";

	// styles
	// ...

	// components
	import "@panda-wbc/my-component";

	// utils
	import { html, LitElement } from "lit";
	import { customElement } from "lit/decorators.js";
	import { page } from "../../../../common/page-library";
	import { pageId, pageName, pageUri, keywords, description, contextMenu } from "./page-config";

	@customElement("my-component-demo-page")
	@page({
		pageId,
		pageName,
		pageUri,
		category: PageCategory.DOCS,
		keywords,
		description,
		contextMenu,
		template: html`<my-component-demo-page></my-component-demo-page>`
	})
	export class MyComponentDemoPage extends LitElement {
		protected render() {
			return html`
				...
			`;
		}
	}

```


## Change Log

TBD