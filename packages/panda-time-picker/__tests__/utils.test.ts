// utils
import { expect, describe, it } from "vitest";

// Import the function to be tested
import { parseTimeValue } from "../src/utils/utils";

describe("Utils", () => {
	describe("parseTimeValue", () => {
		it("should parse a valid time string correctly (12h format, pm)", () => {
			// arrange
			const timeString = "12:30:45 pm";

			// act
			const result = parseTimeValue(timeString);

			// assert
			expect(result).toEqual({
				hours: 12,
				minutes: 30,
				seconds: 45,
				period: "pm",
			});
		});

		it("should parse a valid time string correctly (12h format, am)", () => {
			// arrange
			const timeString = "01:15:00 am";

			// act
			const result = parseTimeValue(timeString);

			// assert
			expect(result).toEqual({
				hours: 1,
				minutes: 15,
				seconds: 0,
				period: "am",
			});
		});

		it("should parse numeric UNIX value", () => {
			// arrange
			const unixTimeValue = 1777519376604;

			// act
			const result = parseTimeValue(unixTimeValue);

			// assert
			expect(result).toEqual({
				hours: 12,
				minutes: 22,
				seconds: 56,
				period: "pm",
			});
		});

		it("should return undefined for an invalid time string", () => {
			// arrange
			const timeString = "invalid time";

			// act
			const result = parseTimeValue(timeString);

			// assert
			expect(result).toBeUndefined();
		});
	});
});