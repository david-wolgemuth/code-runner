
const getSolvedProblems = () => {
  let problems = window.localStorage.getItem(SOLVED_PROBLEMS);
  if (!problems) {
    problems = {};
    window.localStorage.setItem(SOLVED_PROBLEMS, JSON.stringify(problems));
  }
  return JSON.parse(problems);
};

const setProblemToSolved = (problem) => {
  const problems = getSolvedProblems();
  problems[problem] = true;
  window.localStorage.setItem(SOLVED_PROBLEMS, JSON.stringify(problems));
};

module.exports = { setProblemToSolved, getSolvedProblems };

const SOLVED_PROBLEMS = 'SOLVED_PROBLEMS';
