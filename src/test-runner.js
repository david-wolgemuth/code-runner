
const slog = (args) => {
  console.log(args);
  return '';
}
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
}

const assert = (x, y, functionName, input) => {
  const message = `
    {
      "call": "${functionName}(${
        prettyArgsString(input)
      })",
      "expected": "${x.toString().replace(/\"/g, "\\\"")}",
      "actual": "${y.toString().replace(/\"/g, "\\\"")}"
    }
  `;

  if (x === y) { return message; }
  throw new Error(message);
};

const buildTest = (problem) => (
  problem.tests.reduce((str, test) => (
    str + `(function () {
      "use strict;"
      let successMessage = assert(
        ${problem.functionName}.apply(null, ${argsToArrayString(test)}),
        ${test.return},
        '${problem.functionName}',
        ${argsToArrayString(test)},
      );

      success(successMessage);
    })();
  `), '')
);

const run = (code, problem) => (
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

module.exports = { run };
