// types
import { PandaIconTemplate } from "../../index";

export const mapIcons: PandaIconTemplate[] = [
	{ name: "briefcase", template: `<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>` },
	{
		name: "briefcase-outline",
		template: `
			<path d="M14 11H10V13H14V11Z"/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 
				6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7Z
				M9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4Z
				M3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
			/>
		`
	},
	{
		name: "terrain",
		template: `
			<path d="M8 10L3 18H13L8 10Z"/>
			<path d="M10.5286 10.7543L13.5 6L21 18H15.0572L10.5286 10.7543Z"/>
		`
	},


];
