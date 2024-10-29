export const isEmpty = (value: any): boolean => {
	return value === "" || value === null || value === undefined;
}

/**
 * Derive the code size from code version
 * @param {Number} version - version of the QR Code
 * @returns {Number} Code size
 */
export const getCodeSize = (version: number): number => {
	return 4 * version + 17;
}
