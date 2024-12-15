export const enum LogEventType {
	INFO,
	WARNING,
	ERROR,
}

export type LogEvent = {
	type: LogEventType;
	message: string;
	timestamp: number;
}