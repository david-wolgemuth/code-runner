
/* global PROBLEMS */

const deepFreeze = (obj) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
};

deepFreeze(PROBLEMS);

const getCurrentProblem = () => {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search.slice(1));
  const functionName = params.get('problem');
  return PROBLEMS.find(problem => problem.functionName === functionName) || null;
};

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

const problemChangedCallbacks = [];
const onParamsChange = () => {
  const problem = getCurrentProblem();
  problemChangedCallbacks.forEach(callback => callback(problem));
};

window.onpopstate = onParamsChange;
window.history.onpushstate = onParamsChange;

const onProblemChange = (callback) => problemChangedCallbacks.push(callback);

module.exports = { onProblemChange, getCurrentProblem };

