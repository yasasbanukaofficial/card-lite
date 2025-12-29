import { CardType } from "../types";
import { format, mask, maskCardNumber } from "../utils";
import { validateCVC, validateExpiry, validateLength } from "../validators";
import { detectCardType } from "./detect";
import { luhnChecker } from "./luhn";
import { sanitizeCardNumber } from "./sanitize";

interface ValidateCardOptions {
  cvc?: string;
  expiryMonth?: number;
  expiryYear?: number;
  allowedBrands?: string[];
}

interface ValidateCardResult {
  isValid: boolean;
  cardType: CardType | "unknown";
  numberValid: boolean;
  lengthValid?: boolean;
  cvcValid?: boolean;
  expiryValid?: boolean;
  maskedNumber: string;
  formattedNumber: string;
  displayNumber: string;
  reason?: string;
}

export function validateCard(
  cardNumber: string,
  options?: ValidateCardOptions
): ValidateCardResult {
  const sanitized = sanitizeCardNumber(cardNumber);
  const cardType = detectCardType(sanitized) || "unknown";
  const maskedNumber = mask(sanitized, 4);
  const formattedNumber = format(sanitized);
  const displayNumber = maskCardNumber(cardNumber, 4);

  let numberValid = luhnChecker(sanitized);
  let lengthValid =
    cardType !== "unknown" ? validateLength(sanitized, cardType) : false;
  let cvcValid: boolean | undefined;
  let expiryValid: boolean | undefined;
  let reason: string | undefined;

  if (!numberValid) reason = "invalid Luhn";
  else if (cardType === "unknown") reason = "unknown card type";
  else if (!lengthValid) reason = "invalid card length";

  if (options?.cvc) {
    cvcValid =
      cardType !== "unknown" ? validateCVC(options.cvc, cardType) : false;
    if (!cvcValid && !reason) reason = "invalid CVC";
  }

  if (options?.expiryMonth && options?.expiryYear) {
    expiryValid = validateExpiry(options.expiryMonth, options.expiryYear);
    if (!expiryValid && !reason) reason = "card expired";
  }

  const isValid =
    numberValid && lengthValid && (cvcValid ?? true) && (expiryValid ?? true);

  return {
    isValid,
    cardType,
    numberValid,
    lengthValid,
    cvcValid,
    expiryValid,
    maskedNumber,
    formattedNumber,
    displayNumber,
    reason,
  };
}
