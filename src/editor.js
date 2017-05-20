
const CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');

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
  // const solutionsListDiv = document.getElementById('solutions-list');
  // const solved = window.localStorage.get('solvedProblems');

  if (problem) {
    editor.setValue(problem.solutions[0]);
  }
};

module.exports = { setupEditor, displayProblem };


/*------------  PRIVATE  ------------*/


const setTabs = (cm) => {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
};
