

const updateSearch = (event) => {
  if (event.target.tagName !== 'A') {
    return;
  }
  event.preventDefault();

  let url = new URL(window.location);
  let params = new URLSearchParams(url.search.slice(1));

  const problem = event.target.innerText;

  if (params.get('problem') !== problem) {
    params.set('problem', problem);
    window.history.pushState({ problem }, problem, `/?${params}`);
  }
};

const toggle = (event, nav, main) => {
  nav.classList.toggle('closed');
  main.classList.toggle('nav-open');
};

const addListenersToNavbar = () => {
  const nav = document.getElementsByTagName('nav')[0];
  nav.addEventListener('click', updateSearch);
  const main = document.getElementById('main');
  nav.getElementsByTagName('button')[0].addEventListener('click', e=>toggle(e, nav, main));
};

module.exports = { addListenersToNavbar };
