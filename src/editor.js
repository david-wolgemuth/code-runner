
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
    value: 'function myScript(){\n  return 100;\n}\n',
    mode:  'javascript',
    tabSize: 2,
    extraKeys: { Tab: setTabs },
    indentWithTabs: false,
    lineNumbers: true
  })
);

module.exports = { setupEditor };
