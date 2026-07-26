export const getPercentageIncrease = (prev: number, cur: number) => {
  if (prev === 0) {
    return "0%";
  }

  const percentage = Math.round(((cur - prev) / prev) * 100);
  const trendSign = percentage > 0 ? "+" : "";

  return `${trendSign}${percentage}%`;
};
