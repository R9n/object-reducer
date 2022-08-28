function auxReduceObject(plainObject, paramName, value) {
    if (typeof value === 'object' && !Array.isArray(value)) {
        const keys = Object.keys(value);

        for (const key of keys) {
            auxReduceObject(plainObject, key, value[key]);
        }
    } else {
        plainObject[paramName] = value;
    }
}

function reduceObjectSync(object, checkForCycles = true) {
    const plain = Object.create(null, {});

    if (!object) {
        return {};
    }

    if (checkForCycles && checkForCyclicReferences(object)) {
        throw new Error(
            'It is not possible to reduce this object due to the presence of cyclic references'
        );
    }
    auxReduceObject(plain, 'start', object);

    return plain;
}

async function reduceObjectAsync(object, checkForCycles = true) {
    const plain = Object.create(null, {});

    if (!object) {
        return {};
    }

    if (checkForCycles && checkForCyclicReferences(object)) {
        throw new Error(
            'It is not possible to reduce this object due to the presence of cyclic references'
        );
    }

    auxReduceObject(plain, 'start', object);

    return plain;
}

function checkForCyclicReferences(receivedObject) {
    const visitedObjects = [];

    const sanitizedObj = { ...receivedObject };

    function detect(obj) {
        if (obj && typeof obj === 'object') {
            if (visitedObjects.indexOf(obj) !== -1) {
                return true;
            }
            visitedObjects.push(obj);
            for (const key in obj) {
                // eslint-disable-next-line no-prototype-builtins
                if (obj.hasOwnProperty(key) && detect(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    }

    return detect(sanitizedObj);
}

module.exports = {
    reduceObjectAsync,
    reduceObjectSync,
    checkForCyclicReferences,
};
