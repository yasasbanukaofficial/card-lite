import { CardType, cardTypes } from "../types";

export function validateCVC(cvc: string, cardType?: CardType): boolean {
  if (!/^\d+$/.test(cvc)) return false;
  if (cardType) return cardType?.code.size == cvc.length;
  return Object.values(cardTypes).some((type) => type.code.size === cvc.length);
}
