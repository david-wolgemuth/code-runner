/* global PROBLEMS */

const renderNavList = (currentProblem) => {
  const list = document.querySelectorAll('nav > ol')[0];
  const listHtml = PROBLEMS.reduce((html, group) => (html + renderProblemGroup(group, currentProblem)), '')
  list.innerHTML = listHtml;
};

const addListenersToNavbar = () => {
  const nav = document.getElementsByTagName('nav')[0];
  nav.addEventListener('click', updateSearch);
  const main = document.getElementById('main');
  nav.getElementsByTagName('button')[0].addEventListener('click', e=>toggle(e, nav, main));
};


module.exports = { addListenersToNavbar, renderNavList };


/*------------  PRIVATE  ------------*/


const renderProblemGroup = (group, currentProblem) => `
    <li>${group.group}
      <ul>
        ${group.problems.reduce((html, problem) => html + renderProblem(group.group, problem, currentProblem), '')}
      </ul>
    </li>
`;

const renderProblem = (group, problem, currentProblem) => `<li class="${(currentProblem && currentProblem.functionName === problem.functionName) ? 'active' : ''}">
  <i class="fa fa-circle success"></i>
  <a href="/?problem=${problem.functionName}&group=${group}">${problem.functionName}</a>
</li>`;

const updateSearch = (event) => {
  if (event.target.tagName !== 'A') {
    return;
  }
  event.preventDefault();

  let url = new URL(window.location);
  let params = new URLSearchParams(url.search.slice(1));

  let href = 'https://abc.com' + event.target.getAttribute('href');  // Create valid url from href
  let destURL = new URL(href);
  let destParams = new URLSearchParams(destURL.search.slice(1));

  let problem = destParams.get('problem');
  let group = destParams.get('group');
  params.set('problem', problem);
  params.set('group', group);
  window.history.pushState({ problem, group }, problem, `/?${params}`);
};

const toggle = (event, nav, main) => {
  nav.classList.toggle('closed');
  main.classList.toggle('nav-open');
};
