export const installationSnippet = `npm i @panda-wbc/panda-combo-box -S`;

export const usageSnippet = `
<panda-combo-box
  .value="\${this.value}"
  .items="\${this.items}"
  @change="\${this.onChange}"
>
</panda-combo-box>
`;

export const rendererFeatureSnippet = `
const customStyle = css\`
  .language {
    display: flex;
    flex-flow: row nowrap;
    gap: var(--panda-padding-m);
    height: 100%;
  }
  
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--panda-component-size);
    height: 100%;
  }
  
  .label {
    line-height: var(--panda-component-size-m);
  }
\`;

const customRenderer = ({ label, value, active, selected, data }) => {
  return html\`
    <div class="language">
        <div class="icon">
            <panda-flag flag="\${value}"></panda-flag>
        </div>
        <div class="label">\${label}</div>
    </div>
  \`;
}

<panda-combo-box
  .value="\${this.value}"
  .items="\${this.items}"
  @change="\${this.onChange}"
  .renderer="\${customRenderer}"
  .customStyle="\${customStyle}"
>
</panda-combo-box>
`;
