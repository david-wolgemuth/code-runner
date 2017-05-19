
const { setupEditor } = require('./editor');

const main = ( ) => {
  const area = document.getElementById('code-editor');
  setupEditor(area);
};

document.addEventListener('DOMContentLoaded', main);
