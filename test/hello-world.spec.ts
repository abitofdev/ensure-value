import { HelloWorld } from "../src/hello-world";

describe('test', () => {

    it('say hi', () => {
        const result = new HelloWorld().greet();
        expect(result).toMatch('hi');
    })

});