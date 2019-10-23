import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const falseErrorMessageRegex = /must be false/;

describe('Ensure isFalse', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).isFalse())
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        it('true', () => {
            expect(() => ensure(() => true).isFalse()).toThrowError(falseErrorMessageRegex)
        });
    });

    describe('should not throw on', () => {
        it('false', () => {
            expect(() => ensure(() => false).isFalse()).not.toThrowError()
        });
    });
});