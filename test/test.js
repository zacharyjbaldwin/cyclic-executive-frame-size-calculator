const calc = require('../index');

// let jobs = [
//     { p: 25, e: 5, d: 25 },
//     { p: 50, e: 10, d: 50 },
//     { p: 100, e: 10, d: 100 },
//     { p: 200, e: 20, d: 200 },
//     { p: 200, e: 20, d: 200 },
// ];

let jobs = [
    { p: 25, e: 1 },
    { p: 50, e: 2 },
    { p: 100, e: 10 },
    { p: 200, e: 20, d: 50 },
    { p: 200, e: 20 },
];

let hyperperiod = 200;

calc.calculateFrameSize(jobs, hyperperiod);