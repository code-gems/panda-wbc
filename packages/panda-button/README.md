# Welcome to Panda Button
Panda Button is a Lit based web component that adds buttons to your UI. Extremely lightweight and easy to use.
Enjoy!

### Installation
```npm install @panda/panda-button -S```

or 

```yarm add @panda/panda-button```

### Usage

```html
<panda-button
	.disabled="${true/false}"
	.busy="${true/false}"
	@click="${...}"
>
	<div slot="prefix">{prefix icon}</div>
	MY AWESOME BUTTON
	<div slot="suffix">{suffix icon}</div>
</panda-button>
```

## Change Log

TBD