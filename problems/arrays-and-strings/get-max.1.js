const getMax = (numbers) => (
  numbers.reduce((max, num) => (
    (max === null || num > max)
      ? num
      : max
  ), null)
);