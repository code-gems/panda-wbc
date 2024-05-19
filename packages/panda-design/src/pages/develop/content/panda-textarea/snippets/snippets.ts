export const installationSnippet = `npm install @panda-wbc/panda-textarea -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-textarea";

<panda-textarea
  theme="primary"
  .rows="\${4}"
>
</panda-textarea>
`;

export const maxLengthFeatureSnippet = `
import "@panda-wbc/panda-textarea";

<panda-textarea .rows="\${50}"></panda-textarea>

// or as attribute

<panda-textarea maxlength="50"></panda-textarea>
`;