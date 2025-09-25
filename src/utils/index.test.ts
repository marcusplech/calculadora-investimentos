import {
  formatCurrency,
  calculateCompoundInterest,
  isValidPositiveNumber,
  parseCurrency,
} from "./index";

describe("Utils Functions", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers correctly", () => {
      expect(formatCurrency(1000)).toContain("1.000,00");
      expect(formatCurrency(1234.56)).toContain("1.234,56");
      expect(formatCurrency(0)).toContain("0,00");
    });

    it("should format negative numbers correctly", () => {
      expect(formatCurrency(-1000)).toContain("-");
      expect(formatCurrency(-1000)).toContain("1.000,00");
      expect(formatCurrency(-1234.56)).toContain("-");
      expect(formatCurrency(-1234.56)).toContain("1.234,56");
    });

    it("should handle decimal precision", () => {
      expect(formatCurrency(1234.567)).toContain("1.234,57");
      expect(formatCurrency(1234.564)).toContain("1.234,56");
    });
  });

  describe("calculateCompoundInterest", () => {
    it("should calculate compound interest with monthly contributions", () => {
      const result = calculateCompoundInterest(0.12, 10000, 1000, 12);
      const expectedMinimum = 10000 + 1000 * 12;

      expect(result).toBeGreaterThan(expectedMinimum);
      expect(typeof result).toBe("number");
    });

    it("should handle zero monthly contributions", () => {
      const result = calculateCompoundInterest(0.12, 10000, 0, 12);

      expect(result).toBeGreaterThan(10000);
      expect(typeof result).toBe("number");
    });

    it("should handle zero principal", () => {
      const result = calculateCompoundInterest(0.12, 0, 1000, 12);
      const expectedMinimum = 1000 * 12;

      expect(result).toBeGreaterThan(expectedMinimum);
      expect(typeof result).toBe("number");
    });

    it("should return principal when no rate and no contributions", () => {
      const result = calculateCompoundInterest(0, 10000, 0, 12);
      expect(result).toBe(10000);
    });
  });

  describe("isValidPositiveNumber", () => {
    it("should validate positive numbers", () => {
      expect(isValidPositiveNumber(10)).toBe(true);
      expect(isValidPositiveNumber(0.1)).toBe(true);
      expect(isValidPositiveNumber("10")).toBe(true);
      expect(isValidPositiveNumber("10.5")).toBe(true);
    });

    it("should reject negative numbers and zero", () => {
      expect(isValidPositiveNumber(-10)).toBe(false);
      expect(isValidPositiveNumber(0)).toBe(false);
      expect(isValidPositiveNumber("-10")).toBe(false);
      expect(isValidPositiveNumber("0")).toBe(false);
    });

    it("should reject invalid inputs", () => {
      expect(isValidPositiveNumber("abc")).toBe(false);
      expect(isValidPositiveNumber("")).toBe(false);
      expect(isValidPositiveNumber(null)).toBe(false);
      expect(isValidPositiveNumber(undefined)).toBe(false);
      expect(isValidPositiveNumber({})).toBe(false);
      expect(isValidPositiveNumber([])).toBe(false);
    });
  });

  describe("parseCurrency", () => {
    it("should parse currency strings correctly", () => {
      expect(parseCurrency("R$ 1.000,00")).toBe(1000);
      expect(parseCurrency("R$ 1.234,56")).toBe(1234.56);
      expect(parseCurrency("1.000,00")).toBe(1000);
      expect(parseCurrency("1000")).toBe(1000);
    });

    it("should handle different formats", () => {
      expect(parseCurrency("R$1.000,00")).toBe(1000);
      expect(parseCurrency("R$ 1000,00")).toBe(1000);
      expect(parseCurrency("1000,50")).toBe(1000.5);
    });

    it("should handle invalid inputs", () => {
      expect(parseCurrency("abc")).toBeNaN();
      expect(parseCurrency("")).toBe(0);
      expect(parseCurrency("R$")).toBe(0);
    });
  });
});
