import {
  Operation,
  OperationType,
  calculateWeightedAverage,
  computeSellTax,
  createLossOffsetManager,
  mapDTOToOperation,
} from "../../../src/domain/models/Operation";

describe("Operation Model", () => {
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

  it("should map DTO to Operation model correctly", () => {
    const operationDTO = {
      operation: "buy" as const,
      "unit-cost": 10.0,
      quantity: 10,
    };
    const operation = mapDTOToOperation(operationDTO);
    expect(operation).toEqual(mockBuyOperation);
  });

  it("should calculate weighted average correctly", () => {
    const context = {
      currentQuantity: 10,
      currentAveragePrice: 15,
    };
    const newOperation: Operation = {
      operation: OperationType.BUY,
      unitCost: 20.0,
      quantity: 5,
    };
    const weightedAverage = calculateWeightedAverage(context, newOperation);
    expect(Number(weightedAverage.toFixed(2))).toEqual(16.67);
  });

  it("should compute zero tax for sell operations with losses", () => {
    const context = {
      currentQuantity: 10,
      currentAveragePrice: 20,
    };
    const sellOperation: Operation = {
      operation: OperationType.SELL,
      unitCost: 15.0,
      quantity: 5,
    };
    const tax = computeSellTax(sellOperation, context);
    expect(tax).toEqual(0);
  });

  it("should compute appropriate tax for profitable sell operations", () => {
    const context = {
      currentQuantity: 10,
      currentAveragePrice: 10,
    };
    const sellOperation: Operation = {
      operation: OperationType.SELL,
      unitCost: 20.0,
      quantity: 5,
    };
    const lossManager = createLossOffsetManager();
    const tax = computeSellTax(sellOperation, context, lossManager);
    expect(tax).toEqual(0);
  });
});
