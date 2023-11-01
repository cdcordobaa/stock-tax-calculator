import { calculateTaxes } from "../../../src/domain/models/Tax";
import {
  Operation,
  OperationType,
  computeSellTax,
  createLossOffsetManager,
} from "../../../src/domain/models/Operation";

describe("Tax Model", () => {
  const mockBuyOperation: Operation = {
    operation: OperationType.BUY,
    unitCost: 10.0,
    quantity: 10,
  };

  const mockSellOperation: Operation = {
    operation: OperationType.SELL,
    unitCost: 15.0,
    quantity: 5,
  };

  const mockSellOperationLoss: Operation = {
    operation: OperationType.SELL,
    unitCost: 8.0,
    quantity: 5,
  };

  const mockSellOperationProfit: Operation = {
    operation: OperationType.SELL,
    unitCost: 12.0,
    quantity: 5,
  };

  it("should deduct losses from subsequent profits", () => {
    const operations = [mockBuyOperation, mockSellOperation];
    const results = calculateTaxes(operations);
    expect(results[1].amount).toBe(0);
  });

  it("should not apply taxes if the total amount is below $20,000", () => {
    const operations = [
      mockBuyOperation,
      {
        ...mockSellOperation,
        quantity: 1000,
        unitCost: 20,
      },
    ];
    const results = calculateTaxes(operations);
    expect(results[1].amount).toEqual(0);
  });

  it("should not apply taxes for buying stocks", () => {
    const operations = [mockBuyOperation];
    const results = calculateTaxes(operations);
    expect(results[0].amount).toEqual(0);
  });

  it("should correctly apply loss offset across multiple sell operations", () => {
    const operations = [
      mockBuyOperation,
      mockSellOperationLoss,
      mockSellOperationProfit,
    ];
    const lossManager = createLossOffsetManager();
    computeSellTax(
      operations[1],
      { currentQuantity: 10, currentAveragePrice: 10 },
      lossManager
    );
    const tax = computeSellTax(
      operations[2],
      { currentQuantity: 5, currentAveragePrice: 10 },
      lossManager
    );
    expect(tax).toEqual(0);
  });
});
