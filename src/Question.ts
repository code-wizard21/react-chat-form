import { Component } from "react";
import { AbstractFieldProps } from "./FieldElement";


/**
 * Field that accepts text input
 * @interface
 */
export interface TextField {
    type: "text";
};

/**
 * Field that accepts predefined options
 * @interface
 */
export interface OptionField {
    type: "radio" | "select";
    options: string[];
};

export interface CustomField {
    type: "custom";
    element: new() => React.Component<AbstractFieldProps, any>;
}

/**
 * Generic field of either text or options
 * @type
 */
export type Field = TextField | OptionField | CustomField;

/**
 * Question definition
 * @interface
 */
export interface Question {
    preface?: string[];
    title: string;
    field: Field;
};
