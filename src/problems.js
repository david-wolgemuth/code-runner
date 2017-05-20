
/* global PROBLEMS */

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

const onProblemChange = (callback) => problemChangedCallbacks.push(callback);


module.exports = { onProblemChange, getCurrentProblem };


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
