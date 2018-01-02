import { IRuleElement } from "./IRuleElement"
import { Operators } from "./Operators"

export class Operator implements IRuleElement {
    public constructor(operator: Operators) {
        this.Name = operator.toString();
        this.Value = operator;
    }

    public Id: string = "";
    public Name: string = "";
    public Value: any = {};

    Process(element: IRuleElement, operator: Operator): boolean {
        throw new TypeError("This operation is not available on this rule element.");
    }
}