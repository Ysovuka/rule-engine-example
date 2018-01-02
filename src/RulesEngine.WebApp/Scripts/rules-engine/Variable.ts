import { IRuleElement } from "./IRuleElement"
import { Operator } from "./Operator"
import { Operators } from "./Operators"

export class Variable implements IRuleElement {
    constructor(name: string, value: any) {
        this.Name = name;
        this.Value = value;
    }

    public Id: string = "";
    public Name: string = "";
    public Value: any = {};

    Process(element: IRuleElement, operator: Operator): boolean {
        switch (operator.Value) {
            case Operators.NotEqual:
                return this.NotEqual(<any>this.Value, <any>element.Value);
            case Operators.Equal:
                return this.Equal(<any>this.Value, <any>element.Value);
            case Operators.GreaterThan:
                return this.GreaterThan(<any>this.Value, <any>element.Value);
            case Operators.GreaterThanOrEqual:
                return this.GreaterThanOrEqual(<any>this.Value, <any>element.Value);
            case Operators.LessThan:
                return this.LessThan(<any>this.Value, <any>element.Value);
            case Operators.LessThanOrEqual:
                return this.LessThanOrEqual(<any>this.Value, <any>element.Value);
            case Operators.Contains:
                return this.Contains(<any>this.Value, <any>element.Value);
            default:
                throw new TypeError("Invalid operator supplied.");
        }
    }

    private NotEqual(lhs: any, rhs: any): boolean {
        return lhs !== rhs;
    }

    private Equal(lhs: any, rhs: any): boolean {
        return lhs === rhs;
    }

    private GreaterThan(lhs: any, rhs: any): boolean {
        return rhs > lhs;
    }

    private GreaterThanOrEqual(lhs: any, rhs: any): boolean {
        return rhs >= lhs;
    }

    private LessThan(lhs: any, rhs: any): boolean {
        return rhs < lhs;
    }

    private LessThanOrEqual(lhs: any, rhs: any): boolean {
        return rhs <= lhs;
    }

    private Contains(lhs: any, rhs: any): boolean {
        return lhs.toString().includes(rhs.toString());
    }
}