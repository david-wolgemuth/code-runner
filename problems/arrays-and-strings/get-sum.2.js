const getSum = (arrayOfNumbers) => (  // Use arrow functions with `()` to automatically return
  // Use `reduce` to iterate over all numbers, adding them to the sum.  Explanation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=example
  arrayOfNumbers.reduce((sum, num) => (sum + num), 0)
);
