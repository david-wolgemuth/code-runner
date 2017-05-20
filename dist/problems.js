window.PROBLEMS = [
  {
    "title": "Sum of Numbers",
    "description": "Return the sum of all numbers in an array",
    "functionName": "sum",
    "parameters": ["numberArray"],
    "tests":[
      {
        "0": [2, 4, 6],
        "return": 12
      },
      {
        "0": [1, 3],
        "return": 4
      },
      {
        "0": [9],
        "return": 9
      }
    ],
    "solutions": [
      "const sum = (arr) => (\n  arr.reduce((s, x) => s + x)\n);\n"
    ]
  },
  {
    "title": "Sum of Numbers 1",
    "description": "ONE Return the sum of all numbers in an array",
    "functionName": "sum1",
    "parameters": ["numberArray"],
    "tests":[
      {
        "0": [2, 4, 6],
        "return": 12
      },
      {
        "0": [1, 3],
        "return": 4
      },
      {
        "0": [9],
        "return": 9
      }
    ],
    "solutions": [
      "const sum1 = (arr) => (\n  arr.reduce((s, x) => s + x)\n);\n"
    ]
  },
  {
    "title": "Sum of Numbers 2",
    "description": "TWO Return the sum of all numbers in an array",
    "functionName": "sum2",
    "parameters": ["numberArray"],
    "tests":[
      {
        "0": [2, 4, 6],
        "return": 12
      },
      {
        "0": [1, 3],
        "return": 4
      },
      {
        "0": [9],
        "return": 9
      }
    ],
    "solutions": [
      "const sum2 = (arr) => (\n  arr.reduce((s, x) => s + x)\n);\n"
    ]
  }
];