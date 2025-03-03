export const getPercentageIncrease = (prev: number, cur: number) => {
  let percentage;
  const trendSign = cur >= prev ? "-" : "+";

  if (cur !== 0) {
    if (prev !== 0) {
      percentage = ((cur - prev) / prev) * 100;
    } else {
      percentage = cur * 100;
    }
  } else {
    percentage = prev * 100;
  }

  return `${trendSign}${percentage}%`;
};
