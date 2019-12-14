import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const emptyOrWhitespaceErrorMessageRegex = /must not be empty or whitespace/;
const mustHaveAPropertyErrorMessageRegex = /must have a property called/;

describe('Ensure hasProperty', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined value', () => {
                expect(() => ensure(() => testData).hasProperty('test'))
                    .toThrowError(nullErrorMessageRegex);
            })
        });

        [null, undefined].forEach(propName => {
            it('null/undefined property name', () => {
                const testObj = { testProp: 'test value' };

                expect(() => ensure(() => testObj).hasProperty(propName))
                    .toThrowError(nullErrorMessageRegex);
            });
        });

        ['', ' '].forEach(propName => {
            it('invalid property name', () => {
                const testObj: any = { testProp: 'test value' };

                expect(() => ensure(() => testObj).hasProperty(propName))
                    .toThrowError(emptyOrWhitespaceErrorMessageRegex);
            });
        });

        ['not a property', 'testprop', 'TESTPROP', 'nestedProp.testProp'].forEach(propName => {
            it(`missing a property called '${propName}`, () => {
                const testObj: any = { testProp: 'test value', nestedProp: { testProp: 'nested value' } };

                expect(() => ensure(() => testObj).hasProperty(propName))
                    .toThrowError(mustHaveAPropertyErrorMessageRegex);
            });
        });

    });

    describe('should not throw on', () => {

        it('valid property name on object', () => {
            const testObj = { testProp: 'test value'};

            expect(() => ensure(() => testObj).hasProperty('testProp'))
                .not.toThrowError();
        });

        it('valid property name on object', () => {
            const testObj: any = { testProp: 'test value'};

            expect(() => ensure(() => testObj).hasProperty('testProp'))
                .not.toThrowError();
        });
    });
});