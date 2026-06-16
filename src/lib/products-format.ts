export const formatEUR = (cents: number) =>
  new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(cents / 100);
