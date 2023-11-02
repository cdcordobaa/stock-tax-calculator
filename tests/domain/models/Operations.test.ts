import {
  OperationType,
  mapDTOToOperation,
  processBuyOperation,
  processSellOperation,
  calculateProfitOrLossPerUnit,
  calculateTotalProfitOrLoss,
  offsetProfitWithAccumulatedLoss,
  isLoss,
  isTaxExempt,
  calculateTaxAmount,
} from "../../../src/domain/models/Operation";

describe("Operation Model", () => {
  const mockBuyOperation = {
    type: OperationType.BUY,
    price: 10.0,
    quantity: 10,
  };

  const mockSellOperation = {
    type: OperationType.SELL,
    price: 15.0,
    quantity: 5,
  };

  const context = {
    currentQuantity: 20,
    currentAveragePrice: 15,
    accumulatedLoss: 0,
    accumulatedProfit: 0,
  };

  const taxExemptionLimit = 100;
  const taxRate = 0.1;

  it("should map DTO to Operation model correctly", () => {
    const operationDTO = {
      operation: "buy" as const,
      "unit-cost": 10.0,
      quantity: 10,
    };
    const operation = mapDTOToOperation(operationDTO);
    expect(operation).toEqual(mockBuyOperation);
  });

  it("should process a buy operation correctly", () => {
    const resultContext = processBuyOperation(
      context,
      mockBuyOperation.price,
      mockBuyOperation.quantity
    );
    expect(resultContext.currentQuantity).toEqual(30);
  });

  it("should process a sell operation correctly", () => {
    const resultContext = processSellOperation(
      context,
      mockSellOperation.price,
      mockSellOperation.quantity
    );
    expect(resultContext.currentQuantity).toEqual(15);
  });

  it("should calculate profit or loss per unit correctly", () => {
    const profitOrLossPerUnit = calculateProfitOrLossPerUnit(20, 15);
    expect(profitOrLossPerUnit).toEqual(5);
  });

  it("should calculate total profit or loss correctly", () => {
    const totalProfitOrLoss = calculateTotalProfitOrLoss(5, 10);
    expect(totalProfitOrLoss).toEqual(50);
  });

  it("should offset profit with accumulated loss correctly", () => {
    const totalProfitOrLoss = 50;
    context.accumulatedLoss = 30;
    const profitAfterOffset = offsetProfitWithAccumulatedLoss(
      totalProfitOrLoss,
      context
    );
    expect(profitAfterOffset).toEqual(20);
    expect(context.accumulatedLoss).toEqual(0);
  });

  it("should determine if an operation is a loss correctly", () => {
    const totalProfitOrLoss = -10;
    expect(isLoss(totalProfitOrLoss)).toBe(true);
  });

  it("should determine if an operation is tax-exempt correctly", () => {
    const operation = {
      type: OperationType.SELL,
      price: 15.0,
      quantity: 5,
    };
    expect(isTaxExempt(operation, taxExemptionLimit)).toBe(true);
  });

  it("should calculate tax amount correctly", () => {
    const totalProfitOrLoss = 50;
    const taxAmount = calculateTaxAmount(totalProfitOrLoss, taxRate);
    expect(taxAmount).toEqual(5);
  });
});
