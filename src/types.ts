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
    type: "radio" | "check" | "select";
    options: string[];
};

/**
 * Generic field of either text or options
 * @type
 */
export type Field = TextField | OptionField;

/**
 * Question definition
 * @interface
 */
export interface Question {
    field: Field;
};
