
const run = (code, problem) => {
  const results = [];
  try {
    const passed = runTest(code, problem)(
      (message) => {
        results.push({ message: JSON.parse(message), success: true });
    }, (message) => {
        results.push({ message: JSON.parse(message), success: false });
    });
    return { results, passed };
  } catch (error) {
    return { error };
  }
};


module.exports = { run };


/*------------  PRIVATE  ------------*/


const runTest = (code, problem) => (
  function (success, failure) {
    "use strict";
    const func = new Function('success', 'assert', `
      "use strict";
      ${code}
      ${buildTest(problem)}
    `);
    try {
      func(success, assert);
    } catch (error) {
      failure(error.message);
      return false;
    }
    return true;
  }
);

const buildTest = (problem) => (
  problem.tests.reduce((str, test) => (
    str + `(function () {
      "use strict;"
      let successMessage = assert(
        ${test.return},
        ${problem.functionName}.apply(null, ${argsToArrayString(test)}),
        '${problem.functionName}',
        ${argsToArrayString(test)},
      );

      success(successMessage);
    })();
  `
  ), '')
);

const assert = (x, y, functionName, input) => {
  const message = `
    {
      "call": "${functionName}(${
        prettyArgsString(input)
      })",
      "expected": ${safeJSONSymbol(x)},
      "actual": ${safeJSONSymbol(y)}
    }
  `;
  if (x === y) { return message; }
  throw new Error(message);
};

const safeJSONSymbol = (input) => {
  for (let bad of [null, undefined]) {
    if (input === bad) {
      return input;
    }
  }
  if (typeof input === 'number') {
    return input;
  }
  return `"${input.toString().replace(/\"/g, "\\\"")}"`;
};

const argsToArrayString = (args) => {
  const array = [];
  for (let key in args) {
    if (key == +key) {  // is index
      array[key] = args[key];
    }
  }
  return JSON.stringify(array);
};

const prettyArgsString = (args) => {
  const array = [];
  for (let key in args) {
    if (key == +key) {  // is index
      array[key] = JSON.stringify(args[key]).replace(/\"/g, "\\\"");
    }
  }
  return array.join(', ');
};
