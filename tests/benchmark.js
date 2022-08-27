const testObject = require('./payload');
const { reduceObjectAsync, reduceObjectSync } = require('../index');

// Configure test variables

const numberOfSamplesToReduce = 10000000;

console.log('Starting test for the sync version');

const startSync = Date.now();

for (let i = 1; i <= numberOfSamplesToReduce; i++) {
    reduceObjectSync(testObject);
}

const endSync = Date.now();

console.log(
    `Took ${
        (endSync - startSync) / 1000
    } seconds to process ${numberOfSamplesToReduce} samples with the sync version`
);

console.log(
    '========================================================================'
);
console.log('Starting test for the async version');

(async () => {
    const startAsync = Date.now();

    for (let i = 1; i <= numberOfSamplesToReduce; i++) {
        await reduceObjectAsync(testObject);
    }

    const endAsync = Date.now();

    console.log(
        `Took ${
            (endAsync - startAsync) / 1000
        } seconds to process ${numberOfSamplesToReduce} samples with the async version`
    );
})();
