# Welcome to Panda Design

## Docs

### Adding new demo page

To create new component demo page:
1. Create new folder in `pages/docs/demo-pages/`
1. In your new folder, create two files:
	- `demo-page.ts`
	- `page-config.ts`
1. Define all page attributes in `page-config.ts`:
```javascript
	export const pageId = "panda-button"; // unique ID for this demo page
	export const pageName = "Button"; // this name will appear on the side menu
	export const pageUri = "/docs?demo=panda-button"; // url assigned to panda-router
	export const keywords = ["button", "form"]; // define some keywords to help find your page in global search
	export const description = ["Showcase of a panda-button element."]; // write some description of your demo page to help users understand what is this page about
	export const contextMenu = []; // context menu content that will appear on the right side
```


## Change Log

TBD