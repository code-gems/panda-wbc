import { debounce } from "./src/panda-utils";
export type Debouncer = {
	cancel(): void;
	isRunning(): void;
	(): Debouncer;
} 