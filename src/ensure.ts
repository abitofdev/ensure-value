
/**
 * Creates an ensurer chain.
 * @param valueFunc A function returning the variable value to protect.
 */
export function ensure<T>(valueFunc: () => T): EnsuredValue<T> {
    return new EnsuredValue(valueFunc);
}

/**
 * Represents a value to be ensured.
 * @typedef EnsuredValue
 */
export class EnsuredValue<T> {

    /**
     * The value being ensured.
     */
    public readonly value: T;

    /**
     * The name of the value to ensure.
     */
    public readonly name: string;

    /**
     * Initializes an instance of @see EnsuredValue<T>.
     * @param valueFunc A function returning the variable value to protect.
     */
    constructor(valueFunc: () => T) {
        this.value = valueFunc();
        this.name = this.getName(valueFunc);
    }

    private getName(valueFunc: () => T): string {
        var match = /return (.*);/g.exec(valueFunc.toString());

        if (match == null) {
            throw new Error('The function does not return a variable name.');
        }

        return match[1];
    }
}