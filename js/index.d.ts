import Stage from "./Stage";
import { Store } from "redux";
import History from "./History";
import FieldElement from "./FieldElement";
export declare type ReactChatFormUpdateFunction = (property: string, result: string) => void;
export default class ReactChatForm {
    stages: Stage[];
    historyComponent: History;
    fieldComponent: FieldElement;
    store: Store<any>;
    waitingForStore: boolean;
    update: ReactChatFormUpdateFunction;
    currentStage: number;
    next(): void;
    submitResponse(response: string): void;
    forceUpdate(): void;
    storeListener(generateHistory?: boolean): void;
    mountHistory(historyComponent: History): void;
    mountField(fieldComponent: FieldElement): void;
    constructor(store: Store<any>, update: ReactChatFormUpdateFunction, stages: Stage[]);
}
export * from "./Question";
export { default as Stage } from "./Stage";
export { default as History } from "./History";
export { default as FieldElement, AbstractFieldProps } from "./FieldElement";
