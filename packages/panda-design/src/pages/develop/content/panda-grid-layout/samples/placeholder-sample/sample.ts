// types
import { PandaGridLayoutConfig } from "@panda-wbc/panda-grid-layout";
import { LogEvent, SampleLink } from "@panda-wbc/panda-sample";

// styles
// ...

// components
import "@panda-wbc/panda-grid-layout";
import "@panda-wbc/panda-sample";

// utils
import { html, TemplateResult } from "lit";

// static data

// demo props

const _logs: LogEvent[] = [];

const _links: SampleLink[] = [];

const _gridConfig: PandaGridLayoutConfig = {
	panelSize: 150,
	responsive: false,
};

const _panelList = [
	{ panelId: "uuid-0", width: 1, height: 2 },
	{ panelId: "uuid-1", width: 2, height: 1 },
	// { panelId: "uuid-2", width: 1, height: 1 },
	// { panelId: "uuid-3", width: 1, height: 2 },
	// { panelId: "uuid-4", width: 1, height: 1 },
	// { panelId: "uuid-5", width: 1, height: 1 },
	// { panelId: "uuid-5", width: 1, height: 1 },
	// { panelId: "uuid-6", width: 1, height: 1 },
	// { panelId: "uuid-7", width: 10, height: 1, minWidth: 3, minHeight: 2 },
	// { panelId: "uuid-8", width: 1, height: 1 },
	// { panelId: "uuid-9", width: 1, height: 1 },
	// { panelId: "uuid-10", width: 1, height: 1 },
];

const _codeSample = `
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
	CODE SAMPLER HERE
`;

export const placeholderSample = (): TemplateResult => {
	return html`
		<panda-sample
			caption="Grid Layout Demo"
			.logs="${_logs}"
			.links="${_links}"
			.code="${_codeSample}"
		>
			<panda-grid-layout
				
				.gridConfig="${_gridConfig}"
				responsive
				@on-layout-change="${_onLayoutChange}"
			>
				${_renderGridPanels()}

			</panda-grid-layout>
		</panda-sample>
	`;
}

// <panda-grid-panel-placeholder
// width="2"
// height="2"
// >
// THIS IS A PLACEHOLDER 1
// </panda-grid-panel-placeholder>

const _renderGridPanels = (): TemplateResult[] => {
	const panelsHtml: TemplateResult[] = [];

	_panelList.forEach((panel) => {
		const {
			panelId,
			index,
			top = undefined,
			left = undefined,
			width,
			minWidth = 1,
			height,
			minHeight = 1,
		} = panel as any;
		panelsHtml.push(html`
			<panda-grid-panel
				id="${panelId}"
				.panelId="${panelId}"
				.top="${top}"
				.left="${left}"
				.width="${width}"
				.minWidth="${minWidth}"
				.height="${height}"
				.minHeight="${minHeight}"
				movable
				resizable
			>
				<div class="drag-handle" slot="drag-handle"></div>
				<div class="panel-cont">
					<div class="panel">
						<div class="header"></div>
						<div class="body">
							Panel Id: ${panelId}
							Index: ${index ?? "NA"}
						</div>
					</div>
				</div>
			</panda-grid-panel>
		`);
	});

	return panelsHtml;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

const _onLayoutChange = () => {

}