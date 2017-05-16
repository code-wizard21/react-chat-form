export interface TextField {
    type: "text";
}
export interface OptionField {
    type: "radio" | "check" | "select";
    options: string[];
}
export declare type Field = TextField | OptionField;
export interface Question {
    field: Field;
}
