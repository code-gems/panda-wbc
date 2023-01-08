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
	export const pageId = "panda-button";
	export const pageName = "Button";
	export const pageUri = "/docs?demo=panda-button";
	export const keywords = ["button"];
	export const description = ["Text Editor description"];
	export const contextMenu = [];
```


## Change Log

TBD