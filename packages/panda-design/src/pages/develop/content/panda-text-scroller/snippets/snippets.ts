export const installationSnippet = `npm install @panda-wbc/panda-text-scroller`;

export const implementationSnippet = `
// import types
import { PandaScrollerSpeed } from "@panda-wbc/panda-text-scroller/types";
// import component
import "@panda-wbc/panda-text-scroller";

<panda-text-scroller id="scroller">
  Some long text here that you want to scroll in case there is not enough space to display it
</panda-text-scroller>

// change scrolling speed
const textScrollerEl = document.getElementById("scroller);
textScrollerEl.speed = ScrollerSpeed.SLOWER;
`;
