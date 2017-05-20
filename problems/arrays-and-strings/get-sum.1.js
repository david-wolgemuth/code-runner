const getSum = (arrayOfNumbers) => {
  let sum = 0;
  // Use `forEach` iterator to add each sum
  arrayOfNumbers.forEach((number) => {
    sum += number;    
  });
  return sum;
};
