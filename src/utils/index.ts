export const formatNumber = (value: number | string): string => {
  if (!value) return '';

  return new Intl.NumberFormat('es-DO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
  }).format(amount);
};

export const formatDOP = (n: number) =>
  new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 0,
  }).format(n);

export const formatYears = (totalMonths: number) => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12; //
  if (totalMonths === 0) {
    return '0 meses';
  }
  let result = '';
  if (years > 0) {
    const yearText = years === 1 ? 'año' : 'años';
    result += years + ' ' + yearText;
  } else if (months > 0) {
    const monthText = months === 1 ? 'mes' : 'meses';
    const monthString = months + ' ' + monthText;
    if (result.length > 0) {
      result += ' y ';
    }
    result += monthString;
  }
  return result;
};
