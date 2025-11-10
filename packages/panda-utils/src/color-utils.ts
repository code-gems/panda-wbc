/**
 * Clamp alpha value between 0 and 100
 * @param opacity - The alpha value to clamp
 * @returns The clamped alpha value
 */
export const clampOpacity = (opacity: number): number => {
	return Math.max(0, Math.min(100, Math.round(opacity)));
}

/**
 * Convert opacity value from percentage or decimal format to numeric percentage
 * @param {string | number | null | undefined} opacity - Opacity value (e.g., "50%", "0.5", 0.5)
 * @returns {number} Numeric opacity value clamped between 0-100 (default: 100)
 */
export const parseOpacityValue = (
	opacity: string | number | null | undefined
): number => {
	// Handle null/undefined with default
	if (opacity === null || opacity === undefined) {
		return 100;
	}

	// Handle numeric input directly
	if (typeof opacity === "number") {
		// Assume numbers are decimals (0-1 range) or percentages (0-100 range)
		const value = opacity <= 1 ? opacity * 100 : opacity;
		return clampOpacity(value);
	}

	// Handle string input
	const trimmed = opacity.trim();
	
	if (trimmed === "") {
		return 100;
	}

	// Percentage format: "50%", "50.5%"
	if (trimmed.includes("%")) {
		const match = trimmed.match(/^([\d.]+)%$/);
		if (!match) {
			return 100;
		}
		return clampOpacity(Number(match[1]));
	}

	// Decimal format: "0.5", "50"
	const numValue = Number(trimmed);
	if (Number.isNaN(numValue)) {
		return 100;
	}

	// Treat values <= 1 as decimals, > 1 as percentages
	const value = numValue <= 1 ? numValue * 100 : numValue;
	return clampOpacity(value);
}
