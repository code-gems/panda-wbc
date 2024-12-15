// types
// ...

// styles
// ...

// components
import "@panda-wbc/panda-details-dialog";
import "@panda-wbc/panda-sample";

// utils
import { html, TemplateResult } from "lit";

// static data

// demo props

const _logs: any[] = [];

export const defaultSample = (): TemplateResult => {
	return html`
		<panda-sample .logs="${_logs}">
			<div slot="sample">
				<div id="avatar">
					<panda-icon icon="user"></panda-icon>
				</div>
				<panda-details-dialog
					for="avatar"
					no-close-on-esc
					@visibility-changed="${_onVisibilityChanged}"
				>
					<div template>
						<div class="avatar-details">
							<div class="icon">
								<panda-icon icon="user"></panda-icon>
							</div>
							<div class="body">
								<h3>Panda</h3>
								<p>
									Pandas are beloved black and white bears native to China's bamboo forests, 
									known for their distinctive markings, playful nature, 
									and specialized diet consisting primarily of bamboo.
								</p>
							</div>
						</div>
					</div>
				</panda-details-dialog>
			</div>

			<div slot="code">
				CODE HERE
			</div>
		</panda-sample>
	`;
}

// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

const _onVisibilityChanged = (event: any): void => {
	console.log("%c ⚡ (_onVisibilityChanged)", "font-size: 24px; color: crimson; background: black;", event);

}