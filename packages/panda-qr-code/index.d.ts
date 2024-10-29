export const enum ErrorCorrectionLevel {
	LOW, // [1, 1] 7% of data can be restored
	MEDIUM, // [1, 0] 15% of data can be restored
	QUARTILE, // [0, 1] 25% of data can be restored
	HIGH, // [0, 0] 30% of data can be restored
}

export const enum MaskPattern {
	Pattern0, // [0, 0, 0]
	Pattern1, // [0, 0, 1]
	Pattern2, // [0, 1, 0]
	Pattern3, // [0, 1, 1]
	Pattern4, // [1, 0, 0]
	Pattern5, // [1, 0, 1]
	Pattern6, // [1, 1, 0]
	Pattern7, // [1, 1, 1]
}

export interface PandaQRCodeOptions {
	moduleSize: number;
	moduleColor: string[];
	moduleBackgroundColor: string[];
	
	maskPattern: MaskPattern; // 8 different patterns [0,0,0] [0,0,1] etc. XOR
	dataType: any; // binary, alpha, numbers, kanji (japanese)
	version: number;
	errorCorrectionLevel: ErrorCorrectionLevel;
}