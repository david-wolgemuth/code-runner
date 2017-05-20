/* global PROBLEMS */

const { getSolvedProblems } = require('./solved');

const renderNavList = (currentProblem) => {
  const list = document.querySelectorAll('nav > ol')[0];
  const solvedProblems = getSolvedProblems();
  const listHtml = PROBLEMS.reduce((html, group) => (html + renderProblemGroup(group, currentProblem, solvedProblems)), '');
  list.innerHTML = listHtml;
};

const addListenersToNavbar = () => {
  const solutionsList = document.getElementById('solutions-list');
  const nav = document.getElementsByTagName('nav')[0];
  nav.addEventListener('click', updateSearch);
  solutionsList.addEventListener('click', updateSearch);
  const main = document.getElementById('main');
  nav.getElementsByTagName('button')[0].addEventListener('click', e=>toggle(e, nav, main));
};


module.exports = { addListenersToNavbar, renderNavList };


/*------------  PRIVATE  ------------*/


const renderProblemGroup = (group, currentProblem, solvedProblems) => `
  <li>${group.group}
    <ul>
        ${
          group.problems.reduce(
            (html, problem) => (
                html +
                  renderProblem(
                    group.group,
                    problem,
                    currentProblem,
                    Boolean(solvedProblems[problem.functionName])
                  )
            ), '')
        }
      </ul>
    </li>
`;

const renderProblem = (group, problem, currentProblem, solved) => `<li
    class="
      ${isSameProblem(problem, currentProblem) ? 'active' : ''}
      ${solved ? 'success' : 'failure' }
      ">
  <i class="fa 
    ${solved ? 'fa-circle' : 'fa-circle-o' }
  "></i>
  <a href="/?problem=${problem.functionName}&group=${group}">${problem.functionName}</a>
</li>`;

const isSameProblem = (a, b) => (
  (a && b && a.functionName === b.functionName)
);

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
  let solution = destParams.get('solution');
  if (problem) {
    params.set('problem', problem);
  }
  if (group) {
    params.set('group', group);
  }
  if (solution) {
    params.set('solution', solution);
  }

  window.history.pushState({ problem, group }, problem, `/?${params}`);
};

const toggle = (event, nav, main) => {
  nav.classList.toggle('closed');
  main.classList.toggle('nav-open');
};
