import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const greaterThanErrorMessageRegex = /must contain at least one item/;

describe('Ensure hasItems', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).hasItems())
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        it('empty array', () => {
            const testData = [];
            expect(() => ensure(() => testData).hasItems())
                .toThrowError(greaterThanErrorMessageRegex);
        });
    });

    describe('should not throw on', () => {

       [
           {title: 'number array', array: [1, 2, 3]},
           {title: 'string array', array: 'test'.split('')},
           {title: 'ArrayConstructor', array: new Array<boolean>(true, false, true)},
           {title: 'spread', array: [...[], 'test'] }
        ].forEach(testData => {
            it(testData.title, () => {
                expect(() => ensure(() => testData.array)
                    .hasItems()).not.toThrowError()
            });
        })
    });
});