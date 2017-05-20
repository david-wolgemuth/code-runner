
const CodeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');

const setTabs = (cm) => {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(cm.getOption("indentWithTabs")? "\t":
      Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
  }
};

const setupEditor = (area) => (
  CodeMirror(area, {
    value: 'const sum = (arr) => (\n  arr.reduce((s, x) => s + x)\n);\n',
    mode:  'javascript',
    tabSize: 2,
    extraKeys: { Tab: setTabs },
    indentWithTabs: false,
    lineNumbers: true
  })
);

const displayProblem = (problem, editor) => {
  editor.setValue(problem.solutions[0]);
};

module.exports = { setupEditor, displayProblem };
