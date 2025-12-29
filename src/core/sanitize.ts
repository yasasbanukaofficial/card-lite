export function sanitizeCardNumber(input: string) {
  const cardNumber = input.replace(/\s/g, "");
  return cardNumber;
}
