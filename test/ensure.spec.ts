import { ensure } from "../dist/ensure";

describe ("Ensure", () => {

    describe("should generate correct name for", () => {

        it('arrow function', () => {
            const testName = null;
            const name = ensure(() => testName).name;

            expect(name).toBe('testName');
        });

        it('nested arrow function', () => {
            const testObject = generateNestedChild(1);
            const name = ensure(() => testObject.child).name;

            expect(name).toBe('testObject.child');
        });

        it('triple nested arrow function', () => {
            const testObject = generateNestedChild(3);
            const name = ensure(() => testObject.child.child.child).name;

            expect(name).toBe('testObject.child.child.child');
        });

        it('function', () => {
            const testName = null;
            const name = ensure(function(){ return testName; }).name;

            expect(name).toBe('testName');
        });

        it('nested function', () => {
            const testName = generateNestedChild(1);;
            const name = ensure(function(){ return testName.child; }).name;

            expect(name).toBe('testName.child');
        });

        it('triple nested function', () => {
            const testName = generateNestedChild(3);;
            const name = ensure(function(){ return testName.child.child.child; }).name;

            expect(name).toBe('testName.child.child.child');
        });
    });
});

function generateNestedChild(depth: number) {

    let obj = new NestedTest();

    for(let i = 0; i < depth; i++){
        let parent = new NestedTest();
        parent.child = obj;

        obj = parent;
    }

    return obj;
}

class NestedTest {
    public child: NestedTest;
}