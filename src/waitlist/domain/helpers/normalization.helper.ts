export const Normalization = {
  minMaxNormalize(value: number, { min, max }: { min: number; max: number }): number {
    return (value - min) / (max - min) || 0;
  },
};
