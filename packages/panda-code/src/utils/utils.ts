/**
 * Parse line highlight specification
 * Examples: "1", "1,3,5", "3-5", "1,3-5,7"
 * @param {String} lineSpec line specification string
 */
export const parseLineSpec = (lineSpec: string): Set<number> => {
	const lines = new Set<number>();
	const parts = lineSpec.split(",").map((part) => part.trim());

	for (const part of parts) {
		if (part.includes("-")) {
			// Range: "3-5"
			const [start, end] = part.split("-").map((value) => parseInt(value.trim(), 10));
			if (!isNaN(start) && !isNaN(end)) {
				for (let i = start; i <= end; i++) {
					lines.add(i);
				}
			}
		} else {
			// Single line: "1"
			const lineNum = parseInt(part, 10);
			if (!isNaN(lineNum)) {
				lines.add(lineNum);
			}
		}
	}

	return lines;
}

/**
 * Trim empty leading and trailing lines from code block
 * @param {String} code code block
 * @returns trimmed code block
 */
export const trimEmptyLines = (code: string = ""): string => {
	let trimmedCode = code.split('\n');
	let leading = false;

	trimmedCode = trimmedCode.reduce(
		(acc, line, index) => {
			if (line.trim() !== "" && !leading) {
				leading = true;
			}
			// Only add non-empty lines
			if (
				line.trim() === "" && !leading ||
				line.trim() === "" && index === trimmedCode.length - 1
			) {
				// skip empty lines
			} else {
				acc.push(line);
			}

			return acc;
		}, [] as string[]
	);	
	
	return trimmedCode.join('\n');
}