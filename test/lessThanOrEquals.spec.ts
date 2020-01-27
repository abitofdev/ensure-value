import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const lessThanOrEqualsErrorMessageRegex = /must be less than or equal to/;

describe('Ensure lessThanOrEquals', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).lessThanOrEquals(0))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [null, undefined].forEach(testData => {
            it('null/undefined threshold', () => {
                expect(() => ensure(() => 10).lessThanOrEquals(testData))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [
            {value: 1, threshold: 0},
            {value: 0, threshold: -1},
            {value: 9876, threshold: -8765}
        ].forEach(testData => {
            it(`value = ${testData.value} <= ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .lessThanOrEquals(testData.threshold)).toThrowError(lessThanOrEqualsErrorMessageRegex)
            });
        })
    });

    describe('should not throw on', () => {
       [
            {value: 0, threshold: 0},
            {value: -1, threshold: 0},
            {value: -10, threshold: -1},
            {value: 99, threshold: 100},
            {value: 19.00001, threshold: 19.1},
            {value: 9 - 5, threshold: 7}
        ].forEach(testData => {
            it(`value = ${testData.value} <= ${testData.threshold}`, () => {
                expect(() => ensure(() => testData.value)
                    .lessThanOrEquals(testData.threshold)).not.toThrowError()
            });
        })
    });
});