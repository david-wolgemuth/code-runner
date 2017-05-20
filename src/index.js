
const { setupEditor } = require('./editor');
const { run } = require('./test-runner')
const { addListenersToNavbar } = require('./navbar');

const renderResults = (results, tableBody) => {
  tableBody.innerHTML = results.reduce((html, result) => (html + `
    <tr>
      ${console.log(result)?'':''}
      <td>${result.message.call}</td>
      <td>${result.message.expected}</td>
      <td>${result.message.actual}</td>
      <td>
        <i class="fa ${result.success ? 'fa-circle success' : 'fa-circle-o failure' }" aria-hidden="true"></i>
      </td>
    </tr>
  `), '');
};

const runTest = (event, editor, messageDiv, tableBody) => {
  const results = [];
  try {
    const passed = run(editor.getValue())(
      (message) => {
        console.log(message);
        results.push({ message: JSON.parse(message), success: true });
    }, (message) => {
        results.push({ message: JSON.parse(message), success: false });
    });
    if (passed) {
      messageDiv.innerHTML = '<i class="fa fa-check"></i> Passed!';
      messageDiv.classList.add('success');
      messageDiv.classList.remove('failure');
    } else {
      messageDiv.innerHTML = '<i class="fa fa-times"></i> Try Again.';
      messageDiv.classList.add('failure');
      messageDiv.classList.remove('success');
    }
    renderResults(results, tableBody);
  } catch (error) {
    tableBody.innerHTML = '';
    messageDiv.innerText = error;
    messageDiv.classList.add('failure');
  }
};


const main = () => {
  const area = document.getElementById('code-editor');
  const editor = setupEditor(area);

  const messageDiv = document.getElementById('message');
  const tableBody = document.getElementById('test-results').getElementsByTagName('tbody')[0];

  const runButton = document.getElementById('run');

  const _runTest = (event) => {
    runTest(event, editor, messageDiv, tableBody);
  };

  const runTestIfCTREnter = (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      _runTest(event);
    }
  };
  
  document.addEventListener('keyup', runTestIfCTREnter);
  runButton.addEventListener('click', _runTest);

  addListenersToNavbar();
};

document.addEventListener('DOMContentLoaded', main);
