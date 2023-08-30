# Welcome to Panda Tooltip
Panda Tooltip is a Lit based web component. Allows you to create tooltips with custom content.

### Installation
```npm install @panda-wbc/panda-tooltip -S```

or 

```yarn add @panda-wbc/panda-tooltip```

### Usage

```html
<panda-tooltip
	.opened="${true}"
	@on-tooltip-close="${this._onTooltipClose}"
>
	<template>
		My tooltip content here
	</template>
</panda-tooltip>
```

OR

```html
<panda-tooltip
	opened
	@on-tooltip-close="${this._onTooltipClose}"
>
	<div template>
		My tooltip content here
	</div>
</panda-tooltip>
```

## Change Log

TBD
