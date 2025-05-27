# Welcome to Panda Chips
Panda Chips component is a compact UI element that represents discrete information, such as tags, categories, or user inputs. 
It is commonly used in forms or interfaces to allow users to input, select, or manage items dynamically, enhancing interactivity and organization.

### Installation
```npm install @panda-wbc/panda-chips```

or 

```yarn add @panda-wbc/panda-chips```

### Usage

```html
<panda-chips
	.chips="${chips}"
	@change="${onChange}"
	@chip-added="${onChipAdded}"
	@chip-removed="${onChipRemoved}"
	.validateInput="${validateInput}"
	allow-input
	disabled
	busy
>
</panda-chips>
```

## Change Log

TBD