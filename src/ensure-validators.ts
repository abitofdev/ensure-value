import { EnsuredValue, ensure } from './ensure';

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

        /**
         * Ensures that the value is not null and is greater than or equal to the provided threshold.
         * @param this The value to evaluate.
         * @param threshold The threshold of which the ensured value must be greater than or equal to.
         */
        greaterThanOrEquals(this: EnsuredValue<number>, threshold: number): EnsuredValue<number>;

        /**
         * Ensures that the value is not null and is less than the provided threshold.
         * @param this The value to evaluate.
         * @param threshold The threshold of which the ensured value must be less than.
         */
        lessThan(this: EnsuredValue<number>, threshold: number): EnsuredValue<number>;

        /**
         * Ensures that the value is not null and is less than or equal to the the provided threshold.
         * @param this The value to evaluate.
         * @param threshold The threshold of which the ensured value must be less than or equal to.
         */
        lessThanOrEquals(this: EnsuredValue<number>, threshold: number): EnsuredValue<number>;

        /**
         * Ensures that the value is not null and is true.
         * @param this The value to evaluate.
         */
        isTrue(this: EnsuredValue<boolean>): EnsuredValue<boolean>;

        /**
         * Ensures that the value is not null and is false.
         * @param this The value to evaluate.
         */
        isFalse(this: EnsuredValue<boolean>): EnsuredValue<boolean>;

        /**
         * Ensures that the provided condition is met.
         * @param this The value to evaluate.
         * @param predicate The condition function to invoke with the ensured value.
         * @param message A custom error message to use instead of the default. 
         */
        condition(this: EnsuredValue<T>, predicate: (value: T) => boolean, message?: string): EnsuredValue<T>;

        /**
         * Ensures that the provided array contains at least one item.
         * @param this The value to evaluate.
         */
        hasItems<T extends any[]>(this: EnsuredValue<T>): EnsuredValue<T>;

        /**
         * Ensures that all items in the provided array pass the specified ensurer chain.
         * @param this The value to evaluate.
         * @param validate The ensurer chain to execute for each item in the provided array.
         */
        all<T extends any[]>(this: EnsuredValue<T>,
            ensurerChain: (value: EnsuredValue<InferredType<T>>) => EnsuredValue<InferredType<T>>): EnsuredValue<T>;

        /**
         * Ensurers that the provided value contains a specific property.
         * @param this The value to evaluate
         * @param property The name of the property that should exist on the value.
         */
        hasProperty<T extends object, K extends keyof T>(this: EnsuredValue<T>, property: K): EnsuredValue<T>
    }
}

/**
 * Gets the type for a single element of T[] or any if no type could be inferred.
 * (e.g. The returned type for input `string[]` would be `string`)
 */
type InferredType<T> = T extends (infer U)[] ? U : any;

/**
 * Ensures that the value is not null or undefined.
 * @param this The value to evaluate.
 * @throws When the provided value is null or undefined.
 */
export function notNull<T>(this: EnsuredValue<T>): EnsuredValue<T> {
    if (!this || this.value === null || this.value === undefined) {
        throw new Error(`${this.name} must not be null or undefined.`);
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
    ensure(() => threshold).notNull();
    this.notNull();

    if (this.value <= threshold) {
        throw new Error(`${this.name} must be greater than ${threshold}`);
    }

    return this;
}

/**
 * Ensures that the value is not null and is greater than or equal to the provided threshold.
 * @param this The value to evaluate.
 * @param threshold The threshold of which the ensured value must be greater than or equal to.
 */
export function greaterThanOrEquals(this: EnsuredValue<number>, threshold: number): EnsuredValue<number> {
    ensure(() => threshold).notNull();
    this.notNull();

    if (this.value < threshold) {
        throw new Error(`${this.name} must be greater than or equal to ${threshold}`);
    }

    return this;
}

/**
 * Ensures that the value is not null and is less than the provided threshold.
 * @param this The value to evaluate.
 * @param threshold The threshold of which the ensured value must be less than.
 */
export function lessThan(this: EnsuredValue<number>, threshold: number): EnsuredValue<number> {
    ensure(() => threshold).notNull();
    this.notNull();

    if (this.value >= threshold) {
        throw new Error(`${this.name} must be less than ${threshold}`);
    }

    return this;
}

/**
 * Ensures that the value is not null and is less than or equal to the the provided threshold.
 * @param this The value to evaluate.
 * @param threshold The threshold of which the ensured value must be less than or equal to.
 */
export function lessThanOrEquals(this: EnsuredValue<number>, threshold: number): EnsuredValue<number> {
    ensure(() => threshold).notNull();
    this.notNull();

    if (this.value > threshold) {
        throw new Error(`${this.name} must be less than or equal to ${threshold}`);
    }

    return this;
}

/**
 * Ensures that the value is not null and is true.
 * @param this The value to evaluate.
 */
export function isTrue(this: EnsuredValue<boolean>): EnsuredValue<boolean> {
    this.notNull();

    if (this.value !== true) {
        throw new Error(`${this.name} must be true.`);
    }

    return this;
}

/**
 * Ensures that the value is not null and is false.
 * @param this The value to evaluate.
 */
export function isFalse(this: EnsuredValue<boolean>): EnsuredValue<boolean> {
    this.notNull();

    if (this.value !== false) {
        throw new Error(`${this.name} must be false.`);
    }

    return this;
}

/**
 * Ensures that the provided condition is met.
 * @param this The value to evaluate.
 * @param predicate The condition function to invoke with the ensured value.
 * @param message A custom error message to use instead of the default.
 */
export function condition<T>(this: EnsuredValue<T>, predicate: (value: T) => boolean,
    message?: string): EnsuredValue<T> {
    ensure(() => predicate).notNull();

    if (!predicate(this.value)) {
        if (message && !!message.trim()) {
            throw new Error(`${this.name} ${message}`);
        }

        throw new Error(`${this.name} did not meet predicate condition.`);
    }

    return this;
}

/**
 * Ensures that the provided array contains at least one item.
 * @param this The value to evaluate.
 */
export function hasItems<T extends any[]>(this: EnsuredValue<T>): EnsuredValue<T> {
    this.notNull();

    if (this.value.length === 0) {
        throw new Error(`${this.name} must contain at least one item.`);
    }

    return this;
}

/**
 * Ensures that all items in the provided array pass the specified ensurer chain.
 * @param this The value to evaluate.
 * @param validate The ensurer chain to execute for each item in the provided array.
 */
export function all<T extends any[]>(this: EnsuredValue<T>,
    ensurerChain: (value: EnsuredValue<InferredType<T>>) => EnsuredValue<InferredType<T>>): EnsuredValue<T> {
    this.hasItems();
    ensure(() => ensurerChain).notNull();

    this.value.forEach((item) => {
        ensurerChain(new EnsuredValue(() => item));
    });

    return this;
}

/**
 * Ensurers that the provided value contains a specific property.
 * @param this The value to evaluate
 * @param property The name of the property that should exist on the value.
 */
export function hasProperty<T extends object, K extends keyof T>(this: EnsuredValue<T>, property: K): EnsuredValue<T> {
    this.notNull();
    ensure(() => property as string).notNullOrWhitespace();

    if (!this.value.hasOwnProperty(property)) {
        throw new Error(`${this.name} must have a property called '${property}'.`);
    }

    return this;
}

EnsuredValue.prototype.notNull = notNull;
EnsuredValue.prototype.notNullOrWhitespace = notNullOrWhitespace;
EnsuredValue.prototype.greaterThan = greaterThan;
EnsuredValue.prototype.greaterThanOrEquals = greaterThanOrEquals;
EnsuredValue.prototype.lessThan = lessThan;
EnsuredValue.prototype.lessThanOrEquals = lessThanOrEquals;
EnsuredValue.prototype.isTrue = isTrue;
EnsuredValue.prototype.isFalse = isFalse;
EnsuredValue.prototype.condition = condition;
EnsuredValue.prototype.hasItems = hasItems;
EnsuredValue.prototype.all = all;
EnsuredValue.prototype.hasProperty = hasProperty;