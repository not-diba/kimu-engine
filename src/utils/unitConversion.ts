export const unitConversionMap = {
  // Mass
  g: 1,
  kg: 1000,

  // Volume
  ml: 1,
  l: 1000,
  tbsp: 15,
  tsp: 5,
  cup: 240,

  // count-based
  piece: 1,
  slice: 1,
  clove: 1,
  can: 1,
  pack: 1,
  pinch: 0.3,
};

export type Unit = keyof typeof unitConversionMap;

export const normalizeQuantity = (quantity: number, unit: Unit): number => {
  const factor = unitConversionMap[unit];
  if (!factor) throw new Error(`Unrecognized unit: ${unit}`);
  return quantity * factor;
};

export const convertToDisplayUnit = (
  normalizeQuantity: number,
  unit: Unit,
): number => {
  const factor = unitConversionMap[unit];
  if (!factor) throw new Error(`Unrecognized unit: ${unit}`);
  return normalizeQuantity / factor;
};
