import Stage from "./Stage";
import { Store } from "redux";
import History from "./History";
import Field from "./Field";
export declare type ReactChatFormUpdateFunction = (property: string, result: string) => void;
export default class ReactChatForm {
    stages: Stage[];
    responses: any;
    historyComponent: History;
    fieldComponent: Field;
    store: Store<any>;
    update: ReactChatFormUpdateFunction;
    currentStage: number;
    next(response: string): void;
    generateHistory(): void;
    storeListener(): void;
    mountHistory(historyComponent: History): void;
    mountField(fieldComponent: Field): void;
    constructor(store: Store<any>, update: ReactChatFormUpdateFunction, stages: Stage[]);
}
export * from "./types";
export { default as Stage } from "./Stage";
export { default as History } from "./History";
export { default as Field } from "./Field";
