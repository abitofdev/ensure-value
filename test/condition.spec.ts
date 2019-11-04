import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const conditionErrorMessageRegex = /did not meet predicate condition/

describe('Ensure condition', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testCondition => {
            it('null/undefined condition predicate', () => {
                const testData = {};
                expect(() => ensure(() => testData).condition(testCondition))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        it('unmet condition', () => {
            const testData = 10;

            expect(() => ensure(() => testData).condition((value) => value > 20))
                .toThrowError(conditionErrorMessageRegex);
        });

        it('unmet condition with empty custom message', () => {
            const testData = 10;

            expect(() => ensure(() => testData)
                .condition((value) => value > 20, ''))
                .toThrowError(conditionErrorMessageRegex);
        });

        it('unmet condition with custom message', () => {
            const testData = 10;

            expect(() => ensure(() => testData)
                .condition((value) => value > 20, 'must be greater than 20.'))
                .toThrowError('testData must be greater than 20.');
        });
    });

    describe('should not throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).condition((_) => true))
                    .not.toThrowError(nullErrorMessageRegex);
            })
        });

        it('met condition', () => {
            const testData = { enabled: false };

            expect(() => ensure(() => testData.enabled).condition((enabled) => enabled === false))
                .not.toThrowError();
        });
    });
});