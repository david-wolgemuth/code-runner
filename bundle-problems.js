const fs = require('fs');
const yaml = require('yaml-js');
const path = require('path');

const INPUT_DIRECTORY = path.join(__dirname, 'problems');
const OUTPUT_PATH = path.join(__dirname, 'dist', 'problems.js');


const main = () => {
  const bundle = `const PROBLEMS = ${
    JSON.stringify(
      bundleProblems()
    )
  }; ${deepFreeze}`;
  fs.writeFileSync(OUTPUT_PATH, bundle);
};

const bundleProblems = () => {
  const problemsDirs = fs.readdirSync(INPUT_DIRECTORY);
  return problemsDirs.map((dir) => {
    const dirPath = path.join(INPUT_DIRECTORY, dir);
    return { group: dir, problems: bundleProblemsInDir(dirPath) };
  });
};

const bundleProblemsInDir = (dirPath) => {
  const stats = fs.statSync(dirPath);
  if (!stats.isDirectory()) {
    return;
  }
  const problemFilePaths = fs.readdirSync(dirPath)
    .sort((a, b) => {
      if (a.indexOf('yaml') !== -1) {  // First sort by all yaml files
        return -1;
      }
      if (b.indexOf('yaml') !== -1) {
        return 1;
      }
      return (a < b) ? -1 : 1                 // sort by solution numbers
    });
  const problems = combineYAMLPathsAndSolutionsPaths(dirPath, problemFilePaths);
  const bundledProblems = problems.map(bundleProblem);
  return bundledProblems;
};

const combineYAMLPathsAndSolutionsPaths = (dirPath, problemFilePaths) => {
  const problems = {};
  problemFilePaths.forEach(filepath => {
    let splitPath = filepath.split('.');
    let key = splitPath[0];
    if (filepath.indexOf('.yaml') !== -1) {
      let obj = {
        yamlpath: path.join(dirPath, filepath),
        solutions: []
      };
      problems[key] = obj;
    } else {
      let solutionNumber = splitPath[1];
      problems[key].solutions[solutionNumber] = path.join(dirPath, filepath);
    }
  });
  return Object.values(problems);
};

const bundleProblem = (problem) => {
  const yamlfile = fs.readFileSync(problem.yamlpath, 'utf8');
  const object = yaml.load(yamlfile);
  object.solutions = problem.solutions.map(problem => (
    fs.readFileSync(problem, 'utf8')
  ));
  return object;
}; 

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
const deepFreeze = `(function deepFreeze (obj) { var propNames = Object.getOwnPropertyNames(obj); propNames.forEach(function(name) { var prop = obj[name]; if (typeof prop == 'object' && prop !== null) { deepFreeze(prop); } }); return Object.freeze(obj); })(PROBLEMS);`;

main();
