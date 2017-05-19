export interface TextField {
    type: "text";
}
export interface OptionField {
    type: "radio" | "select";
    options: string[];
}
export declare type Field = TextField | OptionField;
export interface Question {
    preface?: string[];
    title: string;
    field: Field;
}
