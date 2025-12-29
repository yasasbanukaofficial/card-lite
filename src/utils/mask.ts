import { format } from "./format";

export function mask(
  cardNumber: number | string,
  visibleDigits: number = 4
): string | undefined {
  cardNumber = String(cardNumber);
  if (visibleDigits > cardNumber.length) return undefined;
  return cardNumber
    .slice(-visibleDigits || cardNumber.length)
    .padStart(cardNumber.length, "*");
}

export function maskCardNumber(
  cardNumber: number | string,
  visibleDigits?: number
) {
  cardNumber = String(cardNumber);
  const masked = mask(cardNumber, visibleDigits);
  return masked
    ? format(masked)
    : `Masking failed: visibleDigits (${visibleDigits}) cannot exceed card length (${cardNumber.length}).`;
}
