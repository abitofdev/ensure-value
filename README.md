# ensure-value
![npm](https://img.shields.io/npm/v/ensure-value)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/ensure-value)
![npm](https://img.shields.io/npm/dt/ensure-value?label=total%20downloads)

A simple lightweight library to make protecting function input values simpler and more convenient. The library is primarily aimed at improving the quality and resilience of code by performing trivial checks to ensure data validity and correctness. 

* [Installation](#installation)
* [Usage](#usage)
  * [How it works](#how-it-works)
  * [Simple example](#simple-example)
  * [Chaining](#ensurer-chaining)
* [Validators](#validators)
* [Contributing](#contributing)
* [License](#license)


## Installation

Install the latest version of the package through [NPM](https://www.npmjs.com/package/ensure-value):
```
npm i ensure-value
```

## Usage

ensure-value aims to make function protection as simple as possible through the use of **validation chaining**. The library provides a collection of simple, independent and autonomous data validators for various data types which can be chained together to ensure data correctness and validity. [_See the validators section for a full list_.](#validators)

### How it works

The principal concept behind ensure-value is to throw an error if the specified condition(s) are not met, this allows issues related to data correctness to be identified much earlier and closer to the source.


### Simple example

Let's define a Person class with ensurers for constructor parameters `name` and `age`.
```ts
import { ensure } from "ensure-value";

export class Person {

    public readonly name: string;
    public readonly age: number;

    constructor(name: string, age: number) {
        ensure(() => name).notNullOrWhitespace();
        ensure(() => age).greaterThan(18);

        this.name = name;
        this.age = age;
    }
}
```

Now if we try create a Person object with an empty name...

```ts
 createPerson() {
    const person = new Person('', 16);
    console.log(`Success!! ${person.name} is valid!`);
  }
```

We get the following error in the console: `Error: name must not be empty or whitespace.` Awesome, let's enter a valid name and try again... `Error: age must be greater than 18`. ensure-value has correctly validated our name parameter but has identified our age is not greater than the number we specified (18). Let's fix that and try one final time...

`Success!! Test User is valid!`. Our user has been created and we can be sure that the Person object contains valid data.

### Ensurer Chaining

Multiple ensurers can be chained together to produce complex object validation sequences. 

> Chains are executed in the order that they are defined and will not execute further checks if the current one fails.

```ts
const person = {name: 'John Doe', age: 36};

ensure(() => person)
  .notNull()
  .condition((p) => p.name.indexOf('John') > -1)
  .condition((p) => p.age > 21 && p.age % 2 === 0);

```


### Validators

The table below documents all currently available validators.

Validator | Data Type | Description
--------- | --------- | -----------
`notNull()` | any | Ensures that the value is not null or undefined.
`notNullOrWhitespace()` | string | Ensures that the value is not null, empty or whitespace.
`greaterThan(threshold: number)` | number | Ensures that the value is not null and is greater than the provided threshold.
`lessThan(threshold: number)` | number | Ensures that the value is not null and is less than the provided threshold.
`isTrue()` | boolean | Ensures that the value is not null and is true.
`isFalse()` | boolean | Ensures that the value is not null and is false.
`condition(predicate: (value: T) => boolean, message: string)` | any | Ensures that the provided condition is met. An optional message can be provided to override the default.
`hasItems()` | any[] | Ensures that the provided array contains at least one item.
`all(ensurerChain: (value: EnsuredValue<InferredType<T>>) => EnsuredValue<InferredType<T>>)` | any[] |  Ensures that all items in the provided array pass the specified ensurer chain.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests and the readme as appropriate. All tests should pass by running `npm run test` before making a Pull Request.

## License
[MIT](https://choosealicense.com/licenses/mit/)
