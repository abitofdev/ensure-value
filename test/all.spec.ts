import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const hasItemsErrorMessageRegex = /must contain at least one item/;

describe('Ensure all', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).all(x => x))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        it('empty array', () => {
            const testData = [];
            expect(() => ensure(() => testData).all(x => x))
                .toThrowError(hasItemsErrorMessageRegex);
        });

        [null, undefined].forEach(validateFunc => {
            it('null/undefined validate function', () => {
                const testData = [1, 2, 3];
                expect(() => ensure(() => testData).all(validateFunc))
                    .toThrowError(nullErrorMessageRegex);
            });
        });

        it('number array', () => {
            const testData = [1, 2, 3];
            expect(() => ensure(() => testData)
                .all((num) => num.greaterThan(5))).toThrowError(/must be greater than/)
        });

        it('string array', () => {
            const testData = ['test', ' ', 'data'];
            expect(() => ensure(() => testData)
                .all((val) => val.notNullOrWhitespace())).toThrowError(/must not be empty or whitespace/)
        });
    });

    describe('should not throw on', () => {

        it('empty validate function', () => {
            const testData = [1, 2, 3];
            expect(() => ensure(() => testData).all(x => x))
                .not.toThrowError()
        });

        it('greaterThan 0', () => {
            const testData = [1, 2, 3];
            expect(() => ensure(() => testData).all(num => num.greaterThan(0)))
                .not.toThrowError()
        });

        it('lessThan 0', () => {
            const testData = [-1, -2, -3];
            expect(() => ensure(() => testData).all(num => num.lessThan(0)))
                .not.toThrowError()
        });

        it('notNull', () => {
            const testData = [{}, {}, {}];
            expect(() => ensure(() => testData).all(val => val.notNull()))
                .not.toThrowError()
        });

    });
});