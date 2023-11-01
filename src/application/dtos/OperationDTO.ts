export type OperationDTO = {
  operation: "buy" | "sell";
  "unit-cost": number;
  quantity: number;
};
