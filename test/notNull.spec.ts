import { ensure } from "../dist";

const errorMessageRegex = /must not be null/;

describe('Ensure notNull', () => {

    describe('should throw on', () => {
        it('null', () => {
            expect(() => ensure(() => null).notNull()).toThrowError(errorMessageRegex);
        })
    
        it('undefined', () => {
            expect(() => ensure(() => undefined).notNull()).toThrowError(errorMessageRegex);
        });
    
        it('nested null', () => {
            const testData = {name: null};
            expect(() => ensure(() => testData.name).notNull()).toThrowError(errorMessageRegex);
        });
    
        it('nested undefined', () => {
            const testData = {name: undefined};
            expect(() => ensure(() => testData.name).notNull()).toThrowError(errorMessageRegex);
        });
    });

    describe('should not throw on', () => {
        it('empty string', () => {
            expect(() => ensure(() => '').notNull).not.toThrowError();
        });

        it('whitespace string', () => {
            expect(() => ensure(() => '   ').notNull).not.toThrowError();
        });

        it('empty object', () => {
            const testData = {}
            expect(() => ensure(() => testData).notNull).not.toThrowError();
        });

        it('empty array', () => {
            expect(() => ensure(() => []).notNull).not.toThrowError();
        });

        it('nested empty string', () => {
            const testData = {name: ''}
            expect(() => ensure(() => testData.name).notNull).not.toThrowError();
        });

        it('nested whitespace string', () => {
            const testData = {name: ' '}
            expect(() => ensure(() => testData.name).notNull).not.toThrowError();
        });

        it('nested empty object', () => {
            const testData = {emptyObject: {}}
            expect(() => ensure(() => testData.emptyObject).notNull).not.toThrowError();
        });

        it('nested empty array', () => {
            const testData = {emptyArray: []}
            expect(() => ensure(() => testData.emptyArray).notNull).not.toThrowError();
        });
    });
    
});