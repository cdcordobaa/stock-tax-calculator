export type Context = {
  currentQuantity: number;
  currentAveragePrice: number;
  accumulatedLoss: number;
  accumulatedProfit: number;
};

export function createContext(): Context {
  return {
    currentQuantity: 0,
    currentAveragePrice: 0,
    accumulatedLoss: 0,
    accumulatedProfit: 0,
  };
}

export function calculateWeightedAverage(
  context: Context,
  price: number,
  quantity: number
): number {
  const totalCost = context.currentAveragePrice * context.currentQuantity;
  const newCost = price * quantity;
  const newQuantity = context.currentQuantity + quantity;

  return newQuantity === 0 ? 0 : (totalCost + newCost) / newQuantity;
}
