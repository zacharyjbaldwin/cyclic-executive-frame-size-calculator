const calc = require('../index');

let jobs = [
    { p: 5, e: 1, d: 5 },
    { p: 10, e: 2, d: 10 },
    { p: 15, e: 3, d: 15 },
    { p: 30, e: 3, d: 30 },
    { p: 30, e: 3, d: 30 }
];

calc.calculateFrameSize(jobs, 30);