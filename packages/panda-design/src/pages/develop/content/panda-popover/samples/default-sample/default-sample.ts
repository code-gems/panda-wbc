// types
// ...

// styles
import { styles, popoverStyle } from "./styles/styles";

// components
import "../../../../../../web-parts/panda-sample/panda-sample";

// utils
import { html } from "lit"

export const defaultSample = () => {
	const _onPopoverClose = (event: any): void => {
		console.log("%c 🧪 (DEMO) Popover event", "font-size: 24px; color: green;", event.detail);
	}

	return html`
		<style>${styles}</style>
		<div class="sample">
			<panda-sample>
				<div slot="sample">
					<panda-button
						id="test"
					>
						BUTTON WITH POPOVER
					</panda-button>
					<panda-popover
						for="test"
						.customStyle="${popoverStyle}"
						@visibility-change="${_onPopoverClose}"
						show
					>
						<div template>
							<h3>Popover</h3>
							some content Here
							<a href="google.com">google</a>  
						</div>
					</panda-popover>
				</div>
				<div slot="code">...</div>
			</panda-sample>
		</div>
	`;
}