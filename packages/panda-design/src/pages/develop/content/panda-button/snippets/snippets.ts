export const installationSnippet = `npm install @panda-wbc/panda-button -S`;

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

export const busyStateSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  .busy="\${true}"
>
  MY BUTTON
</panda-button>
`;

export const infoThemeSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  theme="info"
>
  MY BUTTON
</panda-button>
`;

export const doneThemeSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  theme="done"
>
  MY BUTTON
</panda-button>
`;

export const warnThemeSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  theme="warn"
>
  MY BUTTON
</panda-button>
`;

export const alertThemeSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  theme="alert"
>
  MY BUTTON
</panda-button>
`;

export const primaryThemeSnippet = `
import "@panda-wbc/panda-button";

<panda-button
  theme="primary"
>
  MY BUTTON
</panda-button>
`;
