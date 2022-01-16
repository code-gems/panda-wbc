export interface PandaChartDataset {
	data: number[];
	label?: string;
}

export interface PandaChartDataOptions {
	scales: {

	};
}

export interface PandaChartData {
	datasets: PandaChartDataset[];
	labels?: string[];
	options?: PandaChartDataOptions;
}