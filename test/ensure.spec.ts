 import { ensure } from "../src";

describe('test', () => {

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
});

function testString(test: string) {
    ensure(test).notNull().notNullOrWhitespace();
}

function testNumber(test: number) {
    ensure(test).greaterThan(50);
}