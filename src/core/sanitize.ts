export function sanitizeCardNumber(input: string) {
  const cardNumber = input.replace(/\s/g, "");
  return Number(cardNumber);
}
