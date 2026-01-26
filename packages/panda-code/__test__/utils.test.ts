import { describe, expect, it } from "vitest";

// import utils
import { trimEmptyLines } from "../src/utils/utils";

describe("(panda-code) :: utils", () => {
	describe("trimEmptyLines()", () => {
		it("should trim leading and trailing empty lines", () => {
			// arrange ========================================================
const code = `

function test() {
	console.log("Hello, World!");
}

`;
const expected = `function test() {
	console.log("Hello, World!");
}
`;

			// act ============================================================
			const result = trimEmptyLines(code);

			// assert =========================================================
			expect(result).toBe(expected);
		});

		it("should return empty string if code is all empty lines", () => {
			// arrange ========================================================
			const code = `
			
			
			`;
			const expected = ``;

			// act ============================================================
			const result = trimEmptyLines(code);
			
			// assert =========================================================
			expect(result).toBe(expected);
		});

		it("should not trim non-empty lines", () => {
			// arrange ========================================================
const code = `
function test() {
	console.log("Hello, World!");
}
`;
const expected = `function test() {
	console.log("Hello, World!");
}`;

			// act ============================================================
			const result = trimEmptyLines(code);

			// assert =========================================================
			expect(result).toBe(expected);
		});

		it("should handle empty input", () => {
			// arrange ========================================================
			const code = ``;
			const expected = ``;

			// act ============================================================
			const result = trimEmptyLines(code);

			// assert =========================================================
			expect(result).toBe(expected);
		});

		it("should handle undefined input", () => {
			// arrange ========================================================
			const code = undefined;
			const expected = ``;

			// act ============================================================
			const result = trimEmptyLines(code);

			// assert =========================================================
			expect(result).toBe(expected);
		});

		it("should not trim lines with whitespace only if they are between non-empty lines", () => {
			// arrange ========================================================
const code = `
function test() {
	console.log("Hello, World!");

	}
}
`;
const expected = `function test() {
	console.log("Hello, World!");

	}
}`;

			// act ============================================================
			const result = trimEmptyLines(code);
			
			// assert =========================================================
			expect(result).toBe(expected);
		});
	});
});