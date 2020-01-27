import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const greaterThanOrEqualErrorMessageRegex = /must be greater than or equal to/

describe('Ensure greaterThanOrEquals', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).greaterThanOrEquals(0))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [null, undefined].forEach(testData => {
            it('null/undefined threshold', () => {
                expect(() => ensure(() => 10).greaterThanOrEquals(testData))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [
            {value: 0, threshold: 10},
            {value: -1, threshold: 0},
            {value: -9876, threshold: -8765}
        ].forEach(testData => {
            it(`value = ${testData.value} >= ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .greaterThanOrEquals(testData.threshold)).toThrowError(greaterThanOrEqualErrorMessageRegex)
            });
        })
    });

    describe('should not throw on', () => {

       [
            {value: 0, threshold: 0},
            {value: 1, threshold: 0},
            {value: -1, threshold: -10},
            {value: 101, threshold: 100},
            {value: 19.00001, threshold: 19},
            {value: 5 + 5, threshold: 7}
        ].forEach(testData => {
            it(`value = ${testData.value} > ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .greaterThanOrEquals(testData.threshold)).not.toThrowError()
            });
        })
    });
});