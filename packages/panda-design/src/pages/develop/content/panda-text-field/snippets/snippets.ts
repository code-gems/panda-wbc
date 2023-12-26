export const installationSnippet = `npm install @panda-wbc/panda-text-field -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-text-field";

<panda-text-field
  .value="\${'Hello World!'}"
  @on-input="\${this._onInput}"
  .disabled="\${false}"
  .working="\${false}"
>
</panda-text-field>
`;

export const defaultStateSnippet = `
import "@panda-wbc/panda-text-field";

<panda-text-field
  @click="\${this._onClick}"
>
</panda-text-field>
`;

export const disabledStateSnippet = `
import "@panda-wbc/panda-text-field";

<panda-text-field
  .disabled="\${true}"
>
</panda-text-field>
`;

export const workingStateSnippet = `
import "@panda-wbc/panda-text-field";

<panda-text-field
  .working="\${true}"
>
</panda-text-field>
`;