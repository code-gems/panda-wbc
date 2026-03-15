// types
import { DesignTokenLibrary } from "./utils/design-token-library";
import { PageLibrary } from "./utils/page-library";

declare global {
	interface Window {
		designTokenLibrary: DesignTokenLibrary;
		pageLibrary: PageLibrary;
	}
}