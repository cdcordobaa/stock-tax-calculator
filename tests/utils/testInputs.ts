import { OperationDTO } from "../../src/application/dtos/OperationDTO";

const sampleInputs: OperationDTO[][] = [
  // Case #0
  [
    { operation: "buy", "unit-cost": 0, quantity: 0 },
    { operation: "sell", "unit-cost": 0, quantity: 0 },
    { operation: "sell", "unit-cost": 0, quantity: 0 },
  ],
  // Case #1
  [
    { operation: "buy", "unit-cost": 10, quantity: 100 },
    { operation: "sell", "unit-cost": 15, quantity: 50 },
    { operation: "sell", "unit-cost": 15, quantity: 50 },
  ],
  // Case #2
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "sell", "unit-cost": 20, quantity: 5000 },
    { operation: "sell", "unit-cost": 5, quantity: 5000 },
  ],
  // Case #3
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "sell", "unit-cost": 5, quantity: 5000 },
    { operation: "sell", "unit-cost": 20, quantity: 3000 },
  ],
  // Case #4
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "buy", "unit-cost": 25, quantity: 5000 },
    { operation: "sell", "unit-cost": 15, quantity: 10000 },
  ],
  // Case #5
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "buy", "unit-cost": 25, quantity: 5000 },
    { operation: "sell", "unit-cost": 15, quantity: 10000 },
    { operation: "sell", "unit-cost": 25, quantity: 5000 },
  ],
  // Case #6
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "sell", "unit-cost": 2, quantity: 5000 },
    { operation: "sell", "unit-cost": 20, quantity: 2000 },
    { operation: "sell", "unit-cost": 20, quantity: 2000 },
    { operation: "sell", "unit-cost": 25, quantity: 1000 },
  ],
  // Case #7
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "sell", "unit-cost": 2, quantity: 5000 },
    { operation: "sell", "unit-cost": 20, quantity: 2000 },
    { operation: "sell", "unit-cost": 20, quantity: 2000 },
    { operation: "sell", "unit-cost": 25, quantity: 1000 },
    { operation: "buy", "unit-cost": 20, quantity: 10000 },
    { operation: "sell", "unit-cost": 15, quantity: 5000 },
    { operation: "sell", "unit-cost": 30, quantity: 4350 },
    { operation: "sell", "unit-cost": 30, quantity: 650 },
  ],
  // Case #8
  [
    { operation: "buy", "unit-cost": 10, quantity: 10000 },
    { operation: "sell", "unit-cost": 50, quantity: 10000 },
    { operation: "buy", "unit-cost": 20, quantity: 10000 },
    { operation: "sell", "unit-cost": 50, quantity: 10000 },
  ],
];

export { sampleInputs };
