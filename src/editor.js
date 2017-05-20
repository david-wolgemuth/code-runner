
const CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');

const { getSolvedProblems } = require('./solved');
const { getCurrentSolution, getProblemSignature } = require('./problems');


const setupEditor = (area) => (
  CodeMirror(area, {
    value: '/* Select a problem */',
    mode:  'javascript',
    tabSize: 2,
    extraKeys: { Tab: setTabs },
    indentWithTabs: false,
    lineNumbers: true
  })
);

const displayProblem = (problem, editor) => {
  const problemInfoDiv = document.getElementById('problem-info');
  const solutionsListDiv = document.getElementById('solutions-list');
  const solvedProblems = getSolvedProblems();

  if (!problem) {
    editor.setValue('/* Select Problem */');
    problemInfoDiv.innerHTML = '';
    return;
  }
  // Show both traditional and arrow function setup
  editor.setValue(functionSuggestionsComment(problem));
  problemInfoDiv.innerHTML = displayProblemInfo(problem);

  const userSolution = solvedProblems[problem.functionName];
  if (userSolution) {
    let solution = getCurrentSolution();
    solutionsListDiv.innerHTML = displaySolutions([userSolution].concat(problem.solutions), solution);
    editor.setValue(solution);
  } else {
    solutionsListDiv.innerHTML = '';
  }
};

module.exports = { setupEditor, displayProblem };


/*------------  PRIVATE  ------------*/


const displaySolutions = (solutions, activeSolution) => (`
  <ul>
    ${solutions.reduce((html, solution, index) => `
      ${html}
      <li class="${
        solution === activeSolution ? 'active' : ''
      }">
        <a href="/?solution=${index-1 /* 0 is user solution */}">
          ${
            index === 0
              ? 'My Solution'
              : 'Solution ' + String(index-1)
          }   
        </a>
      </li>
    `, '')}
  </ul>
`);

const functionSuggestionsComment = (problem) => (`/*
  ${getProblemSignature(problem, false)} { }
  ${getProblemSignature(problem, true)} => { }
*/`);

const setTabs = (cm) => {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
};

const displayProblemInfo = (problem) => (`
  <h4>${problem.title}</h4>
  <p>${problem.description}</p>
`);
