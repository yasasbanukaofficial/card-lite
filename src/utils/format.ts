export function format(cardNumber: string | number) {
  cardNumber = String(cardNumber);
  return cardNumber.replace(/(.{4})(?=.+)/g, "$1 ");
}
