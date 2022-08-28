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

    it('Should throw error with object with ciclic reference in sync version', async () => {
        const firstObject = {};

        const secondObject = {};

        firstObject.secondObject = secondObject;

        secondObject.firstObject = firstObject;

        expect(() => {
            reduceObjectSync(firstObject);
        }).toThrow(
            /It is not possible to reduce this object due to the presence of cyclic references/
        );
        expect(() => {
            reduceObjectSync(secondObject);
        }).toThrow(
            /It is not possible to reduce this object due to the presence of cyclic references/
        );
    });
    it('Should throw error with object with ciclic reference in async version', async () => {
        const firstObject = {};

        const secondObject = {};

        firstObject.secondObject = secondObject;

        secondObject.firstObject = firstObject;

        expect(async () => {
            await reduceObjectAsync(firstObject);
        }).rejects.toThrow(
            /It is not possible to reduce this object due to the presence of cyclic references/
        );

        expect(async () => {
            await reduceObjectAsync(secondObject);
        }).rejects.toThrow(
            /It is not possible to reduce this object due to the presence of cyclic references/
        );
    });

    it('Should return a empty object when undefinned object is passed', async () => {
        const object = undefined;

        const emptyObject1 = reduceObjectSync(object);
        const emptyObject2 = await reduceObjectAsync(object);

        expect(emptyObject1).toEqual({});
        expect(emptyObject2).toEqual({});
    });
});
