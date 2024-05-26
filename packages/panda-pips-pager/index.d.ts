

// EVENTS =============================================================================================================

export interface PandaPipsPagerChangeEventDetails {
	pageIndex: number;
}

export interface PandaPipsPagerChangeEvent extends CustomEvent<PandaPipsPagerChangeEventDetails> {}