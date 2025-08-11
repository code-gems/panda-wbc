# Welcome to Panda Text Slider
The `Panda Text Slider` takes an array of text values provided by the developer and cycles 
through them with elegant animation effects, creating an engaging way to showcase multiple 
messages, features, or information snippets in a single compact space. 
This component enhances user interfaces by delivering varied content while maintaining 
a clean layout and drawing attention through its fluid text transitions.

### Installation
```npm install @panda-wbc/panda-text-slider```

or 

```yarn add @panda-wbc/panda-text-slider```

### Usage

```html
<panda-text-slider></panda-text-slider>
```

```typescript
const textSliderEl = document.querySelector("panda-text-slider");
textSliderEl.slides = [
	"The `Panda Text Slider` takes an array of text values provided by the developer and cycles ",
	"through them with elegant animation effects, creating an engaging way to showcase multiple ",
	"messages, features, or information snippets in a single compact space. ",
	"This component enhances user interfaces by delivering varied content while maintaining ",
	"a clean layout and drawing attention through its fluid text transitions.",
];
```

## Change Log

TBD