export function formatPrice(number: number) {
  return Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  });
}
