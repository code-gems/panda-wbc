// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";


@customElement("panda-toast")
class PandaToastElement extends LitElement {
	static get styles() {
		return styles;
	}

	id!: string;

	title: string = "";
	
	message: string = "";

	interval: number = 3000;
	
	closable: boolean = true;
}