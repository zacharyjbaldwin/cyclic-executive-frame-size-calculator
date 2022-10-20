const chalk = require('chalk');

var gcd = function(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

module.exports.calculateFrameSize = (jobs, hyperperiod) => {
    let executionTimes = [];
    let periods = [];
    let deadlines = [];
    let utilization = 0;
    let utilizationRM = jobs.length * (Math.pow(2, (1/jobs.length)) - 1);
    let simplyPeriodic = true;

    for (let i = 0; i < jobs.length; i++) {
        periods.push(jobs[i].p);
        executionTimes.push(jobs[i].e);
        if (!jobs[i].d) { jobs[i].d = jobs[i].p; }
        deadlines.push(jobs[i].d);
        utilization += (jobs[i].e / Math.min(jobs[i].p, jobs[i].d));

        for (let k = i + 1; k < jobs.length; k++) {
            if (!(jobs[k].p % jobs[i].p == 0) || (jobs[i].p > jobs[i].d)) simplyPeriodic = false;
        }
    }
    let maxExecutionTime = Math.max(...executionTimes);
    let dividesHyperiod = [];

    for (let i = 0; i <= hyperperiod; i++) {
        if (hyperperiod % i == 0 && i >= maxExecutionTime) dividesHyperiod.push(i);
    }

    console.log(`f >= max(e) -> f >= ${maxExecutionTime}`);
    console.log(`f divides H -> {${dividesHyperiod.join(', ')}}`);

    let acceptedFrameSizes = [];
    for (let i = 0; i < jobs.length; i++) {
        acceptedFrameSizes.push([]);
    }

    for (let i = 0; i < jobs.length; i++) {
        console.log(`Job ${i+1}`);
        for (let k = 0; k < dividesHyperiod.length; k++) {
            let check = ((2*dividesHyperiod[k]) - gcd(jobs[i].p, dividesHyperiod[k]) <= jobs[i].d);
            console.log(`2(${dividesHyperiod[k]})-gcd(${jobs[i].p}, ${dividesHyperiod[k]}) <= ${jobs[i].d} -> ${check ? chalk.green('YES') : chalk.red('NO')}`)
            if (check) { acceptedFrameSizes[i].push(dividesHyperiod[k]) }
        }
        console.log();
    }

    console.log('Accepted frame sizes:');

    for (let i = 0; i < acceptedFrameSizes.length; i++) {
        console.log(`Job ${i + 1}: {${chalk.yellow(acceptedFrameSizes[i].join(', '))}}`);
    }

    // console.log(acceptedFrameSizes);

    console.log(`\nUtilization U = ${utilization}`);
    console.log(`Utilization U_RM = ${utilizationRM}`);
    let UrmGTU = utilizationRM >= utilization;
    console.log(`U_RM >= U? -> ${UrmGTU ? chalk.green('YES') : chalk.red('NO')}`);
    console.log(`Simply periodic? -> ${simplyPeriodic ? chalk.green('YES') : chalk.red('NO')}`);

    console.log(`\nSurely schedulable with EDF? -> ${utilization <= 1 ? chalk.green('YES') : chalk.red('NO')}`);
    console.log(`Surely schedulable with RM? -> ${UrmGTU || simplyPeriodic ? chalk.green('YES') : chalk.red('NO')}`);

    
};