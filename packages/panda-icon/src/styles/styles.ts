import { css } from "lit";

export const styles = css`
    :host {
        --panda-icon-width: 30px;
        --panda-icon-height: 30px;
        --panda-icon-fill-color: #000;
        --panda-icon-fill-primary-color: var(--panda-icon-fill-color);

        display: inline-block;
        width: var(--panda-icon-width);
        height: var(--panda-icon-height);
    }

    svg {
        fill: var(--panda-fill-color);
    }
`;