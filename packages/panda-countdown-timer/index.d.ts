export interface PandaCountdownTimerTickEventDetails {
	interval: number;
}

export interface PandaCountdownTimerTickEvent extends CustomEvent<PandaCountdownTimerTickEventDetails> {}