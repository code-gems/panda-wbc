export interface PandaCheckboxChange {
	checked: boolean;
}

export interface PandaCheckboxChangeEvent extends CustomEvent<PandaCheckboxChange> {}
