export const installationSnippet = `npm install @panda-wbc/panda-callout -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-callout";

<panda-callout
  theme="warn"
  @on-close="\${this._onCloseCallout}"
  closable
>
	This field is mandatory.
</panda-callout>
`;
