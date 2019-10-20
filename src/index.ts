export { ensure, Ensure } from './ensure'
import { Ensure } from './ensure';

declare module './ensure' {
    interface Ensure<T> {
        notNullOrWhitespace(this: Ensure<string>): Ensure<string>;
        notNull(this: Ensure<T>): Ensure<T>
        greaterThan(this: Ensure<number>, threshold: number): Ensure<number>;
    }
}

function notNull<T>(this: Ensure<T>): Ensure<T> {
    if (!this || !this.value) {
        throw new Error('cannot be null');
    }

    return this;
}

function notNullOrWhitespace(this: Ensure<string>): Ensure<string> {
    this.notNull();

    if (!this.value.trim()) {
        throw new Error('cannot be whitespace');
    }

    return this;
}

function greaterThan(this: Ensure<number>, threshold: number): Ensure<number> {
    this.notNull();

    // Handle threshold could be null
    if (this.value <= threshold) {
        throw new Error(`value must be greater than ${threshold}`);
    }

    return this;
}

Ensure.prototype.notNull = notNull;
Ensure.prototype.notNullOrWhitespace = notNullOrWhitespace;
Ensure.prototype.greaterThan = greaterThan;