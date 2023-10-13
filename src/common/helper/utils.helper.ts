export function transformAndCompareDate(value: number): boolean {
  const dateInMilliseconds = value * 1000;

  const currentDate = new Date();

  const providedDate = new Date(dateInMilliseconds);

  return providedDate > currentDate;
}
