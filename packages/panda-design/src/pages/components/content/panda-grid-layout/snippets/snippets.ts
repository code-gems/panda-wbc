export const installationSnippet = `npm install @panda-wbc/panda-grid-layout -S`;

export const implementationSnippet = `
import "@panda-wbc/panda-grid-layout";

const gridConfig = {
  panelSize: 300
};

<panda-grid-layout
  .gridConfig="\${gridConfig}"
  responsive
  @on-layout-change="\${handleLayoutChange}"
>
  <grid-layout-panel
    width="1"
    height="1"
	resizable
	movable
  >
	<div slot="drag-handle"></div>
  </grid-layout-panel>
</panda-grid-layout>
`;
