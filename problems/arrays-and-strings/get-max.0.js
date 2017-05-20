function getMax (numbers)
{
  let max = null;
  for (let i = 0; i < numbers.length; i++) {
    if (max === null || numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}
