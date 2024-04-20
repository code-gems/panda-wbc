type PandaClickToCopyEventDetails = {
	content: string;
}

export interface PandaClickToCopyEvent extends CustomEvent<PandaClickToCopyEventDetails> {}