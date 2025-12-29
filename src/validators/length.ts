import { CardType, cardTypes } from "../types";

export function validateLength(
  cardNumber: string,
  cardType?: CardType
): boolean {
  const cardLength = cardNumber.length;
  if (cardType) return cardType.lengths.includes(cardLength);
  return Object.values(cardTypes).some((type) =>
    type.lengths.includes(cardLength)
  );
}
