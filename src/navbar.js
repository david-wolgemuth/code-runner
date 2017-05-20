

const toggle = (event, nav, main) => {
  nav.classList.toggle('closed');
  main.classList.toggle('nav-open');
};

const addListenersToNavbar = () => {
  const nav = document.getElementsByTagName('nav')[0];
  const main = document.getElementById('main');
  nav.getElementsByTagName('button')[0].addEventListener('click', e=>toggle(e, nav, main));
};

module.exports = { addListenersToNavbar };
