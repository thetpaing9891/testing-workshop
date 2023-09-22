export function getMortgageLoan(principal, annualInterest, years) {
  const MONTHS_IN_YEAR = 12;
  const PERCENT = 100;

  const monthlyInterest = Math.fround(
    annualInterest / PERCENT / MONTHS_IN_YEAR,
  );

  const numberOfPayments = parseInt(years) * MONTHS_IN_YEAR;

  const mortage =
    (parseInt(principal) *
      (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments))) /
    (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    useGrouping: false,
  }).format(mortage);

  return formatted;
}

const pricipal = 100000;
const annualInterest = 3.92;
const periodYears = 30;
const result = getMortgageLoan(pricipal, annualInterest, periodYears);
const expectedResult = '$472.81';

if (result !== expectedResult) {
  throw new Error(`${result} is not match of ${expectedResult}`);
}
