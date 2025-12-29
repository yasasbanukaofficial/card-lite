import { CardType, cardTypes } from "../types";

export function detectCardType(cardNumber: string): CardType | undefined {
  for (const type of Object.values(cardTypes)) {
    for (const pattern of type.patterns) {
      if (Array.isArray(pattern)) {
        const [min, max] = pattern;
        const startDigits = parseInt(
          cardNumber.substring(0, min.toString().length)
        );
        if (startDigits >= min && startDigits <= max) {
          return type;
        }
      } else {
        const strPattern = pattern.toString();
        if (cardNumber.startsWith(strPattern)) {
          return type;
        }
      }
    }
  }
  return undefined;
}
