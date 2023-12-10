export const installationSnippet = `npm install @panda-wbc/panda-text-field -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  theme="primary"
  @click="\${this._onClick}"
  .disabled="\${true}"
  .working="\${true}"
>
  MY BUTTON
</panda-button>
`;

export const defaultStateSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  @click="\${this._onClick}"
>
  MY BUTTON
</panda-button>
`;

export const disabledStateSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  .disabled="\${true}"
>
  MY BUTTON
</panda-button>
`;

export const workingStateSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  .working="\${true}"
>
  MY BUTTON
</panda-button>
`;