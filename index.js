var gcd = function(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

module.exports.calculateFrameSize = (jobs, hyperperiod) => {
    let executionTimes = [];
    let periods = [];
    for (let i = 0; i < jobs.length; i++) {
        periods.push(jobs[i].p);
        executionTimes.push(jobs[i].e);
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
            console.log(`2(${dividesHyperiod[k]})-gcd(${jobs[i].p}, ${dividesHyperiod[k]}) <= ${jobs[i].d} -> ${check ? 'YES' : 'NO'}`)
            if (check) { acceptedFrameSizes[i].push(dividesHyperiod[k]) }
        }
        console.log();
    }

    console.log('Accepted frame sizes:');
    console.log(acceptedFrameSizes);
    
};