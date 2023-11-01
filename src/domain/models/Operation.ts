// Operation.ts

import { OperationDTO } from "../../application/dtos/OperationDTO";

const TAX_RATE = 0.2;
const TAX_EXEMPTION_THRESHOLD = 20000;

export enum OperationType {
  BUY = "buy",
  SELL = "sell",
}

export interface Operation {
  operation: OperationType;
  unitCost: number;
  quantity: number;
}

export interface Context {
  currentQuantity: number;
  currentAveragePrice: number;
  accumulatedLoss: number;
}

export const mapDTOToOperation = (dto: OperationDTO): Operation => ({
  operation: dto.operation as OperationType,
  unitCost: dto["unit-cost"],
  quantity: dto.quantity,
});

export const calculateWeightedAverage = (
  context: Context,
  newOperation: Operation
): number => {
  const denominator = context.currentQuantity + newOperation.quantity;
  if (denominator === 0) return 0; // Avoid division by zero

  return (
    (context.currentQuantity * context.currentAveragePrice +
      newOperation.unitCost * newOperation.quantity) /
    denominator
  );
};

export const computeSellTax = (
  operation: Operation,
  context: Context
): number => {
  const profitOrLossPerUnit = operation.unitCost - context.currentAveragePrice;
  let totalProfitOrLoss = profitOrLossPerUnit * operation.quantity;

  // Offset profit with accumulated loss
  if (totalProfitOrLoss > 0 && context.accumulatedLoss > 0) {
    const deduction = Math.min(totalProfitOrLoss, context.accumulatedLoss);
    totalProfitOrLoss -= deduction;
    context.accumulatedLoss -= deduction;
  }

  // Update accumulated loss if there's a loss
  if (totalProfitOrLoss < 0) {
    context.accumulatedLoss += Math.abs(totalProfitOrLoss);
    return 0;
  }

  // Tax exemption check
  if (operation.unitCost * operation.quantity <= TAX_EXEMPTION_THRESHOLD) {
    return 0;
  }

  return TAX_RATE * totalProfitOrLoss;
};
