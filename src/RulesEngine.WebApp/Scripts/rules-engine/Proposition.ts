import { IRuleElement } from "./IRuleElement"
import { Operator } from "./Operator"
import { Operators } from "./Operators"

export class Proposition implements IRuleElement {
    constructor(name: string, value: any) {
        this.Name = name;
        this.Value = value;
    }

    public Id: string = "";
    public Name: string = "";
    public Value: any = {};

    Process(element: IRuleElement, operator: Operator): boolean {
        switch (operator.Value)
        {
            case Operators.And:
                return this.And(<boolean>this.Value, <boolean>element.Value);
            case Operators.Not:
                return this.Not(<boolean>this.Value);
            case Operators.Or:
                return this.Or(<boolean>this.Value, <boolean>element.Value);
            case Operators.Xor:
                return this.Xor(<boolean>this.Value, <boolean>element.Value);
            default:
                    throw new TypeError("Invalid operator supplied.");
            }
    }

    private And(lhs: boolean, rhs: boolean): boolean {
        return lhs && rhs;
    }

    private Not(lhs: boolean): boolean {
        return !lhs;
    }

    private Or(lhs: boolean, rhs: boolean): boolean {
        return lhs || rhs;
    }

    private Xor(lhs: boolean, rhs: boolean): boolean {
        return lhs != rhs;
    }
}