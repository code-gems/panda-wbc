// types

export interface Debouncer {
	cancel: () => void;
	isRunning: () => boolean;
}

// utils

export * from "./src/panda-core";