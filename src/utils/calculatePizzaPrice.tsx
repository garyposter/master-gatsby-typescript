const sizeRatios = {
  S: 0.75,
  M: 1,
  L: 1.25,
};

export type sizeValues = keyof typeof sizeRatios;

export const sizes = Object.keys(sizeRatios) as sizeValues[];

export default function calculatePizzaPrice(
  cents: number,
  size: sizeValues
): number {
  return Math.round(cents * sizeRatios[size]);
}
