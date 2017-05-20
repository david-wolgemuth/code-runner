
const { setupEditor, displayProblem } = require('./editor');
const { run } = require('./test-runner')
const { addListenersToNavbar } = require('./navbar');
const { getCurrentProblem, onProblemChange } = require('./problems');
const { renderErrorMessage, renderPassFail, renderResults } = require('./results');

const runTest = (event, editor) => {
  const results = [];
  try {
    const passed = run(editor.getValue(), getCurrentProblem())(
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

const main = () => {
  const area = document.getElementById('code-editor');
  const editor = setupEditor(area);

  const messageDiv = document.getElementById('message');
  const tableBody = document.getElementById('test-results').getElementsByTagName('tbody')[0];

  const runButton = document.getElementById('run');

  const _runTest = (event) => {
    const { results, passed, error } = runTest(event, editor);
    if (error) {
      renderErrorMessage(error, messageDiv, tableBody);
    } else {
      renderPassFail(passed, messageDiv);
      renderResults(results, tableBody);
    }
  };

  const runTestIfCTREnter = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      _runTest(event);
    }
  };

  displayProblem(getCurrentProblem(), editor);
  onProblemChange(problem => displayProblem(problem, editor));

  document.addEventListener('keyup', runTestIfCTREnter);
  runButton.addEventListener('click', _runTest);

  addListenersToNavbar();
};

document.addEventListener('DOMContentLoaded', main);
