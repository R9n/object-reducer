/* eslint-disable no-undef */
const {
    reduceObjectSync,
    reduceObjectAsync,
    checkForCyclicReferences,
} = require('../index');

describe('index.js', () => {
    it('Should reduce nested objet to a reduced object with sync method', () => {
        const nestedObject = {
            prop1: 1,
            nested1: {
                prop2: 2,
                nested3: {
                    prop3: 3,
                    prop4: 'teste',
                },
                prop5: 5,
            },
            prop6: 6,
        };
        const reducedObject = reduceObjectSync(nestedObject);

        expect(reducedObject.prop1).toBe(1);
        expect(reducedObject.prop2).toBe(2);
        expect(reducedObject.prop3).toBe(3);
        expect(reducedObject.prop4).toBe('teste');
        expect(reducedObject.prop5).toBe(5);
        expect(reducedObject.prop6).toBe(6);
    });

    it('Should reduce nested objet to a reduced object with async method', async () => {
        const nestedObject = {
            prop1: 1,
            nested1: {
                prop2: 2,
                nested3: {
                    prop3: 3,
                    prop4: 'teste',
                },
                prop5: 5,
            },
            prop6: 6,
        };
        const reducedObject = await reduceObjectAsync(nestedObject);

        expect(reducedObject.prop1).toBe(1);
        expect(reducedObject.prop2).toBe(2);
        expect(reducedObject.prop3).toBe(3);
        expect(reducedObject.prop4).toBe('teste');
        expect(reducedObject.prop5).toBe(5);
        expect(reducedObject.prop6).toBe(6);
    });

    it('Should detect object with cyclic references', async () => {
        const firstObject = {};

        const secondObject = {};

        const goodObject = {};

        firstObject.secondObject = secondObject;

        secondObject.firstObject = firstObject;

        const hasCirculareferenceInFirstObject =
            checkForCyclicReferences(firstObject);

        const hasCirculareferenceInSecondObject =
            checkForCyclicReferences(firstObject);

        const hasCirculareferenceInGoodObject =
            checkForCyclicReferences(goodObject);

        expect(hasCirculareferenceInFirstObject).toBe(true);
        expect(hasCirculareferenceInSecondObject).toBe(true);
        expect(hasCirculareferenceInGoodObject).toBe(false);
    });
});
