import { sum } from "../src/utils/utils";
import { expect, describe, it } from '@jest/globals';

describe("Utils", () => {
  describe("sum", () => {
    it("should return the sum of two numbers", () => {
      expect(sum(1, 2)).toBe(3);
    });

    it("should return the correct sum with negative numbers", () => {
      expect(sum(-1, 2)).toBe(1);
    });

    it("should return the correct sum with zero", () => {
      expect(sum(0, 5)).toBe(5);
    });
  });
});