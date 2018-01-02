import { IRuleElement } from "./IRuleElement"
import { Proposition } from "./Proposition"
import { Variable } from "./Variable"

export class RuleContext {
    constructor(name: string) {
        this.Name = name;
    }

    public Id: string = "";
    public Name: string = "";
    public Elements: Array<IRuleElement> = [];

    public AddProposition(statement: string, value: boolean): RuleContext {
        this.Elements.push(new Proposition(statement, value));
        return this;
    }

    public AddVariable(name: string, value: any): RuleContext {
        this.Elements.push(new Variable(name, value));
        return this;
    }

    public Find(name: string): IRuleElement {
        let count: number = this.Elements.length;
        let e: IRuleElement;
        for (let i: number = 0; i < count; i++){
            e = this.Elements[i];
            if (e.Name === name)
                break;
            e = null;
        }

        return e;
    }

    public Append(context: RuleContext): RuleContext {
        let count: number = context.Elements.length;
        for (let i: number = 0; i < count; i++) {
            let e: IRuleElement = context.Elements[i];
            this.Elements.push(e);
        }

        return this;
    }
}