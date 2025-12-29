export function validateExpiry(
  month: number | string,
  year: number | string
): boolean {
  month = Number(month);
  year = Number(year);

  if (month < 1 || month > 12) return false;

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  if (year > currentYear) return true;
  if (year === currentYear) return month >= currentMonth;

  return false;
}
