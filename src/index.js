
const { setupEditor, displayProblem } = require('./editor');
const { run } = require('./test-runner')
const { addListenersToNavbar, renderNavList } = require('./navbar');
const { getCurrentProblem, onProblemChange } = require('./problems');
const { renderErrorMessage, renderPassFail, renderResults } = require('./results');
const { setProblemToSolved } = require('./solved');

const main = () => {
  const area = document.getElementById('code-editor');
  const editor = setupEditor(area);
  const messageDiv = document.getElementById('message');
  const tableBody = document.getElementById('test-results').getElementsByTagName('tbody')[0];
  const runButton = document.getElementById('run');

  const onRun = (event) => {
    const problem = getCurrentProblem();
    const code = editor.getValue();
    const { results, passed, error } = run(code, problem);
    if (passed) {
      setProblemToSolved(problem.functionName, code);
    }
    if (error) {
      renderErrorMessage(error, messageDiv, tableBody);
    } else {
      renderPassFail(passed, messageDiv);
      renderResults(results, tableBody);
    }
  };

  const runTestIfCTREnter = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      onRun(event);
    }
  };

  const updateProblem = (problem) => {
    renderNavList(problem);
    addListenersToNavbar();
    displayProblem(problem, editor);
    tableBody.innerHTML = '';
    messageDiv.innerHTML = '';
  };

  onProblemChange(updateProblem);
  updateProblem(getCurrentProblem());

  document.addEventListener('keyup', runTestIfCTREnter);
  runButton.addEventListener('click', onRun);
};

document.addEventListener('DOMContentLoaded', main);
