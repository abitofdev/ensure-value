
export function ensure<T>(value: T): Ensure<T> {
    return new Ensure(value);
}

export class Ensure<T> {
    public readonly value: T;

    constructor(value: T) {
        this.value = value;
    }
}