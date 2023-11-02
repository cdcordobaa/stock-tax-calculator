// Operation.ts

import { OperationDTO } from "../../application/dtos/OperationDTO";
import { Context, calculateWeightedAverage } from "./TradingContex";

export enum OperationType {
  BUY = "buy",
  SELL = "sell",
}
export interface Operation {
  type: OperationType;
  price: number;
  quantity: number;
}

export const mapDTOToOperation = (dto: OperationDTO): Operation => ({
  type: dto.operation as OperationType,
  price: dto["unit-cost"],
  quantity: dto.quantity,
});

export function processBuyOperation(
  context: Context,
  price: number,
  quantity: number
): Context {
  return {
    ...context,
    currentAveragePrice: calculateWeightedAverage(context, price, quantity),
    currentQuantity: context.currentQuantity + quantity,
  };
}

export function processSellOperation(
  context: Context,
  price: number,
  quantity: number
): Context {
  if (quantity > context.currentQuantity) {
    throw new Error("Sell quantity exceeds the current quantity");
  }

  const revenue = price * quantity;
  const cost = context.currentAveragePrice * quantity;
  let accumulatedLoss = context.accumulatedLoss;
  let accumulatedProfit = context.accumulatedProfit;

  if (revenue < cost) {
    accumulatedLoss += cost - revenue;
  } else {
    accumulatedProfit += revenue - cost;
  }

  return {
    ...context,
    currentQuantity: context.currentQuantity - quantity,
    accumulatedLoss,
    accumulatedProfit,
  };
}

export const calculateProfitOrLossPerUnit = (
  price: number,
  averagePrice: number
): number => {
  return price - averagePrice;
};

export const calculateTotalProfitOrLoss = (
  profitOrLossPerUnit: number,
  quantity: number
): number => {
  return profitOrLossPerUnit * quantity;
};

export const offsetProfitWithAccumulatedLoss = (
  totalProfitOrLoss: number,
  context: Context
): number => {
  if (totalProfitOrLoss > 0 && context.accumulatedLoss > 0) {
    const deduction = Math.min(totalProfitOrLoss, context.accumulatedLoss);
    context.accumulatedLoss -= deduction;
    return totalProfitOrLoss - deduction;
  }
  return totalProfitOrLoss;
};

export const isLoss = (totalProfitOrLoss: number): boolean => {
  return totalProfitOrLoss < 0;
};

export const updateAccumulatedLoss = (
  context: Context,
  totalProfitOrLoss: number
): void => {
  context.accumulatedLoss += Math.abs(totalProfitOrLoss);
};

export const isTaxExempt = (
  operation: Operation,
  taxExemption: number
): boolean => {
  return operation.price * operation.quantity <= taxExemption;
};

export const calculateTaxAmount = (
  totalProfitOrLoss: number,
  taxRate: number
): number => {
  return taxRate * totalProfitOrLoss;
};