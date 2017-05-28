/// <reference types="react" />
import { AbstractFieldProps } from "./FieldElement";
export interface TextField {
    type: "text";
}
export interface OptionField {
    type: "radio" | "select";
    options: string[];
}
export interface CustomField {
    type: "custom";
    element: new () => React.Component<AbstractFieldProps, any>;
}
export declare type Field = TextField | OptionField | CustomField;
export interface Question {
    preface?: string[];
    title: string;
    field: Field;
}
