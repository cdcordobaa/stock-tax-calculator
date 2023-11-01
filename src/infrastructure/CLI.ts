import * as readline from "readline";
import { OperationDTO } from "../application/dtos/OperationDTO";
import { calculateTaxesService } from "../application/services/TaxCalculatorService";

export const startCLI = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let inputLines: string[] = [];

  rl.on("line", (line) => {
    if (line === "") {
      rl.close();
      return;
    }
    inputLines.push(line);
  });

  rl.on("close", () => {
    const operations = inputLines.map(
      (line) => JSON.parse(line) as OperationDTO[]
    );
    const results = operations.map(calculateTaxesService);
    results.forEach((result) => console.log(JSON.stringify(result)));
  });
};
