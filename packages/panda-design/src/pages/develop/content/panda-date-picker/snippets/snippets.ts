export const installationSnippet = `npm install @panda-wbc/panda-date-picker -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-date-picker";

<panda-date-picker
  .checked="\$false"
  @change="\${this._onChange}"
>
</panda-date-picker>
`;
