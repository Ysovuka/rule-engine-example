import { Operator } from "./Operator"

export interface IRuleElement {
    Id: string;
    Name: string;
    Value: any;

    Process(lhs: IRuleElement, operator: Operator): boolean;
}