// types
import { DesignTokenLibrary } from "./utils/design-token-library";

declare global {
	interface Window {
		designTokenLibrary: DesignTokenLibrary;
	}
}