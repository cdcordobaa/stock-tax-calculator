import { TaxResponseDTO } from "../../src/application/dtos/TaxResponseDTO";

export const expectedOutputs: TaxResponseDTO[][] = [
  // Case #0
  [{ tax: 0 }, { tax: 0 }, { tax: 0 }],
  // Case #1
  [{ tax: 0 }, { tax: 0 }, { tax: 0 }],
  // Case #2
  [{ tax: 0 }, { tax: 10000 }, { tax: 0 }],
  // Case #3
  [{ tax: 0 }, { tax: 0 }, { tax: 1000 }],
  // Case #4
  [{ tax: 0 }, { tax: 0 }, { tax: 0 }],
  // Case #5
  [{ tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 10000 }],
  // Case #6
  [{ tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 3000 }],
  // Case #7
  [
    { tax: 0 },
    { tax: 0 },
    { tax: 0 },
    { tax: 0 },
    { tax: 3000 },
    { tax: 0 },
    { tax: 0 },
    { tax: 3700 },
    { tax: 0 },
  ],
  // Case #8
  [{ tax: 0 }, { tax: 80000 }, { tax: 0 }, { tax: 60000 }],
];
