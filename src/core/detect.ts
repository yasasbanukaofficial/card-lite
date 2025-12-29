import { CardType, cardTypes } from "../types";

export function detectCardType(cardNumber: string): CardType | undefined {
  for (const type of Object.values(cardTypes)) {
    for (const patterns of type.patterns) {
      const strPattern =
        typeof patterns === "number"
          ? patterns.toString()
          : patterns[0].toString();
      return cardNumber.startsWith(strPattern) ? type : undefined;
    }
  }
}
