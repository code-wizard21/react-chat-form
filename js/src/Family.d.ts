import { Person } from './Person';
export declare class Family {
    name: string;
    members: Person[];
    constructor(name: string);
    addMember(person: Person): void;
    readonly size: number;
}
