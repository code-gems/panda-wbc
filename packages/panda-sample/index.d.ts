export const enum LogEventType {
	INFO,
	WARNING,
	ERROR,
}

export const enum LinkType {
	CODE_PEN,
	PLUNKER,
}

export type LogEvent = {
	type: LogEventType;
	message: string;
	timestamp: number;
}

export type SampleLink = {
	url: string;
	type: LinkType;
}