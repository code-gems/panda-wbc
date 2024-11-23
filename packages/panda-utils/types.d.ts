import { debounce } from "./src/panda-utils";
export type Debouncer<P = any> = {
	cancel(): void;
	isRunning(): void;
	(params?: P): Debouncer;
}
