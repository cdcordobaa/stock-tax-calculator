import { calculateTaxesService } from "../../../src/application/services/TaxCalculatorService";
import { sampleInputs } from "../../utils/testInputs";
import { expectedOutputs } from "../../utils/expectedOutputs";
describe("TaxCalculatorService", () => {
  it.each(
    sampleInputs.map((input, index) => [input, expectedOutputs[index], index])
  )(
    `should calculate taxes correctly for given input and expected output`,
    (input, expected, index) => {
      const result = calculateTaxesService(input);
      expect(result).toEqual(expected);
    }
  );
});