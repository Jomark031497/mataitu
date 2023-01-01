const toCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("tl-PH", {
    style: "currency",
    currency: "PHP",
  });

  return formatter.format(amount);
};

export default toCurrency;
