import { sanitizeCardNumber } from "./sanitize";

export function luhnChecker(cardNumber: string): boolean {
  let sum: number = 0;
  let shouldDouble = false;

  const sanitized = sanitizeCardNumber(cardNumber);

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = Number(sanitized.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      sum += digit > 9 ? digit - 9 : digit;
    } else {
      sum += digit;
    }
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
