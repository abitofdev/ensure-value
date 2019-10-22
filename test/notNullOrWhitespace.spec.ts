import { ensure } from "../dist";

const nullErrorMessageRegex = /must not be null/;
const emptyOrWhitespaceErrorMessageRegex = /must not be empty or whitespace/;

describe('Ensure notNullOrWhitespace', () => {

    describe('should throw on', () => {

        [null, undefined].forEach(testData => {
            it('null/undefined', () => {
                expect(() => ensure(() => testData).notNullOrWhitespace())
                    .toThrowError(nullErrorMessageRegex);
            })
        });
    
        ['', ' ', '       ', '\xa0', '\r', '\r\n'].forEach((testData: string) => {
            it('empty string', () => {
                expect(() => ensure(() => testData).notNullOrWhitespace())
                    .toThrowError(emptyOrWhitespaceErrorMessageRegex);
            })
        });

        [null, undefined].forEach(testData => {
            it('nested null/undefined', () => {
                const nested = {value: testData} 
                expect(() => ensure(() => nested.value).notNullOrWhitespace())
                    .toThrowError(nullErrorMessageRegex);
            })
        });
    
        ['', ' ', '       ', '\xa0', '\r', '\r\n'].forEach(testData => {
            it('nested empty string', () => {
                const nested = {value: testData} 
                expect(() => ensure(() => nested.value).notNullOrWhitespace())
                    .toThrowError(emptyOrWhitespaceErrorMessageRegex);
            })
        });
    });

    describe('should not throw on', () => {

        ['test', '  .', '.  '].forEach(testData => {
            it(`valid string: ${testData}`, () => {
                expect(() => ensure(() => testData).notNullOrWhitespace())
                    .not.toThrowError();
            })
        });

        ['test', '  .', '.  '].forEach(testData => {
            it(`nested valid string: ${testData}`, () => {
                const nested = {value: testData}
                expect(() => ensure(() => nested.value).notNullOrWhitespace())
                    .not.toThrowError();
            })
        });
    });
})