// ====================================================================================================================
// EVENTS =============================================================================================================
// ====================================================================================================================

export type PandaSliderChangeEventDetail = {
	value: number;
}

export interface PandaSliderChangeEvent extends CustomEvent<PandaSliderChangeEventDetail> {}