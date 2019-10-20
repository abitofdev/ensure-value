import { EnsuredValue } from './ensure';

declare module './ensure' {
    export interface EnsuredValue<T> {
        /**
         * Ensures that the value is not null or undefined.
         * @param this The value to evaluate.
         * @throws When the provided value is null or undefined.
         */
        notNull(this: EnsuredValue<T>): EnsuredValue<T>;

        /**
         * Ensures that the value is not null, empty or whitespace.
         * @param this The value to evaluate.
         * @throws When the provided value is null, empty or whitespace.
         */
        notNullOrWhitespace(this: EnsuredValue<string>): EnsuredValue<string>;

        /**
         * Ensures that the value is not null and is greater than the provided threshold.
         * @param this The value to evaluate.
         * @param threshold The threshold of which the ensured value must be greater than.
         */
        greaterThan(this: EnsuredValue<number>, threshold: number): EnsuredValue<number>;
    }
}

/**
 * Ensures that the value is not null or undefined.
 * @param this The value to evaluate.
 * @throws When the provided value is null or undefined.
 */
export function notNull<T>(this: EnsuredValue<T>): EnsuredValue<T> {
    if (!this || !this.value) {
        throw new Error(`${this.name} must not be null.`);
    }

    return this;
}

/**
 * Ensures that the value is not null, empty or whitespace.
 * @param this The value to evaluate.
 * @throws When the provided value is null, empty or whitespace.
 */
export function notNullOrWhitespace(this: EnsuredValue<string>): EnsuredValue<string> {
    this.notNull();

    if (!this.value.trim()) {
        throw new Error(`${this.name} must not be empty or whitespace.`);
    }

    return this;
}

/**
 * Ensures that the value is not null and is greater than the provided threshold.
 * @param this The value to evaluate.
 * @param threshold The threshold of which the ensured value must be greater than.
 */
export function greaterThan(this: EnsuredValue<number>, threshold: number): EnsuredValue<number> {
    this.notNull();

    // Handle threshold could be null
    if (this.value <= threshold) {
        throw new Error(`value must be greater than ${threshold}`);
    }

    return this;
}

EnsuredValue.prototype.notNull = notNull;
EnsuredValue.prototype.notNullOrWhitespace = notNullOrWhitespace;
EnsuredValue.prototype.greaterThan = greaterThan;