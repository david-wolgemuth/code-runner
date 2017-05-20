
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

const renderPassFail = (passed, messageDiv) => {
  if (passed) {
    messageDiv.innerHTML = '<i class="fa fa-check"></i> Passed!';
    messageDiv.classList.add('success');
    messageDiv.classList.remove('failure');
  } else {
    messageDiv.innerHTML = '<i class="fa fa-times"></i> Try Again.';
    messageDiv.classList.add('failure');
    messageDiv.classList.remove('success');
  }
};

const renderErrorMessage = (error, messageDiv, tableBody) => {
  tableBody.innerHTML = '';
  messageDiv.innerText = error;
  messageDiv.classList.add('failure');
  messageDiv.classList.remove('success');
};

module.exports = { renderResults, renderPassFail, renderErrorMessage };
