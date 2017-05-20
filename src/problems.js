
/* global PROBLEMS */

const { getSolvedProblems } = require('./solved');

const getCurrentProblem = () => {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search.slice(1));
  const groupName = params.get('group');
  const problemName = params.get('problem');
  const group = PROBLEMS.find(group => group.group === groupName) || null;
  return group
    ? (group.problems.find(problem => problem.functionName === problemName) || null) 
    : null;
};

const getCurrentSolution = () => {
  const problem = getCurrentProblem();
  if (!problem) {
    return null;
  }

  const url = new URL(window.location);
  const params = new URLSearchParams(url.search.slice(1));
  const solution = parseInt(params.get('solution'));

  if (solution === -1) {
    let solved = getSolvedProblems();
    return solved[problem.functionName];
  }

  return problem.solutions[solution] || null;
};

const onProblemChange = (callback) => problemChangedCallbacks.push(callback);

const getProblemSignature = (problem, arrow) => (
  arrow ?
    `const ${problem.functionName} = (${problem.parameters.join(', ')})`
    :
    `function ${problem.functionName} (${problem.parameters.join(', ')})`
);

module.exports = { onProblemChange, getCurrentProblem, getProblemSignature, getCurrentSolution };


/*------------  PRIVATE  ------------*/


const problemChangedCallbacks = [];
const onParamsChange = () => {
  const problem = getCurrentProblem();
  problemChangedCallbacks.forEach(callback => callback(problem));
};

window.onpopstate = onParamsChange;
window.history.onpushstate = onParamsChange;

(function createOnPushStateHandler (history){
    // http://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate
    var pushState = history.pushState;
    history.pushState = function (state) {
      let x = pushState.apply(history, arguments);
      if (typeof history.onpushstate === "function") {
        history.onpushstate({ state });
      }
      return x;
    };
})(window.history);
