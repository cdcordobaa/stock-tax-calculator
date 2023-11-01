// Tax.ts

import { TaxResponseDTO } from "../../application/dtos/TaxResponseDTO";
import {
  Context,
  Operation,
  OperationType,
  calculateWeightedAverage,
  computeSellTax,
} from "./Operation";

export interface Tax {
  amount: number;
}
export const mapTaxToDTO = (tax: Tax): TaxResponseDTO => ({
  tax: tax.amount,
});
export const calculateTaxes = (operations: Operation[]): Tax[] => {
  const context: Context = {
    currentQuantity: 0,
    currentAveragePrice: 0,
    accumulatedLoss: 0,
  };

  return operations.map((operation) => {
    if (operation.operation === OperationType.BUY) {
      context.currentAveragePrice = calculateWeightedAverage(
        context,
        operation
      );
      context.currentQuantity += operation.quantity;
      return { amount: 0 };
    } else {
      const taxValue = computeSellTax(operation, context);
      context.currentQuantity -= operation.quantity;
      return { amount: taxValue };
    }
  });
};
