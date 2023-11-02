// Tax.ts

import { TaxResponseDTO } from "../../application/dtos/TaxResponseDTO";
import {
  Operation,
  OperationType,
  calculateProfitOrLossPerUnit,
  calculateTaxAmount,
  calculateTotalProfitOrLoss,
  isLoss,
  isTaxExempt,
  offsetProfitWithAccumulatedLoss,
  processBuyOperation,
  processSellOperation,
  updateAccumulatedLoss,
} from "./Operation";
import { Context, createContext } from "./TradingContex";

export interface Tax {
  amount: number;
}
const TAX_RATE = 0.2;
const TAX_EXEMPTION_THRESHOLD = 20000;

export const mapTaxToDTO = (tax: Tax): TaxResponseDTO => ({
  tax: tax.amount,
});

export const calculateTaxes = (operations: Operation[]): Tax[] => {
  const initialContext: Context = createContext();

  const taxes = operations.reduce(
    (acc, operation) => {
      let updatedContext: Context;
      let taxAmount = 0;

      const operationTypeHandlers = {
        [OperationType.BUY]: () => {
          updatedContext = processBuyOperation(
            acc.context,
            operation.price,
            operation.quantity
          );
        },
        [OperationType.SELL]: () => {
          updatedContext = processSellOperation(
            acc.context,
            operation.price,
            operation.quantity
          );
          taxAmount = computeSellTax(operation, updatedContext);
        },
      };

      operationTypeHandlers[operation.type]();

      acc.taxes.push({ amount: taxAmount } as Tax);
      acc.context = updatedContext!;

      return acc;
    },
    { taxes: [] as Tax[], context: initialContext }
  );

  return taxes.taxes;
};

export const computeSellTax = (operation: Operation, context: Context): number => {
  const { price, quantity } = operation;
  const profitOrLossPerUnit = calculateProfitOrLossPerUnit(
    price,
    context.currentAveragePrice
  );
  let totalProfitOrLoss = calculateTotalProfitOrLoss(
    profitOrLossPerUnit,
    quantity
  );

  totalProfitOrLoss = offsetProfitWithAccumulatedLoss(
    totalProfitOrLoss,
    context
  );

  if (isLoss(totalProfitOrLoss)) {
    updateAccumulatedLoss(context, totalProfitOrLoss);
    return 0;
  }

  if (isTaxExempt(operation, TAX_EXEMPTION_THRESHOLD)) {
    return 0;
  }

  return calculateTaxAmount(totalProfitOrLoss, TAX_RATE);
};