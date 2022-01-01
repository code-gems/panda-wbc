// types

// styles
import { styles } from "./styles/styles";

// utils
import { LitElement, html } from "lit";
import {customElement, property} from 'lit/decorators.js';

@customElement("panda-flag")
export class PandaFlag extends LitElement {
    //css styles
    static styles = styles;


    @property({ type: String })
    flag!: string;

    // ================================================================================================================
    // ===================================================================================================== LIFE CYCLE
    // ================================================================================================================
    
    // ================================================================================================================
    // ====================================================================================================== RENDERERS
    // ================================================================================================================

    protected render() {
        return html`
            PANDA FLAG
        `;
    }
}
