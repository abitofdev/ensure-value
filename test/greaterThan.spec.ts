import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const greaterThanErrorMessageRegex = /must be greater than/

describe('Ensure greaterThan', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).greaterThan(0))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [null, undefined].forEach(testData => {
            it('null/undefined threshold', () => {
                expect(() => ensure(() => 10).greaterThan(testData))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [
            {value: 0, threshold: 10},
            {value: -1, threshold: 0},
            {value: 0, threshold: 0},
            {value: -9876, threshold: -8765}
        ].forEach(testData => {
            it(`value = ${testData.value} > ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .greaterThan(testData.threshold)).toThrowError(greaterThanErrorMessageRegex)
            });
        })
    });

    describe('should not throw on', () => {

       [
            {value: 1, threshold: 0},
            {value: -1, threshold: -10},
            {value: 101, threshold: 100},
            {value: 19.00001, threshold: 19},
            {value: 5 + 5, threshold: 7}
        ].forEach(testData => {
            it(`value = ${testData.value} > ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .greaterThan(testData.threshold)).not.toThrowError()
            });
        })
    });
});