 import { ensure } from "../dist";

describe('test', () => {

        it('should throw string empty', () => {
            expect(() => testString(null)).toThrowError('test must not be null.');
        });

    [null, '', ' '].forEach(val => {
        it('should throw string empty', () => {
            expect(() => testString(val)).toThrowError();
        })
    });

    [null, +'-50', +'', 10, 50].forEach(val => {
        it('should throw', () => {
            expect(() => testNumber(val)).toThrowError();
        })
    });

    it('object test', () => {
        expect(() => testObject({name: null})).toThrowError();
    });
});

function testString(test: string) {
    ensure(() => test).notNull().notNullOrWhitespace();
}

function testNumber(test: number) {
    ensure(() => test).greaterThan(50);
}

function testObject(test: {name: string}){
    ensure(() => test.name).notNullOrWhitespace();
}