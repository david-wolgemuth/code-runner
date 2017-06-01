
const getSolvedProblems = () => {
  let problems = window.localStorage.getItem(SOLVED_PROBLEMS);
  if (!problems) {
    problems = {};
    window.localStorage.setItem(SOLVED_PROBLEMS, JSON.stringify(problems));
  }
  return JSON.parse(problems);
};

const setProblemToSolved = (problem, code) => {
  const problems = getSolvedProblems();
  problems[problem] = code;
  window.localStorage.setItem(SOLVED_PROBLEMS, JSON.stringify(problems));
};

const resetSolved = () => {
  window.localStorage.setItem(SOLVED_PROBLEMS, JSON.stringify({}));
};

module.exports = { setProblemToSolved, getSolvedProblems, resetSolved };

const SOLVED_PROBLEMS = 'SOLVED_PROBLEMS';
