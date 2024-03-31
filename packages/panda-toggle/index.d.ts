type PandaToggleChangeEventDetails = {
	selected: boolean;
}

export interface PandaToggleChangeEvent extends CustomEvent<PandaToggleChangeEventDetails> {}