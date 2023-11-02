import { calculateTaxes } from "../../../src/domain/models/Tax";
import { Operation, OperationType } from "../../../src/domain/models/Operation";
import { createContext } from "../../../src/domain/models/TradingContex";

describe("Tax Model", () => {
  const mockBuyOperation: Operation = {
    type: OperationType.BUY,
    price: 10.0,
    quantity: 10,
  };

  const mockSellOperation: Operation = {
    type: OperationType.SELL,
    price: 15.0,
    quantity: 5,
  };

  const mockSellOperationLoss: Operation = {
    type: OperationType.SELL,
    price: 8.0,
    quantity: 5,
  };

  const mockSellOperationProfit: Operation = {
    type: OperationType.SELL,
    price: 12.0,
    quantity: 5,
  };

  it("should deduct losses from subsequent profits", () => {
    const operations = [
      mockBuyOperation,
      mockSellOperationLoss,
      mockSellOperationProfit,
    ];
    const results = calculateTaxes(operations);
    expect(results[1].amount).toBe(0);
    expect(results[2].amount).toBeLessThanOrEqual(0);
  });

  it("should not apply taxes if the total amount is below the exemption threshold", () => {
    const operations = [
      mockBuyOperation,
      {
        ...mockSellOperation,
        quantity: 5,
        price: 20,
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
    const context = createContext();
    const taxes = calculateTaxes(operations);

    expect(taxes[1].amount).toBe(0);
    expect(taxes[2].amount).toBeLessThanOrEqual(0);
  });
});
