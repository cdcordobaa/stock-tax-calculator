export type LossOffsetManager = {
  addToLossOffset: (amount: number) => void;
  deductFromLossOffset: (amount: number) => number;
  getCurrentLossOffset: () => number;
};

export const createLossOffsetManager = (): LossOffsetManager => {
  let lossOffset = 0;

  return {
    addToLossOffset: (amount: number) => {
      lossOffset += amount;
    },
    deductFromLossOffset: (amount: number) => {
      const deduction = Math.min(lossOffset, amount);
      lossOffset -= deduction;
      return deduction;
    },
    getCurrentLossOffset: () => lossOffset,
  };
};
