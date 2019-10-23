import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const trueErrorMessageRegex = /must be true/;

describe('Ensure isTrue', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).isTrue())
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        it('false', () => {
            expect(() => ensure(() => false).isTrue()).toThrowError(trueErrorMessageRegex)
        });
    });

    describe('should not throw on', () => {
        it('true', () => {
            expect(() => ensure(() => true).isTrue()).not.toThrowError()
        });
    });
});