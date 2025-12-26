export const installationSnippet = `npm install @panda-wbc/panda-toggle -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-toggle";

<panda-toggle
  .checked="\${true}"
  @change="\${this._onChange}"
>
</panda-toggle>
`;
