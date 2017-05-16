import { Family } from './Family';
export declare class Person {
    name: string;
    family: Family;
    constructor(name: string);
    sayHello(): string;
    setFamily(family: Family): void;
    readonly fullName: string;
}
