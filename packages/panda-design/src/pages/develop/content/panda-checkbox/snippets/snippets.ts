export const installationSnippet = `npm install @panda-wbc/panda-checkbox -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-checkbox";

<panda-checkbox
  .checked="\$false"
  @change="\${this._onChange}"
>
  Remember me
</panda-checkbox>
`;
