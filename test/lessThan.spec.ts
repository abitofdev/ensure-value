import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const lessThanErrorMessageRegex = /must be less than/;

describe('Ensure lessThan', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).lessThan(0))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [null, undefined].forEach(testData => {
            it('null/undefined threshold', () => {
                expect(() => ensure(() => 10).lessThan(testData))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [
            {value: 1, threshold: 0},
            {value: 0, threshold: -1},
            {value: 0, threshold: 0},
            {value: 9876, threshold: -8765}
        ].forEach(testData => {
            it(`value = ${testData.value} < ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .lessThan(testData.threshold)).toThrowError(lessThanErrorMessageRegex)
            });
        })
    });

    describe('should not throw on', () => {
       [
            {value: -1, threshold: 0},
            {value: -10, threshold: -1},
            {value: 99, threshold: 100},
            {value: 19.00001, threshold: 19.1},
            {value: 9 - 5, threshold: 7}
        ].forEach(testData => {
            it(`value = ${testData.value} > ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .lessThan(testData.threshold)).not.toThrowError()
            });
        })
    });
});