import { expect, describe, it } from "vitest";
import { PageLibrary } from "../src/utils/page-library";

describe("PageLibrary", () => {
	describe("testPages", () => {
		it("to be empty", () => {
			const testPages = new PageLibrary().getPages("test");
			expect(testPages).toEqual([]);
		});

	});
});