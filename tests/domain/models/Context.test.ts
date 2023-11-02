import {
  Context,
  calculateWeightedAverage,
  createContext,
} from "../../../src/domain/models/TradingContex";

describe("calculateWeightedAverage", () => {
  it("should return 0 for weighted average if new quantity is 0", () => {
    const context: Context = {
      currentQuantity: 0,
      currentAveragePrice: 0,
      accumulatedLoss: 0,
      accumulatedProfit: 0,
    };
    const price = 100;
    const quantity = 0;
    const average = calculateWeightedAverage(context, price, quantity);
    expect(average).toBe(0);
  });

  it("should calculate the correct weighted average for new purchases", () => {
    const context: Context = {
      currentQuantity: 10,
      currentAveragePrice: 50,
      accumulatedLoss: 0,
      accumulatedProfit: 0,
    };
    const price = 100;
    const quantity = 10;
    const average = calculateWeightedAverage(context, price, quantity);
    const expectedAverage = (10 * 50 + 10 * 100) / (10 + 10);
    expect(average).toBe(expectedAverage);
  });

  it("should handle updates to the context correctly", () => {
    let context = createContext();
    context = {
      ...context,
      currentQuantity: 10,
      currentAveragePrice: 10,
    };
    context.currentAveragePrice = calculateWeightedAverage(context, 20, 10);
    expect(context.currentAveragePrice).toBe(15);
  });
});
